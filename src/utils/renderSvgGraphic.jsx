import React from 'react';

/**
 * Renders an SVG imported with `?react`, a React element, or falls back to img for string URLs.
 */
export function renderSvgGraphic(Graphic, props) {
  if (Graphic == null) return null;
  if (typeof Graphic === 'function') {
    const { alt, ...rest } = props || {};
    const label = rest['aria-label'] ?? alt;
    return <Graphic {...rest} {...(label != null ? { 'aria-label': label } : {})} />;
  }
  if (React.isValidElement(Graphic)) {
    return React.cloneElement(Graphic, props);
  }
  const { alt, ...imgProps } = props || {};
  return <img src={Graphic} alt={alt ?? ''} {...imgProps} />;
}
