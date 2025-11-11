import React from 'react';
import classNames from 'classnames';
import { BiChevronRight, BiChevronDown } from 'react-icons/bi';
import { defaultIconSize, TreeNodeClasses } from '../constants';
import './treeNodes.scss';
import Checkbox from '../../checkbox';
import Typography from '../../typography';
import { LabelIcon } from './labelIcon';
import { RadioButton } from '../../radio/radio';

const DirectionIcon = ({ expanded }) => {
  return expanded ? (
    <BiChevronDown size={defaultIconSize} />
  ) : (
    <BiChevronRight size={defaultIconSize} />
  );
};

const Node = ({
  node,
  expandIconClickHandler,
  handleCheckboxClick,
  readOnly,
  hideCheckboxes,
  singleSelect = false,
  singleSelectRadio = false,
  allowOnlyLeafSelection = false,
  allowRootSelection = true,
  removeNodePadding = false,
}) => {
  const isLeaf = node.type === 'leaf'
  const hasChildren = node?._children?.length > 0
  const isRootNode = node._id === '0'
  const isRowDisable = singleSelect && singleSelectRadio && node?.disabled

  // The root node is always selectable.
  const shouldHighlightNode = (isLeaf || (allowRootSelection && isRootNode)) && singleSelect
  const parentNodeClass = {
    [TreeNodeClasses.parentNodeContainer]: true,
    [TreeNodeClasses.parentNodeContainerSingleEnvironmentSelect]: allowOnlyLeafSelection ? shouldHighlightNode : singleSelect,
    [TreeNodeClasses.parentNodeContainerSingleEnvironmentSelectChecked]: allowOnlyLeafSelection ? shouldHighlightNode && node.checked : singleSelect && node.checked,
    [TreeNodeClasses.parentNodeContainerRemovePadding]: removeNodePadding,
    [TreeNodeClasses.disabledRow]: isRowDisable,
  };
  const textNodeClass = {
    [TreeNodeClasses.parentText]: true,
    [TreeNodeClasses.disabledRow]: isRowDisable,
  }

  const handleEnvironmentClick = () => {
    if (singleSelect && singleSelectRadio && node?.disabled) {
      return
    }
    if (!singleSelect) {
      return
    }

    if (allowOnlyLeafSelection && !isLeaf && !(allowRootSelection && isRootNode)) {
      return
    }

    handleCheckboxClick({ id: node._id, checked: true })
  }

  const renderDirectionalIcon = () => {
    if (hasChildren) {
      return (
        <div
          data-testid={`directional-icon-${node._id}`}
          className={TreeNodeClasses.dirIconContainer}
          onClick={(e) => {
            e.stopPropagation();
            expandIconClickHandler(node._id);
          }}
        >
          <DirectionIcon expanded={node.expanded} />
        </div>
      )
    }
  }

  return (
    <div
      data-testid={`tree-node-${node._id}`}
      className={classNames({ ...parentNodeClass })}
      style={{ paddingLeft: `${(isLeaf ? ((node._depth + 1) * 34) - 9 : node._depth * 34)}px` }}
      onClick={handleEnvironmentClick}
    >
      <div className={`${TreeNodeClasses.parentContainer} ${removeNodePadding ? TreeNodeClasses.parentContainerRemovePadding : ''}`}>
        <div className={TreeNodeClasses.treeNodeContent}>
          {!isLeaf ? renderDirectionalIcon() : null}
          <div
            className={
              `${TreeNodeClasses.parentIcon} ${!removeNodePadding && !isLeaf && !hasChildren
                ? TreeNodeClasses.nodeLeftemptyPadding
                : ''}`
            }
          >
            {(!hideCheckboxes && !singleSelect) && (
              <Checkbox
                name="checkbox"
                disabled={readOnly || node.disabled}
                checked={node.checked || false}
                indeterminate={node.indeterminate}
                onChange={({ target }) => {
                  handleCheckboxClick({ id: node._id, checked: target.checked })
                }}
              />
            )}
            {singleSelectRadio && singleSelect && (
              <RadioButton
                onChange={(event) => {
                  handleCheckboxClick({ id: node._id, checked: event.target.checked });
                }}
                selected={node?.checked}
                disabled={node?.disabled}
              />
            )}
            <LabelIcon
              isLeaf={isLeaf}
              iconSource={node?.leftIcon?.icon}
              tooltip={node?.leftIcon?.tooltip}
              useDefaultIcon={node?.leftIcon?.icon ? false : true}
              onClick={node?.leftIcon?.onClick}
              disabled={singleSelect && singleSelectRadio && node?.disabled}
            />
          </div>
          <div className={classNames({ ...textNodeClass })}>
            <Typography variant={!isLeaf || node.highlighted ? 'label2' : 'label1'}>
              {node.label} {node.highlighted ? '*' : ''}
            </Typography>
          </div>
          <LabelIcon
            iconSource={node?.rightIcon?.icon}
            tooltip={node?.rightIcon?.tooltip}
            onClick={node?.rightIcon?.onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Node