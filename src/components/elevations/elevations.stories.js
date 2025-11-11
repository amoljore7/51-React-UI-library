import React from 'react';
import Elevations from './index';

export default {
  title: 'design-components/Elevations',
  component: Elevations,
};

export const DefaultElevations = () => {
  return (
    <>
      <Elevations level={1} />
      <br />
      <Elevations level={2} />
      <br />
      <Elevations level={3} />
      <br />
      <Elevations level={4} />
      <br />
      <Elevations level={5} />
      <br />
      <Elevations level={6} />
      <br />
      <Elevations level={7} />
      <br />
      <Elevations level={8} />
      <br />
      <Elevations level={9} />
      <br />
    </>
  );
}