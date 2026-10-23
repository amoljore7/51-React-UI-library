const _excluded = ["alt"],
  _excluded2 = ["alt"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';

/**
 * Renders an SVG imported with `?react`, a React element, or falls back to img for string URLs.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export function renderSvgGraphic(Graphic, props) {
  if (Graphic == null) return null;
  if (typeof Graphic === 'function') {
    var _rest$ariaLabel;
    const _ref = props || {},
      {
        alt
      } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);
    const label = (_rest$ariaLabel = rest['aria-label']) !== null && _rest$ariaLabel !== void 0 ? _rest$ariaLabel : alt;
    return /*#__PURE__*/_jsx(Graphic, _objectSpread(_objectSpread({}, rest), label != null ? {
      'aria-label': label
    } : {}));
  }
  if (/*#__PURE__*/React.isValidElement(Graphic)) {
    return /*#__PURE__*/React.cloneElement(Graphic, props);
  }
  const _ref2 = props || {},
    {
      alt
    } = _ref2,
    imgProps = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/_jsx("img", _objectSpread({
    src: Graphic,
    alt: alt !== null && alt !== void 0 ? alt : ''
  }, imgProps));
}