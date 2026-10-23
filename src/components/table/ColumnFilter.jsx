import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import SearchIcon from '../../assets/icons/search.svg?react';
import FilterFilled from '../../assets/icons/filter-filled.svg?react';
import FilterOutlined from '../../assets/icons/filter-outlined.svg?react';
import Typography from '../typography';
import Checkbox from '../checkbox';
import Textfield from '../textfield';
import { classes, filterIconSize, filterMenuWidth } from './constants';
import Button from '../button';
import './table.scss';
import RadioButton from '../radio';
import { mountPortalRootWithThemeSync } from '../../utils/resolve-portal-data-theme';

// Minimum gap kept between the panel and either viewport edge.
const EDGE_MARGIN = 8;

const Filter = ({
  options = [],
  values = [],
  onApply = () => {},
  singleSelector = false,
  onSearch,
  width = filterMenuWidth,
}) => {
  const filterRef = useRef();
  const filterIconRef = useRef();
  const [selectedFilterValues, setSelectedFilterValues] = useState([]);
  const [selectedRadioValues, setSelectedRadioValues] = useState('');
  const [searchText, setSearchText] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);
  /**
   * Created once per instance; portaled to document.body while open so the
   * panel escapes the table's own overflow: auto clipping.
   */
  const [portalEl] = useState(() => document.createElement('div'));
  const searchedData = searchText && typeof onSearch !== 'function'
    ? options.filter((filter) => filter?.label?.toString().toLowerCase().includes(searchText.toLowerCase()))
    : options;

  const showAppliedFilterValues = () => {
    const appliedFilterValues = Array.isArray(values) ? [...values] : [];
    if (singleSelector) {
      if (typeof values === "string") {
        setSelectedRadioValues(values);
      } else if (Array.isArray(values) && values.length === 1) {
        setSelectedRadioValues(values[0]);
      } else {
        setSelectedRadioValues('');
      }
      return;
    }
    // The list of already applied filter menus
    const filters = Array.isArray(selectedFilterValues) ? [...selectedFilterValues] : [];
    // The list of filter menus which is selected but not yet applied

    // To display the list of already applied filters on opening the filter
    if (filters?.length !== 0) {
      const finalFilters = filters?.filter((data) =>
        appliedFilterValues?.includes(data)
      );
      setSelectedFilterValues([...finalFilters]);
    } else {
      // To resume already applied filters after clearing all the values and cancelling the same
      setSelectedFilterValues([...appliedFilterValues]);
    }
  };

  /**
   * Opens rightward from the trigger by default, flips to align with the
   * trigger's right edge if that would overflow, then clamps left/right to
   * the table's own bounds (falling back to the viewport if the trigger
   * isn't inside one) so the panel doesn't spill past the table horizontally.
   * Height is clamped to the viewport, not the table: the panel is portaled
   * to document.body specifically to escape the table's own overflow: auto
   * clipping, so a short table (few rows) shouldn't also cap the panel's
   * height down to whatever sliver of table remains below the trigger —
   * there's a whole page below the table for it to render into.
   */
  const computeMenuPosition = () => {
    const rect = filterIconRef.current.getBoundingClientRect();
    const tableRect = filterIconRef.current.closest('.bds-table-container')?.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    const boundsLeft = tableRect?.left ?? EDGE_MARGIN;
    const boundsRight = tableRect?.right ?? vw - EDGE_MARGIN;
    const boundsBottom = vh - EDGE_MARGIN;

    const menuWidth = Math.min(parseInt(width, 10) || 0, boundsRight - boundsLeft - EDGE_MARGIN * 2);
    let left = rect.left + menuWidth > boundsRight - EDGE_MARGIN ? rect.right - menuWidth : rect.left;
    left = Math.min(Math.max(left, boundsLeft + EDGE_MARGIN), boundsRight - menuWidth - EDGE_MARGIN);

    const top = rect.bottom;
    const maxHeight = Math.max(boundsBottom - top, 0);
    setMenuPosition({ top, left, width: menuWidth, maxHeight });
  };

  const toggleOpen = (e) => {
    e.stopPropagation();
    const next = !isOpen;
    if (next) computeMenuPosition();
    setIsOpen(next);
    showAppliedFilterValues();
  };

  /**
   * Mounts the portal root to document.body only while the panel is open,
   * mirroring the trigger's data-theme so the portaled panel themes
   * correctly outside the table's own themed subtree.
   */
  useEffect(() => {
    if (!isOpen) return;
    return mountPortalRootWithThemeSync(portalEl, filterIconRef);
  }, [isOpen, portalEl]);

  /**
   * Re-anchors the panel to the trigger on scroll or window resize. Scroll
   * matters when the table header isn't sticky — the trigger moves with the
   * page in that case, but the panel is position: fixed and wouldn't
   * otherwise follow it. Capture phase so scroll also catches an ancestor
   * container, not just window/document. Resize matters independently of
   * scroll position — e.g. the browser window or an ancestor's width
   * changing reflows the trigger without any scroll event firing at all,
   * leaving a stale panel position until the next scroll.
   */
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('scroll', computeMenuPosition, true);
    window.addEventListener('resize', computeMenuPosition);
    return () => {
      window.removeEventListener('scroll', computeMenuPosition, true);
      window.removeEventListener('resize', computeMenuPosition);
    };
  }, [isOpen]);

  const handleSearchTxt = (e) => {
    setSearchText(e?.target?.value);

    if (typeof onSearch === 'function') {
      onSearch(e?.target?.value);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchText(null);
    showAppliedFilterValues();
  };

  const handleApply = (e) => {
    e.stopPropagation();
    if(singleSelector){
      onApply(selectedRadioValues)
    }else {
      const filterValues = [...selectedFilterValues];
      onApply(filterValues);
    }
    setIsOpen(false);
    setSearchText(null);
  };

  const handleColumnFilterValues = (event, filterValue) => {
    event.stopPropagation();
    const columnFilters = [...selectedFilterValues];
    // To store filter values based on column-name
    const index = columnFilters?.indexOf(filterValue);
    if (index !== -1) {
      columnFilters?.splice(index, 1);
    } else {
      columnFilters?.push(filterValue);
    }
    setSelectedFilterValues(columnFilters);
  };

  const handleColumnRadioFilterValues = (event) => {
    event.stopPropagation();
    setSelectedRadioValues(event.target.value)
  }

  const handleClearAll = () => {
    setSelectedFilterValues([]);
    setSelectedRadioValues('');
  };

  const handleClickOutsideOfFilter = (event) => {
    // To close the filter if user clicks anywhere outside the filter menus and filter icon
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target) &&
      filterIconRef &&
      !filterIconRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideOfFilter, true);
    return () => {
      document.removeEventListener('click', handleClickOutsideOfFilter, true);
    };
  }, []);

  const hasAppliedValues = Array.isArray(values)
    ? values.length > 0
    : values !== null && values !== undefined && values !== '';
  const FilterIcon = hasAppliedValues ? FilterFilled : FilterOutlined;

  return (
    <>
      <div ref={filterIconRef} className="filter-icon">
        <FilterIcon
          width={filterIconSize}
          height={filterIconSize}
          onClick={toggleOpen}
          onMouseDown={(e) => e.stopPropagation()}
          aria-label="filterIcon"
          role="img"
        />
      </div>
      {/* menuPosition gates the first paint until computeMenuPosition has run, avoiding a flash at the default (0,0) position */}
      {isOpen && menuPosition && createPortal(
        <div
          ref={filterRef}
          className="filter-menus"
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
            width: menuPosition.width,
            maxHeight: menuPosition.maxHeight,
            overflowY: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="filter-menus-search">
            <Textfield
              placeholder={'Search'}
              icon={<SearchIcon width={22} aria-hidden focusable="false" />}
              iconPosition="left"
              width="100%"
              onChange={handleSearchTxt}
              value={searchText || ''}
            />
          </div>
          <hr className="filter-menus-menu-divider" />
          <div className="filter-menus-filter-list">
            {searchedData && searchedData?.length !== 0 && (
              <div
                style={{
                  cursor: selectedFilterValues?.length > 0 || selectedRadioValues?.length > 0 ? 'pointer' : 'auto',
                }}
                className="filter-menus-clear-all"
                onClick={() => handleClearAll()}
              >
                <span
                  className="filter-menus-clear-all-label"
                  style={{
                    color: selectedFilterValues?.length > 0 || selectedRadioValues?.length > 0
                      ? 'var(--bds-table-clear-all-active-color)'
                      : 'var(--bds-table-clear-all-disabled-color)',
                  }}
                >
                  Clear All
                </span>
              </div>
            )}
            {searchedData?.length === 0 && (
              <div className="filter-menus-no-data-found">
                <Typography variant="label1">No match is found</Typography>
              </div>
            )}
            {!singleSelector ?
              searchedData?.map((filter) => {
                return (
                  <div
                    key={filter?.value}
                    className="filter-menus-filter-menus-list"
                  >
                    <Checkbox
                      checked={selectedFilterValues?.includes(filter?.value)}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(event) => {
                        event.stopPropagation();
                        handleColumnFilterValues(event, filter?.value);
                      }}
                      name={filter?.label}
                      label={filter?.label}
                    />
                  </div>
                );
              }) : (
              <div
                className="filter-menus-filter-menus-list"
                onClick={(e) => e.stopPropagation()}
              >
                <RadioButton
                  direction="vertical"
                  options={searchedData.map((filter) => ({
                    value: filter.value,
                    label: filter.label,
                  }))}
                  defaultValue={selectedRadioValues}
                  onChange={(event) => {
                    event.stopPropagation();
                    handleColumnRadioFilterValues(event);
                  }}
                />
              </div>
            )}
          </div>
          <hr className="filter-menus-menu-divider" />
          <div className="filter-menus-action-btns" onClick={(e) => e.stopPropagation()}>
            <Button
              onClick={() => handleClose()}
              variant="secondary"
              className="btn btn-light buttons"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={(e) => handleApply(e)}
              className="filter-menus-apply-buttons"
            >
              Apply
            </Button>
          </div>
        </div>,
        portalEl
      )}
    </>
  );
};

Filter.propTypes = {
  options: PropTypes.array.isRequired,
  onApply: PropTypes.func.isRequired,
  values: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
  singleSelector: PropTypes.bool,
  onSearch: PropTypes.func,
  width: PropTypes.string,
};

export default Filter;
