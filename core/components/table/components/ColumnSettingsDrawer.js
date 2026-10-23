function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiLock } from 'react-icons/fi';
import DragAndDrop from '../../../assets/icons/drag-and-drop.svg?react';
import EyeIcon from '../../../assets/icons/eye.svg?react';
import EyeHiddenIcon from '../../../assets/icons/eye-hidden.svg?react';
import PinIcon from '../../../assets/icons/pin.svg?react';
import UnpinIcon from '../../../assets/icons/unpin.svg?react';
import ModalPopup from '../../modal-popup';
import { classes, columnDrawerFixedSectionText, columnDrawerPinnedSectionText, columnDrawerReorderSectionText, columnDrawerResetText, columnDrawerTitleText, showAllColumnsText } from '../constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const RowActions = _ref => {
  let {
    column,
    toggleVisibility,
    togglePin
  } = _ref;
  return /*#__PURE__*/_jsxs("span", {
    className: classes.columnDrawerRowActions,
    children: [column.hideLocked ? /*#__PURE__*/_jsx("span", {
      className: classes.columnDrawerRowActionDisabled,
      children: /*#__PURE__*/_jsx(EyeHiddenIcon, {
        width: 16,
        height: 16
      })
    }) : column.canHide === false ? null : /*#__PURE__*/_jsx("button", {
      type: "button",
      className: classes.columnDrawerRowActionButton,
      onClick: () => toggleVisibility(column.columnKey),
      title: column.hidden ? 'Show column' : 'Hide column',
      children: column.hidden ? /*#__PURE__*/_jsx(EyeIcon, {
        width: 16,
        height: 16
      }) : /*#__PURE__*/_jsx(EyeHiddenIcon, {
        width: 16,
        height: 16
      })
    }), column.pinLocked ? /*#__PURE__*/_jsx("span", {
      className: classes.columnDrawerRowActionDisabled,
      children: /*#__PURE__*/_jsx(PinIcon, {
        width: 16,
        height: 16
      })
    }) : /*#__PURE__*/_jsx("button", {
      type: "button",
      className: classes.columnDrawerRowActionButton,
      onClick: () => togglePin(column.columnKey, 'left'),
      title: column.pinned ? 'Unpin column' : 'Pin column',
      children: column.pinned ? /*#__PURE__*/_jsx(UnpinIcon, {
        width: 16,
        height: 16
      }) : /*#__PURE__*/_jsx(PinIcon, {
        width: 16,
        height: 16
      })
    })]
  });
};
const PinnedRow = _ref2 => {
  let {
    column,
    toggleVisibility,
    togglePin
  } = _ref2;
  return /*#__PURE__*/_jsxs("div", {
    className: classNames(classes.columnDrawerRow, {
      [classes.columnDrawerRowHidden]: column.hidden
    }),
    children: [/*#__PURE__*/_jsx("span", {
      className: classes.columnDrawerLockIcon,
      children: column.pinLocked ? /*#__PURE__*/_jsx(FiLock, {
        size: 14
      }) : /*#__PURE__*/_jsx(PinIcon, {
        width: 14,
        height: 14
      })
    }), /*#__PURE__*/_jsx("span", {
      className: classes.columnDrawerRowLabel,
      children: column.headerName
    }), /*#__PURE__*/_jsx(RowActions, {
      column: column,
      toggleVisibility: toggleVisibility,
      togglePin: togglePin
    })]
  });
};
const FixedRow = _ref3 => {
  let {
    column
  } = _ref3;
  return /*#__PURE__*/_jsxs("div", {
    className: classes.columnDrawerRow,
    children: [/*#__PURE__*/_jsx("span", {
      className: classes.columnDrawerLockIcon,
      children: /*#__PURE__*/_jsx(FiLock, {
        size: 14
      })
    }), /*#__PURE__*/_jsx("span", {
      className: classes.columnDrawerRowLabel,
      children: column.headerName
    })]
  });
};
const DraggableRow = _ref4 => {
  let {
    column,
    toggleVisibility,
    togglePin
  } = _ref4;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.columnKey
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return /*#__PURE__*/_jsxs("div", {
    ref: setNodeRef,
    style: style,
    className: classNames(classes.columnDrawerRow, {
      [classes.columnDrawerRowDragging]: isDragging,
      [classes.columnDrawerRowHidden]: column.hidden
    }),
    children: [/*#__PURE__*/_jsx("span", _objectSpread(_objectSpread(_objectSpread({
      className: classes.columnDrawerDragHandle
    }, attributes), listeners), {}, {
      children: /*#__PURE__*/_jsx(DragAndDrop, {
        "aria-hidden": true,
        focusable: "false"
      })
    })), /*#__PURE__*/_jsx("span", {
      className: classes.columnDrawerRowLabel,
      children: column.headerName
    }), /*#__PURE__*/_jsx(RowActions, {
      column: column,
      toggleVisibility: toggleVisibility,
      togglePin: togglePin
    })]
  });
};
const ColumnSettingsDrawer = _ref5 => {
  let {
    isOpen,
    onClose,
    orderedColumns,
    toggleVisibility,
    togglePin,
    reorderField,
    resetAll,
    showAll
  } = _ref5;
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5
    }
  }), useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  }));
  if (!isOpen) return null;
  const fixedColumns = orderedColumns.filter(column => column.hideLocked);
  const pinnedColumns = orderedColumns.filter(column => column.pinned && !column.hideLocked);
  const reorderableColumns = orderedColumns.filter(column => !column.pinned && !column.hideLocked);
  const handleDragEnd = event => {
    const {
      active,
      over
    } = event;
    if (!over || active.id === over.id) return;
    reorderField(active.id, over.id);
  };
  const buttons = [{
    text: columnDrawerResetText,
    variant: 'secondary',
    size: 'small',
    onClick: resetAll
  }, {
    text: showAllColumnsText,
    variant: 'secondary',
    size: 'small',
    onClick: showAll,
    disabled: !orderedColumns.some(column => column.hidden),
    testId: 'column-drawer-show-all'
  }];
  return /*#__PURE__*/_jsx(ModalPopup, {
    title: columnDrawerTitleText,
    onCancel: onClose,
    width: 360,
    buttons: buttons,
    children: /*#__PURE__*/_jsxs("div", {
      className: classes.columnDrawerBody,
      children: [Boolean(pinnedColumns.length) && /*#__PURE__*/_jsxs("div", {
        className: classes.columnDrawerSection,
        children: [/*#__PURE__*/_jsx("div", {
          className: classes.columnDrawerSectionTitle,
          children: columnDrawerPinnedSectionText
        }), pinnedColumns.map(column => /*#__PURE__*/_jsx(PinnedRow, {
          column: column,
          toggleVisibility: toggleVisibility,
          togglePin: togglePin
        }, column.columnKey))]
      }), Boolean(reorderableColumns.length) && /*#__PURE__*/_jsxs("div", {
        className: classes.columnDrawerSection,
        children: [/*#__PURE__*/_jsx("div", {
          className: classes.columnDrawerSectionTitle,
          children: columnDrawerReorderSectionText
        }), /*#__PURE__*/_jsx(DndContext, {
          sensors: sensors,
          collisionDetection: closestCenter,
          onDragEnd: handleDragEnd,
          children: /*#__PURE__*/_jsx(SortableContext, {
            items: reorderableColumns.map(column => column.columnKey),
            strategy: verticalListSortingStrategy,
            children: reorderableColumns.map(column => /*#__PURE__*/_jsx(DraggableRow, {
              column: column,
              toggleVisibility: toggleVisibility,
              togglePin: togglePin
            }, column.columnKey))
          })
        })]
      }), Boolean(fixedColumns.length) && /*#__PURE__*/_jsxs("div", {
        className: classes.columnDrawerSection,
        children: [/*#__PURE__*/_jsx("div", {
          className: classes.columnDrawerSectionTitle,
          children: columnDrawerFixedSectionText
        }), fixedColumns.map(column => /*#__PURE__*/_jsx(FixedRow, {
          column: column
        }, column.columnKey))]
      })]
    })
  });
};
ColumnSettingsDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  orderedColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  togglePin: PropTypes.func.isRequired,
  reorderField: PropTypes.func.isRequired,
  resetAll: PropTypes.func.isRequired,
  showAll: PropTypes.func.isRequired
};
export default ColumnSettingsDrawer;