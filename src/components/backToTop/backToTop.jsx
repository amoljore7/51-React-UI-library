import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BsArrowUpShort } from 'react-icons/bs';
import './backToTop.scss';
import { arrowSize, bottomOffset, classes, portalId, rightOffset, width } from './constants';

const BackToTop = ({ parentRef, id }) => {
  const [portalModal] = useState(document.createElement('div'));
  const [show, setShow] = useState(false);
  portalModal.id = `${portalId}-${id}`;
  portalModal.style.top = 0;
  portalModal.style.left = 0;

  const handleOnScroll = () => {
    if (parentRef.current.scrollTop >= parentRef.current.offsetHeight / 2) setShow(true);
    else if (parentRef.current.scrollTop <= parentRef.current.offsetHeight / 2) setShow(false);
  };

  const onResize = () => {
    if (parentRef.current) {
      const { bottom, right } = parentRef.current.getBoundingClientRect();
      parentRef.current.onscroll = () => handleOnScroll();
      portalModal.style.transform = `translate(${
        right -
        width -
        rightOffset -
        (parentRef.current.offsetWidth - parentRef.current.clientWidth)
      }px,${bottom - bottomOffset - width}px)`;
    }
  };

  useLayoutEffect(() => {
    onResize();
  }, [parentRef]);

  useEffect(() => {
    document.body.appendChild(portalModal);
    return () => document.body.removeChild(portalModal);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const handleClick = () => {
    parentRef.current.scrollTo(0, 0);
  };
  return (
    show &&
    createPortal(
      <div className={classes.container} onClick={handleClick}>
        <div className={classes.arrow}>
          <BsArrowUpShort size={arrowSize} />
        </div>
      </div>,
      portalModal
    )
  );
};
BackToTop.propTypes = {
  parentRef: PropTypes.any,
};
export default BackToTop;
