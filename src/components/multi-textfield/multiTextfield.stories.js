import React from 'react';
import MultiTextfield from './multiTextfield';

export default {
  title: 'design-components/MultiTextfield',
  component: MultiTextfield,
};

export const Default = () => {

  const props = {
    valueString: '',
    finalValue: (value) => console.log(value),
    finalObject: (obj) => console.log(obj),
    isAllFieldSaved: (flag) => console.log(flag),
  };
  return <MultiTextfield {...props} />;
};

export const WithData = () => {

  const props = {
    valueString: 'ABC,XYZ',
    finalValue: (value) => console.log(value),
    finalObject: (obj) => console.log(obj),
    isAllFieldSaved: (flag) => console.log(flag),
  };
  return <MultiTextfield {...props} />;
};

export const MaxField = () => {

  const props = {
    valueString: 'AB,XY,ZM,CD,WE,QR',
    maxField: 3,
    finalValue: (value) => console.log(value),
    finalObject: (obj) => console.log(obj),
    isAllFieldSaved: (flag) => console.log(flag),
  };
  return <MultiTextfield {...props} />;
};

export const WithTooltip = () => {

  const props = {
    valueString: 'ABC,XYZ',
    tooltip: true,
    addBtnTooltipText: 'Add Additional value with "Or" condition',
    finalValue: (value) => console.log(value),
    finalObject: (obj) => console.log(obj),
    isAllFieldSaved: (flag) => console.log(flag),
  };
  return (
    <div
      style={{
        height: '200px',
        display: 'flex',
      }}
    >
      <MultiTextfield {...props} />
    </div>
  ) 
};

