import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './card.scss';
import { classes, defaultTabIndex, imageRole } from './constants';

const Card = ({ title, image, clickHandler, disabled = false }) => {
  const cardClass = {
    [classes.container]: true,
    [classes.containerDisabled]: disabled,
  };

  return (
    <div
      data-testid="card"
      className={classNames({ ...cardClass })}
      onClick={disabled ? null : clickHandler}
      tabIndex={defaultTabIndex}
    >
      <div className={classes.imgContainer}>
        <img
          tabIndex={defaultTabIndex}
          role={imageRole}
          className={classes.imgStyle}
          src={image}
          alt={title}
          aria-label={title}
        />
      </div>
      <div className={classes.titleStyle}>{title}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Card;
