import React from 'react';
import Tooltip from '.';
import Button from '../button';

export default {
  title: 'design-components/Tooltip',
  component: Tooltip,
};
const text =
  'At vero eos et accusamus et iusto odio dAt vero eos et accusamus et iusto odio dignissimos ducimus ignissimos ducimus At vero eos et accusamus et iusto odio dignissimos ducimus At vero eos et accusamus et iusto odio dignissimos ducimus At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat';
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
      <Tooltip title={text} position="top">
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
