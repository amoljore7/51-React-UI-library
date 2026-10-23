import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';
import classNames from 'classnames';
import Tooltip from '../tooltip';
import { renderSvgGraphic } from '../../utils/renderSvgGraphic';
import { FaChevronDown } from 'react-icons/fa';
import {
  classes,
  largeProp,
  mediumProp,
  primaryProp,
  secondaryProp,
  smallProp,
  textOnlyProp,
  defaultSize,
  defaultVariant,
  defaultColor,
  colorTint,
  colorNeutral,
  colorNegative,
  colorPositive,
} from './constants';

function renderIcon(icon, alt) {
  if (icon == null) return null;
  if (React.isValidElement(icon)) return icon;
  return renderSvgGraphic(icon, {
    alt: alt || 'icon',
    'aria-label': alt || 'icon',
    role: 'img',
  });
}

const ButtonWrapper = (props) => {
  const buttonComp = (
    <button
      data-testid={props.testId}
      className={classNames(props.btnClass)}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      aria-pressed={props.toggled != null ? props.toggled : undefined}
      value={props.value}
      name={props.name}
      {...props.extraProps}
    >
      {props.children}
    </button>
  );

  if (!props.tooltipText) return buttonComp;

  // The tooltip listens for the hover on its child. A disabled button has pointer-events: none
  // and never gets it, so the wrapper div is the child. One tree for both states, so toggling
  // `disabled` doesn't remount the button; it stays `div > button`, which ButtonGroup selects.
  return (
    <Tooltip title={props.tooltipText} position={props.tooltipPosition}>
      <div
        className={classNames(classes.tooltipAnchor, {
          [classes.tooltipAnchorDisabled]: props.disabled,
        })}
      >
        {buttonComp}
      </div>
    </Tooltip>
  );
};

const Button = ({
  variant = defaultVariant,
  size = defaultSize,
  color = defaultColor,
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
  dropdown = false,
  badge = false,
  loading = false,
  toggled = false,
  iconOnly,
  testId = 'button',
}) => {
  const hasIcon = Boolean(leftSVGIcon || rightSVGIcon);
  const hasContent = children != null && children !== '';
  const isIconOnly = iconOnly === true || (!hasContent && hasIcon);

  const colorClass = {
    [classes.buttonColorTint]: color === colorTint,
    [classes.buttonColorNeutral]: color === colorNeutral,
    [classes.buttonColorNegative]: color === colorNegative,
    [classes.buttonColorPositive]: color === colorPositive,
  };

  const btnClass = classNames(
    classes.button,
    {
      [classes.buttonPrimary]: variant === primaryProp,
      [classes.buttonSecondary]: variant === secondaryProp,
      [classes.buttonTertiary]: variant === textOnlyProp,
      [classes.buttonSmall]: size === smallProp,
      [classes.buttonMedium]: size === mediumProp,
      [classes.buttonLarge]: size === largeProp,
      [classes.disabled]: disabled,
      [classes.iconOnly]: isIconOnly,
      [classes.dropdown]: dropdown,
      [classes.badge]: badge,
      [classes.loading]: loading,
      [classes.toggled]: toggled,
    },
    colorClass
  );

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
    toggled,
    testId,
  };

  return (
    <ButtonWrapper {...buttonProps}>
      <span className={classes.content}>
        {leftSVGIcon && !rightSVGIcon && renderIcon(leftSVGIcon, 'left Icon')}
        {children}
        {rightSVGIcon && renderIcon(rightSVGIcon, 'right Icon')}
        {dropdown && (
          <span className={classes.caret} aria-hidden>
            <FaChevronDown size={12} />
          </span>
        )}
      </span>
      {loading && (
        <span className={classes.spinner} aria-hidden>
          <span className={classes.spinnerInner} />
        </span>
      )}
    </ButtonWrapper>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.oneOf([colorTint, colorNeutral, colorNegative, colorPositive]),
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
  extraProps: PropTypes.object,
  dropdown: PropTypes.bool,
  badge: PropTypes.bool,
  loading: PropTypes.bool,
  toggled: PropTypes.bool,
  iconOnly: PropTypes.bool,
  testId: PropTypes.string,
};

export default Button;
