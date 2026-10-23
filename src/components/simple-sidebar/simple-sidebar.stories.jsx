import React, { useState } from 'react'
import SimpleSidebar from './index.js'
import { DarkStorySurface } from '../../story-assets/story-theme'

export default {
  title: 'design-components/SimpleSidebar',
  component: SimpleSidebar,
}

export const Demo = () => {
  const [isOpen, setIsOpen] = useState(true)

  const drawerToggleClickHandler = () => {
    setIsOpen(!isOpen)
  }
  return (
    <SimpleSidebar
      isOpen={isOpen}
      onToggle={drawerToggleClickHandler}
      width={328}
      height={500}
    >
      Test
    </SimpleSidebar>
  )
}

export const DarkTheme = () => (
  <DarkStorySurface style={{ minHeight: 520 }}>
    <Demo />
  </DarkStorySurface>
)

DarkTheme.storyName = 'Dark theme'
