/**
 * Portal roots attach to `document.body` and sit outside themed wrappers.
 * Mirror the nearest `[data-theme]` from a trigger node, then `<html>`.
 *
 * Returns the actual data-theme string (any value, not just 'light'/'dark') so
 * custom themes are forwarded as-is. Returns null when no data-theme is found
 * anywhere — the portal then has NO data-theme attribute and inherits CSS custom
 * properties directly from :root, which is exactly what custom themes need.
 *
 * Previously this fell back to 'light', which forced [data-theme='light'] CSS
 * blocks to fire on the portal and override :root custom-theme variables.
 */
export function resolvePortalDataTheme(anchorEl) {
  const fromTree = anchorEl?.closest?.('[data-theme]')?.getAttribute('data-theme')
  if (fromTree != null) {
    return fromTree
  }
  const fromRoot = document.documentElement.getAttribute('data-theme')
  if (fromRoot != null) {
    return fromRoot
  }
  return null
}

/**
 * Append a portal host to `document.body` and keep `data-theme` aligned.
 *
 * Child `useEffect` runs before parent `useEffect`, so wrappers like
 * `DarkStoryDocument` may set `<html data-theme>` after the first sync. A
 * `MutationObserver` on `<html>` reapplies theme when it changes;
 * `setTimeout(0)` is a fallback.
 */
export function mountPortalRootWithThemeSync(portalEl, themeSourceRef) {
  const body = document.body
  const syncTheme = () => {
    const theme = resolvePortalDataTheme(themeSourceRef?.current)
    if (theme != null) {
      portalEl.setAttribute('data-theme', theme)
    } else {
      // No data-theme set anywhere — remove attribute so the portal inherits
      // CSS custom properties from :root without a theme-specific override.
      portalEl.removeAttribute('data-theme')
    }
  }

  syncTheme()
  body.appendChild(portalEl)

  const observer = new MutationObserver(syncTheme)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  const timeoutId = window.setTimeout(syncTheme, 0)

  return () => {
    window.clearTimeout(timeoutId)
    observer.disconnect()
    body.removeChild(portalEl)
  }
}
