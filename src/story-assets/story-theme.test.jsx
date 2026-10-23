import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  CustomStoryDocument,
  DarkStoryDocument,
  customThemeSurface,
  storyThemeOwnerAttribute,
} from './story-theme'

// The Storybook toolbar decorator reads storyThemeOwnerAttribute to decide whether
// a story has already claimed <html>. Effects run child-first, so without the
// marker the decorator would overwrite the theme these helpers just applied.
describe('story theme document helpers', () => {
  it('CustomStoryDocument claims the document and clears data-theme', () => {
    const root = document.documentElement
    root.setAttribute('data-theme', 'light')

    const { unmount } = render(
      <CustomStoryDocument>
        <div>content</div>
      </CustomStoryDocument>,
    )

    expect(root.getAttribute(storyThemeOwnerAttribute)).toBe('custom')
    expect(root.hasAttribute('data-theme')).toBe(false)
    Object.entries(customThemeSurface).forEach(([key, value]) => {
      expect(root.style.getPropertyValue(key)).toBe(value)
    })

    unmount()

    expect(root.hasAttribute(storyThemeOwnerAttribute)).toBe(false)
    expect(root.getAttribute('data-theme')).toBe('light')
    Object.keys(customThemeSurface).forEach(key => {
      expect(root.style.getPropertyValue(key)).toBe('')
    })
  })

  it('DarkStoryDocument claims the document and restores the previous theme', () => {
    const root = document.documentElement
    root.setAttribute('data-theme', 'light')

    const { unmount } = render(
      <DarkStoryDocument>
        <div>content</div>
      </DarkStoryDocument>,
    )

    expect(root.getAttribute(storyThemeOwnerAttribute)).toBe('dark')
    expect(root.getAttribute('data-theme')).toBe('dark')

    unmount()

    expect(root.hasAttribute(storyThemeOwnerAttribute)).toBe(false)
    expect(root.getAttribute('data-theme')).toBe('light')
  })
})
