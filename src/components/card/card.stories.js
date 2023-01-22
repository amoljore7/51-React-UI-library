import React from 'react';
import Card from './card';
import britiveLogo from '../../story-assets/images/britive-logo.jpg';
import details from '../../story-assets/images/details.svg';

export default {
  title: 'design-components/Card',
  component: Card,
};

const CardTemplate = (args) => <Card {...args} />;

export const CardWithImageAndTitle = CardTemplate.bind({});
CardWithImageAndTitle.args = {
  title: 'Static Secret Templates',
  image: details,
};

CardWithImageAndTitle.args.clickHandler = function (event) {
  event.preventDefault();
  alert(`Card with title ${CardWithImageAndTitle.args.title} has been clicked`);
};

export const CardWithDisabled = CardTemplate.bind({});
CardWithDisabled.args = {
  title: 'Secret Governance',
  image: britiveLogo,
  disabled: true,
};

CardWithDisabled.args.clickHandler = function (event) {
  event.preventDefault();
  alert(`Card with title ${CardWithDisabled.args.title} has been clicked`);
};
