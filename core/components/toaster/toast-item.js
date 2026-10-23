import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SuccessIcon from '../../assets/icons/success.svg?react';
import ErrorIcon from '../../assets/icons/error.svg?react';
import WarningIcon from '../../assets/icons/warning.svg?react';
import InfoIcon from '../../assets/icons/toast-info.svg?react';
import Close from '../../assets/icons/close.svg?react';
import Button from '../button';
import { toaster } from './toast-service';
import { classes, typeToClass } from './constants';

// Static map — avoids re-creating JSX nodes on every render
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const iconByType = {
  success: /*#__PURE__*/_jsx(SuccessIcon, {
    "aria-hidden": "true"
  }),
  error: /*#__PURE__*/_jsx(ErrorIcon, {
    "aria-hidden": "true"
  }),
  warning: /*#__PURE__*/_jsx(WarningIcon, {
    "aria-hidden": "true"
  }),
  info: /*#__PURE__*/_jsx(InfoIcon, {
    "aria-hidden": "true"
  })
};

// Shared prop shape reused by both primaryButton and secondaryButton
const buttonShape = PropTypes.shape({
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
});

// Thin wrapper so button rendering logic stays out of ToastItem
const ActionButton = _ref => {
  var _btn$disabled;
  let {
    btn
  } = _ref;
  return /*#__PURE__*/_jsx(Button, {
    variant: "textOnly",
    size: "small",
    onClick: btn.onClick,
    disabled: (_btn$disabled = btn.disabled) !== null && _btn$disabled !== void 0 ? _btn$disabled : false,
    children: btn.text
  });
};
const ToastItem = _ref2 => {
  let {
    id,
    title,
    description,
    type = 'info',
    closable,
    primaryButton,
    secondaryButton
  } = _ref2;
  const hasDescription = Boolean(description);
  const hasButtons = Boolean(primaryButton || secondaryButton);
  const buttons = hasButtons && /*#__PURE__*/_jsxs(_Fragment, {
    children: [secondaryButton && /*#__PURE__*/_jsx(ActionButton, {
      btn: secondaryButton
    }), primaryButton && /*#__PURE__*/_jsx(ActionButton, {
      btn: primaryButton
    })]
  });
  return /*#__PURE__*/_jsxs("div", {
    className: classNames(classes.toast, typeToClass[type]),
    role: type === 'error' || type === 'warning' ? 'alert' : 'status',
    children: [/*#__PURE__*/_jsx("div", {
      className: classes.accentBar
    }), /*#__PURE__*/_jsxs("div", {
      className: classes.content,
      children: [/*#__PURE__*/_jsxs("div", {
        className: classes.headRow,
        children: [/*#__PURE__*/_jsx("div", {
          className: classes.icon,
          children: iconByType[type]
        }), /*#__PURE__*/_jsx("span", {
          className: classes.title,
          children: title
        }), !hasDescription && hasButtons && buttons, closable && /*#__PURE__*/_jsx("button", {
          className: classes.closeButton,
          "aria-label": "Dismiss",
          onClick: () => toaster.dismiss(id),
          children: /*#__PURE__*/_jsx(Close, {
            "aria-hidden": "true"
          })
        })]
      }), description && /*#__PURE__*/_jsx("div", {
        className: classes.description,
        children: description
      }), hasDescription && hasButtons && /*#__PURE__*/_jsx("div", {
        className: classes.buttons,
        children: buttons
      })]
    })]
  });
};
ToastItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  closable: PropTypes.bool,
  primaryButton: buttonShape,
  secondaryButton: buttonShape
};
export default ToastItem;