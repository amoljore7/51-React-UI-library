import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultLength, listRole, tabIndex, keyPrefix, classes, target } from './constants';
import './breadcrumb.scss';

const renderBreadcrumbCompressed = ({ history, routeToNameList, expansionHandlder }) => {
  const firstItem = routeToNameList[0];
  const lastItem = routeToNameList[routeToNameList.length - 1];
  return (
    <ul role={listRole} className={classes.container}>
      <BreadcrumbItem
        route={firstItem.route}
        name={firstItem.name}
        href={firstItem.href}
        key={`${keyPrefix}0`}
        history={history}
      />
      <BreadcrumbItem
        overflowItem={true}
        expansionHandlder={expansionHandlder}
        key={`${keyPrefix}1`}
      />
      <BreadcrumbItem
        route={lastItem.route}
        name={lastItem.name}
        href={lastItem.href}
        isLastItem={true}
        key={`${keyPrefix}2`}
        history={history}
      />
    </ul>
  );
};
const renderBreadcrumbExpander = ({ history, routeToNameList }) => {
  return (
    <ul role={listRole} className={classes.container}>
      {routeToNameList &&
        routeToNameList.map((element, index) => {
          const { route, name, href } = element;
          const isLastItem = index === routeToNameList.length - 1;
          const allProps = { route, name, isLastItem, href, history };
          return <BreadcrumbItem key={`${keyPrefix}${index}`} {...allProps} />;
        })}
    </ul>
  );
};

const Breadcrumb = ({ routeToNameList, history }) => {
  const [isCompressed, setIsCompressed] = useState(routeToNameList.length > defaultLength);
  const expansionHandlder = () => {
    setIsCompressed(false);
  };

  return isCompressed
    ? renderBreadcrumbCompressed({
        routeToNameList,
        expansionHandlder,
        history,
      })
    : renderBreadcrumbExpander({ routeToNameList, history });
};

const BreadcrumbItem = ({
  history,
  href,
  route,
  name,
  isLastItem,
  expansionHandlder,
  overflowItem,
}) => {
  const breadcrumbItemClasses = {
    [classes.item]: true,
    [classes.lastItem]: isLastItem,
  };
  const clickHandler = (event) => {
    !href && event.preventDefault();
    !href && history && route && history.push(route);
  };
  return !overflowItem ? (
    <li className={classNames(breadcrumbItemClasses)} tabIndex={tabIndex}>
      <a href={href} onClick={clickHandler} target={target}>
        {name}
      </a>
      {!isLastItem && <span className={classes.separator}>/</span>}
    </li>
  ) : (
    <li
      className={classNames(breadcrumbItemClasses)}
      onClick={() => expansionHandlder()}
      tabIndex={tabIndex}
    >
      <span>...</span>
      <span className={classes.separator}>/</span>
    </li>
  );
};
Breadcrumb.propTypes = {
  routeToNameList: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string,
      name: PropTypes.string.isRequired,
    }).isRequired
  ),
};
export default Breadcrumb;
