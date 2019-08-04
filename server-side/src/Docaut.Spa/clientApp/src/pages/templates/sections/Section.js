import React from 'react';
import Editor from './section/Editor';
import ParametersSettings from './section/ParametersSettings';
import SectionHeader from './section/SectionHeader';

const Section = props => {
  return (
    <div className="mb-5">
      <SectionHeader section={props.section}/>
      <Editor section={props.section} />
      <ParametersSettings section={props.section}/>
    </div>
  );
};

export default Section;
