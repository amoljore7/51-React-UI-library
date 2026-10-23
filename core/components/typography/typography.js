function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from 'react';
import { dataAttributeName, typographyVariants } from './constants';
import PropTypes from 'prop-types';
import { bodyText, code1, heading1, heading2, heading3, heading4, heading5, heading6, heading7, pageSectionHeader, pageTitle, spanTexts } from './typographyTypes';
import { jsx as _jsx } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.typography-code-01 {\n  font-family: \"SourceCodeProRegular\";\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 400;\n  letter-spacing: 0.02rem;\n}\n\n.typography-button-label {\n  font-family: \"OpenSansRegular\";\n  font-size: 0.875rem;\n  line-height: 1.125rem;\n  font-weight: 400;\n  letter-spacing: 0rem;\n}\n\n.typography-label-01 {\n  font-family: \"OpenSansRegular\";\n  font-size: 0.875rem;\n  line-height: 1rem;\n  font-weight: 400;\n  letter-spacing: 0.02rem;\n}\n\n.typography-label-02 {\n  font-family: \"OpenSansRegular\";\n  font-size: 0.875rem;\n  line-height: 1rem;\n  font-weight: 600;\n  letter-spacing: 0.02rem;\n}\n\n.typography-caption-01 {\n  font-family: \"OpenSansRegular\";\n  font-size: 0.875rem;\n  line-height: 1rem;\n  font-weight: 400;\n  letter-spacing: 0.02rem;\n}\n\n.typography-helper-text-01 {\n  font-family: \"OpenSansRegular\";\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 400;\n  letter-spacing: 0.02rem;\n}\n\n.typography-page-title {\n  font-family: \"OpenSansRegular\";\n  font-size: 1.375rem;\n  line-height: 1.625rem;\n  font-weight: 400;\n  letter-spacing: 0rem;\n}\n\n.typography-page-section-header {\n  font-family: \"OpenSansRegular\";\n  font-size: 1.25rem;\n  line-height: 1.625rem;\n  font-weight: 400;\n}\n\n.typography-body-text {\n  font-family: \"OpenSansRegular\";\n  font-size: 1rem;\n  line-height: 1.375rem;\n  font-weight: 400;\n  letter-spacing: 0rem;\n}\n\n.typography-heading-07 {\n  font-family: \"OpenSansRegular\";\n  font-size: 0.875rem;\n  line-height: 1.125rem;\n  font-weight: 600;\n  letter-spacing: 0.01rem;\n}\n\n.typography-heading-06 {\n  font-family: \"OpenSansRegular\";\n  font-size: 1rem;\n  line-height: 1.375rem;\n  font-weight: 600;\n  letter-spacing: 0rem;\n}\n\n.typography-heading-05 {\n  font-family: \"OpenSansRegular\";\n  font-size: 1.25rem;\n  line-height: 1.625rem;\n  font-weight: 400;\n  letter-spacing: 0rem;\n}\n\n.typography-heading-04 {\n  font-family: \"OpenSansRegular\";\n  font-size: 1.75rem;\n  line-height: 2.25rem;\n  font-weight: 400;\n  letter-spacing: 0rem;\n}\n\n.typography-heading-03 {\n  font-family: \"OpenSansRegular\";\n  font-size: 2rem;\n  line-height: 2.5rem;\n  font-weight: 400;\n  letter-spacing: 0rem;\n}\n\n.typography-heading-02 {\n  font-family: \"OpenSansRegular\";\n  font-size: 2.625rem;\n  line-height: 3.125rem;\n  font-weight: 400;\n  letter-spacing: 0rem;\n}\n\n.typography-heading-01 {\n  font-family: \"OpenSansRegular\";\n  font-size: 3.375rem;\n  line-height: 4rem;\n  font-weight: 400;\n  letter-spacing: 0rem;\n}\n\n.typography-button-label,\n.typography-caption-01,\n.typography-helper-text-01,\n.typography-label-01,\n.typography-label-02 {\n  display: block;\n}\n\n.typography-heading-01,\n.typography-heading-02,\n.typography-heading-03,\n.typography-heading-04,\n.typography-heading-05,\n.typography-heading-06,\n.typography-heading-07,\n.typography-page-title,\n.typography-page-section-header,\n.typography-body-text {\n  margin: 0;\n}";
  const fileName = "typography_typography_526f458a-63a0-4cd8-a13a-e92e7cd60f83";
  const element = document.querySelector("style[data-sass-component='typography_typography_526f458a-63a0-4cd8-a13a-e92e7cd60f83']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const Typography = props => {
  const typographyProps = {
    variant: props.variant,
    children: props.children,
    dataAttribute: props[dataAttributeName]
  };
  return /*#__PURE__*/_jsx(TypographyComponent, _objectSpread({}, typographyProps));
};
const TypographyComponent = _ref => {
  let {
    variant,
    children,
    dataAttribute
  } = _ref;
  switch (variant) {
    case typographyVariants.buttonLabel:
    case typographyVariants.label1:
    case typographyVariants.label2:
    case typographyVariants.caption1:
    case typographyVariants.helperText1:
      return spanTexts({
        variant,
        children,
        dataAttribute
      });
    case typographyVariants.bodyText:
      return bodyText({
        children,
        dataAttribute
      });
    case typographyVariants.code1:
      return code1({
        children,
        dataAttribute
      });
    case typographyVariants.pageTitle:
      return pageTitle({
        children,
        dataAttribute
      });
    case typographyVariants.pageSectionHeader:
      return pageSectionHeader({
        children,
        dataAttribute
      });
    case typographyVariants.heading1:
      return heading1({
        children,
        dataAttribute
      });
    case typographyVariants.heading2:
      return heading2({
        children,
        dataAttribute
      });
    case typographyVariants.heading3:
      return heading3({
        children,
        dataAttribute
      });
    case typographyVariants.heading4:
      return heading4({
        children,
        dataAttribute
      });
    case typographyVariants.heading5:
      return heading5({
        children,
        dataAttribute
      });
    case typographyVariants.heading6:
      return heading6({
        children,
        dataAttribute
      });
    case typographyVariants.heading7:
      return heading7({
        children,
        dataAttribute
      });
    default:
      return null;
  }
};
TypographyComponent.propTypes = {
  variant: PropTypes.oneOf(['code1', 'button', 'label1', 'label2', 'caption1', 'helper1', 'pageTitle', 'pageSectionHeader', 'body', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6', 'heading7']).isRequired,
  dataAttribute: PropTypes.string
};
export default Typography;