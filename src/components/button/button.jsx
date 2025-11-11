import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';
import classNames from 'classnames';
import { useLocalStorage } from 'usehooks-ts'
import Tooltip from '../tooltip';
import {
  classes,
  classesV2,
  largeProp,
  mediumProp,
  primaryProp,
  secondaryProp,
  smallProp,
  textOnlyProp,
  defaultSize,
  defaultVariant,
  iconBtnMargin,
} from './constants';

const ButtonWrapper = (props) => {
  const buttonComp =
    <button
      data-testid='button'
      className={classNames({ ...props.btnClass })}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      value={props.value}
      name={props.name}
      {...props.extraProps}
    >
      {props.children}
    </button>

    if (props.tooltipText) {
      return (
        <div>
          <Tooltip title={props.tooltipText} position={props.tooltipPosition}>
            {buttonComp}
          </Tooltip>
        </div>
      )
    }

    return buttonComp
}

const Button = ({
  variant = defaultVariant,
  size = defaultSize,
  children,
  onClick,
  disabled = false,
  type,
  value,
  leftSVGIcon,
  rightSVGIcon,
  name,
  tooltipText,
  tooltipPosition = 'top',
  extraProps,
}) => {
  const [isNewUx] = useLocalStorage('new-ux', true)

  let btnClass = {
    [classes.button]: true,
    [classes.buttonPrimary]: variant === primaryProp,
    [classes.buttonSecondary]: variant === secondaryProp,
    [classes.buttonTextOnly]: variant === textOnlyProp,
    [classes.buttonSmall]: size === smallProp,
    [classes.buttonMedium]: size === mediumProp,
    [classes.buttonLarge]: size === largeProp,
    [classes.disabled]: disabled,
  };

  if (isNewUx) {
    btnClass = {
      [classesV2.button]: true,
      [classesV2.buttonPrimary]: variant === primaryProp,
      [classesV2.buttonSecondary]: variant === secondaryProp,
      [classesV2.buttonTertiary]: variant === textOnlyProp,
      [classesV2.buttonSmall]: size === smallProp,
      [classesV2.buttonMedium]: size === mediumProp,
      [classesV2.buttonLarge]: size === largeProp,
      [classesV2.disabled]: disabled,
    }
  }

  const buttonProps = {
    btnClass,
    onClick,
    disabled,
    type,
    value,
    name,
    tooltipText,
    tooltipPosition,
    extraProps,
  }

  return (
    <ButtonWrapper {...buttonProps}>
      {leftSVGIcon && !rightSVGIcon &&  (
        <img src={leftSVGIcon} alt='left Icon' style={{ marginRight: iconBtnMargin }} />
      )}
      {children}
      {/* show only right icon if both props are added */}
      {rightSVGIcon && (
        <img src={rightSVGIcon} alt='right Icon' style={{ marginLeft: iconBtnMargin }} />
      )}
    </ButtonWrapper>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.any,
  leftSVGIcon: PropTypes.any,
  rightSVGIcon: PropTypes.any,
  name: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipPosition: PropTypes.string,
  color: PropTypes.string,
  extraProps: PropTypes.object,
};

export default Button;
