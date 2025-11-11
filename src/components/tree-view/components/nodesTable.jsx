import React, { useState, useEffect } from 'react'
import classNames from 'classnames';
import Table from '../../table'
import Checkbox from '../../checkbox';
import Typography from '../../typography';
import { getDisplayDate, getNodesToRender, prepareDataForTable } from '../utils';
import { SHOW_SELECTED, TreeNodeClasses, asc, unsorted } from '../constants';
import { LabelIcon } from './labelIcon';
import { RadioButton } from '../../radio/radio';

const NodesTable = ({
  nodes,
  updateCount,
  filter,
  searchText,
  readOnly,
  handleCheckboxClick,
  hideCheckboxes,
  singleSelect,
  singleSelectRadio,
  allowOnlyLeafSelection,
  allowRootSelection = true,
  showCreatedDate,
  rootLeafNodesFirst = false,
}) => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const nodesToRender = getNodesToRender([...nodes], singleSelect, rootLeafNodesFirst)
    setTableData(prepareDataForTable(nodesToRender, filter === SHOW_SELECTED, searchText))
  }, [updateCount, filter, searchText])

  const handleSorting = (sortOrder, sortBy) => {
    let sortedNodes = [...nodes]
    if (sortOrder !== unsorted) {
      sortedNodes.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return sortOrder === asc ? 1 : -1
        }

        if (b[sortBy] > a[sortBy]) {
          return sortOrder === asc ? -1 : 1
        }

        return 0
      })
    }

    setTableData(prepareDataForTable(sortedNodes, filter === SHOW_SELECTED, searchText))
  }

  const renderName = row => {
    const isLeaf = row.type === 'leaf'
    const isRowDisable = singleSelect && singleSelectRadio && row?.disabled

    const parentNodeClass = {
      [TreeNodeClasses.tableNameCellContent]: true,
      [TreeNodeClasses.disabledRow]: isRowDisable,
    };
    const textNodeClass = {
      [TreeNodeClasses.parentText]: true,
      [TreeNodeClasses.disabledRow]: isRowDisable,
    }

    return (
      <div className={classNames({ ...parentNodeClass })}>
        {!(hideCheckboxes || singleSelect) && (
          <Checkbox
            checked={row.checked}
            disabled={readOnly || row.disabled}
            indeterminate={row.indeterminate}
            onChange={({ target }) => handleCheckboxClick(row._id, target.checked)}
          />
        )}
        {singleSelectRadio && singleSelect && (
          <RadioButton
            onChange={(event) => {
              handleCheckboxClick(row._id, event.target.checked);
            }}
            selected={row?.checked}
            disabled={row?.disabled}
          />
        )}
        <LabelIcon
          isLeaf={isLeaf}
          iconSource={row?.leftIcon?.icon}
          tooltip={row?.leftIcon?.tooltip}
          useDefaultIcon={row?.leftIcon?.icon ? false : true}
          onClick={row?.leftIcon?.onClick}
          disabled={singleSelect && singleSelectRadio && row?.disabled}
        />
        <div className={classNames({ ...textNodeClass })}>
          <Typography variant={!isLeaf || row.highlighted ? 'label2' : 'label1'}>
            {row.label} {row.highlighted ? '*' : ''}
          </Typography>
        </div>
        <LabelIcon
          iconSource={row?.rightIcon?.icon}
          tooltip={row?.rightIcon?.tooltip}
          onClick={row?.rightIcon?.onClick}
        />
      </div>
    )
  }

  const renderCreatedDate = row => (
    <Typography variant={'label1'}>
      {getDisplayDate(row?.createdDate)}
    </Typography>
  )

  const columns = [
    {
      field: 'label',
      headerName: 'Name',
      sortable: true,
      renderColumn: renderName,
    },
    {
      field: 'path',
      headerName: 'Path',
      sortable: true,
    }
  ]

  if (showCreatedDate) {
    columns.push({
      field: 'createdDate',
      headerName: 'Created Date',
      sortable: true,
      renderColumn: renderCreatedDate
    })
  }

  let rows = tableData
  if (allowOnlyLeafSelection) {
    rows = tableData.filter(data => data.type === 'leaf' || (allowRootSelection && data._id === '0'))
  }

  const singleSelectTableProps = {
    allowRowSelect: true,
    highlightedRow: rows?.find(row => row.checked),
    onRowSelect: clickedRow => {
      if (singleSelect && singleSelectRadio && clickedRow?.disabled) {
        return
      }
      handleCheckboxClick(clickedRow._id, true)
    }
  }

  return (
    <Table
      rows={rows}
      sortHandler={handleSorting}
      columns={columns}
      {...(singleSelect ? singleSelectTableProps : {})}
    />
  )
}

export default NodesTable
