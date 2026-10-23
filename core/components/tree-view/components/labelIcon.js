function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from 'react';
import classNames from 'classnames';
import Tooltip from '../../tooltip';
import { TreeNodeClasses } from '../constants';
import Folder from '../../../assets/icons/folder.svg?react';
import FolderDisabled from '../../../assets/icons/folder-disabled.svg?react';
import Leaf from '../../../assets/icons/hard-drive.svg?react';
import { renderSvgGraphic } from '../../../utils/renderSvgGraphic';
import { jsx as _jsx } from "react/jsx-runtime";
export const LabelIcon = _ref => {
  let {
    isLeaf,
    iconSource,
    tooltip,
    useDefaultIcon = false,
    onClick,
    disabled = false,
    iconClassName
  } = _ref;
  const iconClasses = {
    [TreeNodeClasses.nodeIcon]: true,
    [TreeNodeClasses.nodeIconCursor]: typeof onClick === 'function'
  };
  const getImageElement = source => renderSvgGraphic(source, {
    className: classNames(_objectSpread({}, iconClasses), iconClassName),
    onClick: () => {
      if (typeof onClick === 'function') onClick();
    },
    role: 'img'
  });
  if (!iconSource && !useDefaultIcon) {
    return null;
  }
  let icon = useDefaultIcon ? isLeaf ? Leaf : Folder : iconSource;
  icon = disabled ? isLeaf ? Leaf : FolderDisabled : icon;
  if (tooltip) {
    return /*#__PURE__*/_jsx("span", {
      "data-testid": "tree-view-icon-tooltip-".concat(tooltip),
      children: /*#__PURE__*/_jsx(Tooltip, {
        title: tooltip,
        position: "bottom",
        children: getImageElement(icon)
      })
    });
  }
  return getImageElement(icon);
};