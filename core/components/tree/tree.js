function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { mousedownEvent, mousemoveEvent, mouseupEvent, recursivePropName, tabIndex, TreeClass } from './constants';
import TreeNode from './treeNode';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.tree-bounding-container {\n  position: relative;\n  height: 100%;\n}\n\n.tree-container {\n  display: inline-block;\n  width: 19rem;\n  height: 100%;\n  overflow: hidden;\n}\n.tree-container:hover {\n  overflow: overlay;\n}\n\n@-moz-document url-prefix() {\n  .tree-container:hover {\n    overflow: auto;\n    scrollbar-color: var(--theme-border);\n  }\n  .tree-container::-webkit-scrollbar {\n    width: 0.5rem;\n    border-radius: 0.625rem;\n  }\n  .tree-container::-webkit-scrollbar-track {\n    background: transparent;\n  }\n  .tree-container::-webkit-scrollbar-thumb {\n    background: var(--theme-border);\n    border-radius: 0.625rem;\n  }\n  .tree-container::-webkit-scrollbar-thumb:hover {\n    background: var(--theme-border-strong);\n    border-radius: 0.625rem;\n  }\n}\n.tree-container::-webkit-scrollbar {\n  width: 0.5rem;\n  border-radius: 0.625rem;\n}\n\n.tree-container::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.tree-container::-webkit-scrollbar-thumb {\n  background: var(--theme-border);\n  border-radius: 0.625rem;\n}\n\n.tree-container::-webkit-scrollbar-thumb:hover {\n  background: var(--theme-border-strong);\n  border-radius: 0.625rem;\n}\n\n.tree-resize-line {\n  display: inline-block;\n  position: absolute;\n  height: 100%;\n  width: 0.125rem;\n  cursor: col-resize;\n  pointer-events: auto;\n  background-color: var(--theme-border);\n  margin-left: 0.0625rem;\n}\n\n.tree-resize-line:hover {\n  background-color: var(--brand);\n  cursor: col-resize;\n  pointer-events: auto;\n}\n\n.tree-resize-line:active {\n  background-color: var(--brand);\n  cursor: col-resize;\n  pointer-events: auto;\n}";
  const fileName = "tree_tree_b268c921-c3f3-477c-821f-8ad1c862daab";
  const element = document.querySelector("style[data-sass-component='tree_tree_b268c921-c3f3-477c-821f-8ad1c862daab']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const Tree = _ref => {
  let {
    nodes,
    clickHandler,
    expandIconClickHandler,
    actionClickHandler,
    topPadding,
    selectedItemParents,
    expandedItems
  } = _ref;
  const container = useRef();
  const resizeLineRef = useRef();
  const resize = event => {
    const Rect = container.current.getBoundingClientRect();
    const trueLeft = Rect.left + window.pageXOffset;
    const width = event.pageX - trueLeft;
    container.current.style.width = parseInt(width) + 'px';
  };
  useLayoutEffect(() => {
    const Rect = container.current.getBoundingClientRect();
    resizeLineRef.current.style.top = window.pageYOffset + Rect.top;
    resizeLineRef.current.style.right = window.pageXOffset + Rect.left;
  }, []);
  useEffect(() => {
    resizeLineRef.current.addEventListener(mousedownEvent, event => {
      const Rect = resizeLineRef.current.getBoundingClientRect();
      const trueRight = Rect.right + window.pageXOffset;
      // add 4 to set a comfortable range for pointer event
      if (event.pageX > trueRight - 4 && event.pageX < trueRight + 4) {
        document.addEventListener(mousemoveEvent, resize, false);
      }
    }, false);
    document.addEventListener(mouseupEvent, () => {
      document.removeEventListener(mousemoveEvent, resize, false);
    });
  }, []);
  const treeNodeProps = {
    nodes,
    level: 0,
    parents: [],
    clickHandler,
    expandIconClickHandler,
    actionClickHandler,
    selectedItemParents,
    expandedItems
  };
  return /*#__PURE__*/_jsxs("div", {
    className: TreeClass.boundingContainer,
    children: [/*#__PURE__*/_jsx("div", {
      ref: container,
      style: {
        paddingTop: topPadding
      },
      className: TreeClass.container,
      tabIndex: tabIndex,
      children: /*#__PURE__*/_jsx(TreeNode, _objectSpread({}, treeNodeProps))
    }), /*#__PURE__*/_jsx("div", {
      className: TreeClass.resize,
      ref: resizeLineRef
    })]
  });
};
const recursiveShapeType = function () {
  let propsType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let recursiveKey = arguments.length > 1 ? arguments[1] : undefined;
  const type = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return PropTypes.shape(propsType).apply(null, args);
  };
  propsType[recursiveKey] = PropTypes.arrayOf(type);
  return type;
};
Tree.propTypes = {
  nodes: PropTypes.shape({
    label: PropTypes.string.isRequired,
    leaves: PropTypes.any,
    hasChildren: PropTypes.bool.isRequired,
    actionItems: PropTypes.any,
    details: PropTypes.any,
    nodes: PropTypes.arrayOf(recursiveShapeType({
      label: PropTypes.string.isRequired,
      leaves: PropTypes.arrayOf(PropTypes.object),
      hasChildren: PropTypes.bool.isRequired,
      actionItems: PropTypes.any,
      details: PropTypes.any
    }, recursivePropName))
  }).isRequired,
  clickHandler: PropTypes.func.isRequired,
  topPadding: PropTypes.string,
  expandIconClickHandler: PropTypes.func.isRequired,
  actionClickHandler: PropTypes.func.isRequired,
  expandedItems: PropTypes.array,
  selectedItemParents: PropTypes.array.isRequired
};
export default Tree;