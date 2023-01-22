import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { IoChevronDown, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import {
  classes,
  defaultIconSize,
  paginationOptionsPrefix,
  paginationIconSize,
  tabIndex,
  mouseDownEvent,
  paginationRootId,
  selectPageSize,
} from './constants';

export const PaginationBar = ({ paginationModal }) => {
  const {
    pageSizes,
    page,
    pageSize,
    totalLength,
    lastPage,
    onPageChange,
    onPageSizeChange,
  } = paginationModal;
  const [pageNavNextHover, setPageNavNextHover] = useState(false);
  const [pageNavPrevHover, setPageNavPrevHover] = useState(false);

  const fromRow = page * pageSize + 1;
  const toRow = (page + 1) * pageSize > totalLength ? totalLength : (page + 1) * pageSize;
  const onNextPageClick = () => {
    !lastPage && onPageChange(page + 1);
  };
  const onPreviousClick = () => {
    page > 0 && onPageChange(page - 1);
  };

  const pageNavNextClasses = {
    [classes.pageNavigationNext]: true,
    [classes.pageNavigationHover]: pageNavNextHover,
    [classes.pageNavigationDisabled]: lastPage,
  };
  const pageNavPrevClasses = {
    [classes.pageNavigationPrev]: true,
    [classes.pageNavigationHover]: pageNavPrevHover,
    [classes.pageNavigationDisabled]: page === 0,
  };
  return (
    <div className={classes.paginationControls}>
      <PaginationDropdown {...{ pageSizes, pageSize, onPageSizeChange }} />
      <div className={classes.pagesRange}>{`${fromRow}-${toRow}`}</div>
      <div className={classes.pageNavigation}>
        <div
          className={classNames({ ...pageNavPrevClasses })}
          tabIndex={tabIndex}
          onClick={onPreviousClick}
          onMouseOver={() => {
            setPageNavPrevHover(true);
          }}
          onMouseLeave={() => {
            setPageNavPrevHover(false);
          }}
        >
          <IoChevronBack size={defaultIconSize} />
        </div>
        <div
          className={classNames({ ...pageNavNextClasses })}
          tabIndex={tabIndex}
          onClick={onNextPageClick}
          onMouseOver={() => {
            setPageNavNextHover(true);
          }}
          onMouseLeave={() => {
            setPageNavNextHover(false);
          }}
        >
          <IoChevronForward size={defaultIconSize} />
        </div>
      </div>
    </div>
  );
};

export const PaginationDropdown = ({ pageSizes, pageSize, onPageSizeChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [paginationSelectRect, setPaginationSelectRect] = useState();
  const node = useRef();

  const onItemClick = (value) => {
    onPageSizeChange(value);
    setShowOptions(!showOptions);
  };
  const pageSizesHandler = () => {
    setShowOptions(!showOptions);
    const paginationSelect = node.current.getBoundingClientRect();
    setPaginationSelectRect({
      bottom: paginationSelect.bottom,
      left: paginationSelect.left,
      width: paginationSelect.width,
    });
  };

  const toggleOptionsMenu = () => {
    setShowOptions(!showOptions);
  };

  const paginationOptionsProps = {
    pageSizes,
    pageSize,
    paginationSelectRect,
    onItemClick,
    toggleOptionsMenu,
  };
  const paginationDefault = {
    [classes.paginationDefault]: true,
    [classes.paginationOptionsActive]: showOptions,
  };
  return (
    <div className={classes.paginationContainer}>
      <div tabIndex={tabIndex} className={classes.paginationLabel}>
        Show
      </div>
      <div ref={node} className={classNames({ ...paginationDefault })} tabIndex={tabIndex}>
        <div tabIndex={tabIndex} className={classes.paginationDefaultText}>
          {pageSize}
        </div>
        <IoChevronDown
          tabIndex={tabIndex}
          size={paginationIconSize}
          onClick={pageSizesHandler}
          title={selectPageSize}
        />
      </div>
      {showOptions && <PaginationOptions tabIndex={tabIndex} {...paginationOptionsProps} />}
    </div>
  );
};

const PaginationOptions = ({ pageSizes, paginationSelectRect, onItemClick, toggleOptionsMenu }) => {
  const node = useRef();
  const modal = document.createElement('div');
  modal.id = paginationRootId;
  modal.style.width = `${paginationSelectRect.width}px`;

  modal.style.transform = `translate3d(${paginationSelectRect.left + pageXOffset}px, ${
    paginationSelectRect.bottom + pageYOffset
  }px, 0px)`;

  const handleOnBlur = (event) => {
    if (node && !node.current.contains(event.target)) toggleOptionsMenu();
  };

  useEffect(() => {
    document.body.appendChild(modal);
    return () => {
      document.body.removeChild(modal);
    };
  }, []);

  useEffect(() => {
    document.addEventListener(mouseDownEvent, handleOnBlur);
    return () => {
      document.removeEventListener(mouseDownEvent, handleOnBlur);
    };
  }, [node]);

  return ReactDOM.createPortal(
    <div ref={node}>
      {pageSizes.map((value, index) => {
        return (
          <div
            tabIndex={tabIndex}
            className={classes.paginationRest}
            onClick={() => {
              onItemClick(value);
            }}
            key={`${paginationOptionsPrefix}-${index}`}
          >
            {value}
          </div>
        );
      })}
    </div>,
    modal
  );
};
