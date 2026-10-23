import React, { Children, useState } from 'react';
import Typography from '../typography';
import { classes } from './constants';
import ChevronUp from '../../assets/icons/chevron-up.svg?react';
import ChevronDown from '../../assets/icons/chevron-down.svg?react';
import './accordion.scss'

const Accordion = ({
  expanded = false,
  title,
  hideUnderline = false,
  removeChildrenPadding = false,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <div className={classes.container}>
      <div
        data-testid="accordion-header"
        className={hideUnderline ? classes.headerWithoutUnderline : classes.headerWithUnderline}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronUp aria-hidden focusable="false" />
        ) : (
          <ChevronDown aria-hidden focusable="false" />
        )}
        <Typography variant="pageSectionHeader">{title}</Typography>
      </div>
      <div
        data-testid="accordion-content"
        className={`${classes.content} ${isExpanded ? (removeChildrenPadding ? classes.contentExpanded : classes.contentExpandedWithPadding) : classes.contentClosed}`}
      >
        {children}
      </div>
    </div>
  )
}

export default Accordion;