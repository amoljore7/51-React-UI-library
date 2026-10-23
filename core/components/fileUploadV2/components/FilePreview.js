import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import CloseIcon from '../../../assets/icons/close-x.svg?react';
import Button from '../../button';
import Typography from '../../typography';
import { mountPortalRootWithThemeSync } from '../../../utils/resolve-portal-data-theme';
import { previewClasses as classes, previewCloseIconSize, previewCloseLabel, previewCloseSize, previewCloseTestId, previewCloseVariant, previewImageTestId, previewRole, previewTestId, escapeKey } from '../constants';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root,\n[data-theme] {\n  --bds-file-preview-overlay: rgba(4, 5, 32, 0.6);\n  --bds-file-preview-bg: var(--theme-content-bg);\n  --bds-file-preview-border: var(--theme-border-subtle);\n  --bds-file-preview-title: var(--theme-text-primary);\n  --bds-file-preview-tile-bg: var(--theme-hover-bg);\n  --bds-file-preview-tile-border: var(--theme-border);\n}\n\n[data-theme=light] {\n  --bds-file-preview-bg: #ffffff;\n  --bds-file-preview-border: transparent;\n  --bds-file-preview-title: #040520;\n  --bds-file-preview-tile-bg: #e6e6e9;\n  --bds-file-preview-tile-border: #cdcdd2;\n}\n\n[data-theme=dark] {\n  --bds-file-preview-bg: #0a0b2e;\n  --bds-file-preview-border: #686979;\n  --bds-file-preview-title: #ffffff;\n  --bds-file-preview-tile-bg: #040520;\n  --bds-file-preview-tile-border: #686979;\n}\n\n.bds-file-preview-portal {\n  position: fixed;\n  z-index: 1000;\n  color: var(--bds-file-preview-title);\n}\n\n.bds-file-preview {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: flex;\n  flex-direction: column;\n  width: 23.75rem;\n  max-width: calc(100vw - 3rem);\n  max-height: calc(100vh - 3rem);\n  overflow: hidden;\n  background-color: var(--bds-file-preview-bg);\n  border: 0.0625rem solid var(--bds-file-preview-border);\n  border-radius: 0.75rem;\n  box-shadow: 0px 2px 8px rgba(4, 5, 32, 0.1), 0px 16px 20px rgba(4, 5, 32, 0.2), 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n.bds-file-preview__overlay {\n  position: fixed;\n  inset: 0;\n  background-color: var(--bds-file-preview-overlay);\n}\n.bds-file-preview__header {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n}\n.bds-file-preview__title {\n  flex: 1;\n  min-width: 0;\n  word-break: break-word;\n  color: var(--bds-file-preview-title);\n}\n.bds-file-preview__body {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex: 1;\n  min-height: 0;\n  padding: 1.5rem;\n}\n.bds-file-preview__tile {\n  display: flex;\n  flex: 0 1 16.25rem;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  padding: 1rem;\n  overflow: hidden;\n  background-color: var(--bds-file-preview-tile-bg);\n  border: 0.0625rem solid var(--bds-file-preview-tile-border);\n  border-radius: 0.5rem;\n}\n.bds-file-preview__image {\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n}";
  const fileName = "FilePreview_FilePreview_ef196014-583d-4625-9274-dbeabdaabfc9";
  const element = document.querySelector("style[data-sass-component='FilePreview_FilePreview_ef196014-583d-4625-9274-dbeabdaabfc9']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})(); // Lightbox for the picked or stored asset. Portaled to `document.body` like the other overlays,
// so it needs the theme mirrored across explicitly.
const FilePreview = _ref => {
  let {
    title,
    src,
    onClose,
    themeSourceRef
  } = _ref;
  const [portalEl] = useState(() => document.createElement('div'));
  useEffect(() => {
    portalEl.className = classes.portal;
    return mountPortalRootWithThemeSync(portalEl, themeSourceRef);
  }, [portalEl, themeSourceRef]);
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === escapeKey) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  return /*#__PURE__*/createPortal(/*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      className: classes.overlay,
      onClick: onClose
    }), /*#__PURE__*/_jsxs("div", {
      className: classes.dialog,
      role: previewRole,
      "data-testid": previewTestId,
      children: [/*#__PURE__*/_jsxs("div", {
        className: classes.header,
        children: [/*#__PURE__*/_jsx("span", {
          className: classes.title,
          children: /*#__PURE__*/_jsx(Typography, {
            variant: "heading5",
            children: title
          })
        }), /*#__PURE__*/_jsx(Button, {
          variant: previewCloseVariant,
          size: previewCloseSize,
          iconOnly: true,
          leftSVGIcon: /*#__PURE__*/_jsx(CloseIcon, {
            width: previewCloseIconSize,
            height: previewCloseIconSize
          }),
          onClick: onClose,
          extraProps: {
            'aria-label': previewCloseLabel,
            'data-testid': previewCloseTestId
          }
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: classes.body,
        children: /*#__PURE__*/_jsx("div", {
          className: classes.tile,
          children: /*#__PURE__*/_jsx("img", {
            src: src,
            alt: title,
            className: classes.image,
            "data-testid": previewImageTestId
          })
        })
      })]
    })]
  }), portalEl);
};
FilePreview.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  themeSourceRef: PropTypes.shape({
    current: PropTypes.any
  })
};
export default FilePreview;