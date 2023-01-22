import React, { Children, useState } from 'react';
import Typography from '../typography';
import { classes } from './constants';
import chevronUp from '../../assets/icons/chevron-up.svg';
import chevronDown from '../../assets/icons/chevron-down.svg';
import './accordion.scss'

const Accordion = ({
  expanded = false,
  title,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <div className={classes.container}>
      <div data-testid="accordion-header" className={classes.header} onClick={() => setIsExpanded(!isExpanded)}>
        <img src={isExpanded ? chevronUp : chevronDown} />
        <Typography variant="pageSectionHeader">{title}</Typography>
      </div>
      <div data-testid="accordion-content" className={`${classes.content} ${isExpanded ? classes.contentExpanded : classes.contentClosed}`}>
        {children}
      </div>
    </div>
  )
}

export default Accordion;