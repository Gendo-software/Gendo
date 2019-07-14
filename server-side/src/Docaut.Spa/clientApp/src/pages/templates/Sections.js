import React from 'react'
import Section from './sections/Section'
import { NewTemplateConsumer } from 'context/NewTemplateContext'

const Sections = props => {
  return (
    <NewTemplateConsumer>
      {({sections}) => (
        sections.map(section => {
          return (
            <Section
              section={section}
              onRemoveSectionClick={props.onRemoveSectionClick}
            />
          )
        })
      )}
    </NewTemplateConsumer>
  )
}

export default Sections
