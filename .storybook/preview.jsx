import React, { useLayoutEffect } from 'react'
import './preview.scss'
import {
  customThemeSurface,
  storyThemeOwnerAttribute,
} from '../src/story-assets/story-theme'

const ThemeApplier = ({ theme, children }) => {
  useLayoutEffect(() => {
    const root = document.documentElement
    if (root.hasAttribute(storyThemeOwnerAttribute)) return undefined
    if (theme === 'custom') {
      root.removeAttribute('data-theme')
      Object.entries(customThemeSurface).forEach(([k, v]) => root.style.setProperty(k, v))
    } else {
      root.setAttribute('data-theme', theme)
    }
    return () => {
      Object.keys(customThemeSurface).forEach(k => root.style.removeProperty(k))
    }
  }, [theme])
  return children
}

export default {
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['light', 'dark', 'custom'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <ThemeApplier theme={context.globals.theme}>
        <div
          style={{
            background: 'var(--theme-content-bg)',
            color: 'var(--theme-text-primary)',
            minHeight: '100vh',
            padding: '16px',
          }}
        >
          <Story />
        </div>
      </ThemeApplier>
    ),
  ],
}
