 
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Table from './table'
import { classes, sortIconColors, tableRole } from './constants'
import { classes as statusClasses } from '../status-badge/constants'
describe('Unit tests for table component', () => {
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      sortable: true,
      width: '150px',
      horizontalAlign: 'right',
    },
    {
      field: 'firstName',
      headerName: 'Firstname',
      sortable: true,
      horizontalAlign: 'center',
    },
    {
      field: 'lastName',
      headerName: 'Lastname',
      horizontalAlign: 'left',
    },
    {
      field: 'age',
      headerName: 'Age',
    },
  ]

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 50 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Stark', firstName: 'Arya', age: 16 },
  ]

  const paginationModal = {
    page: 0,
    pageSizes: [10, 50, 100],
    pageSize: 10,
    totalLength: rows.length,
    lastPage: true,
    onPageSizeChange: () => {},
    onPageChange: () => {},
  }
  const props = {
    rows,
    columns,
    sortHandler: () => {},
    paginationModal,
  }

  it('Number of columns match the number of columns provided', () => {
    const { getByRole } = render(<Table {...props} />)
    expect(
      getByRole(tableRole)
        .getElementsByClassName(classes.headerCell),
    ).toHaveLength(columns.length)
  })

  it('Number of rows matches the number of rows provided + 1', () => {
    const { getByRole } = render(<Table {...props} />)
    expect(
      getByRole(tableRole)
        .getElementsByClassName(classes.row),
    ).toHaveLength(rows.length)
  })

  it('Sorting icons are reflected on respective sorting ', () => {
    render(<Table {...props} />)
    /**
     * SortIcon (TableHeaderCell.jsx) renders one stacked up/down chevron
     * pair per header, not three swapped icons with distinct aria-labels —
     * this test previously targeted that older markup (svg[role="img"] with
     * an aria-label) and could never find a match. Sort state now shows as
     * which chevron is colored sortIconColors.active vs .muted.
     */
    const getHeaderIcon = () =>
      document.getElementsByClassName(classes.headerIcon)[0]
    const getChevronColors = () => {
      const [upChevron, downChevron] = getHeaderIcon().querySelectorAll('svg')
      return { up: upChevron.style.color, down: downChevron.style.color }
    }
    const { active, muted } = sortIconColors

    expect(getChevronColors()).toEqual({ up: muted, down: muted })
    expect(getHeaderIcon().className).not.toContain(classes.headerIconSorted)

    fireEvent.click(getHeaderIcon())
    expect(getChevronColors()).toEqual({ up: active, down: muted })
    expect(getHeaderIcon().className).toContain(classes.headerIconSorted)

    fireEvent.click(getHeaderIcon())
    expect(getChevronColors()).toEqual({ up: muted, down: active })
    expect(getHeaderIcon().className).toContain(classes.headerIconSorted)

    fireEvent.click(getHeaderIcon())
    expect(getChevronColors()).toEqual({ up: muted, down: muted })
    expect(getHeaderIcon().className).not.toContain(classes.headerIconSorted)
  })

  it('should render the correct style class for the highlighted row.', () => {
    // highlightedRow is matched by reference, so pass the actual row from
    // `rows` rather than a lookalike literal (rows[9] has identical field
    // values to rows[3] and must not also highlight).
    const highlighted = rows[3]
    const { getAllByTestId } = render(
      <Table {...props} highlightedRow={highlighted} />,
    )

    const highlightedTrElement = getAllByTestId(classes.row)[3]

    // verifying it is the correct row picked.
    expect(highlightedTrElement.children[0].textContent).toEqual(`${highlighted.id}`)

    // Verifying the highlighted classname
    expect(highlightedTrElement.className).toContain(classes.rowHighlighted)

    // rows[9] has identical field values to rows[3] but is a distinct row
    // and must not also highlight (reference equality, not value equality).
    const lookalikeTrElement = getAllByTestId(classes.row)[9]
    expect(lookalikeTrElement.className).not.toContain(classes.rowHighlighted)
  })


  it('should render the correct style class and call the onRowSelect on click, when selecting a row is allowed.', () => {
    const handleRowSelect = vi.fn()
    const { getAllByTestId } = render(
      <Table
        {...props}
        allowRowSelect
        onRowSelect={handleRowSelect}
      />,
    )
    
    const trElement = getAllByTestId(classes.row)[3]
    fireEvent.click(trElement)

    expect(trElement.className).toContain(classes.rowSelectable)
    expect(handleRowSelect).toBeCalledWith({ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 }, expect.anything())
  })

  it('checking a row does not also check another row with identical data, when allowCheckbox is enabled.', () => {
    const duplicateRows = [
      { id: 1, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 1, lastName: 'Stark', firstName: 'Arya', age: 16 },
    ]
    const handleCheckboxChange = vi.fn()
    const { getAllByRole } = render(
      <Table
        {...props}
        rows={duplicateRows}
        allowCheckbox
        onCheckboxChange={handleCheckboxChange}
      />,
    )

    const checkboxes = getAllByRole('checkbox')
    fireEvent.click(checkboxes[1])

    expect(handleCheckboxChange).toHaveBeenCalledWith([duplicateRows[0]])
    expect(checkboxes[1]).toBeChecked()
    expect(checkboxes[2]).not.toBeChecked()
  })

  it('does not re-create the header sticky-offset ResizeObserver when a checkbox is toggled', () => {
    let observerCount = 0
    const disconnectSpy = vi.fn()
    class MockResizeObserver {
      constructor() { observerCount += 1 }
      observe() {}
      disconnect() { disconnectSpy() }
    }
    const originalResizeObserver = global.ResizeObserver
    global.ResizeObserver = MockResizeObserver

    try {
      const { getAllByRole } = render(<Table {...props} allowCheckbox />)
      const observerCountAfterMount = observerCount
      const disconnectCountAfterMount = disconnectSpy.mock.calls.length

      const checkboxes = getAllByRole('checkbox')
      fireEvent.click(checkboxes[1])
      fireEvent.click(checkboxes[2])

      expect(observerCount).toBe(observerCountAfterMount)
      expect(disconnectSpy.mock.calls.length).toBe(disconnectCountAfterMount)
    } finally {
      global.ResizeObserver = originalResizeObserver
    }
  })

  it('keeps a row\'s DOM element following its data, not its position, across a reorder, when getRowId is provided', () => {
    const rowA = { id: 1, lastName: 'Stark', firstName: 'Arya', age: 16 }
    const rowB = { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 }

    const { getAllByTestId, rerender } = render(
      <Table {...props} rows={[rowA, rowB]} getRowId={row => row.id} />,
    )
    const rowAElementBefore = getAllByTestId(classes.row)[0]

    rerender(<Table {...props} rows={[rowB, rowA]} getRowId={row => row.id} />)
    const rowAElementAfter = getAllByTestId(classes.row)[1]

    expect(rowAElementAfter).toBe(rowAElementBefore)
  })

  it('without getRowId, a row is keyed by position, so its DOM element does not follow it across a reorder', () => {
    const rowA = { id: 1, lastName: 'Stark', firstName: 'Arya', age: 16 }
    const rowB = { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 }

    const { getAllByTestId, rerender } = render(
      <Table {...props} rows={[rowA, rowB]} />,
    )
    const rowAElementBefore = getAllByTestId(classes.row)[0]

    rerender(<Table {...props} rows={[rowB, rowA]} />)
    const rowAElementAfter = getAllByTestId(classes.row)[1]

    expect(rowAElementAfter).not.toBe(rowAElementBefore)
  })

  it('keeps expansion state on the row itself, not its position, across a reorder, when getRowId is provided', () => {
    const rowA = { id: 1, lastName: 'Stark', firstName: 'Arya', age: 16 }
    const rowB = { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 }
    const expandableColumns = [
      { ...columns[0], allowExpand: true },
      ...columns.slice(1),
    ]

    const { container, rerender } = render(
      <Table
        {...props}
        columns={expandableColumns}
        rows={[rowA, rowB]}
        getRowId={row => row.id}
        expandedContent={row => <div>Expanded row {row.id}</div>}
      />,
    )

    // Expand rowA, which starts at index 0.
    const expandIconForRowA =
      container.getElementsByClassName(classes.expandRowIcons)[0]
    fireEvent.click(expandIconForRowA)
    expect(container.textContent).toContain('Expanded row 1')

    // Reorder so rowA is now at index 1 — expansion must follow rowA's
    // identity (getRowId), not stay pinned to index 0 (which is now rowB).
    rerender(
      <Table
        {...props}
        columns={expandableColumns}
        rows={[rowB, rowA]}
        getRowId={row => row.id}
        expandedContent={row => <div>Expanded row {row.id}</div>}
      />,
    )

    expect(container.textContent).toContain('Expanded row 1')
    expect(container.textContent).not.toContain('Expanded row 2')
  })

  it('select-all header checkbox checks every row, then unchecking it clears the selection', () => {
    const handleCheckboxChange = vi.fn()
    const { getAllByRole, rerender } = render(
      <Table {...props} allowCheckbox onCheckboxChange={handleCheckboxChange} />,
    )

    const selectAllCheckbox = getAllByRole('checkbox')[0]
    fireEvent.click(selectAllCheckbox)
    expect(handleCheckboxChange).toHaveBeenLastCalledWith(rows)

    // Uncontrolled: re-render with the same props to read back internal state.
    rerender(
      <Table {...props} allowCheckbox onCheckboxChange={handleCheckboxChange} />,
    )
    fireEvent.click(getAllByRole('checkbox')[0])
    expect(handleCheckboxChange).toHaveBeenLastCalledWith([])
  })

  it('handleCheckRow toggles correctly against a controlled checkedRows prop', () => {
    const handleCheckboxChange = vi.fn()
    const { getAllByRole } = render(
      <Table
        {...props}
        allowCheckbox
        checkedRows={[rows[0]]}
        onCheckboxChange={handleCheckboxChange}
      />,
    )

    const checkboxes = getAllByRole('checkbox')
    expect(checkboxes[1]).toBeChecked()
    expect(checkboxes[2]).not.toBeChecked()

    fireEvent.click(checkboxes[2])
    expect(handleCheckboxChange).toHaveBeenCalledWith([rows[0], rows[1]])

    fireEvent.click(checkboxes[1])
    expect(handleCheckboxChange).toHaveBeenCalledWith([])
  })

  it('renders leftToolbarContent before the bulk actions and search bar', () => {
    const { getByTestId, container } = render(
      <Table
        {...props}
        leftToolbarContent={<div data-testid="custom-slot">Custom</div>}
        bulkActions={{ options: [{ label: 'Delete', value: 'delete' }] }}
        searchBar={{ onSearch: () => {} }}
      />,
    )

    const slot = getByTestId('custom-slot')
    expect(slot).toBeInTheDocument()

    const toolbar = container.querySelector(`.${classes.search}`)
    const children = Array.from(toolbar.querySelectorAll(`.${classes.bulkActionsContainer}, [data-testid="custom-slot"]`))
    expect(children[0]).toBe(slot)
  })

  const openColumnDrawer = container => {
    fireEvent.click(container.querySelector(`.${classes.columnCountTrigger}`))
  }

  const hideButtons = () =>
    Array.from(document.querySelectorAll('[title="Hide column"]'))

  it('withdraws the hide control from the last visible column', () => {
    const { container } = render(<Table {...props} />)

    openColumnDrawer(container)
    expect(hideButtons()).toHaveLength(columns.length)

    // Hide every column but one; the survivor must lose its hide control.
    const remaining = columns.length - 1
    for (let index = 0; index < remaining; index += 1) {
      fireEvent.click(hideButtons()[0])
    }

    expect(hideButtons()).toHaveLength(0)
    expect(container.textContent).toContain(`1 of ${columns.length} columns visible`)
  })

  it('offers no hide control at all for a single-column table', () => {
    const { container } = render(<Table {...props} columns={[columns[0]]} />)

    openColumnDrawer(container)
    expect(hideButtons()).toHaveLength(0)
  })

  const actionColumn = actions => [
    ...columns,
    { field: 'actions', headerName: 'Action', isActions: true, width: '80px', actions },
  ]

  it('does not let a table be hidden down to just its action column', () => {
    const [dataColumn, , , , actions] = actionColumn([])
    const { container } = render(
      <Table {...props} columns={[dataColumn, actions]} />,
    )

    openColumnDrawer(container)
    expect(hideButtons()).toHaveLength(0)
  })

  it('resolves a per-row actions function, so an action\'s icon can follow the row', () => {
    const { getAllByTestId } = render(
      <Table
        {...props}
        columns={actionColumn(row => [
          {
            name: 'Toggle',
            tooltip: row.age === null ? 'Age unknown' : 'Toggle',
            icon: <span>{row.age === null ? 'off' : 'on'}</span>,
            onClick: () => {},
          },
        ])}
      />,
    )

    const cellFor = rowIndex =>
      getAllByTestId(classes.row)[rowIndex].querySelector(`.${classes.actionIconBtn}`)

    // rows[4] (Daenerys) is the row with age: null.
    expect(cellFor(0).textContent).toEqual('on')
    expect(cellFor(4).textContent).toEqual('off')
  })

  it('resolves a per-row actions function for the tooltip too', async () => {
    const { getAllByTestId, findByText } = render(
      <Table
        {...props}
        columns={actionColumn(row => [
          {
            name: 'Toggle',
            tooltip: row.age === null ? 'Age unknown' : 'Toggle',
            icon: <span>toggle</span>,
            onClick: () => {},
          },
        ])}
      />,
    )

    const cellFor = rowIndex =>
      getAllByTestId(classes.row)[rowIndex].querySelector(`.${classes.actionIconBtn}`)

    fireEvent.mouseOver(cellFor(0))
    expect(await findByText('Toggle')).toBeInTheDocument()
    fireEvent.mouseLeave(cellFor(0))

    fireEvent.mouseOver(cellFor(4))
    expect(await findByText('Age unknown')).toBeInTheDocument()
  })

  it('shows an action\'s tooltip as a real tooltip on hover, not a native title', () => {
    const { getAllByTestId, queryByText, findByText } = render(
      <Table
        {...props}
        columns={actionColumn([
          { name: 'View', tooltip: 'View permission', icon: <span>view</span> },
        ])}
      />,
    )

    const button = getAllByTestId(classes.row)[0].querySelector(`.${classes.actionIconBtn}`)
    expect(button.getAttribute('title')).toBeNull()
    expect(queryByText('View permission')).not.toBeInTheDocument()

    fireEvent.mouseOver(button)
    return expect(findByText('View permission')).resolves.toBeInTheDocument()
  })

  it('omits an action for a row whose actions function leaves it out', () => {
    const { getAllByTestId } = render(
      <Table
        {...props}
        columns={actionColumn(row =>
          row.age === null
            ? []
            : [{ name: 'View', icon: <span>view</span>, onClick: () => {} }],
        )}
      />,
    )

    const buttonsIn = rowIndex =>
      getAllByTestId(classes.row)[rowIndex].querySelectorAll(`.${classes.actionIconBtn}`)

    expect(buttonsIn(0)).toHaveLength(1)
    expect(buttonsIn(4)).toHaveLength(0)
  })

  it('still accepts a plain actions array', () => {
    const handleActionClick = vi.fn()
    const { getAllByTestId } = render(
      <Table
        {...props}
        columns={actionColumn([
          {
            name: 'View',
            tooltip: 'View',
            icon: <span>view</span>,
            onClick: handleActionClick,
          },
        ])}
      />,
    )

    const button = getAllByTestId(classes.row)[0].querySelector(`.${classes.actionIconBtn}`)

    fireEvent.click(button)
    expect(handleActionClick).toHaveBeenCalledWith(rows[0])
  })
})

