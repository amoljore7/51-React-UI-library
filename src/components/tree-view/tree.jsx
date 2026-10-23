import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  recursivePropName,
  SHOW_ALL,
  SHOW_SELECTED,
  TABLE_VIEW,
  tooltipText,
  TREE_VIEW,
  TreeClass,
} from './constants';
import TreeNodes from './components/treeNodes';
import './treeView.scss';
import Select from '../select'
import TextField from '../textfield'
import ButtonGroup from '../buttonGroup'
import Button from '../button'
import ModalPopup from '../modal-popup/modal-popup'
import SearchIcon from '../../assets/icons/search.svg?react';
import TreeIcon from '../../assets/icons/tree.svg?react';
import TableIcon from '../../assets/icons/list.svg?react';
import { findAndUpdateCheckedStatus, flattenTree, getSelectedItems } from './utils';
import NodesTable from './components/nodesTable';

const Tree = ({
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
  additionalViews = [],
}) => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(SHOW_ALL)
  const [searchText, setSearchText] = useState('')
  const [view, setView] = useState(TREE_VIEW)
  const [updateCount, setUpdateCount] = useState(0)
  const [tagsPanel, setTagsPanel] = useState({ open: false, node: null })

  const isControlled = viewProp !== undefined
  const activeView = showOnlyTree ? TREE_VIEW : (isControlled ? viewProp : view)

  const handleViewChange = (value) => {
    if (!isControlled) setView(value)
    onViewChange?.(value)
  }

  useEffect(() => {
    const flattenedTree = flattenTree(nodes)
    setData(flattenedTree)
    setUpdateCount(updateCount => updateCount + 1)
  }, [JSON.stringify(nodes, (key, value) => React.isValidElement(value) ? '[element]' : value)])

  useEffect(() => {
    isSelectedDefault && setFilter(SHOW_SELECTED)
  }, [isSelectedDefault])

  const handleCheckboxClick = (nodeId, isChecked) => {
    const updatedNodes = findAndUpdateCheckedStatus(nodeId, isChecked, data, singleSelect)

    setData([...updatedNodes])

    if (typeof onChange === 'function') {
      onChange(getSelectedItems(updatedNodes))
    }
  }

  const handleTagsClick = (node) => {
    setTagsPanel({ open: true, node })
  }

  const closeTagsPanel = () => {
    setTagsPanel({ open: false, node: null })
  }

  const treeNodeProps = {
    nodes: data,
    updateCount,
    filter,
    searchText: searchText?.toLowerCase(),
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
    onTagsClick: showTags ? handleTagsClick : undefined,
  };

  const tableNodeProps = {
    nodes: data,
    updateCount,
    filter,
    searchText: searchText?.toLowerCase(),
    readOnly,
    handleCheckboxClick,
    hideCheckboxes,
    singleSelect,
    singleSelectRadio,
    allowOnlyLeafSelection,
    allowRootSelection,
    showCreatedDate,
    rootLeafNodesFirst,
    showTags,
  };

  const activeAdditionalView = additionalViews.find((v) => v.value === activeView)
  const shouldHideDropdown = hideDropdownFilter || !!activeAdditionalView?.hideDropdown

  const renderViewContent = () => {
    if (content) return content
    if (activeView === TREE_VIEW) return <TreeNodes {...treeNodeProps} />
    if (activeView === TABLE_VIEW) return <NodesTable {...tableNodeProps} />
    if (activeAdditionalView) return activeAdditionalView.content(filter)
    return null
  }

  return (
    <div className={TreeClass.boundingContainer}>
      <div className={TreeClass.filterContainer}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!shouldHideDropdown && (
            <Select
              width="180px"
              options={[SHOW_ALL, SHOW_SELECTED]}
              onChange={(_, value) => setFilter(value)}
              value={filter}
              getOptionLabel={(option) => option}
              height='40px'
            />
          )}
          <TextField
            width="200px"
            type="text"
            value={searchText}
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            icon={<SearchIcon aria-hidden focusable="false" />}
            iconPosition='left'
            height='40px'
          />
          {manageIcon}
        </div>

        <div style={{ display: 'flex' }}>
          {!showOnlyTree && (
            <ButtonGroup
              key={activeView}
              type="radio"
              onClick={handleViewChange}
              size="large"
              defaultValue={activeView}
            >
              <Button variant="secondary" value={TABLE_VIEW} tooltipText={tooltipText.list}>
                <TableIcon aria-hidden focusable="false" />
              </Button>
              <Button variant="secondary" value={TREE_VIEW} tooltipText={tooltipText.tree}>
                <TreeIcon aria-hidden focusable="false" />
              </Button>
              {additionalViews.map((v) => (
                <Button key={v.value} variant="secondary" value={v.value} tooltipText={v.tooltipText}>
                  {v.icon}
                </Button>
              ))}
            </ButtonGroup>
          )}
        </div>
      </div>
      <div className={TreeClass.container}>
        {renderViewContent()}
      </div>
      {showTags && activeView === TREE_VIEW && tagsPanel.open && (
        <ModalPopup
          title={tagsPanel.node?.label ?? ''}
          onCancel={closeTagsPanel}
          width={400}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tagsPanel.node?.tagContent}
          </div>
        </ModalPopup>
      )}
    </div>
  );
};

const recursiveShapeType = (propsType = {}, recursiveKey) => {
  const type = (...args) => {
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
    onClick: PropTypes.func,
  }),
  rightIcon: PropTypes.shape({
    icon: PropTypes.any,
    tooltip: PropTypes.string,
    onClick: PropTypes.func,
  }),
}

Tree.propTypes = {
  nodes: PropTypes.shape({
    ...nodeShape,
    nodes: PropTypes.arrayOf(
      recursiveShapeType(
        nodeShape,
        recursivePropName
      )
    ),
  }).isRequired,
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
  additionalViews: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      tooltipText: PropTypes.string,
      content: PropTypes.func.isRequired,
      hideDropdown: PropTypes.bool,
    })
  ),
};

export default Tree;
