import React from 'react';
import Section from './sections/Section';
import { NewTemplateConsumer } from 'context/NewTemplateContext';

const Sections = props => {
  return (
    <NewTemplateConsumer>
      {({ sections }) =>
        sections.map(section => {
          return <Section key={section.id} section={section} />;
        })
      }
    </NewTemplateConsumer>
  );
};

export default Sections;
