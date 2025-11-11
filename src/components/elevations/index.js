import React from 'react';
import './index.scss';

const Elevations = ({ level = 1 }) => {
  return (
    <>
      <div className={`elevation-container elevation-level-${level}`}>
        <div>
          Elevations Level {level}
          <br />
          <br />
          <br />
          {`elevation-level-${level}`}
        </div>
      </div>
    </>
  )
}

export default Elevations;