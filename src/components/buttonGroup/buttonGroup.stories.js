import Button from '../button';
import ButtonGroup from './buttonGroup';
import { FaList, FaChartBar, FaTable } from 'react-icons/fa';

export default {
  title: 'design-components/ButtonGroup',
  component: ButtonGroup,
};

export const ButtonGroups = () => {
  return (
    <ButtonGroup>
      <Button variant="primary" onClick={() => alert('Button clicked')}>
        one
      </Button>
      <Button variant="primary" onClick={() => alert('Button clicked')}>
        Two
      </Button>
      <Button variant="primary" onClick={() => alert('Button clicked')}>
        Three
      </Button>
    </ButtonGroup>
  );
};

export const ButtonGroupsSmall = () => {
  return (
    <ButtonGroup size="small">
      <Button variant="primary" onClick={() => alert('Button clicked')}>
        one
      </Button>
      <Button variant="primary" onClick={() => alert('Button clicked')}>
        Two
      </Button>
      <Button variant="primary" onClick={() => alert('Button clicked')}>
        Three
      </Button>
    </ButtonGroup>
  );
};

export const ButtonGroupsLarge = () => {
  return (
    <ButtonGroup size="large">
      <Button variant="primary" onClick={() => alert('Button clicked')}>
        one
      </Button>
      <Button variant="primary" onClick={() => alert('Button clicked')}>
        Two
      </Button>
      <Button variant="primary" onClick={() => alert('Button clicked')}>
        Three
      </Button>
    </ButtonGroup>
  );
};

export const ButtonGroupsRadio = () => {
  return (
    <ButtonGroup type="radio" onClick={(value) => { alert(value) }}>
      <Button value="one">
        <FaList/>&nbsp;one
      </Button>
      <Button value="two">
        <FaChartBar/>&nbsp;Two
      </Button>
      <Button value="three">
        <FaTable/>&nbsp;Three
      </Button>
    </ButtonGroup>
  );
};

export const ButtonGroupsRadioLarge = () => {
  return (
    <ButtonGroup size="large" type="radio" onClick={(value) => { alert(value) }}>
      <Button value="one">
        <FaList/>&nbsp;one
      </Button>
      <Button value="two">
        <FaChartBar/>&nbsp;Two
      </Button>
      <Button value="three">
        <FaTable/>&nbsp;Three
      </Button>
    </ButtonGroup>
  );
};

export const ButtonGroupsRadioSmall = () => {
  return (
    <ButtonGroup size="small" type="radio" onClick={(value) => { alert(value) }}>
      <Button value="one">
        <FaList/>&nbsp;one
      </Button>
      <Button value="two">
        <FaChartBar/>&nbsp;Two
      </Button>
      <Button value="three">
        <FaTable/>&nbsp;Three
      </Button>
    </ButtonGroup>
  );
};
