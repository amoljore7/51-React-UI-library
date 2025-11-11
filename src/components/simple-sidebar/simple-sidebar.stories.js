import React, { useState } from 'react';
import SimpleSidebar from './index.js';

export default {
  title: 'design-components/SimpleSidebar',
  component: SimpleSidebar,
};

export const Demo = () => {
  const [isOpen, setIsOpen] = useState(true);

  const drawerToggleClickHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
     <SimpleSidebar isOpen={isOpen} onToggle={drawerToggleClickHandler} width={328} height={500}>
      Test
     </SimpleSidebar>
  );
};
