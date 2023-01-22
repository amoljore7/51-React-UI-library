import React, {
  cloneElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import Typography from '../typography';
import {
  classes,
  hoverOffset,
  tooltipId,
  tooltipMargin,
  tooltipMaxHeight,
  tooltipMaxWidth,
} from './constants';
import './tooltip.scss';
// checks if mouse current Position is near the boundary of tooltip
// the boundary is extended by 10 px on all sides tooltip element
const isMousePointerNearTooltipContainer = (tooltipElement, mouseEvent) => {
  let {
    left: tooltipLeft,
    right: tooltipRight,
    bottom: tooltipBottom,
    top: tooltipTop,
  } = tooltipElement.getBoundingClientRect();

  let isInsideWidth = false;
  let isInsideHeight = false;

  if (
    mouseEvent.pageX >= tooltipLeft + window.pageXOffset - hoverOffset &&
    mouseEvent.pageX < tooltipRight + window.pageXOffset + hoverOffset
  ) {
    isInsideWidth = true;
  }

  if (
    mouseEvent.pageY < tooltipBottom + window.pageYOffset + hoverOffset &&
    mouseEvent.pageY > tooltipTop + window.pageYOffset - hoverOffset
  ) {
    isInsideHeight = true;
  }

  return isInsideWidth && isInsideHeight;
};

const changeTooltipPos = (tooltipElement, element, position) => {
  const rect = element.getBoundingClientRect();
  const absWidthDiff = Math.abs(tooltipElement.offsetWidth - rect.width);
  const absHeightDiff = Math.abs(tooltipElement.offsetHeight - rect.height);
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  const moveToTop = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left +
      window.pageXOffset -
      (tooltipElement.offsetWidth >= rect.width
        ? absWidthDiff / 2
        : -1 * (absWidthDiff / 2))
    }px,${
      rect.top +
      window.pageYOffset -
      tooltipElement.offsetHeight -
      tooltipMargin
    }px,0)`;
  };

  const moveToBottom = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left +
      window.pageXOffset -
      (tooltipElement.offsetWidth >= rect.width
        ? absWidthDiff / 2
        : -1 * (absWidthDiff / 2))
    }px,${rect.bottom + window.pageYOffset + tooltipMargin}px,0)`;
  };

  const moveToTopLeft = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left + window.pageXOffset - hoverOffset - tooltipElement.offsetWidth
    }px,${
      rect.top + window.pageYOffset - hoverOffset - tooltipElement.offsetHeight
    }px,0)`;
  };

  const moveToTopRight = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.right + window.pageXOffset + hoverOffset
    }px,${
      rect.top + window.pageYOffset - hoverOffset - tooltipElement.offsetHeight
    }px,0)`;
  };

  const moveToBottomLeft = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left + window.pageXOffset - hoverOffset - tooltipElement.offsetWidth
    }px,${rect.bottom + window.pageYOffset + hoverOffset}px,0)`;
  };

  const moveToBottomRight = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.right + window.pageXOffset + hoverOffset
    }px,${rect.bottom + window.pageYOffset + hoverOffset}px,0)`;
  };

  const moveToLeft = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.left +
      window.pageXOffset -
      tooltipElement.offsetWidth -
      tooltipMargin
    }px,${
      rect.top +
      window.pageYOffset -
      (tooltipElement.offsetHeight >= rect.height
        ? absHeightDiff / 2
        : -1 * (absHeightDiff / 2))
    }px,0)`;
  };

  const moveToRight = () => {
    tooltipElement.style.transform = `translate3d(${
      rect.right + window.pageXOffset + tooltipMargin
    }px,${
      rect.top +
      window.pageYOffset -
      (tooltipElement.offsetHeight >= rect.height
        ? absHeightDiff / 2
        : -1 * (absHeightDiff / 2))
    }px,0)`;
  };

  const adjustTopPosition = () => {
    if (rect.top - tooltipElement.offsetHeight - tooltipMargin < 0) {
      moveToBottom();
    } else {
      moveToTop();
    }
  };
  const adjustBottomPosition = () => {
    if (rect.bottom + tooltipElement.offsetHeight + tooltipMargin > vh) {
      moveToTop();
    } else {
      moveToBottom();
    }
  };
  const adjustLeftPosition = () => {
    if (rect.left - tooltipElement.offsetWidth - tooltipMargin < 0) {
      moveToRight();
    } else {
      moveToLeft();
    }
  };
  const adjustRightPosition = () => {
    if (rect.right + tooltipMargin + tooltipElement.offsetWidth > vw) {
      moveToLeft();
    } else {
      moveToRight();
    }
  };

  const adjustTopLeftPosition = () => {
    if (rect.top - tooltipElement.offsetHeight - tooltipMargin < 0) {
      moveToBottomLeft();
    } else if (rect.left - tooltipElement.offsetWidth - tooltipMargin < 0) {
      moveToTopRight();
    } else {
      moveToTopLeft();
    }
  };

  const adjustTopRightPosition = () => {
    if (rect.top - tooltipElement.offsetHeight - tooltipMargin < 0) {
      moveToBottomRight();
    } else if (rect.right + tooltipMargin + tooltipElement.offsetWidth > vw) {
      moveToTopLeft();
    } else {
      moveToTopRight();
    }
  };

  const adjustBottomLeftPosition = () => {
    if (rect.bottom + tooltipElement.offsetHeight + tooltipMargin > vh) {
      moveToTopLeft();
    } else if (rect.left - tooltipElement.offsetWidth - tooltipMargin < 0) {
      moveToBottomRight();
    } else {
      moveToBottomLeft();
    }
  };

  const adjustBottomRightPosition = () => {
    if (rect.bottom + tooltipElement.offsetHeight + tooltipMargin > vh) {
      moveToTopRight();
    } else if (rect.right + tooltipMargin + tooltipElement.offsetWidth > vw) {
      moveToBottomLeft();
    } else {
      moveToBottomRight();
    }
  };

  switch (position) {
    case 'top':
      adjustTopPosition();
      break;
    case 'bottom':
      adjustBottomPosition();
      break;
    case 'left':
      adjustLeftPosition();
      break;
    case 'right':
      adjustRightPosition();
      break;
    case 'top-left':
      adjustTopLeftPosition();
      break;
    case 'top-right':
      adjustTopRightPosition();
      break;
    case 'bottom-left':
      adjustBottomLeftPosition();
      break;
    case 'bottom-right':
      adjustBottomRightPosition();
      break;
  }
};

const Tooltip = ({ title, children, position }) => {
  const [tooltipElement] = useState(document.createElement('div'));
  const [isHover, setIsHover] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const childRef = useRef();
  tooltipElement.id = `${tooltipId}`;
  tooltipElement.style.position = 'absolute';
  tooltipElement.style.willChange = 'transform';
  tooltipElement.style.zIndex = 2000;
  tooltipElement.style.top = 0;
  tooltipElement.style.left = 0;
  tooltipElement.style.maxWidth = tooltipMaxWidth;
  tooltipElement.style.maxHeight = tooltipMaxHeight;
  tooltipElement.style.overflow = 'auto';

  useEffect(() => {
    document.body.appendChild(tooltipElement);
    const mouseMoveHandler = (event) => {
      const isMousePointerNear = isMousePointerNearTooltipContainer(
        tooltipElement,
        event
      );
      if (isMousePointerNear) {
        setIsNear(true);
      } else {
        setIsNear(false);
      }
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    return () => {
      document.body.removeChild(tooltipElement);
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  useLayoutEffect(() => {
    if (childRef && childRef.current && isHover) {
      changeTooltipPos(tooltipElement, childRef.current, position);
    }
  }, [isHover]);

  return (
    <>
      {cloneElement(React.Children.only(children), {
        ref: childRef,
        onMouseOver: (e) => {
          setIsHover(true);
        },
        onMouseLeave: (e) => {
          setIsHover(false);
        },
      })}
      {(isHover || isNear) &&
        createPortal(
          <div
            className={classes.tooltipContainer}
            onMouseLeave={() => setIsNear(false)}
          >
            <Typography variant='body'>{title} </Typography>
          </div>,
          tooltipElement
        )}
    </>
  );
};

export default Tooltip;
