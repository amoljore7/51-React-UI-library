import Button from './button.jsx';
import circularIcon from '../../story-assets/icons/circle.svg';
import { FaBeer } from 'react-icons/fa';

export default {
  title: 'design-components/Button',
  component: Button,
};

export const Primary = () => {
  return (
    <Button variant="primary" size="large" type="submit" onClick={() => alert('Button clicked')}>
      Button
    </Button>
  );
};

export const Secondary = () => {
  return (
    <Button variant="secondary" size="large" type="reset" onClick={() => alert('Button clicked')}>
      Button
    </Button>
  );
};

export const TextOnly = () => {
  return (
    <Button variant="textOnly" size="large" onClick={() => alert('Button clicked')}>
      Button
    </Button>
  );
};

export const Icon = () => {
  return (
    <Button variant="textOnly" size="large" onClick={() => alert('Button clicked')}>
      <FaBeer />
    </Button>
  );
};

export const Large = () => {
  return (
    <Button variant="primary" size="large" onClick={() => alert('Button clicked')}>
      Button
    </Button>
  );
};
export const Medium = () => {
  return (
    <Button variant="primary" size="medium" onClick={() => alert('Button clicked')}>
      Button
    </Button>
  );
};
export const Small = () => {
  return (
    <Button variant="primary" size="small" onClick={() => alert('Button clicked')}>
      Button
    </Button>
  );
};

export const RightIcon = () => {
  return (
    <Button variant="primary" size="large" onClick={() => alert('Button clicked')}>
      <img src={circularIcon} alt="icon" style={{ marginRight: '0.5rem' }} />
      Button
    </Button>
  );
};

export const LeftIcon = () => {
  return (
    <Button variant="primary" size="large" onClick={() => alert('Button clicked')}>
      Button
      <img src={circularIcon} alt="icon" style={{ marginLeft: '0.5rem' }} />
    </Button>
  );
};

export const BothIcon = () => {
  return (
    <Button variant="primary" size="large" onClick={() => alert('Button clicked')}>
      <img src={circularIcon} alt="icon" style={{ marginRight: '0.5rem' }} />
      Button
      <img src={circularIcon} alt="icon" style={{ marginLeft: '0.5rem' }} />
    </Button>
  );
};

export const PrimaryDisabled = () => {
  return (
    <Button variant="primary" size="medium" disabled={true}>
      Disabled
    </Button>
  );
};
export const SecondaryDisabled = () => {
  return (
    <Button variant="secondary" size="medium" disabled={true}>
      Disabled
    </Button>
  );
};
export const TextOnlyDisabled = () => {
  return (
    <Button variant="textOnly" size="medium" disabled={true}>
      Disabled
    </Button>
  );
};
