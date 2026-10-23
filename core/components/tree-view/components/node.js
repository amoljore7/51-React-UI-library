function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from 'react';
import classNames from 'classnames';
import { BiChevronRight, BiChevronDown } from 'react-icons/bi';
import { defaultIconSize, TreeNodeClasses } from '../constants';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root {\n  --bds-tree-disabled-text: var(--theme-text-secondary);\n  --bds-tree-node-select-bg: var(--theme-border-subtle);\n  --bds-tree-dir-icon: var(--theme-border-strong);\n}\n\n[data-theme=light] {\n  --bds-tree-disabled-text: #a8a8a8;\n  --bds-tree-node-select-bg: var(--theme-border-subtle);\n  --bds-tree-dir-icon: inherit;\n}\n\n[data-theme=dark] {\n  --bds-tree-disabled-text: #686979;\n  --bds-tree-node-select-bg: var(--theme-content-bg);\n  --bds-tree-dir-icon: var(--theme-border-strong);\n}\n\n.tree-view-node-parent-node-container {\n  height: 3rem;\n}\n.tree-view-node-parent-node-container-remove-padding {\n  height: unset;\n}\n.tree-view-node-parent-node-container-single-environment-select {\n  width: 100%;\n}\n.tree-view-node-parent-node-container-single-environment-select-checked {\n  background-color: var(--bds-tree-node-select-bg);\n}\n.tree-view-node-parent-node-container-single-environment-select:hover {\n  background-color: var(--bds-tree-node-select-bg);\n  cursor: pointer;\n}\n\n.tree-view-node-container {\n  height: fit-content;\n  min-width: 19rem;\n  position: relative;\n}\n\n.tree-view-node-container:first-child {\n  margin-left: 0;\n}\n\n.tree-view-node-parent-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  min-width: 0;\n  padding: 0.75rem 1rem;\n  height: 3rem;\n  box-sizing: border-box;\n}\n.tree-view-node-parent-container-remove-padding {\n  height: unset;\n  padding: unset;\n}\n.tree-view-node-parent-container .tree-view-node-content {\n  display: flex;\n  align-items: center;\n}\n\n.tree-view-node-parent-icon {\n  margin-right: 0.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.tree-view-node-parent-text {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  min-width: 0;\n  color: var(--theme-text-primary);\n  font-family: \"OpenSansRegular\";\n  font-size: 0.875rem;\n  letter-spacing: 0.02rem;\n  margin-right: 0.5rem;\n}\n\n.tree-view-node-parent-icon {\n  color: var(--theme-border-strong);\n}\n\n.tree-view-node-left-empty-padding {\n  margin-left: 1.5rem;\n}\n\n.tree-view-table-name-cell-content {\n  display: flex;\n  gap: 0.375rem;\n  align-items: center;\n}\n\n.tree-view-node-disabled .tree-view-node-parent-text {\n  color: var(--bds-tree-disabled-text);\n}\n.tree-view-node-disabled .tree-view-node-dir-icon {\n  color: var(--bds-tree-disabled-text);\n}\n.tree-view-node-disabled:hover {\n  background-color: transparent;\n  cursor: not-allowed;\n}\n\n.tree-view-node-restricted {\n  opacity: 0.5;\n}\n.tree-view-node-restricted:hover {\n  background-color: transparent;\n  cursor: not-allowed;\n}\n\n.tree-view-node-badge {\n  display: flex;\n  align-items: center;\n  margin-right: 0.5rem;\n  min-width: 0;\n}\n\n.tree-view-node-dir-icon {\n  color: var(--bds-tree-dir-icon);\n}";
  const fileName = "node_treeNodes_581d9b3c-c1dd-4ae5-9a70-08ceeb743bc7";
  const element = document.querySelector("style[data-sass-component='node_treeNodes_581d9b3c-c1dd-4ae5-9a70-08ceeb743bc7']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import Checkbox from '../../checkbox';
import Typography from '../../typography';
import { LabelIcon } from './labelIcon';
import { RadioButton } from '../../radio/radio';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DirectionIcon = _ref => {
  let {
    expanded
  } = _ref;
  return expanded ? /*#__PURE__*/_jsx(BiChevronDown, {
    size: defaultIconSize
  }) : /*#__PURE__*/_jsx(BiChevronRight, {
    size: defaultIconSize
  });
};
const Node = _ref2 => {
  var _node$_children, _node$leftIcon, _node$leftIcon2, _node$leftIcon3, _node$leftIcon4, _node$rightIcon, _node$rightIcon2, _node$rightIcon3;
  let {
    node,
    expandIconClickHandler,
    handleCheckboxClick,
    readOnly,
    hideCheckboxes,
    singleSelect = false,
    singleSelectRadio = false,
    allowOnlyLeafSelection = false,
    allowRootSelection = true,
    removeNodePadding = false,
    showTags = false,
    tagIcon,
    tagIconClassName,
    tagIconTooltip,
    onTagsClick
  } = _ref2;
  const isLeaf = node.type === 'leaf';
  const hasChildren = (node === null || node === void 0 || (_node$_children = node._children) === null || _node$_children === void 0 ? void 0 : _node$_children.length) > 0;
  const isRootNode = node._id === '0';
  const isRowDisable = singleSelect && singleSelectRadio && (node === null || node === void 0 ? void 0 : node.disabled);

  // The root node is always selectable.
  const shouldHighlightNode = (isLeaf || allowRootSelection && isRootNode) && singleSelect;
  const parentNodeClass = {
    [TreeNodeClasses.parentNodeContainer]: true,
    [TreeNodeClasses.parentNodeContainerSingleEnvironmentSelect]: allowOnlyLeafSelection ? shouldHighlightNode : singleSelect,
    [TreeNodeClasses.parentNodeContainerSingleEnvironmentSelectChecked]: allowOnlyLeafSelection ? shouldHighlightNode && node.checked : singleSelect && node.checked,
    [TreeNodeClasses.parentNodeContainerRemovePadding]: removeNodePadding,
    [TreeNodeClasses.disabledRow]: isRowDisable,
    [TreeNodeClasses.restrictedRow]: node === null || node === void 0 ? void 0 : node.disabledIcon
  };
  const textNodeClass = {
    [TreeNodeClasses.parentText]: true,
    [TreeNodeClasses.disabledRow]: isRowDisable
  };
  const handleEnvironmentClick = () => {
    if (singleSelect && singleSelectRadio && node !== null && node !== void 0 && node.disabled) {
      return;
    }
    if (!singleSelect) {
      return;
    }
    if (allowOnlyLeafSelection && !isLeaf && !(allowRootSelection && isRootNode)) {
      return;
    }
    handleCheckboxClick({
      id: node._id,
      checked: true
    });
  };
  const renderDirectionalIcon = () => {
    if (hasChildren) {
      return /*#__PURE__*/_jsx("div", {
        "data-testid": "directional-icon-".concat(node._id),
        className: TreeNodeClasses.dirIconContainer,
        onClick: e => {
          e.stopPropagation();
          expandIconClickHandler(node._id);
        },
        children: /*#__PURE__*/_jsx(DirectionIcon, {
          expanded: node.expanded
        })
      });
    }
  };
  return /*#__PURE__*/_jsx("div", {
    "data-testid": "tree-node-".concat(node._id),
    className: classNames(_objectSpread({}, parentNodeClass)),
    style: {
      paddingLeft: "".concat(isLeaf ? (node._depth + 1) * 34 - 9 : node._depth * 34, "px")
    },
    onClick: handleEnvironmentClick,
    children: /*#__PURE__*/_jsx("div", {
      className: "".concat(TreeNodeClasses.parentContainer, " ").concat(removeNodePadding ? TreeNodeClasses.parentContainerRemovePadding : ''),
      children: /*#__PURE__*/_jsxs("div", {
        className: TreeNodeClasses.treeNodeContent,
        children: [!isLeaf ? renderDirectionalIcon() : null, /*#__PURE__*/_jsxs("div", {
          className: "".concat(TreeNodeClasses.parentIcon, " ").concat(!removeNodePadding && !isLeaf && !hasChildren ? TreeNodeClasses.nodeLeftemptyPadding : ''),
          children: [!hideCheckboxes && !singleSelect && /*#__PURE__*/_jsx(Checkbox, {
            name: "checkbox",
            disabled: readOnly || node.disabled,
            checked: node.checked || false,
            indeterminate: node.indeterminate,
            onChange: _ref3 => {
              let {
                target
              } = _ref3;
              handleCheckboxClick({
                id: node._id,
                checked: target.checked
              });
            }
          }), singleSelectRadio && singleSelect && /*#__PURE__*/_jsx(RadioButton, {
            onChange: event => {
              handleCheckboxClick({
                id: node._id,
                checked: event.target.checked
              });
            },
            selected: node === null || node === void 0 ? void 0 : node.checked,
            disabled: node === null || node === void 0 ? void 0 : node.disabled
          }), /*#__PURE__*/_jsx(LabelIcon, {
            isLeaf: isLeaf,
            iconSource: node === null || node === void 0 || (_node$leftIcon = node.leftIcon) === null || _node$leftIcon === void 0 ? void 0 : _node$leftIcon.icon,
            tooltip: node === null || node === void 0 || (_node$leftIcon2 = node.leftIcon) === null || _node$leftIcon2 === void 0 ? void 0 : _node$leftIcon2.tooltip,
            useDefaultIcon: node !== null && node !== void 0 && (_node$leftIcon3 = node.leftIcon) !== null && _node$leftIcon3 !== void 0 && _node$leftIcon3.icon ? false : true,
            onClick: node === null || node === void 0 || (_node$leftIcon4 = node.leftIcon) === null || _node$leftIcon4 === void 0 ? void 0 : _node$leftIcon4.onClick,
            disabled: singleSelect && singleSelectRadio && (node === null || node === void 0 ? void 0 : node.disabled)
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: classNames(_objectSpread({}, textNodeClass)),
          children: /*#__PURE__*/_jsxs(Typography, {
            variant: !isLeaf || node.highlighted ? 'label2' : 'label1',
            children: [node.label, " ", node.highlighted ? '*' : '']
          })
        }), (node === null || node === void 0 ? void 0 : node.badge) && /*#__PURE__*/_jsx("div", {
          className: TreeNodeClasses.nodeBadge,
          children: node.badge
        }), /*#__PURE__*/_jsx(LabelIcon, {
          iconSource: node === null || node === void 0 || (_node$rightIcon = node.rightIcon) === null || _node$rightIcon === void 0 ? void 0 : _node$rightIcon.icon,
          tooltip: node === null || node === void 0 || (_node$rightIcon2 = node.rightIcon) === null || _node$rightIcon2 === void 0 ? void 0 : _node$rightIcon2.tooltip,
          onClick: node === null || node === void 0 || (_node$rightIcon3 = node.rightIcon) === null || _node$rightIcon3 === void 0 ? void 0 : _node$rightIcon3.onClick
        }), showTags && (node === null || node === void 0 ? void 0 : node.tagContent) && /*#__PURE__*/_jsxs("div", {
          style: {
            display: 'flex',
            alignItems: 'center'
          },
          onClick: e => e.stopPropagation(),
          children: [/*#__PURE__*/_jsx(LabelIcon, {
            iconSource: tagIcon,
            iconClassName: tagIconClassName,
            tooltip: tagIconTooltip,
            onClick: () => onTagsClick === null || onTagsClick === void 0 ? void 0 : onTagsClick(node)
          }), node === null || node === void 0 ? void 0 : node.disabledIcon]
        })]
      })
    })
  });
};
export default Node;