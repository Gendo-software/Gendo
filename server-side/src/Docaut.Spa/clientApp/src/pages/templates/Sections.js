import React from 'react';
import Section from './sections/Section';
import { withTemplateConsumer } from 'context/TemplateContext';

const Sections = props => {
  return props.templateContext.sections.map(section => (
    <Section key={section.id} section={section} />
  ));
};

export default withTemplateConsumer(Sections);
