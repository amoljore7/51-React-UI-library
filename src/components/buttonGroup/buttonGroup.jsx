import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './buttonGroup.scss';
import classNames from 'classnames';
import {
  classes,
  defaultSize,
  defaultType,
  typeStandard,
  typeToggle,
  defaultColor,
  colorTint,
  colorNeutral,
} from './constants';

const ButtonGroup = ({
  children,
  type = defaultType,
  color = defaultColor,
  onClick,
  size = defaultSize,
  defaultValue,
}) => {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      setSelected(String(defaultValue));
    }
  }, [defaultValue]);

  const isToggle = type === typeToggle;

  const btnGroupClass = classNames(classes.buttonGroup, {
    [classes.standard]: type === typeStandard,
    [classes.toggle]: isToggle,
    [classes.colorTint]: color === colorTint,
    [classes.colorNeutral]: color === colorNeutral,
  });

  const handleClick = (event) => {
    const { value } = event.currentTarget;
    setSelected(value);
    onClick?.(value);
  };

  const childArray = React.Children.toArray(children);
  const firstValue = childArray[0] && React.isValidElement(childArray[0])
    ? (childArray[0].props.value ?? 0)
    : null;
  const effectiveSelected = selected !== '' ? selected : firstValue;
  const getToggled = (value) => effectiveSelected != null && effectiveSelected === value;

  return (
    <div data-test-id="button-group" className={btnGroupClass}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        const value = child.props.value ?? String(index);
        const baseProps = {
          key: child.key ?? `btn-${index}-${value}`,
          size,
          color,
        };
        if (isToggle) {
          baseProps.toggled = getToggled(value);
          baseProps.onClick = handleClick;
          baseProps.value = value;
        }
        return React.cloneElement(child, baseProps);
      })}
    </div>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['standard', 'radio']),
  color: PropTypes.oneOf(['tint', 'neutral']),
  onClick: PropTypes.func,
  size: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ButtonGroup;
