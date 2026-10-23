import PropTypes from 'prop-types';
import React from 'react';
import OverflowMenu from '../../overflow-menu';
import { classes } from '../constants';

const getOptionLabel = (option) => {
  // collapsedMenuIcon overrides icon specifically for this list row inside
  // the collapsed ⋮ dropdown — the same action still uses icon for its own
  // inline button when the column is expanded (TableCell.jsx's other
  // branch), so a consumer only needs collapsedMenuIcon when the two
  // contexts genuinely call for different art (e.g. icon carries a color
  // cue that only reads correctly against the expanded row, not inside a
  // dropdown).
  const icon = option.collapsedMenuIcon ?? option.icon;
  return (
    <span
      className={classes.columnMenuOption}
      data-testid={option.testId ?? option.name}
    >
      {icon && <span className={classes.columnMenuOptionIcon}>{icon}</span>}
      <span className={classes.columnMenuOptionText}>{option.name}</span>
    </span>
  );
};

const ActionColumnCell = ({ row, actionItems, actionsMenuWidth = '200px' }) => {
  const options = actionItems ?? [];

  return (
    <div className={classes.actionIconsContainer}>
      <OverflowMenu
        options={options}
        onClick={e => e.stopPropagation()}
        onChange={(_e, option) => option.onClick?.(row)}
        getOptionLabel={getOptionLabel}
        width={actionsMenuWidth}
        disabled={options.length === 0}
      />
    </div>
  );
};

ActionColumnCell.propTypes = {
  row: PropTypes.object,
  actionItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.node,
      collapsedMenuIcon: PropTypes.node,
      tooltip: PropTypes.string,
      testId: PropTypes.string,
      onClick: PropTypes.func,
      button: PropTypes.shape({
        variant: PropTypes.string,
        size: PropTypes.string,
        disabled: PropTypes.bool,
      }),
    })
  ),
  actionsMenuWidth: PropTypes.string,
};

export default ActionColumnCell;
