function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
const isActionColumn = column => {
  if (!column) return false;
  return column.isActions;
};

/**
 * disableColumnMenu already drops the header's ⋮ menu, where a column's
 * hide/pin controls live; locking it here keeps the drawer agreeing with that.
 */
const isFixedColumn = column => Boolean(column === null || column === void 0 ? void 0 : column.disableColumnMenu);
const buildColumnKeys = columns => columns.map((column, index) => {
  var _column$field;
  return (_column$field = column.field) !== null && _column$field !== void 0 ? _column$field : 'column-' + index;
});

/**
 * The one visible column a table has left can't be hidden — that would leave
 * nothing but the action column, or an empty grid. Action columns don't count
 * towards the tally: they carry no data, so hiding down to actions-only is the
 * same dead end.
 */
const findLastHideableKey = (visibleKeys, columnsByKey) => {
  const dataKeys = visibleKeys.filter(key => !isActionColumn(columnsByKey[key]));
  /*
   * A fixed column can never be hidden, so it already keeps a data column.
   */
  if (dataKeys.some(key => isFixedColumn(columnsByKey[key]))) return null;
  return dataKeys.length === 1 ? dataKeys[0] : null;
};
const computeKeyFlags = (visibleKeys, columnsByKey, pinnedColumns) => {
  const flagsByKey = {};
  const lastHideableKey = findLastHideableKey(visibleKeys, columnsByKey);
  visibleKeys.forEach(key => {
    const column = columnsByKey[key];
    const isLocked = isActionColumn(column) || isFixedColumn(column);
    let pinned = null;
    if (isActionColumn(column)) pinned = 'right';else if (pinnedColumns.left.includes(key)) pinned = 'left';else if (pinnedColumns.right.includes(key)) pinned = 'right';
    flagsByKey[key] = {
      pinned,
      pinLocked: isLocked,
      hideLocked: isLocked,
      // Distinct from hideLocked, which marks a structurally fixed column and
      // moves it into the settings drawer's Fixed section. This one only
      // withdraws the visibility control; pin and reorder still apply.
      canHide: !isLocked && key !== lastHideableKey
    };
  });
  return flagsByKey;
};
const areArraysEqual = (a, b) => {
  if (a === b) return true;
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  return a.every((item, index) => item === b[index]);
};
const arePinnedEqual = (a, b) => {
  if (a === b) return true;
  if (!a || !b) return false;
  return areArraysEqual(a.left, b.left) && areArraysEqual(a.right, b.right);
};
const useColumnState = _ref => {
  let {
    columns,
    hiddenColumns: controlledHiddenColumns,
    pinnedColumns: controlledPinnedColumns,
    onColumnSettingsChange,
    defaultHiddenColumns,
    defaultPinnedColumns
  } = _ref;
  const fallbackHiddenColumns = defaultHiddenColumns !== null && defaultHiddenColumns !== void 0 ? defaultHiddenColumns : [];
  const fallbackPinnedColumns = defaultPinnedColumns !== null && defaultPinnedColumns !== void 0 ? defaultPinnedColumns : {
    left: [],
    right: []
  };
  const columnKeys = useMemo(() => buildColumnKeys(columns), [columns]);
  const columnsByKey = useMemo(() => columns.reduce((map, column, index) => _objectSpread(_objectSpread({}, map), {}, {
    [columnKeys[index]]: column
  }), {}), [columns, columnKeys]);
  const [columnOrder, setColumnOrder] = useState(() => columnKeys);
  /**
   * Internal state is the only thing rendering reads. controlledHiddenColumns/
   * controlledPinnedColumns only seed it here at mount, then get adopted
   * again later (via the sync effects below) when the value actually
   * changes — never merely because the prop is set.
   */
  const [internalHiddenColumns, setInternalHiddenColumns] = useState(() => controlledHiddenColumns !== null && controlledHiddenColumns !== void 0 ? controlledHiddenColumns : fallbackHiddenColumns);
  const [internalPinnedColumns, setInternalPinnedColumns] = useState(() => controlledPinnedColumns !== null && controlledPinnedColumns !== void 0 ? controlledPinnedColumns : fallbackPinnedColumns);

  /**
   * What resetAll restores. The declared defaults win over the controlled
   * value here — a consumer restoring a persisted config through
   * hiddenColumns/pinnedColumns would otherwise get a Reset that re-applies
   * that same persisted config, never the defaults it declared alongside it.
   */
  const [initialColumnOrder] = useState(() => columnKeys);
  const [initialHiddenColumns] = useState(() => {
    var _ref2;
    return (_ref2 = defaultHiddenColumns !== null && defaultHiddenColumns !== void 0 ? defaultHiddenColumns : controlledHiddenColumns) !== null && _ref2 !== void 0 ? _ref2 : [];
  });
  const [initialPinnedColumns] = useState(() => {
    var _ref3;
    return (_ref3 = defaultPinnedColumns !== null && defaultPinnedColumns !== void 0 ? defaultPinnedColumns : controlledPinnedColumns) !== null && _ref3 !== void 0 ? _ref3 : {
      left: [],
      right: []
    };
  });
  const hiddenColumns = internalHiddenColumns;
  const pinnedColumns = internalPinnedColumns;

  // Adopts a controlled value into internal state only when it actually
  // changed since the previous render (a real external update) — a
  // consumer who never touches these props sees them compare equal to
  // themselves forever, so a click is never overridden.
  const previousControlledHiddenRef = useRef(controlledHiddenColumns);
  useEffect(() => {
    if (controlledHiddenColumns !== undefined && !areArraysEqual(controlledHiddenColumns, previousControlledHiddenRef.current)) {
      setInternalHiddenColumns(controlledHiddenColumns);
    }
    previousControlledHiddenRef.current = controlledHiddenColumns;
  }, [controlledHiddenColumns]);
  const previousControlledPinnedRef = useRef(controlledPinnedColumns);
  useEffect(() => {
    if (controlledPinnedColumns !== undefined && !arePinnedEqual(controlledPinnedColumns, previousControlledPinnedRef.current)) {
      setInternalPinnedColumns(controlledPinnedColumns);
    }
    previousControlledPinnedRef.current = controlledPinnedColumns;
  }, [controlledPinnedColumns]);

  /**
   * Use a value-based dependency so this effect only runs when the column
   * keys or their order actually change, rather than whenever the columns
   * array gets a new reference.
   */
  const keysSignature = columnKeys.join('|');
  useEffect(() => {
    setColumnOrder(currentOrder => {
      const stillValid = currentOrder.filter(key => columnKeys.includes(key));
      const newKeys = columnKeys.filter(key => !stillValid.includes(key));
      if (newKeys.length === 0 && stillValid.length === currentOrder.length) {
        return currentOrder;
      }
      return [...stillValid, ...newKeys];
    });
  }, [keysSignature]);
  const visibleKeys = useMemo(() => columnOrder.filter(key => columnsByKey[key] && (isFixedColumn(columnsByKey[key]) || !hiddenColumns.includes(key))), [columnOrder, columnsByKey, hiddenColumns]);
  const lastHideableKey = useMemo(() => findLastHideableKey(visibleKeys, columnsByKey), [visibleKeys, columnsByKey]);
  const emitChange = useCallback(overrides => {
    onColumnSettingsChange === null || onColumnSettingsChange === void 0 || onColumnSettingsChange(_objectSpread({
      order: columnOrder,
      hidden: hiddenColumns,
      pinned: pinnedColumns
    }, overrides));
  }, [columnOrder, hiddenColumns, pinnedColumns, onColumnSettingsChange]);
  const toggleVisibility = useCallback(key => {
    const column = columnsByKey[key];
    if (isActionColumn(column) || isFixedColumn(column)) return;
    const isHidden = hiddenColumns.includes(key);
    // Guarded here as well as in the controls that call it, so a consumer
    // driving this hook directly can't hide the last visible column either.
    if (!isHidden && key === lastHideableKey) return;
    const nextHidden = isHidden ? hiddenColumns.filter(hiddenKey => hiddenKey !== key) : [...hiddenColumns, key];
    setInternalHiddenColumns(nextHidden);
    emitChange({
      hidden: nextHidden
    });
  }, [hiddenColumns, emitChange, columnsByKey, lastHideableKey]);

  // Fixed and action columns are never in hiddenColumns, so clearing it is enough.
  const showAll = useCallback(() => {
    setInternalHiddenColumns([]);
    emitChange({
      hidden: []
    });
  }, [emitChange]);
  const togglePin = useCallback(function (key) {
    var _pinnedColumns$side;
    let side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'left';
    const column = columnsByKey[key];
    if (isActionColumn(column) || isFixedColumn(column)) return;
    const isPinnedToSide = (_pinnedColumns$side = pinnedColumns[side]) === null || _pinnedColumns$side === void 0 ? void 0 : _pinnedColumns$side.includes(key);
    const nextPinned = {
      left: pinnedColumns.left.filter(pinnedKey => pinnedKey !== key),
      right: pinnedColumns.right.filter(pinnedKey => pinnedKey !== key)
    };
    if (!isPinnedToSide) {
      nextPinned[side] = [...nextPinned[side], key];
    }
    setInternalPinnedColumns(nextPinned);
    emitChange({
      pinned: nextPinned
    });
  }, [pinnedColumns, emitChange, columnsByKey]);
  const reorder = useCallback((fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const nextOrder = [...columnOrder];
    const [movedKey] = nextOrder.splice(fromIndex, 1);
    nextOrder.splice(toIndex, 0, movedKey);
    setColumnOrder(nextOrder);
    emitChange({
      order: nextOrder
    });
  }, [columnOrder, emitChange]);
  const reorderField = useCallback((fromKey, toKey) => {
    const fromIndex = columnOrder.indexOf(fromKey);
    const toIndex = columnOrder.indexOf(toKey);
    if (fromIndex === -1 || toIndex === -1) return;
    reorder(fromIndex, toIndex);
  }, [columnOrder, reorder]);
  const resetAll = useCallback(() => {
    // Same reconciliation as the effect above: drop keys no longer in
    // columns, append any added since mount — so reset behaves sanely even
    // if the column set changed after the initial snapshot was taken.
    const stillValidInitialOrder = initialColumnOrder.filter(key => columnKeys.includes(key));
    const addedKeys = columnKeys.filter(key => !stillValidInitialOrder.includes(key));
    const resetOrder = [...stillValidInitialOrder, ...addedKeys];
    setInternalHiddenColumns(initialHiddenColumns);
    setInternalPinnedColumns(initialPinnedColumns);
    setColumnOrder(resetOrder);
    emitChange({
      order: resetOrder,
      hidden: initialHiddenColumns,
      pinned: initialPinnedColumns
    });
  }, [columnKeys, initialColumnOrder, initialHiddenColumns, initialPinnedColumns, emitChange]);
  const keyFlags = useMemo(() => computeKeyFlags(visibleKeys, columnsByKey, pinnedColumns), [visibleKeys, columnsByKey, pinnedColumns]);
  const visibleColumns = useMemo(() => {
    const leftKeys = visibleKeys.filter(key => keyFlags[key].pinned === 'left');
    const rightKeys = visibleKeys.filter(key => keyFlags[key].pinned === 'right');
    const middleKeys = visibleKeys.filter(key => keyFlags[key].pinned === null);
    const lastLeftKey = leftKeys[leftKeys.length - 1];
    const leftColumns = leftKeys.map(key => _objectSpread(_objectSpread(_objectSpread({}, columnsByKey[key]), keyFlags[key]), {}, {
      columnKey: key,
      isLastPinned: key === lastLeftKey
    }));
    const firstRightKey = rightKeys[0];
    const rightColumns = rightKeys.map(key => _objectSpread(_objectSpread(_objectSpread({}, columnsByKey[key]), keyFlags[key]), {}, {
      columnKey: key,
      isFirstRightPinned: key === firstRightKey
    }));
    const middleColumns = middleKeys.map(key => _objectSpread(_objectSpread(_objectSpread({}, columnsByKey[key]), keyFlags[key]), {}, {
      columnKey: key
    }));
    return [...leftColumns, ...middleColumns, ...rightColumns];
  }, [visibleKeys, keyFlags, columnsByKey]);
  const orderedColumns = useMemo(() => columnOrder.filter(key => columnsByKey[key]).map(key => {
    var _flags$pinned, _flags$pinLocked, _flags$canHide;
    const isLocked = isActionColumn(columnsByKey[key]) || isFixedColumn(columnsByKey[key]);
    const isHidden = !isLocked && hiddenColumns.includes(key);
    const flags = keyFlags[key];
    const pinnedFromState = pinnedColumns.left.includes(key) ? 'left' : pinnedColumns.right.includes(key) ? 'right' : null;
    return _objectSpread(_objectSpread({}, columnsByKey[key]), {}, {
      columnKey: key,
      hidden: isHidden,
      pinned: isHidden ? pinnedFromState : (_flags$pinned = flags === null || flags === void 0 ? void 0 : flags.pinned) !== null && _flags$pinned !== void 0 ? _flags$pinned : null,
      pinLocked: isHidden ? false : (_flags$pinLocked = flags === null || flags === void 0 ? void 0 : flags.pinLocked) !== null && _flags$pinLocked !== void 0 ? _flags$pinLocked : false,
      hideLocked: isLocked,
      // A hidden column always keeps its control: showing it again can
      // never leave the table without a column.
      canHide: !isLocked && (isHidden || ((_flags$canHide = flags === null || flags === void 0 ? void 0 : flags.canHide) !== null && _flags$canHide !== void 0 ? _flags$canHide : true))
    });
  }), [columnOrder, columnsByKey, hiddenColumns, keyFlags, pinnedColumns]);
  return {
    visibleColumns,
    orderedColumns,
    columnOrder,
    hiddenColumns,
    pinnedColumns,
    toggleVisibility,
    showAll,
    togglePin,
    reorder,
    reorderField,
    resetAll
  };
};
export default useColumnState;