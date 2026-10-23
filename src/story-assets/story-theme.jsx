import React, { useLayoutEffect } from 'react';

const defaultStyle = {
  padding: '24px',
  background: '#040520',
  borderRadius: '8px',
  minHeight: '48px',
  color: '#e6e6e9',
};

/**
 * Wraps story content so `data-theme="dark"` SCSS applies (matches design token neutral-100 canvas).
 */
export function DarkStorySurface({ children, style }) {
  return (
    <div data-theme="dark" style={{ ...defaultStyle, ...style }}>
      {children}
    </div>
  );
}

/**
 * Sample custom theme: a palette that matches neither the light nor the dark
 * preset, so anything hardcoded to a preset value stands out immediately.
 */
export const customThemeSurface = {
  '--theme-content-bg': '#2b1b3d',
  '--theme-text-primary': '#f3e9ff',
};

/**
 * Marks `<html>` as owned by the story rather than the toolbar. Effects run
 * child-first, so without this the toolbar decorator (a parent) would overwrite
 * whatever theme the story just pinned.
 */
export const storyThemeOwnerAttribute = 'data-story-theme-owner';

/**
 * Paints a panel using whatever theme is currently active. It deliberately does
 * not set the surface variables itself: component --bds-* tokens are declared at
 * `:root`, so they are already resolved by the time a subtree inherits them and
 * a scoped override would not reach them. Pair this with `CustomStoryDocument`,
 * which applies the theme at the document root.
 */
export function CustomStorySurface({ children, style }) {
  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '8px',
        minHeight: '48px',
        background: 'var(--theme-content-bg)',
        color: 'var(--theme-text-primary)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Applies the custom theme to `<html>` while mounted and removes `data-theme`
 * so no preset block overrides the custom surface variables. This is the only
 * supported way to apply a custom theme. Restores both on unmount.
 */
export function CustomStoryDocument({ children }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const prev = root.getAttribute('data-theme');
    root.setAttribute(storyThemeOwnerAttribute, 'custom');
    root.removeAttribute('data-theme');
    Object.entries(customThemeSurface).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    return () => {
      Object.keys(customThemeSurface).forEach((key) => {
        root.style.removeProperty(key);
      });
      root.setAttribute('data-theme', prev == null || prev === '' ? 'light' : prev);
      root.removeAttribute(storyThemeOwnerAttribute);
    };
  }, []);
  return children;
}

/**
 * Sets `data-theme="dark"` on `<html>` while mounted (for portaled overlays: dialog, modal, etc.).
 * Restores the previous value on unmount.
 */
export function DarkStoryDocument({ children }) {
  // useLayoutEffect: set <html data-theme> before paint so portaled dialog/modal read dark on first frame when possible.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const prev = root.getAttribute('data-theme');
    root.setAttribute(storyThemeOwnerAttribute, 'dark');
    root.setAttribute('data-theme', 'dark');
    return () => {
      if (prev == null || prev === '') {
        root.setAttribute('data-theme', 'light');
      } else {
        root.setAttribute('data-theme', prev);
      }
      root.removeAttribute(storyThemeOwnerAttribute);
    };
  }, []);
  return children;
}
