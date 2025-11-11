import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  recursivePropName,
  SHOW_ALL,
  SHOW_SELECTED,
  tabIndex,
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
import searchIcon from '../../assets/icons/search.svg';
import TreeIcon from '../../assets/icons/tree.svg';
import TreeDarkIcon from '../../assets/icons/tree-dark.svg';
import TableIcon from '../../assets/icons/list.svg';
import TableDarkIcon from '../../assets/icons/list-dark.svg';
import { findAndUpdateCheckedStatus, flattenTree, getSelectedItems } from './utils';
import NodesTable from './components/nodesTable';

const Tree = ({
  nodes = {},
  onChange,
  readOnly = false,
  isSelectedDefault = false,
  hideCheckboxes = false,
  hideDropdownFilter = false,
  singleSelect = false,
  singleSelectRadio = false,
  allowOnlyLeafSelection = false,
  allowRootSelection = true,
  showCreatedDate = false,
  rootLeafNodesFirst = false,
}) => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(SHOW_ALL)
  const [searchText, setSearchText] = useState('')
  const [view, setView] = useState(TREE_VIEW)
  const [updateCount, setUpdateCount] = useState(0)

  useEffect(() => {
    const flattenedTree = flattenTree(nodes)
    setData(flattenedTree)
    setUpdateCount(updateCount => updateCount + 1)
  }, [JSON.stringify(nodes)])

  useEffect(() =>{
    isSelectedDefault && setFilter(SHOW_SELECTED)
  }, [isSelectedDefault])

  const handleCheckboxClick = (nodeId, isChecked) => {
    const updatedNodes = findAndUpdateCheckedStatus(nodeId, isChecked, data, singleSelect)

    setData([...updatedNodes])

    if (typeof onChange === 'function') {
      onChange(getSelectedItems(updatedNodes))
    }
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
  };

  return (
    <div className={TreeClass.boundingContainer}>
      <div
        className={
          hideDropdownFilter
            ? TreeClass.filterContainerWithoutDropdown
            : TreeClass.filterContainer
        }
      >
        {!hideDropdownFilter && (
          <Select
            width="180px"
            options={[SHOW_ALL, SHOW_SELECTED]}
            onChange={(_, value) => setFilter(value)}
            value={filter}
            getOptionLabel={(option) => {
              return option;
            }}
          />
        )}
        <div style={{ display: 'flex' }}>
          <TextField
            width="200px"
            type="text"
            value={searchText}
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            icon={<img src={searchIcon} />}
            iconPosition='left'
          />
          <div style={{ marginLeft: '16px' }}>
            <ButtonGroup
              type="radio"
              onClick={(value) => setView(value)}
              size="large"
              defaultValue={view}
            >
              <Button value={TABLE_VIEW} tooltipText={tooltipText.list}>
                <img src={view === TABLE_VIEW ? TableIcon : TableDarkIcon} />
              </Button>
              <Button value={TREE_VIEW} tooltipText={tooltipText.tree}>
                <img src={view === TREE_VIEW ? TreeIcon : TreeDarkIcon} />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <div
        className={TreeClass.container}
        tabIndex={tabIndex}
      >
        {view === TREE_VIEW ? <TreeNodes {...treeNodeProps} /> : <NodesTable {...tableNodeProps} />}
      </div>
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
  singleSelect: PropTypes.bool,
  singleSelectRadio: PropTypes.bool,
  allowOnlyLeafSelection: PropTypes.bool,
  allowRootSelection: PropTypes.bool,
  showCreatedDate: PropTypes.bool,
  rootLeafNodesFirst: PropTypes.bool,
};

export default Tree;