describe('Status columns', () => {
  const rows = [
    { id: 1, scanStatus: 'Success' },
    { id: 2, scanStatus: 'Failed' },
  ]

  const statusColumn = overrides => [
    { field: 'id', headerName: 'Id' },
    { field: 'scanStatus', headerName: 'Scan Status', isStatus: true, ...overrides },
  ]

  const badgeIn = (container, rowIndex) =>
    container.querySelectorAll(`.${statusClasses.badge}`)[rowIndex]

  it('renders the cell value as a badge', () => {
    const { container } = render(<Table columns={statusColumn()} rows={rows} />)
    expect(badgeIn(container, 0)).toHaveTextContent('Success')
    expect(badgeIn(container, 1)).toHaveTextContent('Failed')
  })

  it('renders no badge for a row whose status is missing or blank', () => {
    const sparseRows = [
      { id: 1, scanStatus: 'Success' },
      { id: 2, scanStatus: '' },
      { id: 3 },
    ]
    const { container } = render(
      <Table columns={statusColumn()} rows={sparseRows} />,
    )
    expect(container.querySelectorAll(`.${statusClasses.badge}`)).toHaveLength(1)
  })

  it('defaults to the general type when no statusType is given', () => {
    const { container } = render(<Table columns={statusColumn()} rows={rows} />)
    expect(badgeIn(container, 0)).toHaveClass(`${statusClasses.badge}--general`)
  })

  it('applies a static statusType to every row', () => {
    const { container } = render(
      <Table columns={statusColumn({ statusType: 'info' })} rows={rows} />,
    )
    expect(badgeIn(container, 0)).toHaveClass(`${statusClasses.badge}--info`)
    expect(badgeIn(container, 1)).toHaveClass(`${statusClasses.badge}--info`)
  })

  it('resolves a per-row statusType function', () => {
    const { container } = render(
      <Table
        columns={statusColumn({
          statusType: row => (row.scanStatus === 'Success' ? 'success' : 'error'),
        })}
        rows={rows}
      />,
    )
    expect(badgeIn(container, 0)).toHaveClass(`${statusClasses.badge}--success`)
    expect(badgeIn(container, 1)).toHaveClass(`${statusClasses.badge}--error`)
  })

  it('renders an optional icon, resolved per row', () => {
    const { container } = render(
      <Table
        columns={statusColumn({
          statusIcon: row =>
            (row.scanStatus === 'Success'
              ? props => <svg data-testid="ok" {...props} />
              : undefined),
        })}
        rows={rows}
      />,
    )
    expect(badgeIn(container, 0).querySelector('[data-testid="ok"]')).toBeTruthy()
    expect(badgeIn(container, 1).querySelector(`.${statusClasses.icon}`)).toBeNull()
  })

  it('applies statusHeight to the badge', () => {
    const { container } = render(
      <Table columns={statusColumn({ statusHeight: 28 })} rows={rows} />,
    )
    expect(badgeIn(container, 0)).toHaveStyle({ height: '28px' })
  })

  it('renders statusLabel in place of the raw value', () => {
    const { container } = render(
      <Table
        columns={statusColumn({ statusLabel: row => row.scanStatus.toUpperCase() })}
        rows={rows}
      />,
    )
    expect(badgeIn(container, 0)).toHaveTextContent('SUCCESS')
  })

  it('lets a column renderColumn win over isStatus', () => {
    const { container, getByText } = render(
      <Table
        columns={statusColumn({ renderColumn: row => <em>{row.scanStatus}!</em> })}
        rows={rows}
      />,
    )
    expect(getByText('Success!')).toBeInTheDocument()
    expect(container.querySelector(`.${statusClasses.badge}`)).toBeNull()
  })
})
