import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FiPlus, FiX } from 'react-icons/fi';
import { isEmpty } from 'lodash';
import { classes } from './constants';
import Textfield from '../textfield';
import Typography from '../typography';
import Tooltip from '../tooltip';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-multi-textfield-container .wrapper {\n  display: flex;\n}\n.bds-multi-textfield-container .bds-multi-textfield-addBtn {\n  cursor: pointer;\n}\n.bds-multi-textfield-container .bds-multi-textfield-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.bds-multi-textfield-container .bds-multi-textfield-cross-btn-wrapper {\n  display: flex;\n}\n\n[data-theme=dark] .bds-multi-textfield-container {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-multi-textfield-container svg {\n  color: var(--theme-text-primary);\n}";
  const fileName = "multiTextfield_multiTextfield_0d9f4c70-c412-426e-91af-dc1fa4fdc833";
  const element = document.querySelector("style[data-sass-component='multiTextfield_multiTextfield_0d9f4c70-c412-426e-91af-dc1fa4fdc833']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const MultiTextfield = _ref => {
  let {
    valueString,
    finalValue = () => {},
    finalObject = () => {},
    isAllFieldSaved,
    tooltip = false,
    addBtnTooltipText,
    width,
    height
  } = _ref;
  const [inputList, setInputList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    let flag = inputList === null || inputList === void 0 ? void 0 : inputList.some(obj => isEmpty(obj === null || obj === void 0 ? void 0 : obj.value));
    setIsDisabled(flag);
  });
  useEffect(() => {
    setInputList([]);
    if (isEmpty(valueString)) setInputList([{
      value: ''
    }]);
  }, []);
  useEffect(() => {
    if (!isEmpty(valueString)) {
      setInputList([]);
      let arr = valueString.split(/\s*,\s*/);
      arr === null || arr === void 0 || arr.forEach((value, i) => fillAllFields(value, i));
    }
  }, [valueString]);
  useEffect(() => {
    if (isEmpty(valueString)) {
      setInputList([{
        value: ''
      }]);
    }
  }, [valueString]);
  const fillAllFields = (value, i) => {
    setInputList(inputList => [...inputList, {
      value: value
    }]);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, {
      value: ''
    }]);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const {
      name,
      value
    } = e.target;
    if (value !== null && value !== void 0 && value.includes(',') || value !== null && value !== void 0 && value.includes('|')) return false;
    const list = [...inputList];
    list[index][name] = value.trimStart();
    setInputList(list);
  };
  useEffect(() => {
    const value = inputList === null || inputList === void 0 ? void 0 : inputList.map(x => x === null || x === void 0 ? void 0 : x.value).join(',');
    if (!isEmpty(value) && value !== valueString) {
      finalValue(value);
    }
    finalObject(inputList);
    let text = value.split(',').map(e => e.trim()).filter(e => e).join(',');
    if (isEmpty(text) || text.split(',').length !== inputList.length) {
      isAllFieldSaved(false);
    } else {
      isAllFieldSaved(true);
    }
  }, [inputList]);
  const renderFields = () => {
    return /*#__PURE__*/_jsxs("div", {
      className: classes.wrapper,
      children: [/*#__PURE__*/_jsx("div", {
        className: classes.inputWrapper,
        children: !isEmpty(inputList) && inputList.map((ele, index) => {
          return /*#__PURE__*/_jsxs("div", {
            className: classes.crossBtnWrapper,
            children: [/*#__PURE__*/_jsx(Textfield, {
              name: "value",
              value: ele.value,
              onChange: e => handleInputChange(e, index),
              type: "text",
              placeholder: "value",
              width: width,
              height: height,
              icon: (inputList === null || inputList === void 0 ? void 0 : inputList.length) !== 1 && /*#__PURE__*/_jsx(FiX, {
                size: "16",
                color: "#8d8d8d"
              }),
              onIconClick: () => handleRemoveClick(index)
            }), index !== inputList.length - 1 && /*#__PURE__*/_jsx("span", {
              style: {
                marginLeft: '5px',
                display: 'flex',
                alignItems: 'center'
              },
              children: /*#__PURE__*/_jsx(Typography, {
                variant: "heading6",
                children: 'or'
              })
            })]
          }, "multi-text-without-tooltip-".concat(index));
        })
      }), /*#__PURE__*/_jsx(FiPlus, {
        className: classes.addBtn,
        onClick: isDisabled ? () => {} : handleAddClick,
        size: "24",
        color: isDisabled ? '#8d8d8d' : ''
      })]
    });
  };
  const renderFieldsWithTooltip = () => {
    return /*#__PURE__*/_jsxs("div", {
      className: classes.wrapper,
      children: [/*#__PURE__*/_jsx("div", {
        className: classes.inputWrapper,
        children: !isEmpty(inputList) && inputList.map((ele, index) => {
          return /*#__PURE__*/_jsx(Tooltip, {
            title: ele === null || ele === void 0 ? void 0 : ele.value,
            position: "top",
            zIndex: 2000,
            children: /*#__PURE__*/_jsxs("div", {
              className: classes.crossBtnWrapper,
              children: [/*#__PURE__*/_jsx(Textfield, {
                name: "value",
                value: ele === null || ele === void 0 ? void 0 : ele.value,
                onChange: e => handleInputChange(e, index),
                type: "text",
                placeholder: "value",
                width: width,
                height: height,
                icon: (inputList === null || inputList === void 0 ? void 0 : inputList.length) !== 1 && /*#__PURE__*/_jsx(FiX, {
                  size: "16",
                  color: "#8d8d8d"
                }),
                onIconClick: () => handleRemoveClick(index)
              }), index !== inputList.length - 1 && /*#__PURE__*/_jsx("span", {
                style: {
                  marginLeft: '5px',
                  display: 'flex',
                  alignItems: 'center'
                },
                children: /*#__PURE__*/_jsx(Typography, {
                  variant: "heading6",
                  children: 'or'
                })
              })]
            })
          }, "multi-text-with-tooltip-".concat(index));
        })
      }), /*#__PURE__*/_jsx(Tooltip, {
        title: addBtnTooltipText,
        position: "top",
        zIndex: 2000,
        children: /*#__PURE__*/_jsx("div", {
          className: classes.wrapper,
          children: /*#__PURE__*/_jsx(FiPlus, {
            className: classes.addBtn,
            onClick: isDisabled ? () => {} : handleAddClick,
            size: "24",
            color: isDisabled ? '#8d8d8d' : ''
          })
        })
      })]
    });
  };
  return /*#__PURE__*/_jsx("div", {
    className: classes.container,
    children: tooltip ? renderFieldsWithTooltip() : renderFields()
  });
};
MultiTextfield.propTypes = {
  valueString: PropTypes.string,
  finalValue: PropTypes.func.isRequired,
  finalObject: PropTypes.func,
  isAllFieldSaved: PropTypes.func,
  tooltip: PropTypes.bool,
  addBtnTooltipText: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
};
export default MultiTextfield;