function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Typography from '../typography';
import Button from '../button';
import Tooltip from '../tooltip';
import { classes, days, Yesterday } from './constants';
import moment from 'moment';
import classNames from 'classnames';
import Spinner from '../spinner';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-notification-card {\n  display: flex;\n  background-color: var(--theme-content-bg);\n  height: 9.9375rem;\n  flex-grow: 2;\n}\n.bds-notification-card:hover {\n  background-color: #f4f4f4;\n}\n.bds-notification-card .bds-card-content {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 2;\n  margin: 1.5rem;\n}\n.bds-notification-card .bds-card-content .bds-card-header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n.bds-notification-card .bds-card-content .bds-card-header .bds-card-title {\n  color: #6f6f6f;\n}\n.bds-notification-card .bds-card-content .bds-card-header .bds-card-time {\n  color: #6f6f6f;\n}\n.bds-notification-card .bds-card-content .bds-card-message {\n  display: flex;\n  flex-grow: 2;\n  color: var(--theme-text-primary);\n  margin-top: 0.5rem;\n  margin-bottom: 1rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -ms-text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.bds-notification-card .bds-card-content .bds-card-action-footer {\n  display: flex;\n  flex-direction: row-reverse;\n}\n.bds-notification-card .bds-card-content .bds-card-action-footer .secondary-button-spacing {\n  margin-right: 1rem;\n}\n\n.bds-notification-card-with-spinner-overlay {\n  position: relative;\n}\n\n[data-theme=dark] .bds-notification-card {\n  background-color: var(--theme-content-bg);\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-notification-card:hover {\n  background-color: #686979;\n}\n[data-theme=dark] .bds-notification-card .bds-card-title,\n[data-theme=dark] .bds-notification-card .bds-card-time {\n  color: #9b9ba6;\n}\n[data-theme=dark] .bds-notification-card .bds-card-message {\n  color: var(--theme-text-primary);\n}";
  const fileName = "card_notificationCard_9b6d82b0-0fe6-47cf-9a67-783506c2e480";
  const element = document.querySelector("style[data-sass-component='card_notificationCard_9b6d82b0-0fe6-47cf-9a67-783506c2e480']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const NotificationCard = _ref => {
  let {
    loading,
    loadingMessage,
    notificationTitle,
    notificationTime,
    notificationMessage,
    primaryActionLabel,
    primaryActionHandler,
    secondaryActionLabel,
    secondaryActionHandler,
    tooltipPosition = 'top'
  } = _ref;
  const [showTooltip, setShowTooltip] = useState(false);
  const messageRef = useRef();
  const notificationCardClasses = {
    [classes.notificationCard]: true,
    [classes.notificationCardWithSpinnerOverlay]: loading
  };
  useLayoutEffect(() => {
    if (messageRef.current.clientHeight < messageRef.current.scrollHeight) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  }, [messageRef]);
  const getTimeFormat = date => {
    const notificationDate = moment(date);
    const todayDate = moment();
    const yesterdayDate = moment().subtract(1, days);
    if (notificationDate.isSame(todayDate, days)) {
      return notificationDate.format('h:mm A');
    } else if (notificationDate.isSame(yesterdayDate, days)) {
      return "".concat(Yesterday, " ").concat(notificationDate.format('h:mm A'));
    } else {
      return notificationDate.format('MMM D');
    }
  };
  const cardHeader = () => {
    return /*#__PURE__*/_jsxs("div", {
      className: classes.cardHeader,
      children: [/*#__PURE__*/_jsx("div", {
        className: classes.cardTitle,
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "label1",
          children: notificationTitle
        })
      }), /*#__PURE__*/_jsx("div", {
        className: classes.cardTime,
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "helper1",
          children: getTimeFormat(notificationTime)
        })
      })]
    });
  };
  const cardMessage = () => {
    return /*#__PURE__*/_jsx("div", {
      ref: messageRef,
      className: classes.cardMessage,
      children: showTooltip ? /*#__PURE__*/_jsx(Tooltip, {
        title: notificationMessage,
        position: tooltipPosition,
        children: /*#__PURE__*/_jsx("div", {
          children: cardMessageBody()
        })
      }) : cardMessageBody()
    });
  };
  const cardMessageBody = () => {
    return /*#__PURE__*/_jsx(Typography, {
      variant: "body",
      children: notificationMessage
    });
  };
  const cardFooterAction = () => {
    return /*#__PURE__*/_jsxs("div", {
      className: classes.cardActionFooter,
      children: [/*#__PURE__*/_jsx(Button, {
        variant: "secondary",
        size: "small",
        onClick: primaryActionHandler,
        children: primaryActionLabel
      }), secondaryActionLabel && /*#__PURE__*/_jsx("div", {
        className: classes.secondaryButtonSpacing,
        children: /*#__PURE__*/_jsx(Button, {
          variant: "secondary",
          size: "small",
          onClick: secondaryActionHandler,
          children: secondaryActionLabel
        })
      })]
    });
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classNames(_objectSpread({}, notificationCardClasses)),
    children: [/*#__PURE__*/_jsxs("div", {
      className: classes.cardContent,
      children: [cardHeader(), cardMessage(), cardFooterAction()]
    }), loading && /*#__PURE__*/_jsx(Spinner, {
      size: "medium",
      message: loadingMessage,
      overlayOnContainer: true
    })]
  });
};
NotificationCard.propTypes = {
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  notificationTitle: PropTypes.string.isRequired,
  notificationTime: PropTypes.string.isRequired,
  notificationMessage: PropTypes.element.isRequired,
  primaryActionLabel: PropTypes.string.isRequired,
  primaryActionHandler: PropTypes.func.isRequired,
  secondaryActionLabel: PropTypes.string,
  secondaryActionHandler: PropTypes.func
};
export default NotificationCard;