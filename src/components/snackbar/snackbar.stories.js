import Snackbar from './snackbar.jsx';
import errorIcon from '../../story-assets/icons/error.svg';

export default {
  title: 'design-components/Snackbar',
  component: Snackbar,
};

export const FormError = () => {
  const props = {
    title: 'Submit Error',
    icon: errorIcon,
    errorList: [
      '- This is a error list toast component.',
      '- This is a error list toast component.',
      '- This is a error list toast component.',
    ],
  };
  return <Snackbar {...props} />;
};
