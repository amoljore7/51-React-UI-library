function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { recursivePropName, SHOW_ALL, SHOW_SELECTED, TABLE_VIEW, tooltipText, TREE_VIEW, TreeClass } from './constants';
import TreeNodes from './components/treeNodes';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root {\n  --bds-tree-text: var(--theme-text-primary);\n  --bds-tree-node-icon: var(--theme-text-primary);\n}\n\n[data-theme=light] {\n  --bds-tree-text: inherit;\n  --bds-tree-node-icon: inherit;\n}\n\n[data-theme=dark] {\n  --bds-tree-text: var(--theme-text-primary);\n  --bds-tree-node-icon: var(--theme-text-primary);\n}\n\n.tree-view-bounding-container {\n  position: relative;\n  height: 100%;\n  color: var(--bds-tree-text);\n}\n\n.tree-view-container {\n  display: inline-block;\n  height: 100%;\n  width: 100%;\n}\n\n.tree-view-container::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.tree-view-container::-webkit-scrollbar-thumb {\n  background: var(--theme-border);\n  border-radius: 0.625rem;\n}\n\n.tree-view-container::-webkit-scrollbar-thumb:hover {\n  background: var(--theme-border-strong);\n  border-radius: 0.625rem;\n}\n\n.tree-view-filter-container {\n  margin-bottom: 1rem;\n  display: flex;\n  justify-content: space-between;\n}\n\n.tree-view-node-icon {\n  height: 1.25rem;\n  width: 1.25rem;\n  object-fit: contain;\n  color: var(--bds-tree-node-icon);\n}\n.tree-view-node-icon-cursor-pointer {\n  cursor: pointer;\n}";
  const fileName = "tree_treeView_1dab12f9-fa32-496e-9ac1-650a090ab6ce";
  const element = document.querySelector("style[data-sass-component='tree_treeView_1dab12f9-fa32-496e-9ac1-650a090ab6ce']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import Select from '../select';
import TextField from '../textfield';
import ButtonGroup from '../buttonGroup';
import Button from '../button';
import ModalPopup from '../modal-popup/modal-popup';
import SearchIcon from '../../assets/icons/search.svg?react';
import TreeIcon from '../../assets/icons/tree.svg?react';
import TableIcon from '../../assets/icons/list.svg?react';
import { findAndUpdateCheckedStatus, flattenTree, getSelectedItems } from './utils';
import NodesTable from './components/nodesTable';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Tree = _ref => {
  var _tagsPanel$node$label, _tagsPanel$node, _tagsPanel$node2;
  let {
    nodes = {},
    onChange,
    readOnly = false,
    isSelectedDefault = false,
    hideCheckboxes = false,
    hideDropdownFilter = false,
    manageIcon,
    singleSelect = false,
    singleSelectRadio = false,
    allowOnlyLeafSelection = false,
    allowRootSelection = true,
    showCreatedDate = false,
    rootLeafNodesFirst = false,
    showTags = false,
    tagIcon,
    tagIconClassName,
    tagIconTooltip,
    showOnlyTree = false,
    view: viewProp,
    onViewChange,
    content,
    additionalViews = []
  } = _ref;
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(SHOW_ALL);
  const [searchText, setSearchText] = useState('');
  const [view, setView] = useState(TREE_VIEW);
  const [updateCount, setUpdateCount] = useState(0);
  const [tagsPanel, setTagsPanel] = useState({
    open: false,
    node: null
  });
  const isControlled = viewProp !== undefined;
  const activeView = showOnlyTree ? TREE_VIEW : isControlled ? viewProp : view;
  const handleViewChange = value => {
    if (!isControlled) setView(value);
    onViewChange === null || onViewChange === void 0 || onViewChange(value);
  };
  useEffect(() => {
    const flattenedTree = flattenTree(nodes);
    setData(flattenedTree);
    setUpdateCount(updateCount => updateCount + 1);
  }, [JSON.stringify(nodes, (key, value) => /*#__PURE__*/React.isValidElement(value) ? '[element]' : value)]);
  useEffect(() => {
    isSelectedDefault && setFilter(SHOW_SELECTED);
  }, [isSelectedDefault]);
  const handleCheckboxClick = (nodeId, isChecked) => {
    const updatedNodes = findAndUpdateCheckedStatus(nodeId, isChecked, data, singleSelect);
    setData([...updatedNodes]);
    if (typeof onChange === 'function') {
      onChange(getSelectedItems(updatedNodes));
    }
  };
  const handleTagsClick = node => {
    setTagsPanel({
      open: true,
      node
    });
  };
  const closeTagsPanel = () => {
    setTagsPanel({
      open: false,
      node: null
    });
  };
  const treeNodeProps = {
    nodes: data,
    updateCount,
    filter,
    searchText: searchText === null || searchText === void 0 ? void 0 : searchText.toLowerCase(),
    readOnly,
    onChange,
    hideCheckboxes,
    singleSelect,
    singleSelectRadio,
    allowOnlyLeafSelection,
    allowRootSelection,
    rootLeafNodesFirst,
    showTags,
    tagIcon,
    tagIconClassName,
    tagIconTooltip,
    onTagsClick: showTags ? handleTagsClick : undefined
  };
  const tableNodeProps = {
    nodes: data,
    updateCount,
    filter,
    searchText: searchText === null || searchText === void 0 ? void 0 : searchText.toLowerCase(),
    readOnly,
    handleCheckboxClick,
    hideCheckboxes,
    singleSelect,
    singleSelectRadio,
    allowOnlyLeafSelection,
    allowRootSelection,
    showCreatedDate,
    rootLeafNodesFirst,
    showTags
  };
  const activeAdditionalView = additionalViews.find(v => v.value === activeView);
  const shouldHideDropdown = hideDropdownFilter || !!(activeAdditionalView !== null && activeAdditionalView !== void 0 && activeAdditionalView.hideDropdown);
  const renderViewContent = () => {
    if (content) return content;
    if (activeView === TREE_VIEW) return /*#__PURE__*/_jsx(TreeNodes, _objectSpread({}, treeNodeProps));
    if (activeView === TABLE_VIEW) return /*#__PURE__*/_jsx(NodesTable, _objectSpread({}, tableNodeProps));
    if (activeAdditionalView) return activeAdditionalView.content(filter);
    return null;
  };
  return /*#__PURE__*/_jsxs("div", {
    className: TreeClass.boundingContainer,
    children: [/*#__PURE__*/_jsxs("div", {
      className: TreeClass.filterContainer,
      children: [/*#__PURE__*/_jsxs("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        },
        children: [!shouldHideDropdown && /*#__PURE__*/_jsx(Select, {
          width: "180px",
          options: [SHOW_ALL, SHOW_SELECTED],
          onChange: (_, value) => setFilter(value),
          value: filter,
          getOptionLabel: option => option,
          height: "40px"
        }), /*#__PURE__*/_jsx(TextField, {
          width: "200px",
          type: "text",
          value: searchText,
          placeholder: "Search",
          onChange: e => setSearchText(e.target.value),
          icon: /*#__PURE__*/_jsx(SearchIcon, {
            "aria-hidden": true,
            focusable: "false"
          }),
          iconPosition: "left",
          height: "40px"
        }), manageIcon]
      }), /*#__PURE__*/_jsx("div", {
        style: {
          display: 'flex'
        },
        children: !showOnlyTree && /*#__PURE__*/_jsxs(ButtonGroup, {
          type: "radio",
          onClick: handleViewChange,
          size: "large",
          defaultValue: activeView,
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "secondary",
            value: TABLE_VIEW,
            tooltipText: tooltipText.list,
            children: /*#__PURE__*/_jsx(TableIcon, {
              "aria-hidden": true,
              focusable: "false"
            })
          }), /*#__PURE__*/_jsx(Button, {
            variant: "secondary",
            value: TREE_VIEW,
            tooltipText: tooltipText.tree,
            children: /*#__PURE__*/_jsx(TreeIcon, {
              "aria-hidden": true,
              focusable: "false"
            })
          }), additionalViews.map(v => /*#__PURE__*/_jsx(Button, {
            variant: "secondary",
            value: v.value,
            tooltipText: v.tooltipText,
            children: v.icon
          }, v.value))]
        }, activeView)
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: TreeClass.container,
      children: renderViewContent()
    }), showTags && activeView === TREE_VIEW && tagsPanel.open && /*#__PURE__*/_jsx(ModalPopup, {
      title: (_tagsPanel$node$label = (_tagsPanel$node = tagsPanel.node) === null || _tagsPanel$node === void 0 ? void 0 : _tagsPanel$node.label) !== null && _tagsPanel$node$label !== void 0 ? _tagsPanel$node$label : '',
      onCancel: closeTagsPanel,
      width: 400,
      children: /*#__PURE__*/_jsx("div", {
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        },
        children: (_tagsPanel$node2 = tagsPanel.node) === null || _tagsPanel$node2 === void 0 ? void 0 : _tagsPanel$node2.tagContent
      })
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
const nodeShape = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string || PropTypes.number,
  expanded: PropTypes.bool,
  checked: PropTypes.bool,
  highlighted: PropTypes.bool,
  type: PropTypes.oneOf(['node', 'leaf']),
  tags: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool,
  leftIcon: PropTypes.shape({
    icon: PropTypes.any,
    tooltip: PropTypes.string,
    onClick: PropTypes.func
  }),
  rightIcon: PropTypes.shape({
    icon: PropTypes.any,
    tooltip: PropTypes.string,
    onClick: PropTypes.func
  })
};
Tree.propTypes = {
  nodes: PropTypes.shape(_objectSpread(_objectSpread({}, nodeShape), {}, {
    nodes: PropTypes.arrayOf(recursiveShapeType(nodeShape, recursivePropName))
  })).isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  hideCheckboxes: PropTypes.bool,
  isSelectedDefault: PropTypes.bool,
  hideDropdownFilter: PropTypes.bool,
  manageIcon: PropTypes.node,
  singleSelect: PropTypes.bool,
  singleSelectRadio: PropTypes.bool,
  allowOnlyLeafSelection: PropTypes.bool,
  allowRootSelection: PropTypes.bool,
  showCreatedDate: PropTypes.bool,
  rootLeafNodesFirst: PropTypes.bool,
  showTags: PropTypes.bool,
  tagIcon: PropTypes.node,
  tagIconClassName: PropTypes.string,
  tagIconTooltip: PropTypes.string,
  showOnlyTree: PropTypes.bool,
  view: PropTypes.string,
  onViewChange: PropTypes.func,
  content: PropTypes.node,
  additionalViews: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    tooltipText: PropTypes.string,
    content: PropTypes.func.isRequired,
    hideDropdown: PropTypes.bool
  }))
};
export default Tree;