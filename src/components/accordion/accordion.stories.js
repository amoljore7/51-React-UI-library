import React from 'react';
import Accordion from './accordion';

export default {
  title: 'design-components/Accordion',
  component: Accordion,
};

export const DefaultAccordion = () => {
  return (
    <Accordion title="General">
      <div>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,<br/>
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. <br/>
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.<br/>
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing<br/>
      software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
    </Accordion>
  )
}

export const DefaultOpen = () => {
  return (
    <Accordion title="General" expanded>
      <div>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,<br/>
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. <br/>
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.<br/>
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing<br/>
      software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
    </Accordion>
  )
}