import React, { useEffect, useState } from 'react';
import { TreeNodeClasses } from '../constants';
import Node from './node';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root {\n  --bds-tree-disabled-text: var(--theme-text-secondary);\n  --bds-tree-node-select-bg: var(--theme-border-subtle);\n  --bds-tree-dir-icon: var(--theme-border-strong);\n}\n\n[data-theme=light] {\n  --bds-tree-disabled-text: #a8a8a8;\n  --bds-tree-node-select-bg: var(--theme-border-subtle);\n  --bds-tree-dir-icon: inherit;\n}\n\n[data-theme=dark] {\n  --bds-tree-disabled-text: #686979;\n  --bds-tree-node-select-bg: var(--theme-content-bg);\n  --bds-tree-dir-icon: var(--theme-border-strong);\n}\n\n.tree-view-node-parent-node-container {\n  height: 3rem;\n}\n.tree-view-node-parent-node-container-remove-padding {\n  height: unset;\n}\n.tree-view-node-parent-node-container-single-environment-select {\n  width: 100%;\n}\n.tree-view-node-parent-node-container-single-environment-select-checked {\n  background-color: var(--bds-tree-node-select-bg);\n}\n.tree-view-node-parent-node-container-single-environment-select:hover {\n  background-color: var(--bds-tree-node-select-bg);\n  cursor: pointer;\n}\n\n.tree-view-node-container {\n  height: fit-content;\n  min-width: 19rem;\n  position: relative;\n}\n\n.tree-view-node-container:first-child {\n  margin-left: 0;\n}\n\n.tree-view-node-parent-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  min-width: 0;\n  padding: 0.75rem 1rem;\n  height: 3rem;\n  box-sizing: border-box;\n}\n.tree-view-node-parent-container-remove-padding {\n  height: unset;\n  padding: unset;\n}\n.tree-view-node-parent-container .tree-view-node-content {\n  display: flex;\n  align-items: center;\n}\n\n.tree-view-node-parent-icon {\n  margin-right: 0.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.tree-view-node-parent-text {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  min-width: 0;\n  color: var(--theme-text-primary);\n  font-family: \"OpenSansRegular\";\n  font-size: 0.875rem;\n  letter-spacing: 0.02rem;\n  margin-right: 0.5rem;\n}\n\n.tree-view-node-parent-icon {\n  color: var(--theme-border-strong);\n}\n\n.tree-view-node-left-empty-padding {\n  margin-left: 1.5rem;\n}\n\n.tree-view-table-name-cell-content {\n  display: flex;\n  gap: 0.375rem;\n  align-items: center;\n}\n\n.tree-view-node-disabled .tree-view-node-parent-text {\n  color: var(--bds-tree-disabled-text);\n}\n.tree-view-node-disabled .tree-view-node-dir-icon {\n  color: var(--bds-tree-disabled-text);\n}\n.tree-view-node-disabled:hover {\n  background-color: transparent;\n  cursor: not-allowed;\n}\n\n.tree-view-node-restricted {\n  opacity: 0.5;\n}\n.tree-view-node-restricted:hover {\n  background-color: transparent;\n  cursor: not-allowed;\n}\n\n.tree-view-node-badge {\n  display: flex;\n  align-items: center;\n  margin-right: 0.5rem;\n  min-width: 0;\n}\n\n.tree-view-node-dir-icon {\n  color: var(--bds-tree-dir-icon);\n}";
  const fileName = "treeNodes_treeNodes_e52dcc1d-5f05-4107-8608-730e2ec9c9fc";
  const element = document.querySelector("style[data-sass-component='treeNodes_treeNodes_e52dcc1d-5f05-4107-8608-730e2ec9c9fc']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import { findAndUpdateCheckedStatus, getFilteredNodes, getNodesToRender, getSelectedItems, toggleNodeExpansion } from '../utils';
import { jsx as _jsx } from "react/jsx-runtime";
const TreeNodes = _ref => {
  let {
    nodes,
    updateCount,
    filter,
    searchText,
    onChange,
    readOnly,
    hideCheckboxes,
    singleSelect,
    singleSelectRadio,
    allowOnlyLeafSelection,
    allowRootSelection = true,
    rootLeafNodesFirst = false,
    showTags = false,
    tagIcon,
    tagIconTooltip,
    tagIconClassName,
    onTagsClick
  } = _ref;
  const [modifiedNodes, setModifiedNodes] = useState([]);
  const [filteredNodes, setFilteredNodes] = useState([]);
  useEffect(() => {
    setFilteredNodes(getFilteredNodes(modifiedNodes, filter, searchText, singleSelect, rootLeafNodesFirst));
  }, [filter, searchText]);
  useEffect(() => {
    initilalizeNodes();
  }, [updateCount]);
  const handleCheckboxClick = _ref2 => {
    let {
      id,
      checked
    } = _ref2;
    const updatedNodes = findAndUpdateCheckedStatus(id, checked, modifiedNodes, singleSelect);
    updateNodes(updatedNodes);
    if (typeof onChange === 'function') {
      onChange(getSelectedItems(updatedNodes));
    }
  };
  const expandIconClickHandler = nodeId => {
    const updatedNodes = toggleNodeExpansion(modifiedNodes, nodeId);
    updateNodes(updatedNodes);
  };
  const initilalizeNodes = () => {
    const nodesToRender = getNodesToRender([...nodes], singleSelect, rootLeafNodesFirst);
    setModifiedNodes(nodesToRender);
    setFilteredNodes(getFilteredNodes(nodesToRender, filter, searchText, singleSelect, rootLeafNodesFirst));
  };
  const updateNodes = updatedNodes => {
    setModifiedNodes(updatedNodes);
    setFilteredNodes(getFilteredNodes(getNodesToRender(updatedNodes, singleSelect, rootLeafNodesFirst), filter, searchText, singleSelect, rootLeafNodesFirst));
  };
  return /*#__PURE__*/_jsx("div", {
    className: TreeNodeClasses.container,
    children: filteredNodes === null || filteredNodes === void 0 ? void 0 : filteredNodes.map(node => /*#__PURE__*/_jsx(Node, {
      node: node,
      expandIconClickHandler: expandIconClickHandler,
      handleCheckboxClick: handleCheckboxClick,
      readOnly: readOnly,
      hideCheckboxes: hideCheckboxes,
      singleSelect: singleSelect,
      singleSelectRadio: singleSelectRadio,
      allowOnlyLeafSelection: allowOnlyLeafSelection,
      allowRootSelection: allowRootSelection,
      showTags: showTags,
      tagIcon: tagIcon,
      tagIconClassName: tagIconClassName,
      tagIconTooltip: tagIconTooltip,
      onTagsClick: onTagsClick
    }, "tree-node-".concat(node._id)))
  });
};
export default TreeNodes;