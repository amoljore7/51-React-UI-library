function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import ChevronRight from '../../assets/icons/chevron-right.svg?react';
import ColumnLayout from '../../assets/icons/column-layout.svg?react';
import DragAndDrop from '../../assets/icons/drag-and-drop.svg?react';
import EyeIcon from '../../assets/icons/eye.svg?react';
import Button from '../button';
import SearchInput from '../search';
import Select from '../select';
import Tooltip from '../tooltip';
import { statusTypeList } from '../status-badge/constants';
import ColumnSettingsDrawer from './components/ColumnSettingsDrawer';
import { bulkActionsDisabledTooltipText, classes, compactColumnWidth, dragHandleField, navigationRole, hiddenPillsWidthRatio, searchBarSize, showAllColumnsText, tabIndex } from './constants';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = "@charset \"UTF-8\";\n:root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n/**\n * --bds-table-header-bg defaults to the tinted hover-bg formula rather than\n * a flat var(--theme-content-bg): on a custom theme, a flat value resolves\n * to the exact same color as the surrounding canvas, so the header would\n * read as if it had no background at all.\n */\n:root,\n[data-theme] {\n  --bds-table-row-hover-bg: var(--theme-hover-bg);\n  --bds-table-row-checked-bg: color-mix(in srgb, var(--theme-text-primary) 20%, var(--theme-content-bg));\n  --bds-table-header-bg: var(--theme-hover-bg);\n  --bds-table-header-hover-bg: var(--theme-border-subtle);\n  --bds-table-header-pinned-bg: var(--theme-separator);\n  --bds-table-header-pinned-border: var(--theme-separator);\n  --bds-table-cell-pinned-border: var(--theme-separator);\n  --bds-table-pill-nav-color: var(--theme-text-primary);\n  --bds-table-pill-nav-disabled-color: var(--theme-text-placeholder);\n  /**\n   * Accent, not structural: the pill reads as a selection chip, so it stays\n   * the same blue on every theme instead of dissolving into a custom surface.\n   * Declared only here \u2014 the light/dark blocks deliberately don't repeat it,\n   * which is why this block's selector has to cover [data-theme] too.\n   */\n  --bds-table-hidden-pill-bg: #d0e2ff;\n  --bds-table-hidden-pill-border: #4573d2;\n  --bds-table-hidden-pill-color: rgba(4, 5, 32, 0.6);\n  --bds-table-hidden-pill-hover-bg: color-mix(in srgb, #4573d2 12%, #d0e2ff);\n  --bds-table-drawer-icon-color: var(--theme-text-secondary);\n  --bds-table-drawer-text-color: var(--theme-text-primary);\n  --bds-table-drawer-section-border: var(--theme-border-subtle);\n  --bds-table-drawer-section-title-color: var(--theme-text-secondary);\n  --bds-table-drawer-row-hover-bg: var(--theme-hover-bg);\n  --bds-table-drawer-row-action-disabled-color: var(--theme-text-placeholder);\n  --bds-table-cell-clamp-fade-end: var(--theme-content-bg);\n  --bds-table-cell-toggle-bg: var(--theme-content-bg);\n  --bds-table-cell-toggle-border: var(--theme-border);\n  --bds-table-cell-toggle-color: var(--theme-text-primary);\n  --bds-table-expanded-row-cell-bg: var(--theme-hover-bg);\n  --bds-table-expanded-row-cell-border: var(--theme-separator);\n  --bds-table-expanded-row-divider: var(--theme-separator);\n  --bds-table-actions-shadow: rgba(0, 0, 0, 0.05);\n  --bds-table-action-icon-hover-bg: var(--theme-hover-bg);\n  --bds-table-header-icon-muted-opacity: 0.45;\n  --bds-table-filter-divider: var(--theme-separator);\n  --bds-table-clear-all-active-color: var(--theme-text-primary);\n  --bds-table-clear-all-disabled-color: var(--theme-text-placeholder);\n  --bds-table-action-chevron-hover-bg: transparent;\n  --bds-table-action-icon-color: inherit;\n  --bds-table-action-icon-hover-color: inherit;\n}\n\n[data-theme=light] {\n  --bds-table-row-hover-bg: #EEEEEE;\n  --bds-table-row-checked-bg: #F0F6FF;\n  --bds-table-header-bg: #f4f4f4;\n  --bds-table-header-hover-bg: #e5e5e5;\n  --bds-table-header-pinned-bg: #e0e0e0;\n  --bds-table-header-pinned-border: #c6c6c6;\n  --bds-table-cell-pinned-border: #c6c6c6;\n  --bds-table-pill-nav-color: #393939;\n  --bds-table-pill-nav-disabled-color: #a8a8a8;\n  --bds-table-scroll-nav-color: #6f6f6f;\n  --bds-table-scroll-nav-bg: rgba(255, 255, 255, 0.85);\n  --bds-table-hidden-pill-color: #393939;\n  --bds-table-drawer-icon-color: #8d8d8d;\n  --bds-table-drawer-text-color: #393939;\n  --bds-table-drawer-section-border: #e0e0e0;\n  --bds-table-drawer-section-title-color: #6f6f6f;\n  --bds-table-drawer-row-hover-bg: #f4f4f4;\n  --bds-table-drawer-row-action-disabled-color: #c6c6c6;\n  --bds-table-cell-clamp-fade-end: #ffffff;\n  --bds-table-cell-toggle-bg: #ffffff;\n  --bds-table-cell-toggle-border: #a8a8a8;\n  --bds-table-cell-toggle-color: #393939;\n  --bds-table-expanded-row-cell-bg: #f4f4f4;\n  --bds-table-expanded-row-cell-border: #e0e0e0;\n  --bds-table-expanded-row-divider: #c6c6c6;\n  --bds-table-action-icon-hover-bg: #e0e0e0;\n  --bds-table-filter-divider: #c6c6c6;\n  --bds-table-clear-all-active-color: #007bff;\n  --bds-table-clear-all-disabled-color: #a8a8a8;\n  --bds-table-action-chevron-hover-bg: transparent;\n  --bds-table-action-icon-color: inherit;\n  --bds-table-action-icon-hover-color: inherit;\n}\n\n[data-theme=dark] {\n  --bds-table-header-bg: var(--theme-content-bg);\n  --bds-table-header-hover-bg: #0a0b2e;\n  --bds-table-header-pinned-bg: #040520;\n  --bds-table-header-pinned-border: #686979;\n  --bds-table-cell-pinned-border: #686979;\n  --bds-table-pill-nav-color: #ffffff;\n  --bds-table-pill-nav-disabled-color: #9b9ba6;\n  --bds-table-scroll-nav-color: #9b9ba6;\n  --bds-table-scroll-nav-bg: color-mix(in srgb, var(--theme-content-bg) 85%, transparent);\n  --bds-table-drawer-icon-color: #9b9ba6;\n  --bds-table-drawer-row-action-disabled-color: #686979;\n  --bds-table-drawer-text-color: #ffffff;\n  --bds-table-drawer-section-border: #0a0b2e;\n  --bds-table-drawer-section-title-color: #9b9ba6;\n  --bds-table-drawer-row-hover-bg: #0a0b2e;\n  --bds-table-expanded-row-cell-bg: #0a0b2e;\n  --bds-table-expanded-row-cell-border: #686979;\n  --bds-table-expanded-row-divider: #686979;\n  --bds-table-actions-shadow: rgba(0, 0, 0, 0.16);\n  --bds-table-action-icon-hover-bg: #686979;\n  --bds-table-header-icon-muted-opacity: 0.55;\n  --bds-table-filter-divider: #686979;\n  --bds-table-clear-all-active-color: #ffffff;\n  --bds-table-clear-all-disabled-color: #9b9ba6;\n  --bds-table-action-chevron-hover-bg: rgba(255, 255, 255, 0.1);\n  --bds-table-action-icon-color: #9b9ba6;\n  --bds-table-action-icon-hover-color: #ffffff;\n}\n\n/**\n * ModalPopup and OverflowMenu render via portals appended to <body>, outside\n * .bds-table-container \u2014 these rules must stay unscoped or they never match.\n */\n.filter-menus {\n  background-color: var(--theme-content-bg);\n  box-shadow: 0 2px 8px color-mix(in srgb, var(--theme-text-primary) 20%, transparent), 0 0 0 1px color-mix(in srgb, var(--theme-text-primary) 15%, transparent);\n  color: var(--theme-text-primary);\n  border-radius: 6px;\n  font-weight: 400;\n  z-index: 3000;\n  /**\n   * top/left/width are computed in JS from the trigger's viewport position\n   * and set inline; fixed (not absolute) so the panel isn't clipped by the\n   * table's scrollable ancestor.\n   */\n  position: fixed;\n}\n.filter-menus-search {\n  margin: 8px;\n}\n.filter-menus-menu-divider {\n  border: 0;\n  border-top: 1px solid var(--bds-table-filter-divider);\n}\n.filter-menus-filter-list {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  overflow-y: auto;\n  max-height: 280px;\n}\n.filter-menus-action-btns {\n  /**\n   * Horizontal margins match the search row's, so the buttons keep their\n   * gutter now that the panel can shrink to exactly this row's width.\n   */\n  margin: 0 8px 8px;\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n}\n.filter-menus-no-data-found {\n  padding: 8px 12px;\n}\n.filter-menus-filter-menus-list {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 8px 12px;\n  overflow-wrap: anywhere;\n  /**\n   * Checkbox and radio containers are flex-shrink: 0 by default, so a long\n   * option label pushes past the panel rather than wrapping inside it.\n   * They need to shrink, and min-width: 0 to get below their content size.\n   */\n}\n.filter-menus-filter-menus-list .bds-checkbox-container,\n.filter-menus-filter-menus-list .radio-container {\n  flex-shrink: 1;\n  min-width: 0;\n}\n.filter-menus-filter-menus-list .bds-checkbox-icon-container {\n  flex-shrink: 0;\n}\n.filter-menus-filter-menus-list .bds-label-container,\n.filter-menus-filter-menus-list .label-container {\n  min-width: 0;\n}\n.filter-menus-clear-all {\n  margin-left: 13px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.filter-menus-clear-all-label {\n  font-size: 0.875rem;\n  line-height: 0.875rem;\n  font-weight: 400;\n  letter-spacing: 0.02rem;\n}\n\n.bds-table-column-drawer-body {\n  padding: 0 16px 8px;\n}\n\n.bds-table-column-drawer-section {\n  padding: 12px 0 4px;\n  border-bottom: 1px solid var(--bds-table-drawer-section-border);\n}\n.bds-table-column-drawer-section:last-child {\n  border-bottom: none;\n}\n\n.bds-table-column-drawer-section-title {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--bds-table-drawer-section-title-color);\n  margin-bottom: 4px;\n}\n\n.bds-table-column-drawer-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 4px;\n  border-radius: 4px;\n  min-height: 36px;\n}\n.bds-table-column-drawer-row:hover {\n  background: var(--bds-table-drawer-row-hover-bg);\n}\n\n.bds-table-column-drawer-row-dragging {\n  opacity: 0.6;\n}\n\n.bds-table-column-drawer-drag-handle {\n  display: flex;\n  align-items: center;\n  cursor: grab;\n  flex-shrink: 0;\n  color: var(--bds-table-drawer-icon-color);\n}\n\n.bds-table-column-drawer-lock-icon {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n  width: 16px;\n  color: var(--bds-table-drawer-icon-color);\n}\n\n.bds-table-column-drawer-row-label {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 0.875rem;\n  color: var(--bds-table-drawer-text-color);\n  font-weight: 400;\n}\n\n.bds-table-column-drawer-row-actions {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n  margin-left: auto;\n}\n\n.bds-table-column-drawer-row-action-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  color: var(--bds-table-drawer-icon-color);\n  padding: 0;\n}\n.bds-table-column-drawer-row-action-button:hover {\n  color: var(--bds-table-drawer-text-color);\n}\n\n.bds-table-column-drawer-row-action-disabled {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  color: var(--bds-table-drawer-row-action-disabled-color);\n  cursor: default;\n}\n\n.bds-table-column-menu-option {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  line-height: 1;\n}\n\n.bds-table-column-menu-option-icon {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n\n.bds-table-column-menu-option-text {\n  white-space: nowrap;\n  line-height: 1.2;\n}\n\n.bds-table-container {\n  width: 100%;\n  height: 100%;\n  min-width: 26.5rem;\n  display: flex;\n  flex-direction: column;\n  isolation: isolate;\n}\n.bds-table-container .bds-table-search {\n  flex-shrink: 0;\n  position: sticky;\n  top: 0;\n  z-index: 3;\n  box-sizing: border-box;\n  min-height: 3.5rem;\n  border-bottom: none;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding-right: 0.5rem;\n  background: var(--theme-content-bg);\n  max-width: 100%;\n  min-width: 26.5rem;\n}\n.bds-table-container .bds-table-toolbar-left-group {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.bds-table-container .bds-table-search-container {\n  display: flex;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.bds-table-container .bds-table-search-container .search-container {\n  border-color: var(--theme-border);\n  background-color: var(--theme-content-bg);\n}\n.bds-table-container .bds-table-search-container .search-box::placeholder {\n  color: var(--theme-text-placeholder);\n}\n.bds-table-container .bds-table-search-container .container {\n  padding: 0;\n}\n.bds-table-container .bds-table-bulk-actions {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n.bds-table-container .bds-table-left-toolbar-content {\n  display: flex;\n  align-items: center;\n  height: 32px;\n  flex-shrink: 0;\n}\n.bds-table-container .bds-table-left-toolbar-content > * {\n  box-sizing: border-box;\n  height: 32px;\n}\n.bds-table-container {\n  /**\n   * Sits alongside the search box on .bds-table-search's row; margin-left:\n   * auto pushes it to the far right whether or not a search box is present.\n   */\n}\n.bds-table-container .bds-table-column-toolbar {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 4px;\n  margin-left: auto;\n  padding: 8px 0;\n}\n.bds-table-container .bds-table-pill-nav-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  color: var(--bds-table-pill-nav-color);\n  cursor: pointer;\n  flex-shrink: 0;\n  user-select: none;\n}\n.bds-table-container .bds-table-pill-nav-button--disabled {\n  color: var(--bds-table-pill-nav-disabled-color);\n  cursor: default;\n}\n.bds-table-container .bds-table-hidden-column-pills {\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.bds-table-container .bds-table-hidden-column-pills-track {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: max-content;\n  transition: transform 300ms ease-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .bds-table-container .bds-table-hidden-column-pills-track {\n    transition: none;\n  }\n}\n.bds-table-container .bds-table-hidden-column-pill {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-bottom: 4px;\n  padding: 4px 12px;\n  border: 1px solid var(--bds-table-hidden-pill-border);\n  border-radius: 999px;\n  background: var(--bds-table-hidden-pill-bg);\n  color: var(--bds-table-hidden-pill-color);\n  font-size: 0.875rem;\n  cursor: pointer;\n}\n.bds-table-container .bds-table-hidden-column-pill:hover {\n  background: var(--bds-table-hidden-pill-hover-bg);\n}\n.bds-table-container .bds-table-hidden-column-pill-icon {\n  flex-shrink: 0;\n}\n.bds-table-container .bds-table-column-count-trigger {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  border: none;\n  background: transparent;\n  color: var(--theme-text-primary);\n  font-size: 0.875rem;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.bds-table-container .bds-table-column-count-trigger-icon {\n  flex-shrink: 0;\n}\n.bds-table-container .bds-table-sort-icon-resize-container {\n  display: flex;\n  align-items: center;\n  /**\n   * Same gap the outer icon container uses, so sort / filter / menu are\n   * spaced like every other pair in the header row instead of sitting flush.\n   */\n  gap: 4px;\n}\n.bds-table-container .bds-table-column-icon-container {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.bds-table-container .bds-table-header-icon svg {\n  color: inherit;\n  display: block;\n}\n.bds-table-container .bds-table-sort-icon-stack {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.bds-table-container {\n  /**\n   * Chevron size comes from props; only the overlap lives here, closing the\n   * dead space each glyph carries inside its viewBox.\n   */\n}\n.bds-table-container .bds-table-sort-icon-stack svg + svg {\n  margin-top: calc(-1 * 0.375rem);\n}\n.bds-table-container .bds-table-header-icon svg .bds-icon-muted {\n  opacity: var(--bds-table-header-icon-muted-opacity);\n}\n.bds-table-container .bds-table-non-selectable-header {\n  user-select: none;\n  -webkit-user-drag: none;\n  touch-action: none;\n}\n.bds-table-container .bds-table-scroll-wrapper {\n  flex: 1;\n  min-height: 0;\n  overflow: auto;\n}\n.bds-table-container {\n  /**\n   * Column scroll controls on the header row. A zero-height layer just above\n   * the scroll wrapper, outside it so the wrapper's overflow doesn't clip\n   * them; ColumnScrollButtons sets its top to the middle of the header row\n   * and --bds-table-scroll-nav-height to its height. Lets clicks through to\n   * the header cells. Above pinned header cells (z-index 5).\n   *\n   * Each side is an edge fade holding a chevron, shown while there's more to\n   * scroll that way and faded out at the end it can't pass.\n   */\n}\n.bds-table-container .bds-table-scroll-nav {\n  position: relative;\n  z-index: 6;\n  height: 0;\n  pointer-events: none;\n}\n.bds-table-container .bds-table-scroll-nav__edge {\n  position: absolute;\n  top: 0;\n  display: flex;\n  align-items: center;\n  width: 48px;\n  height: var(--bds-table-scroll-nav-height, 2.5rem);\n  transform: translateY(-50%);\n  transition: opacity 150ms ease-out;\n}\n.bds-table-container .bds-table-scroll-nav__edge--left {\n  left: var(--bds-table-pinned-left-width, 0px);\n  justify-content: flex-start;\n  background: linear-gradient(to right, var(--bds-table-scroll-nav-bg) 55%, transparent);\n}\n.bds-table-container .bds-table-scroll-nav__edge--right {\n  right: var(--bds-table-pinned-right-width, 0px);\n  justify-content: flex-end;\n  background: linear-gradient(to left, var(--bds-table-scroll-nav-bg) 55%, transparent);\n}\n.bds-table-container .bds-table-scroll-nav__edge--hidden {\n  opacity: 0;\n}\n.bds-table-container .bds-table-scroll-nav__edge--hidden .bds-table-scroll-nav__control {\n  pointer-events: none;\n}\n.bds-table-container .bds-table-scroll-nav__control {\n  --bds-btn-tertiary-tint-bg-hover: transparent;\n  --bds-btn-tertiary-tint-bg-active: transparent;\n  --bds-btn-tertiary-tint-text: var(--bds-table-scroll-nav-color);\n  display: flex;\n  pointer-events: auto;\n}\n.bds-table-container .bds-table-sticky-header-scroll {\n  position: sticky;\n  top: var(--bds-table-sticky-header-offset, 0px);\n  z-index: 4;\n  overflow-x: auto;\n  overflow-y: hidden;\n  background: var(--theme-content-bg);\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n}\n.bds-table-container .bds-table-sticky-header-scroll::-webkit-scrollbar {\n  display: none;\n}\n.bds-table-container .bds-table {\n  min-width: 100%;\n  width: max-content;\n  height: 100%;\n  display: table;\n  position: relative;\n  background: var(--theme-content-bg);\n}\n.bds-table-container .bds-table-header-cell {\n  box-sizing: border-box;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  color: var(--theme-text-primary);\n  border-bottom: 0.03125rem solid var(--theme-separator);\n  padding-right: 0;\n  font-size: 0.875rem;\n  height: 2.5rem;\n  overflow: hidden;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  /**\n   * Header cells outrank every body cell (pinned body cells are 2) so the\n   * sticky header \u2014 and the column filter panel inside it \u2014 is never\n   * painted over by a pinned column.\n   */\n  z-index: 4;\n  background: var(--bds-table-header-bg);\n  color: var(--theme-text-primary);\n}\n.bds-table-container .bds-table-header-cell:hover {\n  background: var(--bds-table-header-hover-bg);\n}\n.bds-table-container .bds-table-header-cell-no-background {\n  box-sizing: border-box;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  color: var(--theme-text-primary);\n  border-bottom: 0.03125rem solid var(--theme-separator);\n  padding-right: 0;\n  font-size: 0.875rem;\n  height: 2.5rem;\n  overflow: hidden;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  /**\n   * Header cells outrank every body cell (pinned body cells are 2) so the\n   * sticky header \u2014 and the column filter panel inside it \u2014 is never\n   * painted over by a pinned column.\n   */\n  z-index: 4;\n}\n.bds-table-container .bds-table-header-cell:first-child {\n  border-left: none;\n}\n.bds-table-container .bds-table-header-cell:last-child,\n.bds-table-container .bds-table-header-cell-no-background:last-child {\n  border-right: none;\n  padding-right: 1rem;\n}\n.bds-table-container .bds-table-header-cell:has(.filter-menus),\n.bds-table-container .bds-table-header-cell-no-background:has(.filter-menus) {\n  z-index: 2;\n}\n.bds-table-container .bds-table-header-text-icon {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  min-width: 0;\n  overflow: hidden;\n  height: 100%;\n  contain: inline-size;\n}\n.bds-table-container .bds-table-resizer {\n  display: flex;\n  box-sizing: content-box;\n  width: 1px;\n  height: 2rem;\n  min-width: 0;\n  padding: 0 0 0 8px;\n  cursor: col-resize;\n  background: none;\n  background-clip: content-box;\n}\n.bds-table-container .bds-table-resizer-hover {\n  background-color: var(--theme-text-primary);\n}\n.bds-table-container .bds-table-header-text {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-weight: 700;\n  font-family: \"OpenSansRegular\";\n  letter-spacing: 0.03125rem;\n  overflow: hidden;\n  min-width: 0;\n}\n.bds-table-container .bds-table-header-left-icons {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  flex-shrink: 0;\n}\n.bds-table-container .bds-table-header-text-label {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -ms-text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n}\n.bds-table-container .bds-table-header-text-cursor {\n  cursor: pointer;\n}\n.bds-table-container .bds-table-header-icon {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  opacity: 0;\n  transition: opacity 0.15s ease;\n}\n.bds-table-container .bds-table-header-cell:hover .bds-table-header-icon,\n.bds-table-container .bds-table-header-cell-no-background:hover .bds-table-header-icon,\n.bds-table-container .bds-table-header-cell:focus-within .bds-table-header-icon,\n.bds-table-container .bds-table-header-cell-no-background:focus-within .bds-table-header-icon,\n.bds-table-container .bds-table-header-icon-sorted {\n  opacity: 1;\n}\n.bds-table-container .bds-table-cell {\n  box-sizing: border-box;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  color: var(--theme-text-primary);\n  font-size: 0.875rem;\n  font-family: \"OpenSansRegular\";\n  line-height: 1.1875rem;\n  letter-spacing: 0.02rem;\n  padding-top: 0.84375rem;\n  padding-bottom: 0.90625rem;\n  border-bottom: 0.03125rem solid var(--theme-separator);\n  max-width: 0;\n}\n.bds-table-container .bds-table-cell-render {\n  box-sizing: border-box;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  color: var(--theme-text-primary);\n  font-size: 0.875rem;\n  font-family: \"OpenSansRegular\";\n  line-height: 1.1875rem;\n  letter-spacing: 0.02rem;\n  border-bottom: 0.03125rem solid var(--theme-separator);\n  max-width: 0;\n}\n.bds-table-container {\n  /**\n   * Sticky-positioned pinned cells need an opaque background to mask the\n   * row content scrolling underneath them. Uses var(--theme-content-bg)\n   * directly rather than a dedicated token so it always matches whatever\n   * an unpinned cell shows through to (the ambient content background),\n   * instead of a fixed value that can drift from a consumer's own container.\n   * The transparent border-right prevents a 1px sub-pixel rendering gap\n   * between adjacent pinned columns; bds-table-cell-pinned-last overrides it.\n   */\n}\n.bds-table-container .bds-table-cell-pinned {\n  background: var(--theme-content-bg);\n  border-right: 1px solid transparent;\n  z-index: 2;\n}\n.bds-table-container .bds-table-cell-pinned-last {\n  border-right: 2px solid var(--bds-table-cell-pinned-border);\n}\n.bds-table-container .bds-table-row-dragging .bds-table-cell,\n.bds-table-container .bds-table-row-dragging .bds-table-cell-render {\n  max-width: none !important;\n}\n.bds-table-container .bds-table-expanded-row {\n  background-color: var(--theme-border-subtle);\n  transition: height 0.5s ease-in;\n}\n.bds-table-container .bds-table-expanded-row .bds-table-cell {\n  background-color: var(--bds-table-expanded-row-cell-bg) !important;\n  border-bottom: 1px solid var(--bds-table-expanded-row-cell-border) !important;\n}\n.bds-table-container .bds-table-expanded-row:hover .bds-table-cell {\n  background-color: var(--bds-table-row-hover-bg) !important;\n}\n.bds-table-container .bds-table-row:not(.bds-table-expanded-row) + .bds-table-expanded-row .bds-table-cell {\n  border-top: 2px solid var(--bds-table-expanded-row-divider) !important;\n}\n.bds-table-container .bds-table-expanded-row-cell-render {\n  line-height: 3.1875rem;\n}\n.bds-table-container .bds-table-expanded-row-content-render {\n  background-color: var(--theme-content-bg);\n  border-top: 2px solid var(--theme-border);\n  vertical-align: baseline;\n}\n.bds-table-container .bds-table-expanded-row-no-data-found {\n  display: flex;\n  justify-content: space-around;\n}\n.bds-table-container .bds-table-expand-row {\n  display: flex;\n  gap: 2px;\n  align-items: center;\n}\n.bds-table-container .bds-table-cell-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  flex: 0 0 auto;\n  width: 1.75rem;\n  height: 1.75rem;\n  min-width: 1.75rem;\n  min-height: 1.75rem;\n  max-width: 1.75rem;\n  max-height: 1.75rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  overflow: hidden;\n  padding: 2px;\n  margin-right: 5px;\n}\n.bds-table-container .bds-table-cell-icon > * {\n  max-width: 100%;\n  max-height: 100%;\n}\n.bds-table-container td.bds-table-cell.bds-table-cell-expandable {\n  height: auto;\n  min-height: 3rem;\n  white-space: normal;\n  overflow: visible;\n  text-overflow: unset;\n  vertical-align: middle;\n}\n.bds-table-container .bds-table-cell-clamp {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  white-space: normal;\n  word-break: break-word;\n  width: 100%;\n}\n.bds-table-container {\n  /**\n   * The fade sits on the wrapper, not on .bds-table-cell-clamp: generated\n   * content inside a -webkit-box participates in -webkit-line-clamp and gets\n   * clamped away with the overflowing text.\n   */\n}\n.bds-table-container .bds-table-cell-clamp-wrapper {\n  position: relative;\n  flex: 1;\n  min-width: 0;\n}\n.bds-table-container .bds-table-cell-clamp-wrapper--faded::after {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 2em;\n  background: linear-gradient(to bottom, transparent, var(--bds-table-cell-clamp-fade-end));\n  pointer-events: none;\n}\n.bds-table-container .bds-table-cell-clamp-wrapper--expanded {\n  padding-bottom: 1.5em;\n}\n.bds-table-container .bds-table-cell-toggle {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  background: var(--bds-table-cell-toggle-bg);\n  border: 1px solid var(--bds-table-cell-toggle-border);\n  border-radius: 10px;\n  padding: 2px 8px;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--bds-table-cell-toggle-color);\n  line-height: 1.5;\n  outline: none;\n  white-space: nowrap;\n  transition: background-color 0.15s ease;\n  z-index: 1;\n}\n.bds-table-container .bds-table-cell-toggle:hover {\n  background-color: var(--theme-hover-bg);\n}\n.bds-table-container .bds-table-expand-row-icons {\n  cursor: pointer;\n}\n.bds-table-container .bds-table-row > .bds-table-cell-render:last-child {\n  border-right: none;\n}\n.bds-table-container .bds-table-cell-custom {\n  box-sizing: border-box;\n  width: 100%;\n  border-left: none;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n}\n.bds-table-container .bds-table-row td:last-child .bds-table-cell-custom {\n  border-right: none;\n}\n.bds-table-container .bds-table-row td.bds-table-cell:last-child {\n  border-right: none;\n}\n.bds-table-container .bds-table-row-selectable:hover {\n  cursor: pointer;\n}\n.bds-table-container .bds-table-cell-actions {\n  background: var(--theme-content-bg);\n  position: sticky;\n  right: 0;\n  z-index: 2;\n}\n.bds-table-container td.bds-table-cell.bds-table-cell-actions {\n  height: auto;\n  min-height: 3rem;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n.bds-table-container .bds-table-header-cell-actions {\n  background: var(--bds-table-header-bg);\n  position: sticky;\n  right: 0;\n  z-index: 5;\n  min-width: 0;\n}\n.bds-table-container .bds-table-header-cell-actions .bds-table-header-text-label {\n  overflow: visible;\n  text-overflow: unset;\n  white-space: nowrap;\n  min-width: unset;\n}\n.bds-table-container .bds-table-header-cell-actions--collapsed {\n  padding: 0;\n}\n.bds-table-container .bds-table-header-cell-actions--collapsed .bds-table-action-column-header {\n  justify-content: center;\n  padding: 0;\n}\n.bds-table-container .bds-table-action-column-header {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n.bds-table-container .bds-table-action-column-chevron {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  cursor: pointer;\n  color: inherit;\n  line-height: 1;\n}\n.bds-table-container .bds-table-action-column-chevron:hover {\n  background: var(--bds-table-action-chevron-hover-bg);\n}\n.bds-table-container .bds-table-action-icons-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  box-sizing: border-box;\n}\n.bds-table-container .bds-table-action-icon-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  line-height: 1;\n  color: var(--bds-table-action-icon-color);\n}\n.bds-table-container .bds-table-action-icon-btn:hover {\n  background: var(--bds-table-action-icon-hover-bg);\n  color: var(--bds-table-action-icon-hover-color);\n}\n.bds-table-container .bds-table-row-highlighted {\n  background-color: var(--bds-table-row-hover-bg);\n}\n.bds-table-container .bds-table-row-highlighted .bds-table-cell-pinned {\n  background-color: var(--bds-table-row-hover-bg);\n}\n.bds-table-container .bds-table-row-highlighted .bds-table-cell-actions,\n.bds-table-container .bds-table-row:hover .bds-table-cell-actions {\n  background-color: var(--bds-table-row-hover-bg);\n}\n.bds-table-container .bds-table-row:hover {\n  background-color: var(--bds-table-row-hover-bg);\n}\n.bds-table-container .bds-table-row:hover .bds-table-cell-pinned {\n  background-color: var(--bds-table-row-hover-bg);\n}\n.bds-table-container .bds-table-row-checked,\n.bds-table-container .bds-table-row-checked:hover {\n  background-color: var(--bds-table-row-checked-bg);\n}\n.bds-table-container .bds-table-row-checked .bds-table-cell-pinned,\n.bds-table-container .bds-table-row-checked .bds-table-cell-actions,\n.bds-table-container .bds-table-row-checked:hover .bds-table-cell-pinned,\n.bds-table-container .bds-table-row-checked:hover .bds-table-cell-actions {\n  background-color: var(--bds-table-row-checked-bg);\n}\n.bds-table-container .bds-overflow-menu-item {\n  font-size: 0.875rem;\n  font-family: \"OpenSansRegular\";\n}\n.bds-table-container .bds-overflow-menu-item:hover {\n  background-color: var(--theme-hover-bg);\n  letter-spacing: 0.02rem;\n}\n.bds-table-container .bds-table-row-dragging {\n  background-color: var(--bds-table-row-hover-bg);\n  border-bottom: 0.03125rem solid var(--theme-separator);\n}\n.bds-table-container table,\n.bds-table-container tbody,\n.bds-table-container thead,\n.bds-table-container tr,\n.bds-table-container th,\n.bds-table-container td {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: middle;\n  background: transparent;\n  border-collapse: unset;\n  text-indent: initial;\n  border-spacing: 0;\n}\n.bds-table-container td.bds-table-cell {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -ms-text-overflow: ellipsis;\n  height: 3rem;\n  white-space: nowrap;\n}\n.bds-table-container table.bds-table {\n  table-layout: fixed;\n}\n.bds-table-container .bds-add-new-row {\n  margin-top: 20px;\n}\n.bds-table-container .bds-add-new-row table,\n.bds-table-container .bds-add-new-row th,\n.bds-table-container .bds-add-new-row td {\n  background-color: var(--theme-content-bg);\n  border: none;\n}\n.bds-table-container .bds-add-new-row .bds-table-row:hover,\n.bds-table-container .bds-add-new-row .bds-table-row:hover .bds-table-cell,\n.bds-table-container .bds-add-new-row .bds-table-row:hover .bds-table-cell-render,\n.bds-table-container .bds-add-new-row .bds-table-row:hover .bds-table-cell-pinned,\n.bds-table-container .bds-add-new-row .bds-table-row:hover .bds-table-cell-actions {\n  background-color: var(--theme-content-bg);\n}\n.bds-table-container .bds-add-new-row th {\n  height: 1rem;\n}\n.bds-table-container .bds-add-new-row table {\n  padding-top: 15px;\n  padding-bottom: 15px;\n}\n.bds-table-container .bds-empty-new-row-header th {\n  height: 1px;\n}\n.bds-table-container .bds-table-column-filter {\n  display: flex;\n  align-items: center;\n}\n.bds-table-container .bds-table-column-menu {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  /**\n   * overflow-menu pins its trigger to --bds-overflow-menu-icon; inherit\n   * instead so the dots match the header text in every theme, as the pin\n   * and filter glyphs already do.\n   */\n}\n.bds-table-container .bds-table-column-menu .icon-wrapper {\n  color: inherit;\n}\n.bds-table-container .bds-table-column-menu {\n  /**\n   * The overflow-menu trigger is a fit-content box around an inline <svg>,\n   * so it picks up the line box's descender gap and ends up taller than\n   * the other header glyphs \u2014 centring the boxes then leaves it off by\n   * half that gap. Size comes from the iconSize prop; only the gap fix\n   * belongs here.\n   */\n}\n.bds-table-container .bds-table-column-menu .icon-wrapper svg {\n  display: block;\n}\n.bds-table-container .bds-table-pin-icon {\n  flex-shrink: 0;\n  color: inherit;\n  display: block;\n}\n.bds-table-container .bds-table-header-cell-pinned {\n  background: var(--bds-table-header-pinned-bg);\n  border-right: 1px solid var(--bds-table-header-pinned-bg);\n  z-index: 5;\n}\n.bds-table-container .bds-table-header-cell-pinned-last {\n  border-right: none;\n  box-shadow: inset -1px 0 0 var(--bds-table-header-pinned-border);\n}\n.bds-table-container .bds-table-header-cell-pinned-right-first:not(.bds-table-header-cell-actions) {\n  padding-left: 24px;\n}\n.bds-table-container .bds-table-header-cell-pinned-right-first {\n  border-left: 2px solid var(--bds-table-header-pinned-border);\n}\n.bds-table-container .bds-table-cell-pinned-right-first {\n  border-left: 2px solid var(--bds-table-cell-pinned-border);\n}\n.bds-table-container {\n  /**\n   * The separators above are structural and always paint. The shadow is the\n   * part that means \"content is passing underneath this column\", so it only\n   * appears while the table can still scroll that way. TableGrid.jsx puts\n   * these classes on the scroll wrapper(s).\n   */\n}\n.bds-table-container .bds-table-scrolled-from-start .bds-table-cell-pinned-last {\n  box-shadow: 2px 0 4px var(--bds-table-actions-shadow);\n}\n.bds-table-container .bds-table-scrolled-from-start .bds-table-header-cell-pinned-last {\n  box-shadow: inset -1px 0 0 var(--bds-table-header-pinned-border), 2px 0 4px var(--bds-table-actions-shadow);\n}\n.bds-table-container .bds-table-scrollable-to-end .bds-table-cell-actions,\n.bds-table-container .bds-table-scrollable-to-end .bds-table-header-cell-actions {\n  box-shadow: -2px 0 4px var(--bds-table-actions-shadow);\n}\n.bds-table-container .bds-table-compact-cell-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  /**\n   * Flex items shrink by default, so the glyph would be squeezed whenever\n   * the cell is: a dragged row is transformed and has its max-width cap\n   * lifted, which resizes the drag handle mid-drag.\n   */\n}\n.bds-table-container .bds-table-compact-cell-wrapper > * {\n  flex-shrink: 0;\n}\n.bds-table-container .filter-icon {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  /**\n   * Size comes from width/height props on the icon; only leave the rules\n   * an attribute cannot express, since a CSS rule would override those\n   * props.\n   */\n}\n.bds-table-container .filter-icon svg {\n  color: inherit;\n  display: block;\n}\n\n/* ---------------------------------------------------------------------------\n   Dark theme ([data-theme='dark'])\n   --------------------------------------------------------------------------- */\n[data-theme=dark] .bds-table-container .bds-table-expanded-row {\n  background-color: #0a0b2e;\n}\n[data-theme=dark] .bds-table-container .bds-table-expanded-row:hover .bds-table-cell {\n  background-color: #686979 !important;\n}\n[data-theme=dark] .bds-table-container .bds-table-row:hover .bds-table-cell,\n[data-theme=dark] .bds-table-container .bds-table-row:hover .bds-table-cell-render {\n  border-right-color: var(--theme-hover-bg);\n  border-left-color: var(--theme-hover-bg);\n}\n[data-theme=dark] .bds-table-container .bds-table-row-dragging {\n  border-bottom-color: var(--theme-border);\n}";
  const fileName = "table_table_4351f205-2f5a-4579-b41d-0c5b03460de1";
  const element = document.querySelector("style[data-sass-component='table_table_4351f205-2f5a-4579-b41d-0c5b03460de1']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import TableGrid from './components/TableGrid';
import useColumnState from './hooks/useColumnState';

/**
 * Reads width from the caller's own tableNode ref, not a global
 * document.getElementsByClassName(classes.table)[0] lookup — that always
 * grabbed the first .bds-table anywhere in the document, so a page with more
 * than one Table on it (or a Table nested inside another, e.g. an expanded
 * row's content) would size this table off a different instance entirely.
 /**
 * Observe the table itself so toolbar width updates when the table changes
 * without a window resize (e.g. column resize, hide/pin, or redistribution).
 * Retry on the next frame if the table ref isn't attached yet.
 */
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const useTableWidth = tableNodeRef => {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    if (typeof ResizeObserver === 'undefined') return;
    let observer;
    let rafId;
    const updateWidth = () => {
      const element = tableNodeRef.current;
      if (element !== null && element !== void 0 && element.offsetWidth) {
        setWidth(element.offsetWidth);
      }
    };
    const trySetup = () => {
      const element = tableNodeRef.current;
      if (!element) {
        rafId = requestAnimationFrame(trySetup);
        return;
      }
      observer = new ResizeObserver(updateWidth);
      observer.observe(element);
      updateWidth();
    };
    trySetup();
    return () => {
      var _observer;
      if (rafId != null) cancelAnimationFrame(rafId);
      (_observer = observer) === null || _observer === void 0 || _observer.disconnect();
    };
  }, [tableNodeRef]);
  return width;
};
const Table = _ref => {
  var _searchBar$value, _bulkActions$width;
  let {
    columns,
    rows = [{}],
    sortHandler,
    searchBar,
    resizableColumns,
    allowRowSelect = false,
    onRowSelect,
    highlightedRow,
    allowDraggableRow = false,
    onDragEnd,
    addNewRow,
    columnsForNewRow,
    noDataMessage,
    hideNewRowHeader = false,
    noHeaderBackground = false,
    expandedContent,
    expandedRows: controlledExpandedRows,
    onExpandedRowsChange,
    isNewRowTable = false,
    checkedRows,
    allowCheckbox = false,
    allowSelectAll = true,
    onCheckboxChange,
    isCheckboxDisabled,
    bulkActions,
    columnConfig,
    getRowId,
    leftToolbarContent,
    stickyHeader = false,
    disableColumnManagement = false,
    reserveDragHandleColumn = false
  } = _ref;
  const rowList = rows !== null && rows !== void 0 ? rows : [];
  /**
   * Resolves isCheckboxDisabled once per row per render instead of letting
   * every consumer of it (selectableRowList/actionableCheckedRows below, and
   * TableGrid's per-row disableCheckbox) call the consumer's predicate again
   * for the same row. Keyed by reference, matching how checked-row membership
   * is already tracked elsewhere.
   */
  const checkboxDisabledByRow = useMemo(() => new Map(rowList.map(row => {
    var _isCheckboxDisabled;
    return [row, (_isCheckboxDisabled = isCheckboxDisabled === null || isCheckboxDisabled === void 0 ? void 0 : isCheckboxDisabled(row)) !== null && _isCheckboxDisabled !== void 0 ? _isCheckboxDisabled : false];
  })), [rowList, isCheckboxDisabled]);
  const tableNode = useRef();
  const containerNode = useRef();
  const toolbarNode = useRef();

  /**
   * Keeps the sticky table header offset in sync with the toolbar height
   * so the header stays positioned correctly.
   */
  useLayoutEffect(() => {
    if (!stickyHeader) return;
    const toolbarEl = toolbarNode.current;
    const containerEl = containerNode.current;
    if (!toolbarEl || !containerEl || typeof ResizeObserver === 'undefined') return;
    const updateOffset = () => {
      containerEl.style.setProperty('--bds-table-sticky-header-offset', "".concat(toolbarEl.offsetHeight, "px"));
    };
    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(toolbarEl);
    return () => observer.disconnect();
  }, [stickyHeader]);

  /**
   * columnConfig exposes useColumnState's hidden/pinned state as a single
   * Table prop. pinnedColumns is a flat array here — the settings drawer
   * only ever pins left (ColumnSettingsDrawer.jsx's togglePin always passes
   * 'left'; right is reserved for the forced action column) — so the
   * { left, right } split stays an internal useColumnState detail.
   *
   * pinnedColumns/hiddenColumns are a hybrid, not a strict controlled prop:
   * useColumnState always renders from its own internal state, so the
   * drawer stays fully interactive whether or not a consumer ever supplies
   * onColumnConfigChange or feeds a value back through it. Passing these
   * lets a consumer *optionally* steer that internal state from outside —
   * useColumnState adopts a new value only when it actually changes
   * (compared by contents, not reference) from one render to the next, so
   * a genuine external update (a "reset filters" action, or a proper
   * round-trip through onColumnConfigChange) still takes effect, while an
   * unchanged value passed on every render (whether because the consumer
   * never updates it, or hands back a fresh array/object literal with the
   * same contents) is correctly left alone rather than overriding whatever
   * the drawer just did. defaultPinnedColumns/defaultHiddenColumns behave
   * the same way but only ever seed the initial value — there's no
   * "controlled" counterpart to compare later renders against, so they're
   * simply not read again after mount.
   */
  const handleColumnSettingsChange = useCallback(_ref2 => {
    var _columnConfig$onColum, _pinned$left;
    let {
      order,
      hidden,
      pinned
    } = _ref2;
    columnConfig === null || columnConfig === void 0 || (_columnConfig$onColum = columnConfig.onColumnConfigChange) === null || _columnConfig$onColum === void 0 || _columnConfig$onColum.call(columnConfig, {
      order,
      hidden,
      pinned: (_pinned$left = pinned === null || pinned === void 0 ? void 0 : pinned.left) !== null && _pinned$left !== void 0 ? _pinned$left : []
    });
  }, [columnConfig]);
  const {
    visibleColumns,
    orderedColumns,
    toggleVisibility,
    showAll,
    togglePin,
    reorderField,
    resetAll
  } = useColumnState({
    columns,
    hiddenColumns: columnConfig === null || columnConfig === void 0 ? void 0 : columnConfig.hiddenColumns,
    pinnedColumns: (columnConfig === null || columnConfig === void 0 ? void 0 : columnConfig.pinnedColumns) !== undefined ? {
      left: columnConfig.pinnedColumns,
      right: []
    } : undefined,
    defaultHiddenColumns: columnConfig === null || columnConfig === void 0 ? void 0 : columnConfig.defaultHiddenColumns,
    defaultPinnedColumns: (columnConfig === null || columnConfig === void 0 ? void 0 : columnConfig.defaultPinnedColumns) !== undefined ? {
      left: columnConfig.defaultPinnedColumns,
      right: []
    } : undefined,
    onColumnSettingsChange: handleColumnSettingsChange
  });
  const hiddenColumns = orderedColumns.filter(column => column.hidden);
  const [isColumnDrawerOpen, setIsColumnDrawerOpen] = useState(false);
  const [widthResetKey, setWidthResetKey] = useState(0);
  const handleResetAll = useCallback(() => {
    resetAll();
    setWidthResetKey(key => key + 1);
  }, [resetAll]);
  const headerProps = {
    sortHandler,
    tableNode,
    // Sticky mode uses separate header/body tables, so offsets go on their shared ancestor.
    pinnedOffsetNode: stickyHeader ? containerNode : undefined,
    resizableColumns,
    toggleVisibility,
    togglePin
  };
  const tableWidth = useTableWidth(tableNode);
  const [searchText, setSearchText] = useState((_searchBar$value = searchBar === null || searchBar === void 0 ? void 0 : searchBar.value) !== null && _searchBar$value !== void 0 ? _searchBar$value : '');
  const [internalExpandedRows, setInternalExpandedRows] = useState([]);
  const [isActionColumnCollapsed, setIsActionColumnCollapsed] = useState(false);
  /**
   * Toggles the action column between its full width and a compact,
   * icon-only strip.
   */
  const handleToggleActionColumn = useCallback(() => setIsActionColumnCollapsed(prev => !prev), []);
  const [internalCheckedRows, setInternalCheckedRows] = useState([]);
  // Prefer the controlled prop; fall back to internal state for uncontrolled use.
  const activeCheckedRows = checkedRows !== null && checkedRows !== void 0 ? checkedRows : internalCheckedRows;
  /**
    * Rows can become disabled after being checked. Exclude them from bulk
    * actions while preserving the consumer's checked state. Fall back to the
    * row predicate when no cached disabled state exists.
  */
  const actionableCheckedRows = activeCheckedRows.filter(row => !(checkboxDisabledByRow.has(row) ? checkboxDisabledByRow.get(row) : isCheckboxDisabled === null || isCheckboxDisabled === void 0 ? void 0 : isCheckboxDisabled(row)));
  const [bulkActionKey, setBulkActionKey] = useState(0);
  const pillScrollRef = useRef(null);
  const pillTrackRef = useRef(null);
  const [pillScroll, setPillScroll] = useState({
    atStart: true,
    atEnd: true
  });
  const [pillMaxWidth, setPillMaxWidth] = useState(null);
  const toolbarLeftGroupRef = useRef(null);
  const columnToolbarRef = useRef(null);

  /**
   * The pill strip may take hiddenPillsWidthRatio of the table's visible
   * width, but never more than the room left in the toolbar row beside the
   * left-hand controls and the rest of the column toolbar, so the pills alone
   * never push the toolbar onto a second line. Measured on the container
   * rather than the toolbar, which is sized to the table's full scroll width
   * and so grows when columns overflow.
   */
  useLayoutEffect(() => {
    const container = containerNode.current;
    const toolbar = toolbarNode.current;
    if (!container || !toolbar) return;
    const measure = () => {
      const strip = pillScrollRef.current;
      const toolbarStyle = getComputedStyle(toolbar);
      const rowWidth = container.clientWidth - parseFloat(toolbarStyle.paddingLeft) - parseFloat(toolbarStyle.paddingRight);
      const widthOf = el => {
        var _el$getBoundingClient;
        return (_el$getBoundingClient = el === null || el === void 0 ? void 0 : el.getBoundingClientRect().width) !== null && _el$getBoundingClient !== void 0 ? _el$getBoundingClient : 0;
      };
      const leftWidth = widthOf(toolbarLeftGroupRef.current);
      // The column toolbar without the strip itself: chevrons, Show All, count.
      const restWidth = widthOf(columnToolbarRef.current) - widthOf(strip);
      const gap = parseFloat(toolbarStyle.columnGap) || 0;
      // Rounded against the strip, plus a pixel: offsetWidth-style rounding
      // put the total a fraction over the row and wrapped it anyway.
      const roomInRow = Math.floor(rowWidth - Math.ceil(leftWidth) - gap - Math.ceil(restWidth)) - 1;
      const ratioWidth = Math.floor(container.clientWidth * hiddenPillsWidthRatio);
      // No room at all means the toolbar wraps regardless, and on its own
      // line the column toolbar can have its full share again.
      setPillMaxWidth(roomInRow > 0 ? Math.min(ratioWidth, roomInRow) : ratioWidth);
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    [container, toolbarLeftGroupRef.current, columnToolbarRef.current, pillTrackRef.current].filter(Boolean).forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /**
   * The pills sit on a track inside the clipped strip and move with a CSS
   * transform transition rather than native scrolling, whose easing and
   * speed can't be set from CSS. pillOffset is how far the track is shifted.
   */
  const [pillOffset, setPillOffset] = useState(0);
  const getPillMaxOffset = () => {
    var _pillTrackRef$current, _pillTrackRef$current2, _pillScrollRef$curren, _pillScrollRef$curren2;
    return Math.max(0, ((_pillTrackRef$current = (_pillTrackRef$current2 = pillTrackRef.current) === null || _pillTrackRef$current2 === void 0 ? void 0 : _pillTrackRef$current2.offsetWidth) !== null && _pillTrackRef$current !== void 0 ? _pillTrackRef$current : 0) - ((_pillScrollRef$curren = (_pillScrollRef$curren2 = pillScrollRef.current) === null || _pillScrollRef$curren2 === void 0 ? void 0 : _pillScrollRef$curren2.clientWidth) !== null && _pillScrollRef$curren !== void 0 ? _pillScrollRef$curren : 0));
  };

  /**
   * Each chevron shows only while the pills overflow the strip and there's
   * more to move its way. Read from the offset rather than a pill count or
   * page index, so it stays honest when a pill is restored mid-way or pill
   * labels vary in length.
   */
  const syncPillScroll = useCallback(() => {
    const maxOffset = getPillMaxOffset();
    // Restoring a pill leaves less to move; don't leave a gap at the end.
    if (pillOffset > maxOffset) {
      setPillOffset(maxOffset);
      return;
    }
    setPillScroll({
      atStart: pillOffset <= 0,
      atEnd: pillOffset >= maxOffset - 1
    });
  }, [pillOffset]);
  useLayoutEffect(syncPillScroll, [syncPillScroll, hiddenColumns.length, pillMaxWidth]);
  // Pills can change size with no count or cap change (a font that loads
  // late), which would otherwise leave them overflowing with no chevrons.
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(syncPillScroll);
    [pillScrollRef.current, pillTrackRef.current].filter(Boolean).forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [syncPillScroll]);
  // At both ends at once means the pills fit their strip: no chevrons.
  const pillsOverflow = !(pillScroll.atStart && pillScroll.atEnd);

  /**
   * Moves the hidden-column pills by one strip width in the given direction
   * (-1 left, 1 right), used by the chevron nav buttons.
   */
  const scrollPills = direction => {
    var _pillScrollRef$curren3, _pillScrollRef$curren4;
    const stripWidth = (_pillScrollRef$curren3 = (_pillScrollRef$curren4 = pillScrollRef.current) === null || _pillScrollRef$curren4 === void 0 ? void 0 : _pillScrollRef$curren4.clientWidth) !== null && _pillScrollRef$curren3 !== void 0 ? _pillScrollRef$curren3 : 0;
    const maxOffset = getPillMaxOffset();
    setPillOffset(offset => Math.min(Math.max(offset + direction * stripWidth, 0), maxOffset));
  };
  const activeCheckedRowsRef = useRef(activeCheckedRows);
  activeCheckedRowsRef.current = activeCheckedRows;
  const rowListRef = useRef(rowList);
  rowListRef.current = rowList;

  /**
   * Toggles a single row's checked state and reports the full checked list
   * to the consumer. Matches by reference, not value: two rows with
   * identical data are still distinct row instances in rowList, and
   * value-equality would check/uncheck every row sharing that data at once.
   */
  const handleCheckRow = useCallback(row => {
    const current = activeCheckedRowsRef.current;
    const newChecked = current.some(r => r === row) ? current.filter(r => r !== row) : [...current, row];
    if (checkedRows === undefined) setInternalCheckedRows(newChecked);
    onCheckboxChange === null || onCheckboxChange === void 0 || onCheckboxChange(newChecked);
  }, [checkedRows, onCheckboxChange]);

  /**
   * Selects every selectable row, or clears the selection if all of them are
   * already checked — the header checkbox's select-all/clear-all behaviour.
   * A row isCheckboxDisabled marks as disabled is excluded from the set
   * select-all produces, so it can never be checked via the header control
   * (matching its own checkbox being disabled), and from the "is everything
   * checked" test, so it never blocks the header from reading "all checked"
   * just because it itself stays unchecked. Bails when nothing is
   * selectable — with every visible row disabled, allChecked would read
   * false (an empty array is vacuously not "every row checked"), sending an
   * unsolicited onCheckboxChange([]) on a header checkbox the consumer
   * couldn't tell was live.
   */
  const handleCheckAll = useCallback(() => {
    const checked = new Set(activeCheckedRowsRef.current);
    const selectableRows = rowListRef.current.filter(row => !(isCheckboxDisabled !== null && isCheckboxDisabled !== void 0 && isCheckboxDisabled(row)));
    if (selectableRows.length === 0) return;
    const allChecked = selectableRows.every(row => checked.has(row));
    const newChecked = allChecked ? [] : [...selectableRows];
    if (checkedRows === undefined) setInternalCheckedRows(newChecked);
    onCheckboxChange === null || onCheckboxChange === void 0 || onCheckboxChange(newChecked);
  }, [checkedRows, onCheckboxChange, isCheckboxDisabled]);

  /**
   * Runs the selected bulk action against the checked rows, then resets the
   * dropdown by remounting it via bulkActionKey.
   */
  const handleBulkActionChange = (_event, option) => {
    var _option$onClick;
    (_option$onClick = option.onClick) === null || _option$onClick === void 0 || _option$onClick.call(option, actionableCheckedRows);
    setBulkActionKey(prev => prev + 1);
  };
  const expandedRows = controlledExpandedRows !== null && controlledExpandedRows !== void 0 ? controlledExpandedRows : internalExpandedRows;
  /**
   * Memoized so it doesn't get a new reference on every Table re-render
   * (e.g. a checkbox click) — it's passed down to every TableCell, and an
   * unstable reference there would defeat TableCell's React.memo on every
   * unrelated state change.
   */
  const handleExpandedRows = useCallback(function (expandedRowId) {
    let onExpand = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
    let row = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const expandedRowsList = [...expandedRows];
    const index = expandedRowsList === null || expandedRowsList === void 0 ? void 0 : expandedRowsList.indexOf(expandedRowId);
    if (index !== -1) {
      expandedRowsList === null || expandedRowsList === void 0 || expandedRowsList.splice(index, 1);
    } else {
      expandedRowsList === null || expandedRowsList === void 0 || expandedRowsList.push(expandedRowId);
      onExpand(row);
    }
    if (onExpandedRowsChange) {
      onExpandedRowsChange(expandedRowsList);
    } else {
      setInternalExpandedRows(expandedRowsList);
    }
  }, [expandedRows, onExpandedRowsChange]);
  const onChangeSearch = e => {
    setSearchText(e.target.value);
    searchBar.onSearch(e.target.value);
  };
  const getWidth = () => {
    if (tableNode && tableNode.current) {
      return Math.max(tableWidth, tableNode.current.offsetWidth);
    } else {
      return tableWidth;
    }
  };
  useEffect(() => {
    if (searchBar !== null && searchBar !== void 0 && searchBar.isSearchEmpty) {
      setSearchText('');
    }
  }, [searchBar === null || searchBar === void 0 ? void 0 : searchBar.isSearchEmpty]);

  /**
   * Narrow the action column when collapsed; width comes from the column's
   * own collapsedWidth prop, falling back to a compact default.
   */
  const effectiveColumns = useMemo(() => {
    /**
     * No renderColumn/renderHeader closure here — deliberately. Both used to
     * read activeCheckedRows directly, which forced effectiveColumns to be
     * rebuilt (and every TableRow's columns prop to change) on every
     * checkbox click. isChecked/onCheckRow now reach TableCell as their own
     * explicit props (threaded through TableRow), and TableCell/
     * TableHeaderCell special-case isCheckboxColumn to render the checkbox
     * — see table.scss's compactCellWrapper usage there. That keeps this
     * column (and effectiveColumns as a whole) stable across checkbox
     * clicks, so unrelated rows can bail out of React.memo entirely.
     */
    const checkboxCol = allowCheckbox ? {
      field: '__checkbox__',
      headerName: '',
      width: compactColumnWidth,
      pinned: 'left',
      pinLocked: true,
      hideLocked: true,
      isCompact: true,
      columnKey: '__checkbox__',
      isCheckboxColumn: true,
      allowSelectAll
    } : null;
    const base = checkboxCol ? [checkboxCol, ...visibleColumns] : [...visibleColumns];

    /**
     * Drag handle always leads, even ahead of the checkbox column.
     *
     * reserveDragHandleColumn renders the same column empty. It exists for
     * the add-new-row table below, which needs a leading cell of identical
     * width to line its inputs up with the header. A column declared by the
     * consumer can't do that job: it goes through useColumnState, which
     * un-pins anything it wasn't told to pin, and an unpinned column is
     * floored at columnMinWidth and handed a share of the table's leftover
     * width — so the spacer renders far wider than the handle it mirrors.
     */
    const withDragHandle = allowDraggableRow || reserveDragHandleColumn ? [{
      field: dragHandleField,
      headerName: '',
      sortable: false,
      isCompact: true,
      pinned: 'left',
      pinLocked: true,
      hideLocked: true,
      columnKey: dragHandleField,
      renderColumn: () => allowDraggableRow ? /*#__PURE__*/_jsx("div", {
        className: classes.compactCellWrapper,
        children: /*#__PURE__*/_jsx(DragAndDrop, {
          "aria-hidden": true,
          focusable: "false"
        })
      }) : null,
      width: compactColumnWidth
    }, ...base] : base;
    return isActionColumnCollapsed ? withDragHandle.map(col => {
      var _col$collapsedWidth;
      return col.isActions ? _objectSpread(_objectSpread({}, col), {}, {
        width: (_col$collapsedWidth = col.collapsedWidth) !== null && _col$collapsedWidth !== void 0 ? _col$collapsedWidth : compactColumnWidth
      }) : col;
    }) : withDragHandle;
  }, [allowCheckbox, allowSelectAll, isActionColumnCollapsed, visibleColumns, allowDraggableRow, reserveDragHandleColumn]);

  /**
   * Counts membership (by reference, matching handleCheckRow's own ===
   * comparison), not raw array length. Comparing lengths alone assumes
   * every entry in activeCheckedRows is actually one of rowList's current
   * rows — if a consumer's checkedRows still holds stale references (rows
   * from before a page/filter change) that happen to number the same as
   * rowList, allRowsChecked would read true with zero current rows
   * actually checked, and any other stale count in between would show an
   * incorrectly indeterminate header checkbox.
   *
   * selectableRowList excludes isCheckboxDisabled rows from both counts —
   * otherwise a permanently unchecked disabled row would keep allRowsChecked
   * false forever, even once every row the user can actually act on is
   * checked.
   */
  const selectableRowList = rowList.filter(row => !checkboxDisabledByRow.get(row));
  const activeCheckedRowsSet = new Set(activeCheckedRows);
  const checkedRowsInList = selectableRowList.filter(row => activeCheckedRowsSet.has(row)).length;
  const allRowsChecked = selectableRowList.length > 0 && checkedRowsInList === selectableRowList.length;
  const someRowsChecked = checkedRowsInList > 0 && checkedRowsInList < selectableRowList.length;
  headerProps.columns = effectiveColumns;
  headerProps.hideNewRowHeader = hideNewRowHeader;
  headerProps.noHeaderBackground = noHeaderBackground;
  headerProps.isActionColumnCollapsed = isActionColumnCollapsed;
  headerProps.onToggleActionColumn = handleToggleActionColumn;
  headerProps.isNewRowTable = isNewRowTable;
  headerProps.allRowsChecked = allRowsChecked;
  headerProps.someRowsChecked = someRowsChecked;
  headerProps.onCheckAll = handleCheckAll;
  headerProps.checkAllDisabled = selectableRowList.length === 0;
  headerProps.disableColumnManagement = disableColumnManagement;
  headerProps.widthResetKey = widthResetKey;
  return /*#__PURE__*/_jsxs("div", {
    ref: containerNode,
    className: classes.container,
    children: [(searchBar || bulkActions || !isNewRowTable) && !disableColumnManagement && /*#__PURE__*/_jsx("div", {
      ref: toolbarNode,
      className: classes.search,
      style: getWidth() ? {
        width: getWidth()
      } : {},
      role: navigationRole,
      tabIndex: tabIndex,
      children: !isNewRowTable && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: classes.toolbarLeftGroup,
          ref: toolbarLeftGroupRef,
          children: [leftToolbarContent && /*#__PURE__*/_jsx("div", {
            className: classes.leftToolbarContent,
            children: leftToolbarContent
          }), bulkActions && /*#__PURE__*/_jsx("div", {
            className: classes.bulkActionsContainer,
            children: /*#__PURE__*/_jsx(Tooltip, {
              title: actionableCheckedRows.length === 0 ? bulkActionsDisabledTooltipText : null,
              position: "top",
              children: /*#__PURE__*/_jsx("div", {
                children: /*#__PURE__*/_jsx(Select, {
                  options: bulkActions.options,
                  onChange: handleBulkActionChange,
                  getOptionLabel: opt => opt.label,
                  placeholder: "Bulk Actions",
                  disabled: actionableCheckedRows.length === 0,
                  size: "small",
                  width: (_bulkActions$width = bulkActions.width) !== null && _bulkActions$width !== void 0 ? _bulkActions$width : '160px',
                  height: "32px"
                }, bulkActionKey)
              })
            })
          }), searchBar && /*#__PURE__*/_jsx("div", {
            className: classes.searchContainer,
            children: /*#__PURE__*/_jsx(SearchInput, {
              value: searchText,
              onChange: onChangeSearch,
              disabled: Boolean(searchBar === null || searchBar === void 0 ? void 0 : searchBar.isDisabled),
              width: searchBarSize,
              height: "32px",
              placeholder: (searchBar === null || searchBar === void 0 ? void 0 : searchBar.placeholder) || ''
            })
          })]
        }), !disableColumnManagement && /*#__PURE__*/_jsxs("div", {
          className: classes.columnToolbar,
          ref: columnToolbarRef,
          children: [pillsOverflow && /*#__PURE__*/_jsx("div", {
            className: classNames(classes.pillNavButton, {
              [classes.pillNavButtonDisabled]: pillScroll.atStart
            }),
            onClick: () => !pillScroll.atStart && scrollPills(-1),
            children: /*#__PURE__*/_jsx(ChevronLeft, {
              width: 20,
              height: 20,
              "aria-hidden": true,
              focusable: "false"
            })
          }), /*#__PURE__*/_jsx("div", {
            ref: pillScrollRef,
            className: classes.hiddenColumnPills,
            style: pillMaxWidth != null ? {
              maxWidth: pillMaxWidth
            } : undefined,
            children: /*#__PURE__*/_jsx("div", {
              ref: pillTrackRef,
              className: classes.hiddenColumnPillsTrack,
              style: {
                transform: "translateX(-".concat(pillOffset, "px)")
              },
              children: hiddenColumns.map(column => /*#__PURE__*/_jsxs("div", {
                className: classes.hiddenColumnPill,
                onClick: () => toggleVisibility(column.columnKey),
                children: [/*#__PURE__*/_jsx(EyeIcon, {
                  width: 14,
                  height: 14,
                  className: classes.hiddenColumnPillIcon
                }), column.headerName]
              }, column.columnKey))
            })
          }), pillsOverflow && /*#__PURE__*/_jsx("div", {
            className: classNames(classes.pillNavButton, {
              [classes.pillNavButtonDisabled]: pillScroll.atEnd
            }),
            onClick: () => !pillScroll.atEnd && scrollPills(1),
            children: /*#__PURE__*/_jsx(ChevronRight, {
              width: 20,
              height: 20,
              "aria-hidden": true,
              focusable: "false"
            })
          }), hiddenColumns.length > 0 && /*#__PURE__*/_jsx(Button, {
            type: "button",
            variant: "textOnly",
            size: "small",
            onClick: showAll,
            testId: "table-show-all-columns",
            children: showAllColumnsText
          }), /*#__PURE__*/_jsxs("div", {
            className: classes.columnCountTrigger,
            onClick: () => setIsColumnDrawerOpen(true),
            children: ["".concat(visibleColumns.length, " of ").concat(columns.length, " columns visible"), /*#__PURE__*/_jsx(ColumnLayout, {
              className: classes.columnCountTriggerIcon
            })]
          })]
        })]
      })
    }), !isNewRowTable && !disableColumnManagement && /*#__PURE__*/_jsx(ColumnSettingsDrawer, {
      isOpen: isColumnDrawerOpen,
      onClose: () => setIsColumnDrawerOpen(false),
      orderedColumns: orderedColumns.filter(column => column.field || column.isActions),
      toggleVisibility: toggleVisibility,
      togglePin: togglePin,
      reorderField: reorderField,
      resetAll: handleResetAll,
      showAll: showAll
    }), /*#__PURE__*/_jsx(TableGrid, {
      stickyHeader: stickyHeader,
      allowDraggableRow: allowDraggableRow,
      onDragEnd: onDragEnd,
      tableNode: tableNode,
      headerProps: headerProps,
      rowList: rowList,
      getRowId: getRowId,
      effectiveColumns: effectiveColumns,
      highlightedRow: highlightedRow,
      allowRowSelect: allowRowSelect,
      onRowSelect: onRowSelect,
      handleExpandedRows: handleExpandedRows,
      expandedRows: expandedRows,
      noDataMessage: noDataMessage,
      expandedContent: expandedContent,
      isActionColumnCollapsed: isActionColumnCollapsed,
      activeCheckedRows: activeCheckedRows,
      onCheckRow: handleCheckRow,
      checkboxDisabledByRow: checkboxDisabledByRow,
      isNewRowTable: isNewRowTable
    }), addNewRow && /*#__PURE__*/_jsx("div", {
      className: "".concat(classes.addNewRow, " ").concat((rows === null || rows === void 0 ? void 0 : rows.length) === 0 ? classes.emptyNewRowHeader : ""),
      children: /*#__PURE__*/_jsx(Table, {
        hideNewRowHeader: (rows === null || rows === void 0 ? void 0 : rows.length) === 0,
        columns: columnsForNewRow,
        isNewRowTable: true,
        reserveDragHandleColumn: allowDraggableRow
      })
    })]
  });
};
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string,
    headerName: PropTypes.string.isRequired,
    renderHeader: PropTypes.func,
    sortable: PropTypes.bool,
    width: PropTypes.string,
    horizontalAlignment: PropTypes.string,
    onExpand: PropTypes.func,
    allowExpand: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    isActions: PropTypes.bool,
    actions: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    actionsMenuWidth: PropTypes.string,
    actionsAlignment: PropTypes.oneOf(['start', 'end', 'center']),
    actionsDirection: PropTypes.oneOf(['row', 'column']),
    disableTruncation: PropTypes.bool,
    disableColumnMenu: PropTypes.bool,
    isStatus: PropTypes.bool,
    statusType: PropTypes.oneOfType([PropTypes.oneOf(statusTypeList), PropTypes.func]),
    statusIcon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element, PropTypes.string, PropTypes.func]),
    statusLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    statusHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
  sortHandler: PropTypes.func,
  searchBar: PropTypes.shape({
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string
  }),
  allowRowSelect: PropTypes.bool,
  onRowSelect: PropTypes.func,
  highlightedRow: PropTypes.object,
  noDataMessage: PropTypes.string,
  checkedRows: PropTypes.arrayOf(PropTypes.object),
  allowCheckbox: PropTypes.bool,
  allowSelectAll: PropTypes.bool,
  onCheckboxChange: PropTypes.func,
  isCheckboxDisabled: PropTypes.func,
  bulkActions: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any,
      onClick: PropTypes.func
    })).isRequired,
    width: PropTypes.string
  }),
  columnConfig: PropTypes.shape({
    pinnedColumns: PropTypes.arrayOf(PropTypes.string),
    hiddenColumns: PropTypes.arrayOf(PropTypes.string),
    defaultPinnedColumns: PropTypes.arrayOf(PropTypes.string),
    defaultHiddenColumns: PropTypes.arrayOf(PropTypes.string),
    onColumnConfigChange: PropTypes.func
  }),
  getRowId: PropTypes.func,
  leftToolbarContent: PropTypes.node,
  stickyHeader: PropTypes.bool,
  disableColumnManagement: PropTypes.bool,
  // Internal: set by the add-new-row table so its leading cell matches the
  // parent's drag handle.
  reserveDragHandleColumn: PropTypes.bool
};
export default Table;