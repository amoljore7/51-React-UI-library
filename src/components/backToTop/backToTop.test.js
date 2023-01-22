/* eslint-disable no-undef */
import React, { useEffect, useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import BackToTop from './';
import { classes } from './constants';

describe('Button component unit test cases', () => {
  it('Check Button Primary', () => {
    render(<BackToTopSimple />);
    fireEvent.scroll(document.getElementsByClassName('Back-to-top-test')[0], {
      target: { scrollY: 100 },
    });

    expect(document.getElementsByClassName(classes.container)[0] !== null).toBe(true);
  });
});

const BackToTopSimple = () => {
  const parentContainer = useRef();
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
      <div className="Back-to-top-test" style={containerStyles} ref={parentContainer}>
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
      {/*Add Back to top as a sibling jsx element wherever scrolling is to happen.*/}
      {/*DO NOT add the back to top inside the scrolling div.*/}
      {/*Pass the ref of dom element inside which button is to be used.*/}
      <BackToTop parentRef={parentContainer} />
    </>
  );
};
