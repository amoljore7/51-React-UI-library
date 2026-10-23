import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '../../../assets/icons/close-file-viewer.svg?react';
import DownloadIcon from '../../../assets/icons/small-download-icon.svg?react';
import ZoomIn from '../../../assets/icons/zoom-in.svg?react';
import ZoomOut from '../../../assets/icons/zoom-out.svg?react';
import Typography from '../../../components/typography';
import { classes } from '../constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FullScreen = _ref => {
  let {
    file,
    setIsOpen
  } = _ref;
  const [percentageZoom, setPercentageZoom] = useState(0);
  const [base64File, setBase64File] = useState(null);
  const imgRef = useRef();
  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => setBase64File(fileReader.result);
      if ((file.type || '').includes('image')) {
        setIsOpen(true);
      }
    }
  }, [file]);
  const onCloseClick = () => setIsOpen(false);
  const onZoomAction = function () {
    let magnify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const imgEl = imgRef === null || imgRef === void 0 ? void 0 : imgRef.current;
    if (imgEl) {
      const aspectRatio = imgEl.width / imgEl.height;
      const currentArea = imgEl.width * imgEl.height;
      const newArea = magnify ? currentArea * 5.0 / 4.0 : currentArea * 3.0 / 4.0;
      const newHeight = Math.sqrt(newArea / aspectRatio);
      const newWidth = Math.sqrt(newArea * aspectRatio);
      imgEl.width = newWidth;
      imgEl.height = newHeight;
      setPercentageZoom(magnify ? percentageZoom + 25 : percentageZoom - 25);
    }
  };
  return file && /*#__PURE__*/_jsxs("div", {
    className: classes.fullScreenContainer,
    children: [/*#__PURE__*/_jsx(TopPanel, {
      file,
      base64File,
      onCloseClick
    }), /*#__PURE__*/_jsx("div", {
      className: classes.fullScreenImage,
      children: /*#__PURE__*/_jsx("img", {
        src: base64File,
        ref: imgRef
      })
    }), /*#__PURE__*/_jsx(BottomPanel, {
      onZoomIn: () => onZoomAction(true),
      onZoomOut: () => onZoomAction(false),
      percentageZoom
    })]
  });
};
const BottomPanel = _ref2 => {
  let {
    onZoomIn,
    onZoomOut,
    percentageZoom
  } = _ref2;
  return /*#__PURE__*/_jsx("div", {
    className: classes.fullScreenBottomPanel,
    children: /*#__PURE__*/_jsxs("div", {
      className: classes.fullScreenBottomPanelZoom,
      children: [/*#__PURE__*/_jsx(ZoomOut, {
        className: classes.fullScreenBottomPanelZoomIn,
        onClick: onZoomOut,
        "aria-hidden": true,
        focusable: "false"
      }), /*#__PURE__*/_jsx(ZoomIn, {
        className: classes.fullScreenBottomPanelZoomOut,
        onClick: onZoomIn,
        "aria-hidden": true,
        focusable: "false"
      }), percentageZoom && /*#__PURE__*/_jsx("div", {
        className: classes.fullScreenBottomPanelZoomPercentage,
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "heading6",
          children: "".concat(100 + percentageZoom, " %")
        })
      })]
    })
  });
};
const TopPanel = _ref3 => {
  let {
    file,
    base64File,
    onCloseClick
  } = _ref3;
  return /*#__PURE__*/_jsxs("div", {
    className: classes.fullScreenTopPanel,
    children: [/*#__PURE__*/_jsx("div", {
      className: classes.fullScreenTopPanelName,
      children: /*#__PURE__*/_jsx("div", {
        className: classes.fullScreenTopPanelNameTypeSize,
        children: /*#__PURE__*/_jsxs(Typography, {
          variant: "heading6",
          children: ["".concat(file.name), /*#__PURE__*/_jsx("br", {}), "".concat(file.type.substring(0, file.type.indexOf('/')), " ").concat(Math.round(file.size / 1000), " Kb")]
        })
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: classes.fullScreenTopPanelNameButtons,
      children: [/*#__PURE__*/_jsx("a", {
        href: base64File,
        download: file.name,
        children: /*#__PURE__*/_jsx(DownloadIcon, {
          "aria-hidden": true,
          focusable: "false"
        })
      }), /*#__PURE__*/_jsx(CloseIcon, {
        className: classes.fullscreenTopPanelCloseFile,
        onClick: onCloseClick,
        "aria-label": "Close",
        role: "button",
        tabIndex: 0,
        onKeyDown: e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onCloseClick();
          }
        }
      })]
    })]
  });
};
export default FullScreen;