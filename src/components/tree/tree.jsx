import React, { useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  mousedownEvent,
  mousemoveEvent,
  mouseupEvent,
  recursivePropName,
  tabIndex,
  TreeClass,
} from './constants';
import TreeNode from './treeNode';
import './tree.scss';

const Tree = ({
  nodes,
  clickHandler,
  expandIconClickHandler,
  actionClickHandler,
  topPadding,
  selectedItemParents,
  expandedItems,
}) => {
  const container = useRef();
  const resizeLineRef = useRef();
  const resize = (event) => {
    const Rect = container.current.getBoundingClientRect();
    const trueLeft = Rect.left + window.pageXOffset;
    const width = event.pageX - trueLeft;
    container.current.style.width = parseInt(width) + 'px';
  };
  useLayoutEffect(() => {
    const Rect = container.current.getBoundingClientRect();
    resizeLineRef.current.style.top = window.pageYOffset + Rect.top;
    resizeLineRef.current.style.right = window.pageXOffset + Rect.left;
  }, []);
  useEffect(() => {
    resizeLineRef.current.addEventListener(
      mousedownEvent,
      (event) => {
        const Rect = resizeLineRef.current.getBoundingClientRect();
        const trueRight = Rect.right + window.pageXOffset;
        // add 4 to set a comfortable range for pointer event
        if (event.pageX > trueRight - 4 && event.pageX < trueRight + 4) {
          document.addEventListener(mousemoveEvent, resize, false);
        }
      },
      false
    );
    document.addEventListener(mouseupEvent, () => {
      document.removeEventListener(mousemoveEvent, resize, false);
    });
  }, []);
  const treeNodeProps = {
    nodes,
    level: 0,
    parents: [],
    clickHandler,
    expandIconClickHandler,
    actionClickHandler,
    selectedItemParents,
    expandedItems,
  };
  return (
    <div className={TreeClass.boundingContainer}>
      <div
        ref={container}
        style={{ paddingTop: topPadding }}
        className={TreeClass.container}
        tabIndex={tabIndex}
      >
        <TreeNode {...treeNodeProps} />
      </div>
      <div className={TreeClass.resize} ref={resizeLineRef} />
    </div>
  );
};

const recursiveShapeType = (propsType = {}, recursiveKey) => {
  const type = (...args) => {
    return PropTypes.shape(propsType).apply(null, args);
  };
  propsType[recursiveKey] = PropTypes.arrayOf(type);
  return type;
};

Tree.propTypes = {
  nodes: PropTypes.shape({
    label: PropTypes.string.isRequired,
    leaves: PropTypes.any,
    hasChildren: PropTypes.bool.isRequired,
    actionItems: PropTypes.any,
    details: PropTypes.any,
    nodes: PropTypes.arrayOf(
      recursiveShapeType(
        {
          label: PropTypes.string.isRequired,
          leaves: PropTypes.arrayOf(PropTypes.object),
          hasChildren: PropTypes.bool.isRequired,
          actionItems: PropTypes.any,
          details: PropTypes.any,
        },
        recursivePropName
      )
    ),
  }).isRequired,
  clickHandler: PropTypes.func.isRequired,
  topPadding: PropTypes.string,
  expandIconClickHandler: PropTypes.func.isRequired,
  actionClickHandler: PropTypes.func.isRequired,
  expandedItems: PropTypes.array,
  selectedItemParents: PropTypes.array.isRequired,
};

export default Tree;
