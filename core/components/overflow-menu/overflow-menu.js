import React from 'react';
import { useRef, useState } from 'react';
import MenuOptions from '../../utils/common-portal/menu-options-container';
import { FiMoreVertical } from 'react-icons/fi';
import { classes, defaultTabIndex, defaultIconSize, defaultWidth } from './constants';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root {\n  --bds-overflow-menu-icon: var(--theme-text-primary);\n  --bds-overflow-menu-icon-disabled: var(--theme-text-placeholder);\n}\n\n[data-theme=light] {\n  --bds-overflow-menu-icon: #040520;\n  --bds-overflow-menu-icon-disabled: #9b9ba6;\n}\n\n[data-theme=dark] {\n  --bds-overflow-menu-icon: var(--theme-text-primary);\n  --bds-overflow-menu-icon-disabled: #686979;\n}\n\n.icon-wrapper {\n  width: fit-content;\n  height: fit-content;\n  cursor: pointer;\n  color: var(--bds-overflow-menu-icon);\n}\n\n.disable-menu {\n  cursor: not-allowed;\n  color: var(--bds-overflow-menu-icon-disabled);\n}\n\n#overflow-menu-options .option {\n  gap: 0;\n}\n#overflow-menu-options .option-icon {\n  margin-right: 0.8rem;\n}\n#overflow-menu-options .option-icon-small {\n  width: auto;\n  height: auto;\n}";
  const fileName = "menu_overflow-menu_dfd28101-bfd1-4878-9345-fc16951f5583";
  const element = document.querySelector("style[data-sass-component='menu_overflow-menu_dfd28101-bfd1-4878-9345-fc16951f5583']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const OverflowMenu = _ref => {
  let {
    options,
    onChange,
    width = defaultWidth,
    getOptionLabel,
    getOptionIcon,
    icon,
    iconSize = defaultIconSize,
    onClick = () => {},
    disabled = false
  } = _ref;
  const [showOptions, setShowOptions] = useState(false);
  const [containerDimension, setContainerDimension] = useState(null);
  const iconRef = useRef();
  const getContainerDimension = () => {
    let rect = iconRef.current.getBoundingClientRect();
    let dimension = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      height: rect.height
    };
    setContainerDimension(dimension);
  };
  const showAllOptions = () => {
    getContainerDimension();
    setShowOptions(!showOptions);
  };
  const clickHandler = e => {
    if (!disabled) {
      onClick && onClick(e);
      showAllOptions();
    }
  };
  const blurHandler = () => {
    setShowOptions(false);
  };
  const selectOption = (event, value) => {
    event.stopPropagation();
    if (!Boolean(value.isDisabled)) {
      setShowOptions(false);
      onChange(event, value);
    }
  };
  const iconKeyDownHandler = event => {
    if (event.code === 'Enter' && !disabled) {
      showAllOptions();
    }
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      "data-testid": 'icon-wrapper',
      className: classNames(classes.iconWrapper, {
        [classes.disableMenu]: disabled
      }),
      ref: iconRef,
      onBlur: blurHandler,
      onClick: clickHandler,
      onKeyDown: iconKeyDownHandler,
      tabIndex: defaultTabIndex,
      children: Boolean(icon) ? icon : /*#__PURE__*/_jsx(FiMoreVertical, {
        size: iconSize
      })
    }), showOptions && /*#__PURE__*/_jsx(MenuOptions, {
      portalContainerId: 'overflow-menu-options',
      options: options,
      getOptionLabel: getOptionLabel,
      getOptionIcon: getOptionIcon,
      containerDimension: containerDimension,
      onChange: selectOption,
      width: width,
      themeSourceRef: iconRef
    })]
  });
};
OverflowMenu.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionIcon: PropTypes.func,
  icon: PropTypes.elementType,
  iconSize: PropTypes.number,
  width: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};
export default OverflowMenu;