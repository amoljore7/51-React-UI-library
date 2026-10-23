import React, {
  cloneElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Typography from '../typography';
import {
  classes,
  defaultPosition,
  defaultTheme,
  hoverOffset,
  themeAuto,
  tooltipId,
  tooltipArrowOffset,
  tooltipMargin,
  tooltipMaxHeight,
  tooltipMaxWidth,
  zIndexDefault,
} from './constants';
import './tooltip.scss';

const POSITIONS = [
  'top',
  'bottom',
  'left',
  'right',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

const POSITION_CLASS_MAP = {
  top: classes.positionTop,
  bottom: classes.positionBottom,
  left: classes.positionLeft,
  right: classes.positionRight,
  'top-left': classes.positionTopLeft,
  'top-right': classes.positionTopRight,
  'bottom-left': classes.positionBottomLeft,
  'bottom-right': classes.positionBottomRight,
};

function setRef(ref, value) {
  if (typeof ref === 'function') ref(value);
  else if (ref != null) ref.current = value;
}

function mergeRefs(refA, refB) {
  return (value) => {
    refA.current = value;
    setRef(refB, value);
  };
}

const isMousePointerNearTooltipContainer = (tooltipElement, mouseEvent) => {
  const {
    left: tooltipLeft,
    right: tooltipRight,
    bottom: tooltipBottom,
    top: tooltipTop,
  } = tooltipElement.getBoundingClientRect();

  const isInsideWidth =
    mouseEvent.pageX >= tooltipLeft + window.pageXOffset - hoverOffset &&
    mouseEvent.pageX < tooltipRight + window.pageXOffset + hoverOffset;
  const isInsideHeight =
    mouseEvent.pageY < tooltipBottom + window.pageYOffset + hoverOffset &&
    mouseEvent.pageY > tooltipTop + window.pageYOffset - hoverOffset;

  return isInsideWidth && isInsideHeight;
};

const changeTooltipPos = (tooltipElement, element, position) => {
  const rect = element.getBoundingClientRect();
  const absWidthDiff = Math.abs(tooltipElement.offsetWidth - rect.width);
  const absHeightDiff = Math.abs(tooltipElement.offsetHeight - rect.height);
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  const moveToTop = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left +
      window.pageXOffset -
      (tooltipElement.offsetWidth >= rect.width
        ? absWidthDiff / 2
        : -1 * (absWidthDiff / 2))
    }px,${
      rect.top +
      window.pageYOffset -
      tooltipElement.offsetHeight -
      tooltipMargin
    }px,0)`;
  };

  const moveToBottom = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left +
      window.pageXOffset -
      (tooltipElement.offsetWidth >= rect.width
        ? absWidthDiff / 2
        : -1 * (absWidthDiff / 2))
    }px,${rect.bottom + window.pageYOffset + tooltipMargin}px,0)`;
  };

  const moveToTopLeft = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left + window.pageXOffset - tooltipElement.offsetWidth + tooltipArrowOffset
    }px,${
      rect.top + window.pageYOffset - tooltipElement.offsetHeight - tooltipMargin
    }px,0)`;
  };

  const moveToTopRight = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.right + window.pageXOffset - tooltipArrowOffset
    }px,${
      rect.top + window.pageYOffset - tooltipElement.offsetHeight - tooltipMargin
    }px,0)`;
  };

  const moveToBottomLeft = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left + window.pageXOffset - tooltipElement.offsetWidth + tooltipArrowOffset
    }px,${rect.bottom + window.pageYOffset + tooltipMargin}px,0)`;
  };

  const moveToBottomRight = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.right + window.pageXOffset - tooltipArrowOffset
    }px,${rect.bottom + window.pageYOffset + tooltipMargin}px,0)`;
  };

  const moveToLeft = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left +
      window.pageXOffset -
      tooltipElement.offsetWidth -
      tooltipMargin
    }px,${
      rect.top +
      window.pageYOffset -
      (tooltipElement.offsetHeight >= rect.height
        ? absHeightDiff / 2
        : -1 * (absHeightDiff / 2))
    }px,0)`;
  };

  const moveToRight = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.right + window.pageXOffset + tooltipMargin
    }px,${
      rect.top +
      window.pageYOffset -
      (tooltipElement.offsetHeight >= rect.height
        ? absHeightDiff / 2
        : -1 * (absHeightDiff / 2))
    }px,0)`;
  };

  const adjustTopPosition = () => {
    if (rect.top - tooltipElement.offsetHeight - tooltipMargin < 0) {
      moveToBottom();
    } else {
      moveToTop();
    }
  };
  const adjustBottomPosition = () => {
    if (rect.bottom + tooltipElement.offsetHeight + tooltipMargin > vh) {
      moveToTop();
    } else {
      moveToBottom();
    }
  };
  const adjustLeftPosition = () => {
    if (rect.left - tooltipElement.offsetWidth - tooltipMargin < 0) {
      moveToRight();
    } else {
      moveToLeft();
    }
  };
  const adjustRightPosition = () => {
    if (rect.right + tooltipMargin + tooltipElement.offsetWidth > vw) {
      moveToLeft();
    } else {
      moveToRight();
    }
  };

  const adjustTopLeftPosition = () => {
    if (rect.top - tooltipElement.offsetHeight - tooltipMargin < 0) {
      moveToBottomLeft();
    } else if (rect.left - tooltipElement.offsetWidth + tooltipArrowOffset < 0) {
      moveToTopRight();
    } else {
      moveToTopLeft();
    }
  };

  const adjustTopRightPosition = () => {
    if (rect.top - tooltipElement.offsetHeight - tooltipMargin < 0) {
      moveToBottomRight();
    } else if (rect.right - tooltipArrowOffset + tooltipElement.offsetWidth > vw) {
      moveToTopLeft();
    } else {
      moveToTopRight();
    }
  };

  const adjustBottomLeftPosition = () => {
    if (rect.bottom + tooltipElement.offsetHeight + tooltipMargin > vh) {
      moveToTopLeft();
    } else if (rect.left - tooltipElement.offsetWidth + tooltipArrowOffset < 0) {
      moveToBottomRight();
    } else {
      moveToBottomLeft();
    }
  };

  const adjustBottomRightPosition = () => {
    if (rect.bottom + tooltipElement.offsetHeight + tooltipMargin > vh) {
      moveToTopRight();
    } else if (rect.right - tooltipArrowOffset + tooltipElement.offsetWidth > vw) {
      moveToBottomLeft();
    } else {
      moveToBottomRight();
    }
  };

  switch (position) {
    case 'top':
      adjustTopPosition();
      break;
    case 'bottom':
      adjustBottomPosition();
      break;
    case 'left':
      adjustLeftPosition();
      break;
    case 'right':
      adjustRightPosition();
      break;
    case 'top-left':
      adjustTopLeftPosition();
      break;
    case 'top-right':
      adjustTopRightPosition();
      break;
    case 'bottom-left':
      adjustBottomLeftPosition();
      break;
    case 'bottom-right':
      adjustBottomRightPosition();
      break;
  }
};

