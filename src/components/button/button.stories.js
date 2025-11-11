import Button from './button.jsx';
import circularIcon from '../../story-assets/icons/circle.svg';
import cancelRequestIcon from '../../story-assets/icons/cancelRequest.svg'
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

export const LeftSVGIcon = () => {
  // use this to pass an svg icon as a prop
  // instead of adding it as a children
  return (
    <Button variant='primary' size='large' leftSVGIcon={cancelRequestIcon}>
      Withdraw Request
    </Button>
  )
}

export const RightSVGIcon = () => {
   // use this to pass an svg icon as a prop
  // instead of adding it as a children
  return (
    <Button variant='primary' size='large' rightSVGIcon={cancelRequestIcon}>
      Withdraw Request
    </Button>
  )
}

export const WithTooltip = () => {
  return (
    <Button
      variant="primary"
      size="large"
      onClick={() => alert('Button clicked')}
      tooltipText="This is a tooltip text."
      tooltipPosition="right"
    >
      Button
    </Button>
  );
};

export const WithTooltipWithIcon = () => {
  return (
    <Button
      variant="primary"
      size="large"
      onClick={() => alert('Button clicked')}
      tooltipText="This is a tooltip text."
      tooltipPosition="right"
    >
      <img src={circularIcon} alt="icon" style={{ marginRight: '0.5rem' }} />
      Button
    </Button>
  );
};

export const WithTooltipWithSVGIcon = () => {
  return (
    <Button
      variant="primary"
      size="large"
      onClick={() => alert('Button clicked')}
      tooltipText="This is a tooltip text."
      tooltipPosition="right"
      leftSVGIcon={cancelRequestIcon}
    >
      Button
    </Button>
  );
};
