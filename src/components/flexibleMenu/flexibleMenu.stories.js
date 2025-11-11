import FlexibleMenu from './flexibleMenu';

export default {
  title: 'design-components/FlexibleMenu',
  component: FlexibleMenu,
};

export const FlexibleMenuWithHeaderAndFooter = () => {
  return (
    <FlexibleMenu
      title="Menu title"
      footer={{
        text: 'Action',
        onClick: () => {},
      }}>
      <br/>
      test
      <br/>
      test
      <br/><br/>
    </FlexibleMenu>
  )
}

export const FlexibleMenuWithHeaderAndFooterMaxHeight = () => {
  return (
    <FlexibleMenu
      maxHeight
      title="Menu title"
      footer={{
        text: 'Action',
        onClick: () => {},
      }}>
      <br/>
      test
      <br/>
      test
      <br/>
      test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/>test
      <br/>
      test
      <br/><br/>
    </FlexibleMenu>
  )
}

export const FlexibleMenuWithHeader = () => {
  return (
    <FlexibleMenu title="Menu title">
      <br/>
      test
      <br/>
      test
      <br/><br/>
    </FlexibleMenu>
  )
}

export const FlexibleMenuWithFooter = () => {
  return (
    <FlexibleMenu
      footer={{
        text: 'Action',
        onClick: () => {},
      }}>
      <br/>
      test
      <br/>
      test
      <br/><br/>
    </FlexibleMenu>
  )
}

export const FlexibleMenuWithoutHeaderAndFooter = () => {
  return (
    <FlexibleMenu>
      <br/><br/>
      test
      <br/>
      test
      <br/><br/>
    </FlexibleMenu>
  )
}