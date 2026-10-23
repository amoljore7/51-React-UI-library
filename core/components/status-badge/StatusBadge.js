import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { renderSvgGraphic } from '../../utils/renderSvgGraphic';
import { classes, defaultIconSize, defaultStatusType, statusTypeList } from './constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = "@charset \"UTF-8\";\n:root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n/**\n * Semantic, not structural: a badge's whole job is to signal success/failure,\n * so the hues stay pinned rather than deriving from --theme-*. A custom theme\n * therefore gets the light values, which is why the default block has to cover\n * [data-theme] too \u2014 see CLAUDE.md, \"The three-block convention\".\n */\n:root,\n[data-theme] {\n  --bds-status-badge-success-bg: #e6f6ed;\n  --bds-status-badge-success-text: #004d25;\n  --bds-status-badge-success-border: #cdefdd;\n  --bds-status-badge-error-bg: #fbeeee;\n  --bds-status-badge-error-text: #6f0b06;\n  --bds-status-badge-error-border: #f6d2d0;\n  --bds-status-badge-warning-bg: #fff4db;\n  --bds-status-badge-warning-text: #854600;\n  --bds-status-badge-warning-border: #ffedc7;\n  --bds-status-badge-info-bg: #dbeeff;\n  --bds-status-badge-info-text: #0d3b63;\n  --bds-status-badge-info-border: #bde0ff;\n  --bds-status-badge-general-bg: #f2f2f4;\n  --bds-status-badge-general-text: #0a0b2e;\n  --bds-status-badge-general-border: #cdcdd2;\n}\n\n[data-theme=dark] {\n  --bds-status-badge-success-bg: #004d25;\n  --bds-status-badge-success-text: #8bdab1;\n  --bds-status-badge-success-border: #006832;\n  --bds-status-badge-error-bg: #6f0b06;\n  --bds-status-badge-error-text: #efb2ae;\n  --bds-status-badge-error-border: #ac2720;\n  --bds-status-badge-warning-bg: #854600;\n  --bds-status-badge-warning-text: #fedd9a;\n  --bds-status-badge-warning-border: #b26300;\n  --bds-status-badge-info-bg: #0d3b63;\n  --bds-status-badge-info-text: #61b5ff;\n  --bds-status-badge-info-border: #125087;\n  --bds-status-badge-general-bg: #0a0b2e;\n  --bds-status-badge-general-text: #cdcdd2;\n  --bds-status-badge-general-border: #686979;\n}\n\n.bds-status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  box-sizing: border-box;\n  max-width: 100%;\n  padding: 0.125rem 0.5rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n  font-family: \"OpenSansRegular\";\n  font-size: 0.8125rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.bds-status-badge--success {\n  background-color: var(--bds-status-badge-success-bg);\n  color: var(--bds-status-badge-success-text);\n  border-color: var(--bds-status-badge-success-border);\n}\n.bds-status-badge--error {\n  background-color: var(--bds-status-badge-error-bg);\n  color: var(--bds-status-badge-error-text);\n  border-color: var(--bds-status-badge-error-border);\n}\n.bds-status-badge--warning {\n  background-color: var(--bds-status-badge-warning-bg);\n  color: var(--bds-status-badge-warning-text);\n  border-color: var(--bds-status-badge-warning-border);\n}\n.bds-status-badge--info {\n  background-color: var(--bds-status-badge-info-bg);\n  color: var(--bds-status-badge-info-text);\n  border-color: var(--bds-status-badge-info-border);\n}\n.bds-status-badge--general {\n  background-color: var(--bds-status-badge-general-bg);\n  color: var(--bds-status-badge-general-text);\n  border-color: var(--bds-status-badge-general-border);\n}\n.bds-status-badge__icon {\n  display: inline-flex;\n  flex-shrink: 0;\n  color: inherit;\n}\n.bds-status-badge__label {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}";
  const fileName = "StatusBadge_status-badge_5ee3a635-05ef-4df1-be5d-03c18f1238e3";
  const element = document.querySelector("style[data-sass-component='StatusBadge_status-badge_5ee3a635-05ef-4df1-be5d-03c18f1238e3']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const StatusBadge = _ref => {
  let {
    label,
    type = defaultStatusType,
    icon,
    iconSize = defaultIconSize,
    height,
    className,
    testId
  } = _ref;
  const hasLabel = label !== null && label !== undefined && label !== false && !(typeof label === 'string' && label.trim() === '');
  if (!hasLabel && !icon) return null;
  const iconNode = icon ? renderSvgGraphic(icon, {
    width: iconSize,
    height: iconSize,
    'aria-hidden': true,
    focusable: 'false'
  }) : null;
  return /*#__PURE__*/_jsxs("span", {
    className: classNames(classes.badge, "".concat(classes.badge, "--").concat(type), className),
    style: height ? {
      height
    } : undefined
    // A badge is frequently rendered inside a clamped table cell, where the
    // label can be ellipsised before the row's own More/Less toggle appears.
    ,
    title: typeof label === 'string' ? label : undefined,
    "data-testid": testId,
    children: [iconNode && /*#__PURE__*/_jsx("span", {
      className: classes.icon,
      children: iconNode
    }), hasLabel && /*#__PURE__*/_jsx("span", {
      className: classes.label,
      children: label
    })]
  });
};
StatusBadge.propTypes = {
  label: PropTypes.node,
  type: PropTypes.oneOf(statusTypeList),
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element, PropTypes.string]),
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  testId: PropTypes.string
};
export default StatusBadge;