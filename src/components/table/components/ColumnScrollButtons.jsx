
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import ChevronLeft from '../../../assets/icons/chevron-left.svg?react'
import ChevronRight from '../../../assets/icons/chevron-right.svg?react'
import Button from '../../button'
import {
  classes,
  columnMinWidth,
  columnScrollDuration,
  columnScrollStepRatio,
} from '../constants'

const ColumnScrollButtons = ({ scrollWrapperRef }) => {
  const [scrollState, setScrollState] = useState({
    atStart: true,
    atEnd: true,
    scrollbarOffScreen: false,
  })
  const scrollAnimationRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const wrapper = scrollWrapperRef.current
    const nav = navRef.current
    const header = wrapper?.parentElement.querySelector('thead')

    if (!wrapper || !nav) return

    let frame
    const update = () => {
      frame = null
      setScrollState({
        atStart: wrapper.scrollLeft <= 0,
        atEnd:
          wrapper.scrollLeft >=
          wrapper.scrollWidth - wrapper.clientWidth - 1,
        scrollbarOffScreen:
          wrapper.getBoundingClientRect().bottom > window.innerHeight,
      })

      // Centred on the header row; re-measured on page scroll so a sticky
      // header is followed while it's stuck.
      if (header) {
        const { top, bottom } = header.getBoundingClientRect()
        nav.style.top = `${(top + bottom) / 2 - wrapper.getBoundingClientRect().top}px`
        nav.style.setProperty('--bds-table-scroll-nav-height', `${bottom - top}px`)
      }
    }

    const scheduleUpdate = () => {
      if (frame == null) frame = requestAnimationFrame(update)
    }

    update()
    wrapper.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('scroll', scheduleUpdate, {
      capture: true,
      passive: true,
    })
    window.addEventListener('resize', scheduleUpdate)

    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(scheduleUpdate)
      : null

    observer?.observe(wrapper)
    if (header) observer?.observe(header)

    const table = wrapper.querySelector('table')
    if (table) observer?.observe(table)

    return () => {
      wrapper.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('scroll', scheduleUpdate, true)
      window.removeEventListener('resize', scheduleUpdate)
      observer?.disconnect()
      cancelAnimationFrame(frame)
      cancelAnimationFrame(scrollAnimationRef.current)
    }
  }, [scrollWrapperRef])

  const scrollColumns = direction => {
    const wrapper = scrollWrapperRef.current
    if (!wrapper) return

    const style = getComputedStyle(wrapper.parentElement)
    const pinnedWidth =
      (parseFloat(style.getPropertyValue('--bds-table-pinned-left-width')) || 0) +
      (parseFloat(style.getPropertyValue('--bds-table-pinned-right-width')) || 0)

    // A share of the scrolling area per click, not all of it, which usually
    // jumped straight to the end; never less than one narrowest column.
    const step = Math.max(
      (wrapper.clientWidth - pinnedWidth) * columnScrollStepRatio,
      columnMinWidth,
    )
    const from = wrapper.scrollLeft
    const to = Math.min(
      Math.max(from + direction * step, 0),
      wrapper.scrollWidth - wrapper.clientWidth,
    )

    cancelAnimationFrame(scrollAnimationRef.current)

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      wrapper.scrollLeft = to
      return
    }

    const start = performance.now()
    const animate = now => {
      const progress = Math.min((now - start) / columnScrollDuration, 1)
      const eased =
        progress < 0.5
          ? 4 * progress ** 3
          : 1 - (-2 * progress + 2) ** 3 / 2

      wrapper.scrollLeft = from + (to - from) * eased

      if (progress < 1) {
        scrollAnimationRef.current = requestAnimationFrame(animate)
      }
    }

    scrollAnimationRef.current = requestAnimationFrame(animate)
  }

  const buttons = [
    {
      side: 'left',
      direction: -1,
      Icon: ChevronLeft,
      className: classes.scrollNavEdgeLeft,
      atEnd: scrollState.atStart,
    },
    {
      side: 'right',
      direction: 1,
      Icon: ChevronRight,
      className: classes.scrollNavEdgeRight,
      atEnd: scrollState.atEnd,
    },
  ]
  // At both ends at once means the columns fit: nothing to scroll.
  const overflows = !(scrollState.atStart && scrollState.atEnd)

  return (
    <div className={classes.scrollNav} ref={navRef}>
      {scrollState.scrollbarOffScreen && overflows &&
        buttons.map(
          ({ side, direction, Icon, className, atEnd }) => (
            // Kept mounted at an end so it can fade out rather than vanish.
            <div
              key={side}
              className={classNames(classes.scrollNavEdge, className, {
                [classes.scrollNavEdgeHidden]: atEnd,
              })}
            >
              <div className={classes.scrollNavControl}>
                <Button
                  type="button"
                  variant="textOnly"
                  size="medium"
                  leftSVGIcon={
                    <Icon width={24} height={24} aria-hidden focusable="false" />
                  }
                  onClick={() => scrollColumns(direction)}
                  // Also out of the tab order while faded out at its end.
                  disabled={atEnd}
                  testId={`table-scroll-${side}`}
                  extraProps={{ 'aria-label': `Scroll columns ${side}` }}
                />
              </div>
            </div>
          ),
        )}
    </div>
  )
}

ColumnScrollButtons.propTypes = {
  scrollWrapperRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
}

export default ColumnScrollButtons
