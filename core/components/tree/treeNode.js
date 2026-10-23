function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { BiChevronRight, BiChevronDown } from 'react-icons/bi';
import { defaultIconSize, leafNodeKey, mousedownEvent, tabIndex, tabIndexNegative, trackingLineInitialWidth, trackingLineRestWidth, trackingLineSeperation, TreeNodeClasses, treeNodeKey } from './constants';
import { AiOutlineFolder } from 'react-icons/ai';
import { BsLock } from 'react-icons/bs';
import OverflowMenu from '../overflow-menu';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.tree-node-parent-node-container:hover {\n  background-color: var(--theme-hover-bg);\n}\n\n.tree-node-parent-node-container {\n  height: 3rem;\n}\n\n.tree-node-container {\n  height: fit-content;\n  min-width: 19rem;\n  width: max-content;\n  position: relative;\n}\n\n.tree-node-container:first-child {\n  margin-left: 0;\n}\n\n.tree-node-tracking-line-container {\n  position: absolute;\n  top: 3rem;\n  z-index: 100;\n  height: calc(100% - 48px);\n  border-left: 0.0625rem solid var(--theme-border);\n}\n\n.tree-node-dir-icon {\n  display: flex;\n  margin-right: 0.5rem;\n  min-width: 1.5rem;\n  min-height: 1.5rem;\n  max-width: 1.5rem;\n  max-height: 1.5rem;\n}\n\n.tree-node-parent-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  min-width: 0;\n  padding: 0.75rem 1rem;\n  height: 3rem;\n  box-sizing: border-box;\n}\n.tree-node-parent-container .tree-node-parent-container-left-wrapper {\n  display: flex;\n  align-items: center;\n}\n.tree-node-parent-container .tree-node-action-item-holder {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.tree-node-parent-icon {\n  margin-right: 0.5rem;\n}\n\n.tree-node-parent-text {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  min-width: 0;\n}\n\n.tree-node-content-box-container:hover {\n  background-color: var(--theme-hover-bg);\n}\n\n.tree-node-content-box {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  min-width: 0;\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  height: 3rem;\n  box-sizing: border-box;\n  padding-left: 3.25rem;\n}\n.tree-node-content-box .tree-node-content-box-left-wrapper {\n  display: flex;\n}\n.tree-node-content-box .tree-node-action-item-holder {\n  width: 1.5rem;\n  height: 1.5rem;\n  margin-right: 0.5rem;\n}\n\n.tree-node-content-box-icon {\n  display: inline-block;\n  margin-right: 0.5rem;\n}\n\n.tree-node-content-box-text {\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.tree-node-content-box-select,\n.tree-node-parent-node-container-select {\n  background-color: var(--theme-hover-bg);\n}\n.tree-node-content-box-select:hover,\n.tree-node-content-box-select :active,\n.tree-node-parent-node-container-select:hover,\n.tree-node-parent-node-container-select :active {\n  background-color: var(--theme-hover-bg);\n}\n\n.tree-node-content-box-icon,\n.tree-node-dir-icon,\n.tree-node-parent-icon {\n  color: var(--theme-border-strong);\n}\n\n.tree-node-content-box-text,\n.tree-node-content-box-text,\n.tree-node-parent-text {\n  color: var(--theme-text-primary);\n  font-family: \"OpenSansRegular\";\n  font-size: 0.875rem;\n  letter-spacing: 0.02rem;\n}\n\n[data-theme=dark] .tree-node-parent-node-container:hover {\n  background-color: rgba(0, 95, 178, 0.25);\n}\n[data-theme=dark] .tree-node-tracking-line-container {\n  border-left-color: var(--theme-border);\n}\n[data-theme=dark] .tree-node-content-box-icon,\n[data-theme=dark] .tree-node-dir-icon,\n[data-theme=dark] .tree-node-parent-icon {\n  color: var(--theme-border-strong);\n}\n[data-theme=dark] .tree-node-content-box-text,\n[data-theme=dark] .tree-node-parent-text {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .tree-node-content-box-select,\n[data-theme=dark] .tree-node-parent-node-container-select {\n  background-color: rgba(0, 95, 178, 0.25);\n}\n[data-theme=dark] .tree-node-content-box-select:hover, [data-theme=dark] .tree-node-content-box-select:active,\n[data-theme=dark] .tree-node-parent-node-container-select:hover,\n[data-theme=dark] .tree-node-parent-node-container-select:active {\n  background-color: rgba(0, 95, 178, 0.25);\n}";
  const fileName = "treeNode_treeNode_08d76b6f-3ba3-444d-921a-3d7b8af592a0";
  const element = document.querySelector("style[data-sass-component='treeNode_treeNode_08d76b6f-3ba3-444d-921a-3d7b8af592a0']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const renderDirectionIcon = expanded => {
  return expanded ? /*#__PURE__*/_jsx(BiChevronDown, {
    size: defaultIconSize
  }) : /*#__PURE__*/_jsx(BiChevronRight, {
    size: defaultIconSize
  });
};
const LeafNode = _ref => {
  let {
    leave,
    level,
    clickHandler,
    parents,
    actionClickHandler,
    selectedItemParents,
    actionItems
  } = _ref;
  const contentBoxRef = useRef();
  const [selected, setSelected] = useState(false);
  const [isHover, setHover] = useState(false);
  useLayoutEffect(() => {
    contentBoxRef.current.style.marginLeft = "".concat(trackingLineInitialWidth + trackingLineRestWidth * level, "px");
  }, []);
  useEffect(() => {
    setSelected(false);
    const nextArrayLength = selectedItemParents === null || selectedItemParents === void 0 ? void 0 : selectedItemParents.length;
    let nextCounter = 0;
    if ((parents === null || parents === void 0 ? void 0 : parents.length) <= (selectedItemParents === null || selectedItemParents === void 0 ? void 0 : selectedItemParents.length)) for (let i = 0; i < nextArrayLength; i++) {
      var _parents$i, _selectedItemParents$;
      if (parents[i] && selectedItemParents[i] && ((_parents$i = parents[i]) === null || _parents$i === void 0 ? void 0 : _parents$i.label) === ((_selectedItemParents$ = selectedItemParents[i]) === null || _selectedItemParents$ === void 0 ? void 0 : _selectedItemParents$.label)) nextCounter++;else break;
    }
    if (nextCounter === nextArrayLength) setSelected(true);
  });
  const leafClass = {
    [TreeNodeClasses.contentBoxContainer]: true,
    [TreeNodeClasses.contentBoxSelect]: selected
  };
  return /*#__PURE__*/_jsx("div", {
    className: classNames(_objectSpread({}, leafClass)),
    onClick: () => {
      clickHandler(parents);
    },
    tabIndex: tabIndex,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: /*#__PURE__*/_jsxs("div", {
      className: TreeNodeClasses.contentBox,
      ref: contentBoxRef,
      tabIndex: tabIndex,
      children: [/*#__PURE__*/_jsxs("div", {
        className: TreeNodeClasses.contentBoxLeftWrapper,
        children: [/*#__PURE__*/_jsx("div", {
          className: TreeNodeClasses.contentBoxIcon,
          children: /*#__PURE__*/_jsx(BsLock, {
            size: defaultIconSize
          })
        }), /*#__PURE__*/_jsx("div", {
          className: TreeNodeClasses.contentBoxText,
          children: /*#__PURE__*/_jsx("span", {
            children: leave.label
          })
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: TreeNodeClasses.actionIconHolder,
        children: isHover && Boolean(actionItems.length) && /*#__PURE__*/_jsx(OverflowMenu, {
          onClick: e => {
            e.stopPropagation();
          },
          options: leave.actionItems,
          getOptionLabel: option => option.title,
          onChange: (event, value) => {
            event.stopPropagation();
            setHover(false);
            actionClickHandler(parents, value);
          }
        })
      })]
    })
  });
};
const ParentNode = _ref2 => {
  let {
    name,
    actionItems,
    expansionHandler,
    expandedItems,
    expanded,
    level,
    parents,
    clickHandler,
    isNodesEmpty,
    isLeavesEmpty,
    actionClickHandler,
    expandIconClickHandler,
    hasChildren,
    selectedItemParents
  } = _ref2;
  const parentRef = useRef();
  const parentContainerRef = useRef();
  const [selected, setSelected] = useState(false);
  const [isHover, setHover] = useState(false);
  useLayoutEffect(() => {
    parentRef.current.style.marginLeft = "".concat(level === 0 ? 0 : trackingLineInitialWidth + trackingLineRestWidth * (level - 1) + trackingLineSeperation, "px");
  }, []);
  useEffect(() => {
    for (let i = 0; i < (expandedItems === null || expandedItems === void 0 ? void 0 : expandedItems.length); i++) {
      var _expandedItems$i;
      if (((_expandedItems$i = expandedItems[i]) === null || _expandedItems$i === void 0 ? void 0 : _expandedItems$i.length) === (parents === null || parents === void 0 ? void 0 : parents.length)) {
        let counter = 0;
        for (let j = 0; j < parents.length; j++) {
          var _expandedItems$i$j, _parents$j;
          if (((_expandedItems$i$j = expandedItems[i][j]) === null || _expandedItems$i$j === void 0 ? void 0 : _expandedItems$i$j.label) !== ((_parents$j = parents[j]) === null || _parents$j === void 0 ? void 0 : _parents$j.label)) break;else counter++;
        }
        if (counter === (parents === null || parents === void 0 ? void 0 : parents.length)) {
          expansionHandler();
          break;
        }
      }
    }
  }, []);
  useEffect(() => {
    setSelected(false);
    const parentsArrayLength = selectedItemParents === null || selectedItemParents === void 0 ? void 0 : selectedItemParents.length;
    let nextCounter = 0;
    if ((parents === null || parents === void 0 ? void 0 : parents.length) <= (selectedItemParents === null || selectedItemParents === void 0 ? void 0 : selectedItemParents.length)) for (let i = 0; i < parentsArrayLength; i++) {
      var _parents$i2, _selectedItemParents$2;
      if (parents[i] && selectedItemParents[i] && ((_parents$i2 = parents[i]) === null || _parents$i2 === void 0 ? void 0 : _parents$i2.label) === ((_selectedItemParents$2 = selectedItemParents[i]) === null || _selectedItemParents$2 === void 0 ? void 0 : _selectedItemParents$2.label)) nextCounter++;else break;
    }
    if (nextCounter === parentsArrayLength) setSelected(true);
  });
  const parentNodeClass = {
    [TreeNodeClasses.parentNodeContainer]: true,
    [TreeNodeClasses.parentNodeContainerSelect]: selected
  };
  const expandIconTabIndex = !(isNodesEmpty() && isLeavesEmpty()) ? tabIndex : tabIndexNegative;
  return /*#__PURE__*/_jsx("div", {
    className: classNames(_objectSpread({}, parentNodeClass)),
    ref: parentContainerRef,
    onClick: () => {
      clickHandler(parents);
    },
    tabIndex: tabIndex,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    children: /*#__PURE__*/_jsxs("div", {
      className: TreeNodeClasses.parentContainer,
      ref: parentRef,
      children: [/*#__PURE__*/_jsxs("div", {
        className: TreeNodeClasses.treeNodeParentContainerLeftWrapper,
        children: [/*#__PURE__*/_jsx("div", {
          className: TreeNodeClasses.dirIconContainer,
          onClick: e => {
            e.stopPropagation();
            expansionHandler();
            expandIconClickHandler && expandIconClickHandler(parents);
          },
          tabIndex: expandIconTabIndex,
          children: hasChildren && renderDirectionIcon(expanded)
        }), /*#__PURE__*/_jsx("div", {
          className: TreeNodeClasses.parentIcon,
          children: /*#__PURE__*/_jsx(AiOutlineFolder, {
            size: defaultIconSize
          })
        }), /*#__PURE__*/_jsx("div", {
          className: TreeNodeClasses.parentText,
          children: name
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: TreeNodeClasses.actionIconHolder,
        children: isHover && Boolean(actionItems.length) && /*#__PURE__*/_jsx(OverflowMenu, {
          onClick: e => {
            e.stopPropagation();
          },
          options: actionItems,
          getOptionLabel: option => option.title,
          onChange: (event, value) => {
            event.stopPropagation();
            setHover(false);
            actionClickHandler(parents, value);
          }
        })
      })]
    })
  });
};
const TreeNode = _ref3 => {
  let {
    nodes,
    level,
    parents,
    clickHandler,
    expandIconClickHandler,
    actionClickHandler,
    selectedItemParents,
    expandedItems
  } = _ref3;
  const [expanded, setExpanded] = useState(false);
  const borderNode = useRef();
  const containerNode = useRef();
  useLayoutEffect(() => {
    if (expanded && (!isLeavesEmpty() || !isNodesEmpty())) {
      borderNode.current.style.left = "".concat(trackingLineInitialWidth + trackingLineRestWidth * level, "px");
    }
  });
  const expansionHandler = () => {
    setExpanded(!expanded);
  };
  const isNodesEmpty = () => {
    return !nodes.nodes || nodes.nodes.length === 0;
  };
  const isLeavesEmpty = () => {
    return !nodes.leaves || nodes.leaves.length === 0;
  };
  const parentNodeProps = {
    name: nodes.label,
    actionItems: nodes.actionItems,
    hasChildren: nodes.hasChildren,
    expansionHandler,
    expandedItems,
    expanded,
    level,
    isNodesEmpty,
    isLeavesEmpty,
    parents: [...parents, _objectSpread({}, nodes)],
    clickHandler,
    actionClickHandler,
    expandIconClickHandler,
    selectedItemParents
  };
  return /*#__PURE__*/_jsxs("div", {
    className: TreeNodeClasses.container,
    ref: containerNode,
    children: [/*#__PURE__*/_jsx(ParentNode, _objectSpread({}, parentNodeProps)), expanded && nodes.nodes && nodes.nodes.map((node, index) => {
      const treeNodeProps = {
        nodes: node,
        level: level + 1,
        parents: [...parents, _objectSpread({}, nodes)],
        clickHandler,
        key: "".concat(treeNodeKey, "-").concat(nodes.label, "-").concat(index),
        actionClickHandler,
        expandIconClickHandler,
        selectedItemParents,
        expandedItems
      };
      return /*#__PURE__*/_jsx(TreeNode, _objectSpread({}, treeNodeProps));
    }), expanded && nodes.leaves && nodes.leaves.map((leave, index) => {
      const leafNodeProps = {
        clickHandler: clickHandler,
        actionItems: leave.actionItems,
        leave: leave,
        level,
        parents: [...parents, _objectSpread({}, nodes), _objectSpread({}, leave)],
        key: "".concat(leafNodeKey, "-").concat(nodes.label, "-").concat(index),
        actionClickHandler,
        selectedItemParents
      };
      return /*#__PURE__*/_jsx(LeafNode, _objectSpread({}, leafNodeProps));
    }), expanded && (!isLeavesEmpty() || !isNodesEmpty()) && /*#__PURE__*/_jsx("div", {
      ref: borderNode,
      className: TreeNodeClasses.trackingLine
    })]
  });
};
export default TreeNode;