const Tooltip = ({
  title,
  children,
  position = defaultPosition,
  theme = defaultTheme,
  zIndex = zIndexDefault,
  className,
}) => {
  const resolvedTheme =
    theme === themeAuto && typeof document !== 'undefined'
      ? document.documentElement.getAttribute('data-theme')
      : theme;
  const isDark = resolvedTheme === 'dark';
  const portalRef = useRef(null);
  const childRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = document.createElement('div');
    el.id = tooltipId;
    el.style.position = 'absolute';
    el.style.willChange = 'transform';
    el.style.zIndex = zIndex;
    el.style.top = '0';
    el.style.left = '0';
    el.style.maxWidth = tooltipMaxWidth;
    el.style.maxHeight = tooltipMaxHeight;
    el.style.overflow = 'visible';
    el.style.display = 'none';
    if (className) el.classList.add(className);
    portalRef.current = el;
    document.body.appendChild(el);

    let pending = false;
    const mouseMoveHandler = (event) => {
      if (pending) return;
      pending = true;
      rafRef.current = requestAnimationFrame(() => {
        pending = false;
        if (!portalRef.current) return;
        const near = isMousePointerNearTooltipContainer(portalRef.current, event);
        setIsNear(near);
      });
    };
    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', mouseMoveHandler);
      if (portalRef.current && portalRef.current.parentNode === document.body) {
        document.body.removeChild(portalRef.current);
      }
      portalRef.current = null;
    };
  }, [zIndex, className]);

  useLayoutEffect(() => {
    const el = portalRef.current;
    if (!el) return;
    if (childRef.current && isHover) {
      el.style.display = 'block';
      changeTooltipPos(el, childRef.current, position);
    } else {
      el.style.display = 'none';
    }
  }, [isHover, title, position]);

  const handleMouseOver = useCallback(() => setIsHover(true), []);
  const handleMouseLeave = useCallback(() => setIsHover(false), []);

  const child = React.Children.only(children);
  const mergedRef = mergeRefs(childRef, child.ref);

  return (
    <>
      {cloneElement(child, {
        ref: mergedRef,
        onMouseOver: handleMouseOver,
        onMouseLeave: handleMouseLeave,
      })}
      {(isHover || isNear) &&
        title &&
        portalRef.current &&
        createPortal(
          <div
            className={`${classes.tooltipContainer} ${POSITION_CLASS_MAP[position] ?? classes.positionTop}${isDark ? ` ${classes.tooltipDark}` : ''}`}
            onMouseLeave={() => setIsNear(false)}
          >
            <span className={classes.tooltipArrow} aria-hidden />
            <Typography variant="caption1">{title}</Typography>
          </div>,
          portalRef.current
        )}
    </>
  );
};

Tooltip.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(POSITIONS),
  theme: PropTypes.oneOf(['light', 'dark', 'auto']),
  zIndex: PropTypes.number,
  className: PropTypes.string,
};

export default Tooltip;
