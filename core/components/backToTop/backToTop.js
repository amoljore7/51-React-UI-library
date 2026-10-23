import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BsArrowUpShort } from 'react-icons/bs';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-back-to-top-container {\n  position: absolute;\n  box-sizing: border-box;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 3.5rem;\n  width: 3.5rem;\n  border-radius: 50%;\n  background-color: #0561a7;\n}\n.bds-back-to-top-container:hover {\n  background-color: var(--brand);\n}\n\n.bds-back-to-top-arrow {\n  color: white;\n  display: flex;\n}\n\n[id^=bds-back-to-top-modal] {\n  position: absolute;\n  width: fit-content;\n  height: fit-content;\n  min-height: 0;\n  z-index: 29;\n}\n\n[data-theme=dark] .bds-back-to-top-container {\n  background-color: #007be6;\n}\n[data-theme=dark] .bds-back-to-top-container:hover {\n  background-color: #1a94ff;\n}";
  const fileName = "backToTop_backToTop_a1b03ebb-754d-45ef-a786-36473182dffa";
  const element = document.querySelector("style[data-sass-component='backToTop_backToTop_a1b03ebb-754d-45ef-a786-36473182dffa']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import { arrowSize, bottomOffset, classes, portalId, rightOffset, width } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
const BackToTop = _ref => {
  let {
    parentRef,
    id
  } = _ref;
  const [portalModal] = useState(document.createElement('div'));
  const [show, setShow] = useState(false);
  portalModal.id = "".concat(portalId, "-").concat(id);
  portalModal.style.top = 0;
  portalModal.style.left = 0;
  useLayoutEffect(() => {
    parentRef.current && onResize();
  }, [parentRef.current]);
  const handleOnScroll = () => {
    if (parentRef.current.scrollTop >= parentRef.current.offsetHeight / 2) setShow(true);else if (parentRef.current.scrollTop <= parentRef.current.offsetHeight / 2) setShow(false);
  };
  const onResize = () => {
    if (parentRef.current) {
      const {
        bottom,
        right
      } = parentRef.current.getBoundingClientRect();
      parentRef.current.onscroll = () => handleOnScroll();
      portalModal.style.transform = "translate(".concat(right - width - rightOffset - (parentRef.current.offsetWidth - parentRef.current.clientWidth), "px,").concat(bottom - bottomOffset - width, "px)");
    }
  };
  useEffect(() => {
    document.body.appendChild(portalModal);
    return () => document.body.removeChild(portalModal);
  }, []);
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const handleClick = () => {
    parentRef.current.scrollTo(0, 0);
  };
  return show && /*#__PURE__*/createPortal(/*#__PURE__*/_jsx("div", {
    className: classes.container,
    onClick: handleClick,
    children: /*#__PURE__*/_jsx("div", {
      className: classes.arrow,
      children: /*#__PURE__*/_jsx(BsArrowUpShort, {
        size: arrowSize
      })
    })
  }), portalModal);
};
BackToTop.propTypes = {
  parentRef: PropTypes.any
};
export default BackToTop;