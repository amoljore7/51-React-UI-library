import React, { cloneElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Typography from '../typography';
import { classes, defaultPosition, defaultTheme, hoverOffset, themeAuto, tooltipId, tooltipArrowOffset, tooltipMargin, tooltipMaxHeight, tooltipMaxWidth, zIndexDefault } from './constants';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-tooltip-container {\n  position: relative;\n  overflow: visible;\n  border-radius: 0.375rem;\n  width: fit-content;\n  max-width: 100%;\n  padding: 0.5rem 0.75rem;\n  color: #ffffff;\n  background: #040520;\n  box-sizing: border-box;\n  box-shadow: 0px 2px 2px rgba(4, 5, 32, 0.1), 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n\n.bds-tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  pointer-events: none;\n}\n\n.bds-tooltip-container--top .bds-tooltip-arrow {\n  bottom: calc(-1 * 0.5rem);\n  left: 50%;\n  transform: translateX(-50%);\n  border-width: 0.5rem 0.5rem 0 0.5rem;\n  border-color: #040520 transparent transparent transparent;\n}\n\n.bds-tooltip-container--bottom .bds-tooltip-arrow {\n  top: calc(-1 * 0.5rem);\n  left: 50%;\n  transform: translateX(-50%);\n  border-width: 0 0.5rem 0.5rem 0.5rem;\n  border-color: transparent transparent #040520 transparent;\n}\n\n.bds-tooltip-container--left .bds-tooltip-arrow {\n  top: 50%;\n  right: calc(-1 * 0.5rem);\n  transform: translateY(-50%);\n  border-width: 0.5rem 0 0.5rem 0.5rem;\n  border-color: transparent transparent transparent #040520;\n}\n\n.bds-tooltip-container--right .bds-tooltip-arrow {\n  top: 50%;\n  left: calc(-1 * 0.5rem);\n  transform: translateY(-50%);\n  border-width: 0.5rem 0.5rem 0.5rem 0;\n  border-color: transparent #040520 transparent transparent;\n}\n\n.bds-tooltip-container--top-left .bds-tooltip-arrow {\n  bottom: calc(-1 * 0.5rem);\n  right: 0.75rem;\n  border-width: 0.5rem 0.5rem 0 0.5rem;\n  border-color: #040520 transparent transparent transparent;\n}\n\n.bds-tooltip-container--top-right .bds-tooltip-arrow {\n  bottom: calc(-1 * 0.5rem);\n  left: 0.75rem;\n  border-width: 0.5rem 0.5rem 0 0.5rem;\n  border-color: #040520 transparent transparent transparent;\n}\n\n.bds-tooltip-container--bottom-left .bds-tooltip-arrow {\n  top: calc(-1 * 0.5rem);\n  right: 0.75rem;\n  border-width: 0 0.5rem 0.5rem 0.5rem;\n  border-color: transparent transparent #040520 transparent;\n}\n\n.bds-tooltip-container--bottom-right .bds-tooltip-arrow {\n  top: calc(-1 * 0.5rem);\n  left: 0.75rem;\n  border-width: 0 0.5rem 0.5rem 0.5rem;\n  border-color: transparent transparent #040520 transparent;\n}\n\n[data-theme=dark] .bds-tooltip-container,\n.bds-tooltip-container--dark {\n  color: #040520;\n  background: #f2f2f4;\n}\n\n[data-theme=dark] .bds-tooltip-container--top .bds-tooltip-arrow,\n[data-theme=dark] .bds-tooltip-container--top-left .bds-tooltip-arrow,\n[data-theme=dark] .bds-tooltip-container--top-right .bds-tooltip-arrow,\n.bds-tooltip-container--dark.bds-tooltip-container--top .bds-tooltip-arrow,\n.bds-tooltip-container--dark.bds-tooltip-container--top-left .bds-tooltip-arrow,\n.bds-tooltip-container--dark.bds-tooltip-container--top-right .bds-tooltip-arrow {\n  border-color: #f2f2f4 transparent transparent transparent;\n}\n\n[data-theme=dark] .bds-tooltip-container--bottom .bds-tooltip-arrow,\n[data-theme=dark] .bds-tooltip-container--bottom-left .bds-tooltip-arrow,\n[data-theme=dark] .bds-tooltip-container--bottom-right .bds-tooltip-arrow,\n.bds-tooltip-container--dark.bds-tooltip-container--bottom .bds-tooltip-arrow,\n.bds-tooltip-container--dark.bds-tooltip-container--bottom-left .bds-tooltip-arrow,\n.bds-tooltip-container--dark.bds-tooltip-container--bottom-right .bds-tooltip-arrow {\n  border-color: transparent transparent #f2f2f4 transparent;\n}\n\n[data-theme=dark] .bds-tooltip-container--left .bds-tooltip-arrow,\n.bds-tooltip-container--dark.bds-tooltip-container--left .bds-tooltip-arrow {\n  border-color: transparent transparent transparent #f2f2f4;\n}\n\n[data-theme=dark] .bds-tooltip-container--right .bds-tooltip-arrow,\n.bds-tooltip-container--dark.bds-tooltip-container--right .bds-tooltip-arrow {\n  border-color: transparent #f2f2f4 transparent transparent;\n}";
  const fileName = "tooltip_tooltip_9305bd89-a2fd-46b3-a259-6124ed2a4a75";
  const element = document.querySelector("style[data-sass-component='tooltip_tooltip_9305bd89-a2fd-46b3-a259-6124ed2a4a75']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const POSITIONS = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
const POSITION_CLASS_MAP = {
  top: classes.positionTop,
  bottom: classes.positionBottom,
  left: classes.positionLeft,
  right: classes.positionRight,
  'top-left': classes.positionTopLeft,
  'top-right': classes.positionTopRight,
  'bottom-left': classes.positionBottomLeft,
  'bottom-right': classes.positionBottomRight
};
function setRef(ref, value) {
  if (typeof ref === 'function') ref(value);else if (ref != null) ref.current = value;
}
function mergeRefs(refA, refB) {
  return value => {
    refA.current = value;
    setRef(refB, value);
  };
}
const isMousePointerNearTooltipContainer = (tooltipElement, mouseEvent) => {
  const {
    left: tooltipLeft,
    right: tooltipRight,
    bottom: tooltipBottom,
    top: tooltipTop
  } = tooltipElement.getBoundingClientRect();
  const isInsideWidth = mouseEvent.pageX >= tooltipLeft + window.pageXOffset - hoverOffset && mouseEvent.pageX < tooltipRight + window.pageXOffset + hoverOffset;
  const isInsideHeight = mouseEvent.pageY < tooltipBottom + window.pageYOffset + hoverOffset && mouseEvent.pageY > tooltipTop + window.pageYOffset - hoverOffset;
  return isInsideWidth && isInsideHeight;
};
const changeTooltipPos = (tooltipElement, element, position) => {
  const rect = element.getBoundingClientRect();
  const absWidthDiff = Math.abs(tooltipElement.offsetWidth - rect.width);
  const absHeightDiff = Math.abs(tooltipElement.offsetHeight - rect.height);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const moveToTop = () => {
    tooltipElement.style.transform = "translate3d(".concat(rect.left + window.pageXOffset - (tooltipElement.offsetWidth >= rect.width ? absWidthDiff / 2 : -1 * (absWidthDiff / 2)), "px,").concat(rect.top + window.pageYOffset - tooltipElement.offsetHeight - tooltipMargin, "px,0)");
  };
  const moveToBottom = () => {
    tooltipElement.style.transform = "translate3d(".concat(rect.left + window.pageXOffset - (tooltipElement.offsetWidth >= rect.width ? absWidthDiff / 2 : -1 * (absWidthDiff / 2)), "px,").concat(rect.bottom + window.pageYOffset + tooltipMargin, "px,0)");
  };
  const moveToTopLeft = () => {
    tooltipElement.style.transform = "translate3d(".concat(rect.left + window.pageXOffset - tooltipElement.offsetWidth + tooltipArrowOffset, "px,").concat(rect.top + window.pageYOffset - tooltipElement.offsetHeight - tooltipMargin, "px,0)");
  };
  const moveToTopRight = () => {
    tooltipElement.style.transform = "translate3d(".concat(rect.right + window.pageXOffset - tooltipArrowOffset, "px,").concat(rect.top + window.pageYOffset - tooltipElement.offsetHeight - tooltipMargin, "px,0)");
  };
  const moveToBottomLeft = () => {
    tooltipElement.style.transform = "translate3d(".concat(rect.left + window.pageXOffset - tooltipElement.offsetWidth + tooltipArrowOffset, "px,").concat(rect.bottom + window.pageYOffset + tooltipMargin, "px,0)");
  };
  const moveToBottomRight = () => {
    tooltipElement.style.transform = "translate3d(".concat(rect.right + window.pageXOffset - tooltipArrowOffset, "px,").concat(rect.bottom + window.pageYOffset + tooltipMargin, "px,0)");
  };
  const moveToLeft = () => {
    tooltipElement.style.transform = "translate3d(".concat(rect.left + window.pageXOffset - tooltipElement.offsetWidth - tooltipMargin, "px,").concat(rect.top + window.pageYOffset - (tooltipElement.offsetHeight >= rect.height ? absHeightDiff / 2 : -1 * (absHeightDiff / 2)), "px,0)");
  };
  const moveToRight = () => {
    tooltipElement.style.transform = "translate3d(".concat(rect.right + window.pageXOffset + tooltipMargin, "px,").concat(rect.top + window.pageYOffset - (tooltipElement.offsetHeight >= rect.height ? absHeightDiff / 2 : -1 * (absHeightDiff / 2)), "px,0)");
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
const Tooltip = _ref => {
  var _POSITION_CLASS_MAP$p;
  let {
    title,
    children,
    position = defaultPosition,
    theme = defaultTheme,
    zIndex = zIndexDefault,
    className
  } = _ref;
  const resolvedTheme = theme === themeAuto && typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') : theme;
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
    const mouseMoveHandler = event => {
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
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/cloneElement(child, {
      ref: mergedRef,
      onMouseOver: handleMouseOver,
      onMouseLeave: handleMouseLeave
    }), (isHover || isNear) && title && portalRef.current && /*#__PURE__*/createPortal(/*#__PURE__*/_jsxs("div", {
      className: "".concat(classes.tooltipContainer, " ").concat((_POSITION_CLASS_MAP$p = POSITION_CLASS_MAP[position]) !== null && _POSITION_CLASS_MAP$p !== void 0 ? _POSITION_CLASS_MAP$p : classes.positionTop).concat(isDark ? " ".concat(classes.tooltipDark) : ''),
      onMouseLeave: () => setIsNear(false),
      children: [/*#__PURE__*/_jsx("span", {
        className: classes.tooltipArrow,
        "aria-hidden": true
      }), /*#__PURE__*/_jsx(Typography, {
        variant: "caption1",
        children: title
      })]
    }), portalRef.current)]
  });
};
Tooltip.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(POSITIONS),
  theme: PropTypes.oneOf(['light', 'dark', 'auto']),
  zIndex: PropTypes.number,
  className: PropTypes.string
};
export default Tooltip;