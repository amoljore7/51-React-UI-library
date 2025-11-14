import React from 'react';
import Tooltip from '.';
import Button from '../button';

export default {
  title: 'design-components/Tooltip',
  component: Tooltip,
};
const text = 'This is a tooltip text for tooltip component which is quite useful to show information of any actions';
export const TooltipTop = () => {
  //NOTE:  Tooltip needs an element with ability to forward ref to the underlying native element
  // in case of a React component.
  // For native elements such as div, span etc
  // no need to forward ref or convert it into a component
  // Just enclose the div with tooltip
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip title={text} position="top" zIndex={2000}>
        <div>
          <Button variant="primary" size="small">
            Submit
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

export const TooltipBottom = () => {
  //NOTE: Tooltip needs an element with ability to forward ref to the underlying native element
  // in case of a React component.
  // For native elements such as div, span etc
  // no need to forward ref or convert it into a component
  // Just enclose the div with tooltip
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip title={text} position="bottom">
        <div>
          <Button variant="primary" size="small">
            Submit
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

export const TooltipLeft = () => {
  //NOTE:  Tooltip needs an element with ability to forward ref to the underlying native element
  // in case of a React component.
  // For native elements such as div, span etc
  // no need to forward ref or convert it into a component
  // Just enclose the div with tooltip
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip title={text} position="left">
        <div>
          <Button variant="primary" size="small">
            Submit
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

export const TooltipRight = () => {
  //NOTE:  Tooltip needs an element with ability to forward ref to the underlying native element
  // in case of a React component.
  // For native elements such as div, span etc
  // no need to forward ref or convert it into a component
  // Just enclose the div with tooltip
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip title={text} position="right">
        <div>
          <Button variant="primary" size="small">
            Submit
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

export const TooltipBottomLeft = () => {
  //NOTE:  Tooltip needs an element with ability to forward ref to the underlying native element
  // in case of a React component.
  // For native elements such as div, span etc
  // no need to forward ref or convert it into a component
  // Just enclose the div with tooltip
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip title={text} position="bottom-left">
        <div>
          <Button variant="primary" size="small">
            Submit
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

export const TooltipBottomRight = () => {
  //NOTE:  Tooltip needs an element with ability to forward ref to the underlying native element
  // in case of a React component.
  // For native elements such as div, span etc
  // no need to forward ref or convert it into a component
  // Just enclose the div with tooltip
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip title={text} position="bottom-right">
        <div>
          <Button variant="primary" size="small">
            Submit
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

export const TooltipTopLeft = () => {
  //NOTE:  Tooltip needs an element with ability to forward ref to the underlying native element
  // in case of a React component.
  // For native elements such as div, span etc
  // no need to forward ref or convert it into a component
  // Just enclose the div with tooltip
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip title={text} position="top-left">
        <div>
          <Button variant="primary" size="small">
            Submit
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

export const TooltipTopRight = () => {
  //NOTE:  Tooltip needs an element with ability to forward ref to the underlying native element
  // in case of a React component.
  // For native elements such as div, span etc
  // no need to forward ref or convert it into a component
  // Just enclose the div with tooltip
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip title={text} position="top-right">
        <div>
          <Button variant="primary" size="small">
            Submit
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};
