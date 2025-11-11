import { useState } from 'react';
import Snackbar from './snackbar.jsx';

export default {
  title: 'design-components/Snackbar',
  component: Snackbar,
};

export const FormError = () => {
  const props = {
    maxHeight: '100px',
    title: 'Submit Error',
    errorList: [
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
    ],
  };
  return <Snackbar {...props} />;
};

export const FormErrorWithoutTitle = () => {
  const props = {
    maxHeight: '100px',
    errorList: ['This is a error list toast component.'],
  };
  return <Snackbar {...props} />;
};

export const FormErrorWithCloseButton = () => {
  const [showError, setShowError] = useState(true)

  const props = {
    maxHeight: '100px',
    errorList: ['This is a error list toast component.'],
    allowClosing: true,
    onClose: () => setShowError(false)
  };

  return (
    <>
      {showError && <Snackbar {...props} />}
    </>
  );
};
