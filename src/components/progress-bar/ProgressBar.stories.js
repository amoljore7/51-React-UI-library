import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

export default {
  title: 'design-components/ProgressBar',
  component: ProgressBar,
};

export const ProgressBarDemo = () => {
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (time === 0) {
      setTime(30);
    } else {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);
  return (
    <ProgressBar
      progressPercentage={(time / 30) * 100}
      displayValue={`${time}s`}
      width={170}
      height={8}
    />
  );
};
