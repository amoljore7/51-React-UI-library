import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './buttonGroup.scss';
import classNames from 'classnames';
import { classes, defaultSize } from './constants';

const ButtonGroup = ({
  children,
  type,
  onClick,
  size = defaultSize,
}) => {
  const [selected, setSelected] = useState('');

  const btnGroupParentClass = {
    [classes.buttonGroup]: true,
  };

  const isRadioType = type === "radio";

  const handleClick = (event) => {
    const { value } = event.currentTarget;
    setSelected(value);
    onClick && onClick(value);
  }

  const getButtonVariant = (value, index) => {
    if (!selected) {
      return index === 0 ? 'primary' : 'secondary';
    } else {
      return selected === value ? 'primary' : 'secondary';
    }
  }

  return (
    <div
      data-test-id="button-group"
      className={classNames({ ...btnGroupParentClass })}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          let newProps = {
            key: `${index}-${child.props.value}`,
            size,
          };

          if (isRadioType) {
            newProps = {
              ...newProps,
              onClick: handleClick,
              variant: getButtonVariant(child.props.value, index),
            };
          }

          return React.cloneElement(child, newProps);
        }
        return null;
      })}
    </div>
  );

};

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

export default ButtonGroup;
