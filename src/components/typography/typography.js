import React from 'react';
import { dataAttributeName, typographyVariants } from './constants';
import PropTypes from 'prop-types';
import {
  bodyText,
  code1,
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,
  heading7,
  pageSectionHeader,
  pageTitle,
  spanTexts,
} from './typographyTypes';
import './typography.scss';

const Typography = (props) => {
  const typographyProps = {
    variant: props.variant,
    children: props.children,
    dataAttribute: props[dataAttributeName],
  };
  return <TypographyComponent {...typographyProps} />;
};

const TypographyComponent = ({ variant, children, dataAttribute }) => {
  switch (variant) {
    case typographyVariants.buttonLabel:
    case typographyVariants.label1:
    case typographyVariants.label2:
    case typographyVariants.caption1:
    case typographyVariants.helperText1:
      return spanTexts({ variant, children, dataAttribute });
    case typographyVariants.bodyText:
      return bodyText({ children, dataAttribute });
    case typographyVariants.code1:
      return code1({ children, dataAttribute });
    case typographyVariants.pageTitle:
      return pageTitle({ children, dataAttribute });
    case typographyVariants.pageSectionHeader:
      return pageSectionHeader({ children, dataAttribute });
    case typographyVariants.heading1:
      return heading1({ children, dataAttribute });
    case typographyVariants.heading2:
      return heading2({ children, dataAttribute });
    case typographyVariants.heading3:
      return heading3({ children, dataAttribute });
    case typographyVariants.heading4:
      return heading4({ children, dataAttribute });
    case typographyVariants.heading5:
      return heading5({ children, dataAttribute });
    case typographyVariants.heading6:
      return heading6({ children, dataAttribute });
    case typographyVariants.heading7:
      return heading7({ children, dataAttribute });
    default:
      return null;
  }
};
TypographyComponent.propTypes = {
  variant: PropTypes.oneOf([
    'code1',
    'button',
    'label1',
    'label2',
    'caption1',
    'helper1',
    'pageTitle',
    'pageSectionHeader',
    'body',
    'heading1',
    'heading2',
    'heading3',
    'heading4',
    'heading5',
    'heading6',
    'heading7',
  ]).isRequired,
  dataAttribute: PropTypes.string,
};

export default Typography;
