function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from 'react';
import classNames from 'classnames';
import { classes, codeAriaLabelledBy, figureRole, headingRole, typographyVariants } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
export const pageTitle = _ref => {
  let {
    children,
    dataAttribute
  } = _ref;
  return /*#__PURE__*/_jsx("h5", {
    role: headingRole,
    className: classes.pageTitle,
    "data-auto-id": dataAttribute,
    children: children
  });
};
export const pageSectionHeader = _ref2 => {
  let {
    children,
    dataAttribute
  } = _ref2;
  return /*#__PURE__*/_jsx("h3", {
    role: headingRole,
    className: classes.pageSectionHeader,
    "data-auto-id": dataAttribute,
    children: children
  });
};
export const heading7 = _ref3 => {
  let {
    children,
    dataAttribute
  } = _ref3;
  return /*#__PURE__*/_jsx("h6", {
    role: headingRole,
    className: classes.heading7,
    "data-auto-id": dataAttribute,
    children: children
  });
};
export const heading6 = _ref4 => {
  let {
    children,
    dataAttribute
  } = _ref4;
  return /*#__PURE__*/_jsx("h4", {
    role: headingRole,
    className: classes.heading6,
    "data-auto-id": dataAttribute,
    children: children
  });
};
export const heading5 = _ref5 => {
  let {
    children,
    dataAttribute
  } = _ref5;
  return /*#__PURE__*/_jsx("h3", {
    role: headingRole,
    className: classes.heading5,
    "data-auto-id": dataAttribute,
    children: children
  });
};
export const heading4 = _ref6 => {
  let {
    children,
    dataAttribute
  } = _ref6;
  return /*#__PURE__*/_jsx("h2", {
    role: headingRole,
    className: classes.heading4,
    "data-auto-id": dataAttribute,
    children: children
  });
};
export const heading3 = _ref7 => {
  let {
    children,
    dataAttribute
  } = _ref7;
  return /*#__PURE__*/_jsx("h1", {
    role: headingRole,
    className: classes.heading3,
    "data-auto-id": dataAttribute,
    children: children
  });
};
export const heading2 = _ref8 => {
  let {
    children,
    dataAttribute
  } = _ref8;
  return /*#__PURE__*/_jsx("h1", {
    role: headingRole,
    className: classes.heading2,
    "data-auto-id": dataAttribute,
    children: children
  });
};
export const heading1 = _ref9 => {
  let {
    children,
    dataAttribute
  } = _ref9;
  return /*#__PURE__*/_jsx("h1", {
    role: headingRole,
    className: classes.heading1,
    "data-auto-id": dataAttribute,
    children: children
  });
};
export const code1 = _ref0 => {
  let {
    children,
    dataAttribute
  } = _ref0;
  return /*#__PURE__*/_jsx("code", {
    role: figureRole,
    "aria-labelledby": codeAriaLabelledBy,
    className: classes.code1,
    "data-auto-id": dataAttribute,
    children: children
  });
};
export const bodyText = _ref1 => {
  let {
    children,
    dataAttribute
  } = _ref1;
  return /*#__PURE__*/_jsx("p", {
    className: classes.bodyText,
    "data-auto-id": dataAttribute,
    children: children
  });
};
export const spanTexts = _ref10 => {
  let {
    variant,
    children,
    dataAttribute
  } = _ref10;
  const {
    buttonLabel,
    label1,
    label2,
    caption1,
    helperText1
  } = typographyVariants;
  const labelClasses = {
    [classes.buttonLabel]: variant === buttonLabel,
    [classes.label1]: variant === label1,
    [classes.label2]: variant === label2,
    [classes.caption1]: variant === caption1,
    [classes.helperText1]: variant === helperText1
  };
  const spanTitle = () => {
    if (typeof children === 'string') {
      return children;
    }
    return '';
  };
  return /*#__PURE__*/_jsx("span", {
    className: classNames(_objectSpread({}, labelClasses)),
    "data-auto-id": dataAttribute,
    title: spanTitle(),
    children: children
  });
};