import React from 'react'
import Editor from './section/Editor'
import ParametersSettings from './section/ParametersSettings'
import { Button, Row, Col } from 'react-bootstrap'
import SectionHeader from './section/SectionHeader';

const Section = props => {
  return (
    <div className="mb-5">
      <SectionHeader section={props.section}/>
      <Editor />
      <ParametersSettings />
    </div>
  )
}

export default Section
