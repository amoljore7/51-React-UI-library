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
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = "@charset \"UTF-8\";\n:root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n/**\n * --bds-table-header-bg defaults to the tinted hover-bg formula rather than\n * a flat var(--theme-content-bg): on a custom theme, a flat value resolves\n * to the exact same color as the surrounding canvas, so the header would\n * read as if it had no background at all.\n */\n:root,\n[data-theme] {\n  --bds-table-row-hover-bg: var(--theme-hover-bg);\n  --bds-table-row-checked-bg: color-mix(in srgb, var(--theme-text-primary) 20%, var(--theme-content-bg));\n  --bds-table-header-bg: var(--theme-hover-bg);\n  --bds-table-header-hover-bg: var(--theme-border-subtle);\n  --bds-table-header-pinned-bg: var(--theme-separator);\n  --bds-table-header-pinned-border: var(--theme-separator);\n  --bds-table-cell-pinned-border: var(--theme-separator);\n  --bds-table-pill-nav-color: var(--theme-text-primary);\n  --bds-table-pill-nav-disabled-color: var(--theme-text-placeholder);\n  /**\n   * Accent, not structural: the pill reads as a selection chip, so it stays\n   * the same blue on every theme instead of dissolving into a custom surface.\n   * Declared only here \u2014 the light/dark blocks deliberately don't repeat it,\n   * which is why this block's selector has to cover [data-theme] too.\n   */\n  --bds-table-hidden-pill-bg: #d0e2ff;\n  --bds-table-hidden-pill-border: #4573d2;\n  --bds-table-hidden-pill-color: rgba(4, 5, 32, 0.6);\n  --bds-table-hidden-pill-hover-bg: color-mix(in srgb, #4573d2 12%, #d0e2ff);\n  --bds-table-drawer-icon-color: var(--theme-text-secondary);\n  --bds-table-drawer-text-color: var(--theme-text-primary);\n  --bds-table-drawer-section-border: var(--theme-border-subtle);\n  --bds-table-drawer-section-title-color: var(--theme-text-secondary);\n  --bds-table-drawer-row-hover-bg: var(--theme-hover-bg);\n  --bds-table-drawer-row-action-disabled-color: var(--theme-text-placeholder);\n  --bds-table-cell-clamp-fade-end: var(--theme-content-bg);\n  --bds-table-cell-toggle-bg: var(--theme-content-bg);\n  --bds-table-cell-toggle-border: var(--theme-border);\n  --bds-table-cell-toggle-color: var(--theme-text-primary);\n  --bds-table-expanded-row-cell-bg: var(--theme-hover-bg);\n  --bds-table-expanded-row-cell-border: var(--theme-separator);\n  --bds-table-expanded-row-divider: var(--theme-separator);\n  --bds-table-actions-shadow: rgba(0, 0, 0, 0.05);\n  --bds-table-action-icon-hover-bg: var(--theme-hover-bg);\n  --bds-table-header-icon-muted-opacity: 0.45;\n  --bds-table-filter-divider: var(--theme-separator);\n  --bds-table-clear-all-active-color: var(--theme-text-primary);\n  --bds-table-clear-all-disabled-color: var(--theme-text-placeholder);\n  --bds-table-action-chevron-hover-bg: transparent;\n  --bds-table-action-icon-color: inherit;\n  --bds-table-action-icon-hover-color: inherit;\n}\n\n[data-theme=light] {\n  --bds-table-row-hover-bg: #EEEEEE;\n  --bds-table-row-checked-bg: #F0F6FF;\n  --bds-table-header-bg: #f4f4f4;\n  --bds-table-header-hover-bg: #e5e5e5;\n  --bds-table-header-pinned-bg: #e0e0e0;\n  --bds-table-header-pinned-border: #c6c6c6;\n  --bds-table-cell-pinned-border: #c6c6c6;\n  --bds-table-pill-nav-color: #393939;\n  --bds-table-pill-nav-disabled-color: #a8a8a8;\n  --bds-table-scroll-nav-color: #6f6f6f;\n  --bds-table-scroll-nav-bg: rgba(255, 255, 255, 0.85);\n  --bds-table-hidden-pill-color: #393939;\n  --bds-table-drawer-icon-color: #8d8d8d;\n  --bds-table-drawer-text-color: #393939;\n  --bds-table-drawer-section-border: #e0e0e0;\n  --bds-table-drawer-section-title-color: #6f6f6f;\n  --bds-table-drawer-row-hover-bg: #f4f4f4;\n  --bds-table-drawer-row-action-disabled-color: #c6c6c6;\n  --bds-table-cell-clamp-fade-end: #ffffff;\n  --bds-table-cell-toggle-bg: #ffffff;\n  --bds-table-cell-toggle-border: #a8a8a8;\n  --bds-table-cell-toggle-color: #393939;\n  --bds-table-expanded-row-cell-bg: #f4f4f4;\n  --bds-table-expanded-row-cell-border: #e0e0e0;\n  --bds-table-expanded-row-divider: #c6c6c6;\n  --bds-table-action-icon-hover-bg: #e0e0e0;\n  --bds-table-filter-divider: #c6c6c6;\n  --bds-table-clear-all-active-color: #007bff;\n  --bds-table-clear-all-disabled-color: #a8a8a8;\n  --bds-table-action-chevron-hover-bg: transparent;\n  --bds-table-action-icon-color: inherit;\n  --bds-table-action-icon-hover-color: inherit;\n}\n\n[data-theme=dark] {\n  --bds-table-header-bg: var(--theme-content-bg);\n  --bds-table-header-hover-bg: #0a0b2e;\n  --bds-table-header-pinned-bg: #040520;\n  --bds-table-header-pinned-border: #686979;\n  --bds-table-cell-pinned-border: #686979;\n  --bds-table-pill-nav-color: #ffffff;\n  --bds-table-pill-nav-disabled-color: #9b9ba6;\n  --bds-table-scroll-nav-color: #9b9ba6;\n  --bds-table-scroll-nav-bg: color-mix(in srgb, var(--theme-content-bg) 85%, transparent);\n  --bds-table-drawer-icon-color: #9b9ba6;\n  --bds-table-drawer-row-action-disabled-color: #686979;\n  --bds-table-drawer-text-color: #ffffff;\n  --bds-table-drawer-section-border: #0a0b2e;\n  --bds-table-drawer-section-title-color: #9b9ba6;\n  --bds-table-drawer-row-hover-bg: #0a0b2e;\n  --bds-table-expanded-row-cell-bg: #0a0b2e;\n  --bds-table-expanded-row-cell-border: #686979;\n  --bds-table-expanded-row-divider: #686979;\n  --bds-table-actions-shadow: rgba(0, 0, 0, 0.16);\n  --bds-table-action-icon-hover-bg: #686979;\n  --bds-table-header-icon-muted-opacity: 0.55;\n  --bds-table-filter-divider: #686979;\n  --bds-table-clear-all-active-color: #ffffff;\n  --bds-table-clear-all-disabled-color: #9b9ba6;\n  --bds-table-action-chevron-hover-bg: rgba(255, 255, 255, 0.1);\n  --bds-table-action-icon-color: #9b9ba6;\n  --bds-table-action-icon-hover-color: #ffffff;\n}\n\n/**\n * ModalPopup and OverflowMenu render via portals appended to <body>, outside\n * .bds-table-container \u2014 these rules must stay unscoped or they never match.\n */\n.filter-menus {\n  background-color: var(--theme-content-bg);\n  box-shadow: 0 2px 8px color-mix(in srgb, var(--theme-text-primary) 20%, transparent), 0 0 0 1px color-mix(in srgb, var(--theme-text-primary) 15%, transparent);\n  color: var(--theme-text-primary);\n  border-radius: 6px;\n  font-weight: 400;\n  z-index: 3000;\n  /**\n   * top/left/width are computed in JS from the trigger's viewport position\n   * and set inline; fixed (not absolute) so the panel isn't clipped by the\n   * table's scrollable ancestor.\n   */\n  position: fixed;\n}\n.filter-menus-search {\n  margin: 8px;\n}\n.filter-menus-menu-divider {\n  border: 0;\n  border-top: 1px solid var(--bds-table-filter-divider);\n}\n.filter-menus-filter-list {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  overflow-y: auto;\n  max-height: 280px;\n}\n.filter-menus-action-btns {\n  /**\n   * Horizontal margins match the search row's, so the buttons keep their\n   * gutter now that the panel can shrink to exactly this row's width.\n   */\n  margin: 0 8px 8px;\n  justify-content: flex-end;\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n}\n.filter-menus-no-data-found {\n  padding: 8px 12px;\n}\n.filter-menus-filter-menus-list {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 8px 12px;\n  overflow-wrap: anywhere;\n  /**\n   * Checkbox and radio containers are flex-shrink: 0 by default, so a long\n   * option label pushes past the panel rather than wrapping inside it.\n   * They need to shrink, and min-width: 0 to get below their content size.\n   */\n}\n.filter-menus-filter-menus-list .bds-checkbox-container,\n.filter-menus-filter-menus-list .radio-container {\n  flex-shrink: 1;\n  min-width: 0;\n}\n.filter-menus-filter-menus-list .bds-checkbox-icon-container {\n  flex-shrink: 0;\n}\n.filter-menus-filter-menus-list .bds-label-container,\n.filter-menus-filter-menus-list .label-container {\n  min-width: 0;\n}\n.filter-menus-clear-all {\n  margin-left: 13px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.filter-menus-clear-all-label {\n  font-size: 0.875rem;\n  line-height: 0.875rem;\n  font-weight: 400;\n  letter-spacing: 0.02rem;\n}\n\n.bds-table-column-drawer-body {\n  padding: 0 16px 8px;\n}\n\n.bds-table-column-drawer-section {\n  padding: 12px 0 4px;\n  border-bottom: 1px solid var(--bds-table-drawer-section-border);\n}\n.bds-table-column-drawer-section:last-child {\n  border-bottom: none;\n}\n\n.bds-table-column-drawer-section-title {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--bds-table-drawer-section-title-color);\n  margin-bottom: 4px;\n}\n\n.bds-table-column-drawer-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 4px;\n  border-radius: 4px;\n  min-height: 36px;\n}\n.bds-table-column-drawer-row:hover {\n  background: var(--bds-table-drawer-row-hover-bg);\n}\n\n.bds-table-column-drawer-row-dragging {\n  opacity: 0.6;\n}\n\n.bds-table-column-drawer-drag-handle {\n  display: flex;\n  align-items: center;\n  cursor: grab;\n  flex-shrink: 0;\n  color: var(--bds-table-drawer-icon-color);\n}\n\n.bds-table-column-drawer-lock-icon {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n  width: 16px;\n  color: var(--bds-table-drawer-icon-color);\n}\n\n.bds-table-column-drawer-row-label {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 0.875rem;\n  color: var(--bds-table-drawer-text-color);\n  font-weight: 400;\n}\n\n.bds-table-column-drawer-row-actions {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n  margin-left: auto;\n}\n\n.bds-table-column-drawer-row-action-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  color: var(--bds-table-drawer-icon-color);\n  padding: 0;\n}\n.bds-table-column-drawer-row-action-button:hover {\n  color: var(--bds-table-drawer-text-color);\n}\n\n.bds-table-column-drawer-row-action-disabled {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  color: var(--bds-table-drawer-row-action-disabled-color);\n  cursor: default;\n}\n\n.bds-table-column-menu-option {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  line-height: 1;\n}\n\n.bds-table-column-menu-option-icon {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n\n.bds-table-column-menu-option-text {\n  white-space: nowrap;\n  line-height: 1.2;\n}\n\n.bds-table-container {\n  width: 100%;\n  height: 100%;\n  min-width: 26.5rem;\n  display: flex;\n  flex-direction: column;\n  isolation: isolate;\n}\n.bds-table-container .bds-table-search {\n  flex-shrink: 0;\n  position: sticky;\n  top: 0;\n  z-index: 3;\n  box-sizing: border-box;\n  min-height: 3.5rem;\n  border-bottom: none;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding-right: 0.5rem;\n  background: var(--theme-content-bg);\n  max-width: 100%;\n  min-width: 26.5rem;\n}\n.bds-table-container .bds-table-toolbar-left-group {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.bds-table-container .bds-table-search-container {\n  display: flex;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.bds-table-container .bds-table-search-container .search-container {\n  border-color: var(--theme-border);\n  background-color: var(--theme-content-bg);\n}\n.bds-table-container .bds-table-search-container .search-box::placeholder {\n  color: var(--theme-text-placeholder);\n}\n.bds-table-container .bds-table-search-container .container {\n  padding: 0;\n}\n.bds-table-container .bds-table-bulk-actions {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n.bds-table-container .bds-table-left-toolbar-content {\n  display: flex;\n  align-items: center;\n  height: 32px;\n  flex-shrink: 0;\n}\n.bds-table-container .bds-table-left-toolbar-content > * {\n  box-sizing: border-box;\n  height: 32px;\n}\n.bds-table-container {\n  /**\n   * Sits alongside the search box on .bds-table-search's row; margin-left:\n   * auto pushes it to the far right whether or not a search box is present.\n   */\n}\n.bds-table-container .bds-table-column-toolbar {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 4px;\n  margin-left: auto;\n  padding: 8px 0;\n}\n.bds-table-container .bds-table-pill-nav-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  color: var(--bds-table-pill-nav-color);\n  cursor: pointer;\n  flex-shrink: 0;\n  user-select: none;\n}\n.bds-table-container .bds-table-pill-nav-button--disabled {\n  color: var(--bds-table-pill-nav-disabled-color);\n  cursor: default;\n}\n.bds-table-container .bds-table-hidden-column-pills {\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.bds-table-container .bds-table-hidden-column-pills-track {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: max-content;\n  transition: transform 300ms ease-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .bds-table-container .bds-table-hidden-column-pills-track {\n    transition: none;\n  }\n}\n.bds-table-container .bds-table-hidden-column-pill {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-bottom: 4px;\n  padding: 4px 12px;\n  border: 1px solid var(--bds-table-hidden-pill-border);\n  border-radius: 999px;\n  background: var(--bds-table-hidden-pill-bg);\n  color: var(--bds-table-hidden-pill-color);\n  font-size: 0.875rem;\n  cursor: pointer;\n}\n.bds-table-container .bds-table-hidden-column-pill:hover {\n  background: var(--bds-table-hidden-pill-hover-bg);\n}\n.bds-table-container .bds-table-hidden-column-pill-icon {\n  flex-shrink: 0;\n}\n.bds-table-container .bds-table-column-count-trigger {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  border: none;\n  background: transparent;\n  color: var(--theme-text-primary);\n  font-size: 0.875rem;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.bds-table-container .bds-table-column-count-trigger-icon {\n  flex-shrink: 0;\n}\n.bds-table-container .bds-table-sort-icon-resize-container {\n  display: flex;\n  align-items: center;\n  /**\n   * Same gap the outer icon container uses, so sort / filter / menu are\n   * spaced like every other pair in the header row instead of sitting flush.\n   */\n  gap: 4px;\n}\n.bds-table-container .bds-table-column-icon-container {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.bds-table-container .bds-table-header-icon svg {\n  color: inherit;\n  display: block;\n}\n.bds-table-container .bds-table-sort-icon-stack {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.bds-table-container {\n  /**\n   * Chevron size comes from props; only the overlap lives here, closing the\n   * dead space each glyph carries inside its viewBox.\n   */\n}\n.bds-table-container .bds-table-sort-icon-stack svg + svg {\n  margin-top: calc(-1 * 0.375rem);\n}\n.bds-table-container .bds-table-header-icon svg .bds-icon-muted {\n  opacity: var(--bds-table-header-icon-muted-opacity);\n}\n.bds-table-container .bds-table-non-selectable-header {\n  user-select: none;\n  -webkit-user-drag: none;\n  touch-action: none;\n}\n.bds-table-container .bds-table-scroll-wrapper {\n  flex: 1;\n  min-height: 0;\n  overflow: auto;\n}\n.bds-table-container {\n  /**\n   * Column scroll controls on the header row. A zero-height layer just above\n   * the scroll wrapper, outside it so the wrapper's overflow doesn't clip\n   * them; ColumnScrollButtons sets its top to the middle of the header row\n   * and --bds-table-scroll-nav-height to its height. Lets clicks through to\n   * the header cells. Above pinned header cells (z-index 5).\n   *\n   * Each side is an edge fade holding a chevron, shown while there's more to\n   * scroll that way and faded out at the end it can't pass.\n   */\n}\n.bds-table-container .bds-table-scroll-nav {\n  position: relative;\n  z-index: 6;\n  height: 0;\n  pointer-events: none;\n}\n.bds-table-container .bds-table-scroll-nav__edge {\n  position: absolute;\n  top: 0;\n  display: flex;\n  align-items: center;\n  width: 48px;\n  height: var(--bds-table-scroll-nav-height, 2.5rem);\n  transform: translateY(-50%);\n  transition: opacity 150ms ease-out;\n}\n.bds-table-container .bds-table-scroll-nav__edge--left {\n  left: var(--bds-table-pinned-left-width, 0px);\n  justify-content: flex-start;\n  background: linear-gradient(to right, var(--bds-table-scroll-nav-bg) 55%, transparent);\n}\n.bds-table-container .bds-table-scroll-nav__edge--right {\n  right: var(--bds-table-pinned-right-width, 0px);\n  justify-content: flex-end;\n  background: linear-gradient(to left, var(--bds-table-scroll-nav-bg) 55%, transparent);\n}\n.bds-table-container .bds-table-scroll-nav__edge--hidden {\n  opacity: 0;\n}\n.bds-table-container .bds-table-scroll-nav__edge--hidden .bds-table-scroll-nav__control {\n  pointer-events: none;\n}\n.bds-table-container .bds-table-scroll-nav__control {\n  --bds-btn-tertiary-tint-bg-hover: transparent;\n  --bds-btn-tertiary-tint-bg-active: transparent;\n  --bds-btn-tertiary-tint-text: var(--bds-table-scroll-nav-color);\n  display: flex;\n  pointer-events: auto;\n}\n.bds-table-container .bds-table-sticky-header-scroll {\n  position: sticky;\n  top: var(--bds-table-sticky-header-offset, 0px);\n  z-index: 4;\n  overflow-x: auto;\n  overflow-y: hidden;\n  background: var(--theme-content-bg);\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n}\n.bds-table-container .bds-table-sticky-header-scroll::-webkit-scrollbar {\n  display: none;\n}\n.bds-table-container .bds-table {\n  min-width: 100%;\n  width: max-content;\n  height: 100%;\n  display: table;\n  position: relative;\n  background: var(--theme-content-bg);\n}\n.bds-table-container .bds-table-header-cell {\n  box-sizing: border-box;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  color: var(--theme-text-primary);\n  border-bottom: 0.03125rem solid var(--theme-separator);\n  padding-right: 0;\n  font-size: 0.875rem;\n  height: 2.5rem;\n  overflow: hidden;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  /**\n   * Header cells outrank every body cell (pinned body cells are 2) so the\n   * sticky header \u2014 and the column filter panel inside it \u2014 is never\n   * painted over by a pinned column.\n   */\n  z-index: 4;\n  background: var(--bds-table-header-bg);\n  color: var(--theme-text-primary);\n}\n.bds-table-container .bds-table-header-cell:hover {\n  background: var(--bds-table-header-hover-bg);\n}\n.bds-table-container .bds-table-header-cell-no-background {\n  box-sizing: border-box;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  color: var(--theme-text-primary);\n  border-bottom: 0.03125rem solid var(--theme-separator);\n  padding-right: 0;\n  font-size: 0.875rem;\n  height: 2.5rem;\n  overflow: hidden;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  /**\n   * Header cells outrank every body cell (pinned body cells are 2) so the\n   * sticky header \u2014 and the column filter panel inside it \u2014 is never\n   * painted over by a pinned column.\n   */\n  z-index: 4;\n}\n.bds-table-container .bds-table-header-cell:first-child {\n  border-left: none;\n}\n.bds-table-container .bds-table-header-cell:last-child,\n.bds-table-container .bds-table-header-cell-no-background:last-child {\n  border-right: none;\n  padding-right: 1rem;\n}\n.bds-table-container .bds-table-header-cell:has(.filter-menus),\n.bds-table-container .bds-table-header-cell-no-background:has(.filter-menus) {\n  z-index: 2;\n}\n.bds-table-container .bds-table-header-text-icon {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  min-width: 0;\n  overflow: hidden;\n  height: 100%;\n  contain: inline-size;\n}\n.bds-table-container .bds-table-resizer {\n  display: flex;\n  box-sizing: content-box;\n  width: 1px;\n  height: 2rem;\n  min-width: 0;\n  padding: 0 0 0 8px;\n  cursor: col-resize;\n  background: none;\n  background-clip: content-box;\n}\n.bds-table-container .bds-table-resizer-hover {\n  background-color: var(--theme-text-primary);\n}\n.bds-table-container .bds-table-header-text {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-weight: 700;\n  font-family: \"OpenSansRegular\";\n  letter-spacing: 0.03125rem;\n  overflow: hidden;\n  min-width: 0;\n}\n.bds-table-container .bds-table-header-left-icons {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  flex-shrink: 0;\n}\n.bds-table-container .bds-table-header-text-label {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -ms-text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n}\n.bds-table-container .bds-table-header-text-cursor {\n  cursor: pointer;\n}\n.bds-table-container .bds-table-header-icon {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  opacity: 0;\n  transition: opacity 0.15s ease;\n}\n.bds-table-container .bds-table-header-cell:hover .bds-table-header-icon,\n.bds-table-container .bds-table-header-cell-no-background:hover .bds-table-header-icon,\n.bds-table-container .bds-table-header-cell:focus-within .bds-table-header-icon,\n.bds-table-container .bds-table-header-cell-no-background:focus-within .bds-table-header-icon,\n.bds-table-container .bds-table-header-icon-sorted {\n  opacity: 1;\n}\n.bds-table-container .bds-table-cell {\n  box-sizing: border-box;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  color: var(--theme-text-primary);\n  font-size: 0.875rem;\n  font-family: \"OpenSansRegular\";\n  line-height: 1.1875rem;\n  letter-spacing: 0.02rem;\n  padding-top: 0.84375rem;\n  padding-bottom: 0.90625rem;\n  border-bottom: 0.03125rem solid var(--theme-separator);\n  max-width: 0;\n}\n.bds-table-container .bds-table-cell-render {\n  box-sizing: border-box;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  color: var(--theme-text-primary);\n  font-size: 0.875rem;\n  font-family: \"OpenSansRegular\";\n  line-height: 1.1875rem;\n  letter-spacing: 0.02rem;\n  border-bottom: 0.03125rem solid var(--theme-separator);\n  max-width: 0;\n}\n.bds-table-container {\n  /**\n   * Sticky-positioned pinned cells need an opaque background to mask the\n   * row content scrolling underneath them. Uses var(--theme-content-bg)\n   * directly rather than a dedicated token so it always matches whatever\n   * an unpinned cell shows through to (the ambient content background),\n   * instead of a fixed value that can drift from a consumer's own container.\n   * The transparent border-right prevents a 1px sub-pixel rendering gap\n   * between adjacent pinned columns; bds-table-cell-pinned-last overrides it.\n   */\n}\n.bds-table-container .bds-table-cell-pinned {\n  background: var(--theme-content-bg);\n  border-right: 1px solid transparent;\n  z-index: 2;\n}\n.bds-table-container .bds-table-cell-pinned-last {\n  border-right: 2px solid var(--bds-table-cell-pinned-border);\n}\n.bds-table-container .bds-table-row-dragging .bds-table-cell,\n.bds-table-container .bds-table-row-dragging .bds-table-cell-render {\n  max-width: none !important;\n}\n.bds-table-container .bds-table-expanded-row {\n  background-color: var(--theme-border-subtle);\n  transition: height 0.5s ease-in;\n}\n.bds-table-container .bds-table-expanded-row .bds-table-cell {\n  background-color: var(--bds-table-expanded-row-cell-bg) !important;\n  border-bottom: 1px solid var(--bds-table-expanded-row-cell-border) !important;\n}\n.bds-table-container .bds-table-expanded-row:hover .bds-table-cell {\n  background-color: var(--bds-table-row-hover-bg) !important;\n}\n.bds-table-container .bds-table-row:not(.bds-table-expanded-row) + .bds-table-expanded-row .bds-table-cell {\n  border-top: 2px solid var(--bds-table-expanded-row-divider) !important;\n}\n.bds-table-container .bds-table-expanded-row-cell-render {\n  line-height: 3.1875rem;\n}\n.bds-table-container .bds-table-expanded-row-content-render {\n  background-color: var(--theme-content-bg);\n  border-top: 2px solid var(--theme-border);\n  vertical-align: baseline;\n}\n.bds-table-container .bds-table-expanded-row-no-data-found {\n  display: flex;\n  justify-content: space-around;\n}\n.bds-table-container .bds-table-expand-row {\n  display: flex;\n  gap: 2px;\n  align-items: center;\n}\n.bds-table-container .bds-table-cell-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  flex: 0 0 auto;\n  width: 1.75rem;\n  height: 1.75rem;\n  min-width: 1.75rem;\n  min-height: 1.75rem;\n  max-width: 1.75rem;\n  max-height: 1.75rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  overflow: hidden;\n  padding: 2px;\n  margin-right: 5px;\n}\n.bds-table-container .bds-table-cell-icon > * {\n  max-width: 100%;\n  max-height: 100%;\n}\n.bds-table-container td.bds-table-cell.bds-table-cell-expandable {\n  height: auto;\n  min-height: 3rem;\n  white-space: normal;\n  overflow: visible;\n  text-overflow: unset;\n  vertical-align: middle;\n}\n.bds-table-container .bds-table-cell-clamp {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  white-space: normal;\n  word-break: break-word;\n  width: 100%;\n}\n.bds-table-container {\n  /**\n   * The fade sits on the wrapper, not on .bds-table-cell-clamp: generated\n   * content inside a -webkit-box participates in -webkit-line-clamp and gets\n   * clamped away with the overflowing text.\n   */\n}\n.bds-table-container .bds-table-cell-clamp-wrapper {\n  position: relative;\n  flex: 1;\n  min-width: 0;\n}\n.bds-table-container .bds-table-cell-clamp-wrapper--faded::after {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 2em;\n  background: linear-gradient(to bottom, transparent, var(--bds-table-cell-clamp-fade-end));\n  pointer-events: none;\n}\n.bds-table-container .bds-table-cell-clamp-wrapper--expanded {\n  padding-bottom: 1.5em;\n}\n.bds-table-container .bds-table-cell-toggle {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  background: var(--bds-table-cell-toggle-bg);\n  border: 1px solid var(--bds-table-cell-toggle-border);\n  border-radius: 10px;\n  padding: 2px 8px;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--bds-table-cell-toggle-color);\n  line-height: 1.5;\n  outline: none;\n  white-space: nowrap;\n  transition: background-color 0.15s ease;\n  z-index: 1;\n}\n.bds-table-container .bds-table-cell-toggle:hover {\n  background-color: var(--theme-hover-bg);\n}\n.bds-table-container .bds-table-expand-row-icons {\n  cursor: pointer;\n}\n.bds-table-container .bds-table-row > .bds-table-cell-render:last-child {\n  border-right: none;\n}\n.bds-table-container .bds-table-cell-custom {\n  box-sizing: border-box;\n  width: 100%;\n  border-left: none;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n}\n.bds-table-container .bds-table-row td:last-child .bds-table-cell-custom {\n  border-right: none;\n}\n.bds-table-container .bds-table-row td.bds-table-cell:last-child {\n  border-right: none;\n}\n.bds-table-container .bds-table-row-selectable:hover {\n  cursor: pointer;\n}\n.bds-table-container .bds-table-cell-actions {\n  background: var(--theme-content-bg);\n  position: sticky;\n  right: 0;\n  z-index: 2;\n}\n.bds-table-container td.bds-table-cell.bds-table-cell-actions {\n  height: auto;\n  min-height: 3rem;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n.bds-table-container .bds-table-header-cell-actions {\n  background: var(--bds-table-header-bg);\n  position: sticky;\n  right: 0;\n  z-index: 5;\n  min-width: 0;\n}\n.bds-table-container .bds-table-header-cell-actions .bds-table-header-text-label {\n  overflow: visible;\n  text-overflow: unset;\n  white-space: nowrap;\n  min-width: unset;\n}\n.bds-table-container .bds-table-header-cell-actions--collapsed {\n  padding: 0;\n}\n.bds-table-container .bds-table-header-cell-actions--collapsed .bds-table-action-column-header {\n  justify-content: center;\n  padding: 0;\n}\n.bds-table-container .bds-table-action-column-header {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n.bds-table-container .bds-table-action-column-chevron {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  cursor: pointer;\n  color: inherit;\n  line-height: 1;\n}\n.bds-table-container .bds-table-action-column-chevron:hover {\n  background: var(--bds-table-action-chevron-hover-bg);\n}\n.bds-table-container .bds-table-action-icons-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  box-sizing: border-box;\n}\n.bds-table-container .bds-table-action-icon-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  line-height: 1;\n  color: var(--bds-table-action-icon-color);\n}\n.bds-table-container .bds-table-action-icon-btn:hover {\n  background: var(--bds-table-action-icon-hover-bg);\n  color: var(--bds-table-action-icon-hover-color);\n}\n.bds-table-container .bds-table-row-highlighted {\n  background-color: var(--bds-table-row-hover-bg);\n}\n.bds-table-container .bds-table-row-highlighted .bds-table-cell-pinned {\n  background-color: var(--bds-table-row-hover-bg);\n}\n.bds-table-container .bds-table-row-highlighted .bds-table-cell-actions,\n.bds-table-container .bds-table-row:hover .bds-table-cell-actions {\n  background-color: var(--bds-table-row-hover-bg);\n}\n.bds-table-container .bds-table-row:hover {\n  background-color: var(--bds-table-row-hover-bg);\n}\n.bds-table-container .bds-table-row:hover .bds-table-cell-pinned {\n  background-color: var(--bds-table-row-hover-bg);\n}\n.bds-table-container .bds-table-row-checked,\n.bds-table-container .bds-table-row-checked:hover {\n  background-color: var(--bds-table-row-checked-bg);\n}\n.bds-table-container .bds-table-row-checked .bds-table-cell-pinned,\n.bds-table-container .bds-table-row-checked .bds-table-cell-actions,\n.bds-table-container .bds-table-row-checked:hover .bds-table-cell-pinned,\n.bds-table-container .bds-table-row-checked:hover .bds-table-cell-actions {\n  background-color: var(--bds-table-row-checked-bg);\n}\n.bds-table-container .bds-overflow-menu-item {\n  font-size: 0.875rem;\n  font-family: \"OpenSansRegular\";\n}\n.bds-table-container .bds-overflow-menu-item:hover {\n  background-color: var(--theme-hover-bg);\n  letter-spacing: 0.02rem;\n}\n.bds-table-container .bds-table-row-dragging {\n  background-color: var(--bds-table-row-hover-bg);\n  border-bottom: 0.03125rem solid var(--theme-separator);\n}\n.bds-table-container table,\n.bds-table-container tbody,\n.bds-table-container thead,\n.bds-table-container tr,\n.bds-table-container th,\n.bds-table-container td {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: middle;\n  background: transparent;\n  border-collapse: unset;\n  text-indent: initial;\n  border-spacing: 0;\n}\n.bds-table-container td.bds-table-cell {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -ms-text-overflow: ellipsis;\n  height: 3rem;\n  white-space: nowrap;\n}\n.bds-table-container table.bds-table {\n  table-layout: fixed;\n}\n.bds-table-container .bds-add-new-row {\n  margin-top: 20px;\n}\n.bds-table-container .bds-add-new-row table,\n.bds-table-container .bds-add-new-row th,\n.bds-table-container .bds-add-new-row td {\n  background-color: var(--theme-content-bg);\n  border: none;\n}\n.bds-table-container .bds-add-new-row .bds-table-row:hover,\n.bds-table-container .bds-add-new-row .bds-table-row:hover .bds-table-cell,\n.bds-table-container .bds-add-new-row .bds-table-row:hover .bds-table-cell-render,\n.bds-table-container .bds-add-new-row .bds-table-row:hover .bds-table-cell-pinned,\n.bds-table-container .bds-add-new-row .bds-table-row:hover .bds-table-cell-actions {\n  background-color: var(--theme-content-bg);\n}\n.bds-table-container .bds-add-new-row th {\n  height: 1rem;\n}\n.bds-table-container .bds-add-new-row table {\n  padding-top: 15px;\n  padding-bottom: 15px;\n}\n.bds-table-container .bds-empty-new-row-header th {\n  height: 1px;\n}\n.bds-table-container .bds-table-column-filter {\n  display: flex;\n  align-items: center;\n}\n.bds-table-container .bds-table-column-menu {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  /**\n   * overflow-menu pins its trigger to --bds-overflow-menu-icon; inherit\n   * instead so the dots match the header text in every theme, as the pin\n   * and filter glyphs already do.\n   */\n}\n.bds-table-container .bds-table-column-menu .icon-wrapper {\n  color: inherit;\n}\n.bds-table-container .bds-table-column-menu {\n  /**\n   * The overflow-menu trigger is a fit-content box around an inline <svg>,\n   * so it picks up the line box's descender gap and ends up taller than\n   * the other header glyphs \u2014 centring the boxes then leaves it off by\n   * half that gap. Size comes from the iconSize prop; only the gap fix\n   * belongs here.\n   */\n}\n.bds-table-container .bds-table-column-menu .icon-wrapper svg {\n  display: block;\n}\n.bds-table-container .bds-table-pin-icon {\n  flex-shrink: 0;\n  color: inherit;\n  display: block;\n}\n.bds-table-container .bds-table-header-cell-pinned {\n  background: var(--bds-table-header-pinned-bg);\n  border-right: 1px solid var(--bds-table-header-pinned-bg);\n  z-index: 5;\n}\n.bds-table-container .bds-table-header-cell-pinned-last {\n  border-right: none;\n  box-shadow: inset -1px 0 0 var(--bds-table-header-pinned-border);\n}\n.bds-table-container .bds-table-header-cell-pinned-right-first:not(.bds-table-header-cell-actions) {\n  padding-left: 24px;\n}\n.bds-table-container .bds-table-header-cell-pinned-right-first {\n  border-left: 2px solid var(--bds-table-header-pinned-border);\n}\n.bds-table-container .bds-table-cell-pinned-right-first {\n  border-left: 2px solid var(--bds-table-cell-pinned-border);\n}\n.bds-table-container {\n  /**\n   * The separators above are structural and always paint. The shadow is the\n   * part that means \"content is passing underneath this column\", so it only\n   * appears while the table can still scroll that way. TableGrid.jsx puts\n   * these classes on the scroll wrapper(s).\n   */\n}\n.bds-table-container .bds-table-scrolled-from-start .bds-table-cell-pinned-last {\n  box-shadow: 2px 0 4px var(--bds-table-actions-shadow);\n}\n.bds-table-container .bds-table-scrolled-from-start .bds-table-header-cell-pinned-last {\n  box-shadow: inset -1px 0 0 var(--bds-table-header-pinned-border), 2px 0 4px var(--bds-table-actions-shadow);\n}\n.bds-table-container .bds-table-scrollable-to-end .bds-table-cell-actions,\n.bds-table-container .bds-table-scrollable-to-end .bds-table-header-cell-actions {\n  box-shadow: -2px 0 4px var(--bds-table-actions-shadow);\n}\n.bds-table-container .bds-table-compact-cell-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  /**\n   * Flex items shrink by default, so the glyph would be squeezed whenever\n   * the cell is: a dragged row is transformed and has its max-width cap\n   * lifted, which resizes the drag handle mid-drag.\n   */\n}\n.bds-table-container .bds-table-compact-cell-wrapper > * {\n  flex-shrink: 0;\n}\n.bds-table-container .filter-icon {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  /**\n   * Size comes from width/height props on the icon; only leave the rules\n   * an attribute cannot express, since a CSS rule would override those\n   * props.\n   */\n}\n.bds-table-container .filter-icon svg {\n  color: inherit;\n  display: block;\n}\n\n/* ---------------------------------------------------------------------------\n   Dark theme ([data-theme='dark'])\n   --------------------------------------------------------------------------- */\n[data-theme=dark] .bds-table-container .bds-table-expanded-row {\n  background-color: #0a0b2e;\n}\n[data-theme=dark] .bds-table-container .bds-table-expanded-row:hover .bds-table-cell {\n  background-color: #686979 !important;\n}\n[data-theme=dark] .bds-table-container .bds-table-row:hover .bds-table-cell,\n[data-theme=dark] .bds-table-container .bds-table-row:hover .bds-table-cell-render {\n  border-right-color: var(--theme-hover-bg);\n  border-left-color: var(--theme-hover-bg);\n}\n[data-theme=dark] .bds-table-container .bds-table-row-dragging {\n  border-bottom-color: var(--theme-border);\n}";
  const fileName = "ColumnFilter_table_3d6ac86b-9ca9-446d-bbc8-ec5f84500627";
  const element = document.querySelector("style[data-sass-component='ColumnFilter_table_3d6ac86b-9ca9-446d-bbc8-ec5f84500627']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import RadioButton from '../radio';
import { mountPortalRootWithThemeSync } from '../../utils/resolve-portal-data-theme';

// Minimum gap kept between the panel and either viewport edge.
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const EDGE_MARGIN = 8;
const Filter = _ref => {
  let {
    options = [],
    values = [],
    onApply = () => {},
    singleSelector = false,
    onSearch,
    width = filterMenuWidth
  } = _ref;
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
  const searchedData = searchText && typeof onSearch !== 'function' ? options.filter(filter => {
    var _filter$label;
    return filter === null || filter === void 0 || (_filter$label = filter.label) === null || _filter$label === void 0 ? void 0 : _filter$label.toString().toLowerCase().includes(searchText.toLowerCase());
  }) : options;
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
    if ((filters === null || filters === void 0 ? void 0 : filters.length) !== 0) {
      const finalFilters = filters === null || filters === void 0 ? void 0 : filters.filter(data => appliedFilterValues === null || appliedFilterValues === void 0 ? void 0 : appliedFilterValues.includes(data));
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
    var _filterIconRef$curren, _tableRect$left, _tableRect$right;
    const rect = filterIconRef.current.getBoundingClientRect();
    const tableRect = (_filterIconRef$curren = filterIconRef.current.closest('.bds-table-container')) === null || _filterIconRef$curren === void 0 ? void 0 : _filterIconRef$curren.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    const boundsLeft = (_tableRect$left = tableRect === null || tableRect === void 0 ? void 0 : tableRect.left) !== null && _tableRect$left !== void 0 ? _tableRect$left : EDGE_MARGIN;
    const boundsRight = (_tableRect$right = tableRect === null || tableRect === void 0 ? void 0 : tableRect.right) !== null && _tableRect$right !== void 0 ? _tableRect$right : vw - EDGE_MARGIN;
    const boundsBottom = vh - EDGE_MARGIN;
    const menuWidth = Math.min(parseInt(width, 10) || 0, boundsRight - boundsLeft - EDGE_MARGIN * 2);
    let left = rect.left + menuWidth > boundsRight - EDGE_MARGIN ? rect.right - menuWidth : rect.left;
    left = Math.min(Math.max(left, boundsLeft + EDGE_MARGIN), boundsRight - menuWidth - EDGE_MARGIN);
    const top = rect.bottom;
    const maxHeight = Math.max(boundsBottom - top, 0);
    setMenuPosition({
      top,
      left,
      width: menuWidth,
      maxHeight
    });
  };
  const toggleOpen = e => {
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
  const handleSearchTxt = e => {
    var _e$target;
    setSearchText(e === null || e === void 0 || (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value);
    if (typeof onSearch === 'function') {
      var _e$target2;
      onSearch(e === null || e === void 0 || (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.value);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
    setSearchText(null);
    showAppliedFilterValues();
  };
  const handleApply = e => {
    e.stopPropagation();
    if (singleSelector) {
      onApply(selectedRadioValues);
    } else {
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
    const index = columnFilters === null || columnFilters === void 0 ? void 0 : columnFilters.indexOf(filterValue);
    if (index !== -1) {
      columnFilters === null || columnFilters === void 0 || columnFilters.splice(index, 1);
    } else {
      columnFilters === null || columnFilters === void 0 || columnFilters.push(filterValue);
    }
    setSelectedFilterValues(columnFilters);
  };
  const handleColumnRadioFilterValues = event => {
    event.stopPropagation();
    setSelectedRadioValues(event.target.value);
  };
  const handleClearAll = () => {
    setSelectedFilterValues([]);
    setSelectedRadioValues('');
  };
  const handleClickOutsideOfFilter = event => {
    // To close the filter if user clicks anywhere outside the filter menus and filter icon
    if (filterRef.current && !filterRef.current.contains(event.target) && filterIconRef && !filterIconRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutsideOfFilter, true);
    return () => {
      document.removeEventListener('click', handleClickOutsideOfFilter, true);
    };
  }, []);
  const hasAppliedValues = Array.isArray(values) ? values.length > 0 : values !== null && values !== undefined && values !== '';
  const FilterIcon = hasAppliedValues ? FilterFilled : FilterOutlined;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      ref: filterIconRef,
      className: "filter-icon",
      children: /*#__PURE__*/_jsx(FilterIcon, {
        width: filterIconSize,
        height: filterIconSize,
        onClick: toggleOpen,
        onMouseDown: e => e.stopPropagation(),
        "aria-label": "filterIcon",
        role: "img"
      })
    }), isOpen && menuPosition && /*#__PURE__*/createPortal(/*#__PURE__*/_jsxs("div", {
      ref: filterRef,
      className: "filter-menus",
      style: {
        top: menuPosition.top,
        left: menuPosition.left,
        width: menuPosition.width,
        maxHeight: menuPosition.maxHeight,
        overflowY: 'auto'
      },
      onClick: e => e.stopPropagation(),
      children: [/*#__PURE__*/_jsx("div", {
        className: "filter-menus-search",
        children: /*#__PURE__*/_jsx(Textfield, {
          placeholder: 'Search',
          icon: /*#__PURE__*/_jsx(SearchIcon, {
            width: 22,
            "aria-hidden": true,
            focusable: "false"
          }),
          iconPosition: "left",
          width: "100%",
          onChange: handleSearchTxt,
          value: searchText || ''
        })
      }), /*#__PURE__*/_jsx("hr", {
        className: "filter-menus-menu-divider"
      }), /*#__PURE__*/_jsxs("div", {
        className: "filter-menus-filter-list",
        children: [searchedData && (searchedData === null || searchedData === void 0 ? void 0 : searchedData.length) !== 0 && /*#__PURE__*/_jsx("div", {
          style: {
            cursor: (selectedFilterValues === null || selectedFilterValues === void 0 ? void 0 : selectedFilterValues.length) > 0 || (selectedRadioValues === null || selectedRadioValues === void 0 ? void 0 : selectedRadioValues.length) > 0 ? 'pointer' : 'auto'
          },
          className: "filter-menus-clear-all",
          onClick: () => handleClearAll(),
          children: /*#__PURE__*/_jsx("span", {
            className: "filter-menus-clear-all-label",
            style: {
              color: (selectedFilterValues === null || selectedFilterValues === void 0 ? void 0 : selectedFilterValues.length) > 0 || (selectedRadioValues === null || selectedRadioValues === void 0 ? void 0 : selectedRadioValues.length) > 0 ? 'var(--bds-table-clear-all-active-color)' : 'var(--bds-table-clear-all-disabled-color)'
            },
            children: "Clear All"
          })
        }), (searchedData === null || searchedData === void 0 ? void 0 : searchedData.length) === 0 && /*#__PURE__*/_jsx("div", {
          className: "filter-menus-no-data-found",
          children: /*#__PURE__*/_jsx(Typography, {
            variant: "label1",
            children: "No match is found"
          })
        }), !singleSelector ? searchedData === null || searchedData === void 0 ? void 0 : searchedData.map(filter => {
          return /*#__PURE__*/_jsx("div", {
            className: "filter-menus-filter-menus-list",
            children: /*#__PURE__*/_jsx(Checkbox, {
              checked: selectedFilterValues === null || selectedFilterValues === void 0 ? void 0 : selectedFilterValues.includes(filter === null || filter === void 0 ? void 0 : filter.value),
              onClick: e => e.stopPropagation(),
              onChange: event => {
                event.stopPropagation();
                handleColumnFilterValues(event, filter === null || filter === void 0 ? void 0 : filter.value);
              },
              name: filter === null || filter === void 0 ? void 0 : filter.label,
              label: filter === null || filter === void 0 ? void 0 : filter.label
            })
          }, filter === null || filter === void 0 ? void 0 : filter.value);
        }) : /*#__PURE__*/_jsx("div", {
          className: "filter-menus-filter-menus-list",
          onClick: e => e.stopPropagation(),
          children: /*#__PURE__*/_jsx(RadioButton, {
            direction: "vertical",
            options: searchedData.map(filter => ({
              value: filter.value,
              label: filter.label
            })),
            defaultValue: selectedRadioValues,
            onChange: event => {
              event.stopPropagation();
              handleColumnRadioFilterValues(event);
            }
          })
        })]
      }), /*#__PURE__*/_jsx("hr", {
        className: "filter-menus-menu-divider"
      }), /*#__PURE__*/_jsxs("div", {
        className: "filter-menus-action-btns",
        onClick: e => e.stopPropagation(),
        children: [/*#__PURE__*/_jsx(Button, {
          onClick: () => handleClose(),
          variant: "secondary",
          className: "btn btn-light buttons",
          children: "Cancel"
        }), /*#__PURE__*/_jsx(Button, {
          variant: "primary",
          onClick: e => handleApply(e),
          className: "filter-menus-apply-buttons",
          children: "Apply"
        })]
      })]
    }), portalEl)]
  });
};
Filter.propTypes = {
  options: PropTypes.array.isRequired,
  onApply: PropTypes.func.isRequired,
  values: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
  singleSelector: PropTypes.bool,
  onSearch: PropTypes.func,
  width: PropTypes.string
};
export default Filter;