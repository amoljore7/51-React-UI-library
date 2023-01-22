import React, { useEffect, useRef } from 'react';
import BackToTop from './';

export default {
  title: 'design-components/BackToTop',
  component: BackToTop,
};

export const BackToTopSimple = () => {
  const parentContainer = useRef();

  // hide the scroll bar for this story
  useEffect(() => {
    const earlier = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = earlier);
  }, []);
  const containerStyles = {
    borderLeft: '2px solid #1EA7FD',
    width: '800px',
    height: '100vh',
    overflow: 'auto',
    margin: 'auto',
    paddingTop: '15px',
    paddingBottom: '15px',
    backgroundColor: '#E9E8E2',
  };
  const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    height: '100vh',
    margin: 'auto',
    marginBottom: '32px',
    background: 'white',
    textAlign: 'center',
    fontSize: '32px',
  };

  const textStyle = {
    verticalAlign: 'center',
    display: 'flex',
  };

  return (
    <>
      <div style={containerStyles} ref={parentContainer}>
        <div style={pageStyles}>
          <div style={textStyle}>Section 1</div>
        </div>
        <div style={pageStyles}>
          <div style={textStyle}>Section 2</div>
        </div>
        <div style={pageStyles}>
          <div style={textStyle}>Section 3</div>
        </div>
        <div style={pageStyles}>
          <div style={textStyle}>Section 4</div>
        </div>
      </div>
      {/*Add Back to top as a sibling (just below the div) jsx element wherever scrolling is to happen.*/}
      {/*DO NOT add the back to top inside the scrolling div.*/}
      {/*Pass the ref of dom element inside which button is to be used.*/}
      <BackToTop id="some-id" parentRef={parentContainer} />
    </>
  );
};
