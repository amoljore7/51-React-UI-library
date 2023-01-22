import { useState } from 'react';
import Checkbox from './checkbox';

export default {
  title: 'design-components/Checkbox',
  component: Checkbox,
};

export const CheckboxWithState = () => {
  const [checkState, setCheckState] = useState(false);

  const onChange = (e) => {
    setCheckState(e.target.checked);
  };

  return (
    <Checkbox
      name="checkbox"
      label="Checkbox"
      checked={checkState}
      onChange={onChange}
    />
  );
};

CheckboxWithState.storyName = 'Checkbox (with state)';

export const CheckboxGroup = () => {
  const [checkState, setCheckState] = useState({
    india: true,
    new_zealand: false,
    australia: false,
    zimbambwe: true,
  });

  const onChange = (e) => {
    setCheckState({ ...checkState, [e.target.name]: e.target.checked });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          marginBottom: '8px',
          fontFamily: 'OpenSansRegular',
          fontWeight: '600',
          fontSize: '14px',
        }}
      >
        Countries
      </div>
      <div style={{ marginBottom: '8px' }}>
        <Checkbox
          name="india"
          label="India"
          checked={checkState.india}
          onChange={onChange}
        />
      </div>
      <div style={{ marginBottom: '8px' }}>
        <Checkbox
          name="new_zealand"
          label="New Zealand"
          checked={checkState.new_zealand}
          disabled={true}
          onChange={onChange}
        />
      </div>
      <div style={{ marginBottom: '8px' }}>
        <Checkbox
          name="australia"
          label="Australia"
          checked={checkState.australia}
          onChange={onChange}
        />
      </div>
      <div style={{ marginBottom: '8px' }}>
        <Checkbox
          name="zimbambwe"
          label="Zimbambwe"
          checked={checkState.zimbambwe}
          readOnly={true}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
