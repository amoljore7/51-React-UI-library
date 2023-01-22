import React from 'react';
import classNames from 'classnames';
import {
  classes,
  codeAriaLabelledBy,
  figureRole,
  headingRole,
  typographyVariants,
} from './constants';

export const pageTitle = ({ children, dataAttribute }) => {
  return (
    <h5 role={headingRole} className={classes.pageTitle} data-auto-id={dataAttribute}>
      {children}
    </h5>
  );
};

export const pageSectionHeader = ({ children, dataAttribute }) => {
  return (
    <h3 role={headingRole} className={classes.pageSectionHeader} data-auto-id={dataAttribute}>
      {children}
    </h3>
  );
};

export const heading7 = ({ children, dataAttribute }) => {
  return (
    <h6 role={headingRole} className={classes.heading7} data-auto-id={dataAttribute}>
      {children}
    </h6>
  );
};

export const heading6 = ({ children, dataAttribute }) => {
  return (
    <h4 role={headingRole} className={classes.heading6} data-auto-id={dataAttribute}>
      {children}
    </h4>
  );
};

export const heading5 = ({ children, dataAttribute }) => {
  return (
    <h3 role={headingRole} className={classes.heading5} data-auto-id={dataAttribute}>
      {children}
    </h3>
  );
};

export const heading4 = ({ children, dataAttribute }) => {
  return (
    <h2 role={headingRole} className={classes.heading4} data-auto-id={dataAttribute}>
      {children}
    </h2>
  );
};

export const heading3 = ({ children, dataAttribute }) => {
  return (
    <h1 role={headingRole} className={classes.heading3} data-auto-id={dataAttribute}>
      {children}
    </h1>
  );
};
export const heading2 = ({ children, dataAttribute }) => {
  return (
    <h1 role={headingRole} className={classes.heading2} data-auto-id={dataAttribute}>
      {children}
    </h1>
  );
};
export const heading1 = ({ children, dataAttribute }) => {
  return (
    <h1 role={headingRole} className={classes.heading1} data-auto-id={dataAttribute}>
      {children}
    </h1>
  );
};
export const code1 = ({ children, dataAttribute }) => {
  return (
    <code
      role={figureRole}
      aria-labelledby={codeAriaLabelledBy}
      className={classes.code1}
      data-auto-id={dataAttribute}
    >
      {children}
    </code>
  );
};

export const bodyText = ({ children, dataAttribute }) => {
  return <p className={classes.bodyText} data-auto-id={dataAttribute}>{children}</p>;
};
export const spanTexts = ({ variant, children, dataAttribute }) => {
  const {
    buttonLabel,
    label1,
    label2,
    caption1,
    helperText1,
  } = typographyVariants;
  const labelClasses = {
    [classes.buttonLabel]: variant === buttonLabel,
    [classes.label1]: variant === label1,
    [classes.label2]: variant === label2,
    [classes.caption1]: variant === caption1,
    [classes.helperText1]: variant === helperText1,
  };
  return <span className={classNames({ ...labelClasses })} data-auto-id={dataAttribute}>{children}</span>;
};
