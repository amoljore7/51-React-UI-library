import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-btn-group {\n  display: inline-flex;\n  gap: 0;\n  border-radius: 0.5rem;\n  overflow: hidden;\n  isolation: isolate;\n}\n.bds-btn-group > button, .bds-btn-group > div > button {\n  border-radius: 0;\n  margin: 0;\n}\n.bds-btn-group > button:first-child, .bds-btn-group > div:first-child > button {\n  border-top-left-radius: 0.5rem;\n  border-bottom-left-radius: 0.5rem;\n}\n.bds-btn-group > button:last-child, .bds-btn-group > div:last-child > button {\n  border-top-right-radius: 0.5rem;\n  border-bottom-right-radius: 0.5rem;\n}\n.bds-btn-group > button:not(:last-child), .bds-btn-group > div:not(:last-child) > button {\n  border-right-width: 0.0625rem;\n  border-right-style: solid;\n}\n\n.bds-btn-group--standard.bds-btn-group--tint > button:not(:last-child), .bds-btn-group--standard.bds-btn-group--tint > div:not(:last-child) > button {\n  border-right-color: var(--theme-text-primary);\n}\n\n.bds-btn-group--standard.bds-btn-group--neutral > button:not(:last-child), .bds-btn-group--standard.bds-btn-group--neutral > div:not(:last-child) > button {\n  border-right-color: var(--theme-text-primary);\n}\n\n.bds-btn-group--toggle > button:not(:last-child), .bds-btn-group--toggle > div:not(:last-child) > button {\n  border-right-color: var(--theme-text-primary);\n}\n\n[data-theme=light] .bds-btn-group--standard.bds-btn-group--tint > button:not(:last-child), [data-theme=light] .bds-btn-group--standard.bds-btn-group--tint > div:not(:last-child) > button {\n  border-right-color: #181143;\n}\n[data-theme=light] .bds-btn-group--standard.bds-btn-group--neutral > button:not(:last-child), [data-theme=light] .bds-btn-group--standard.bds-btn-group--neutral > div:not(:last-child) > button {\n  border-right-color: #cdcdd2;\n}\n[data-theme=light] .bds-btn-group--toggle > button:not(:last-child), [data-theme=light] .bds-btn-group--toggle > div:not(:last-child) > button {\n  border-right-color: #cdcdd2;\n}\n\n[data-theme=dark] .bds-btn-group--standard.bds-btn-group--tint > button:not(:last-child), [data-theme=dark] .bds-btn-group--standard.bds-btn-group--tint > div:not(:last-child) > button {\n  border-right-color: rgba(255, 255, 255, 0.4);\n}\n[data-theme=dark] .bds-btn-group--standard.bds-btn-group--neutral > button:not(:last-child), [data-theme=dark] .bds-btn-group--standard.bds-btn-group--neutral > div:not(:last-child) > button {\n  border-right-color: rgba(255, 255, 255, 0.2);\n}\n[data-theme=dark] .bds-btn-group--toggle.bds-btn-group--tint > button:not(:last-child), [data-theme=dark] .bds-btn-group--toggle.bds-btn-group--tint > div:not(:last-child) > button {\n  border-right-color: rgba(255, 255, 255, 0.4);\n}\n[data-theme=dark] .bds-btn-group--toggle.bds-btn-group--neutral > button:not(:last-child), [data-theme=dark] .bds-btn-group--toggle.bds-btn-group--neutral > div:not(:last-child) > button {\n  border-right-color: rgba(255, 255, 255, 0.2);\n}";
  const fileName = "buttonGroup_buttonGroup_b1a6f94c-0d61-4cb3-bc1b-fb2f36bc6fc3";
  const element = document.querySelector("style[data-sass-component='buttonGroup_buttonGroup_b1a6f94c-0d61-4cb3-bc1b-fb2f36bc6fc3']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import classNames from 'classnames';
import { classes, defaultSize, defaultType, typeStandard, typeToggle, defaultColor, colorTint, colorNeutral } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
const ButtonGroup = _ref => {
  var _childArray$0$props$v;
  let {
    children,
    type = defaultType,
    color = defaultColor,
    onClick,
    size = defaultSize,
    defaultValue
  } = _ref;
  const [selected, setSelected] = useState('');
  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      setSelected(String(defaultValue));
    }
  }, [defaultValue]);
  const isToggle = type === typeToggle;
  const btnGroupClass = classNames(classes.buttonGroup, {
    [classes.standard]: type === typeStandard,
    [classes.toggle]: isToggle,
    [classes.colorTint]: color === colorTint,
    [classes.colorNeutral]: color === colorNeutral
  });
  const handleClick = event => {
    const {
      value
    } = event.currentTarget;
    setSelected(value);
    onClick === null || onClick === void 0 || onClick(value);
  };
  const childArray = React.Children.toArray(children);
  const firstValue = childArray[0] && /*#__PURE__*/React.isValidElement(childArray[0]) ? (_childArray$0$props$v = childArray[0].props.value) !== null && _childArray$0$props$v !== void 0 ? _childArray$0$props$v : 0 : null;
  const effectiveSelected = selected !== '' ? selected : firstValue;
  const getToggled = value => effectiveSelected != null && effectiveSelected === value;
  return /*#__PURE__*/_jsx("div", {
    "data-test-id": "button-group",
    className: btnGroupClass,
    children: React.Children.map(children, (child, index) => {
      var _child$props$value, _child$key;
      if (! /*#__PURE__*/React.isValidElement(child)) return null;
      const value = (_child$props$value = child.props.value) !== null && _child$props$value !== void 0 ? _child$props$value : String(index);
      const baseProps = {
        key: (_child$key = child.key) !== null && _child$key !== void 0 ? _child$key : "btn-".concat(index, "-").concat(value),
        size,
        color
      };
      if (isToggle) {
        baseProps.toggled = getToggled(value);
        baseProps.onClick = handleClick;
        baseProps.value = value;
      }
      return /*#__PURE__*/React.cloneElement(child, baseProps);
    })
  });
};
ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['standard', 'radio']),
  color: PropTypes.oneOf(['tint', 'neutral']),
  onClick: PropTypes.func,
  size: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default ButtonGroup;