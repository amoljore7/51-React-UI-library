import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '../../assets/icons/search.svg';
import FilterFilled from '../../assets/icons/filter-filled.svg';
import FilterOutlined from '../../assets/icons/filter-outlined.svg';
import Typography from '../typography';
import Checkbox from '../checkbox';
import Textfield from '../textfield';
import Button from '../button';
import './table.scss';
import RadioButton from '../radio';

const Filter = ({ options = [], values = [], onApply = () => {}, singleSelector = false }) => {
  const filterRef = useRef();
  const filterIconRef = useRef();
  const [selectedFilterValues, setSelectedFilterValues] = useState([]);
  const [selectedRadioValues, setSelectedRadioValues] = useState('');
  const [searchText, setSearchText] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const searchedData = searchText
    ? options.filter((filter) => filter?.label.toString().toLowerCase().includes(searchText.toLowerCase()))
    : options;

  const showAppliedFilterValues = () => {
    const appliedFilterValues = Array.isArray(values) ? [...values] : [];
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

  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
    showAppliedFilterValues();
  };

  const handleSearchTxt = (e) => {
    setSearchText(e?.target?.value);
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
    var index = columnFilters?.indexOf(filterValue);
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

  return (
    <>
      <div ref={filterIconRef} className="filter-icon">
        {
          <img
            width={22}
            src={values.length > 0 ? FilterFilled : FilterOutlined}
            onClick={toggleOpen}
            alt="filterIcon"
          />
        }
      </div>
      {isOpen && (
        <div ref={filterRef} className="filter-menus">
          <div style={{ margin: 8 }}>
            <Textfield
              placeholder={'Search'}
              icon={<img width={22} src={SearchIcon} />}
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
                  color:
                  selectedFilterValues?.length > 0 || selectedRadioValues?.length > 0 ? '#007bff' : '#BEBEBE',
                  cursor: selectedFilterValues?.length > 0 || selectedRadioValues?.length > 0 ? 'pointer' : 'auto',
                }}
                className="filter-menus-clear-all"
                onClick={() => handleClearAll()}
              >
                <Typography variant="label1">Clear All</Typography>
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
              <div className="filter-menus-filter-menus-list">
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
          <div className="filter-menus-action-btns">
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
        </div>
      )}
    </>
  );
};

Filter.propTypes = {
  options: PropTypes.array.isRequired,
  onApply: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
};

export default Filter;
