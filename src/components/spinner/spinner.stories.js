import Spinner from './spinner';

export default {
  title: 'design-components/Spinner',
  component: Spinner,
};

export const Default = () => {
  const props = {
    message: 'Loading Message...',
  };

  return <Spinner {...props}></Spinner>;
};

export const Medium = () => {
  const props = {
    size: 'medium',
    message: 'Loading Message...',
  };

  return <Spinner {...props}></Spinner>;
};

export const Small = () => {
  const props = {
    size: 'small',
  };

  return <Spinner {...props}></Spinner>;
};

export const WithOverlay = () => {
  const props = {
    size: 'medium',
    message: 'Loading Message...',
    overlay: true,
  };

  return (
    <div>
      <span>Some page content on background</span>
      <Spinner {...props}></Spinner>
    </div>
  );
};

export const WithContainerOverlay = () => {
  const props = {
    size: 'medium',
    message: 'Loading Message...',
    overlayOnContainer: true,
  };

  //NOTE: Parent div element must always have position as "relative"
  //      to support the spinner to overlay above the container
  //      and not on the page.

  return (
    <div>
      <span>Some page content on background</span>
      <div
        style={{ border: '1px solid black', height: '300px', width: '300px', position: 'relative' }}
      >
        <p>
          Some page content inside box.Some page content inside box.Some page content inside
          box.Some page content inside box.Some page content inside box.Some page content inside
          box.Some page content inside box.Some page content inside box.Some page content inside
          box.Some page content inside box.
        </p>
        <Spinner {...props}></Spinner>
      </div>
    </div>
  );
};
