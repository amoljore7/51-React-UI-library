import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Typography from '../typography';
import Button from '../button';
import Tooltip from '../tooltip';
import { classes, days, Yesterday } from './constants';
import moment from 'moment';
import classNames from 'classnames';
import Spinner from '../spinner';

import './notificationCard.scss';

const NotificationCard = ({
  loading,
  loadingMessage,
  notificationTitle,
  notificationTime,
  notificationMessage,
  primaryActionLabel,
  primaryActionHandler,
  secondaryActionLabel,
  secondaryActionHandler,
  tooltipPosition = 'top',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const messageRef = useRef();

  const notificationCardClasses = {
    [classes.notificationCard]: true,
    [classes.notificationCardWithSpinnerOverlay]: loading,
  };

  useLayoutEffect(() => {
    if (messageRef.current.clientHeight < messageRef.current.scrollHeight) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  }, [messageRef]);

  const getTimeFormat = (date) => {
    const notificationDate = moment(date);
    const todayDate = moment();
    const yesterdayDate = moment().subtract(1, days);

    if (notificationDate.isSame(todayDate, days)) {
      return notificationDate.format('h:mm A');
    } else if (notificationDate.isSame(yesterdayDate, days)) {
      return `${Yesterday} ${notificationDate.format('h:mm A')}`;
    } else {
      return notificationDate.format('MMM D');
    }
  };

  const cardHeader = () => {
    return (
      <div className={classes.cardHeader}>
        <div className={classes.cardTitle}>
          <Typography variant="label1">{notificationTitle}</Typography>
        </div>
        <div className={classes.cardTime}>
          <Typography variant="helper1">{getTimeFormat(notificationTime)}</Typography>
        </div>
      </div>
    );
  };

  const cardMessage = () => {
    return (
      <div ref={messageRef} className={classes.cardMessage}>
        {showTooltip ? (
          <Tooltip title={notificationMessage} position={tooltipPosition}>
            <div>{cardMessageBody()}</div>
          </Tooltip>
        ) : (
          cardMessageBody()
        )}
      </div>
    );
  };

  const cardMessageBody = () => {
    return <Typography variant="body">{notificationMessage}</Typography>;
  };

  const cardFooterAction = () => {
    return (
      <div className={classes.cardActionFooter}>
        <Button variant="secondary" size="small" onClick={primaryActionHandler}>
          {primaryActionLabel}
        </Button>
        {secondaryActionLabel && (
          <div className={classes.secondaryButtonSpacing}>
            <Button variant="secondary" size="small" onClick={secondaryActionHandler}>
              {secondaryActionLabel}
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={classNames({ ...notificationCardClasses })}>
      <div className={classes.cardContent}>
        {cardHeader()}
        {cardMessage()}
        {cardFooterAction()}
      </div>
      {loading && <Spinner size="medium" message={loadingMessage} overlayOnContainer={true} />}
    </div>
  );
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
  secondaryActionHandler: PropTypes.func,
};

export default NotificationCard;
