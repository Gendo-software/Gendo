import React, { Component } from 'react'
import uuid from 'uuid/v1'

const NewTemplateContext = React.createContext()

export default class NewTemplateProvider extends Component {
  state = {
    name: '',
    sections: [{ name: 'Main section', id:uuid(), isOptional: false }]
  }

  addSection = () => {    
    const newOptionalSection = { name: 'tets1', id: uuid(), isOptional: true }
    this.setState(prevState => {
      {
        prevState.sections.push(newOptionalSection)
        return prevState
      }
    })
  }

  removeSection = (event, section) => {    
    const filteredSections = this.state.sections.filter(x => x.id != section.id)
    this.setState({ sections: filteredSections })
  }

  render() {
    const { children } = this.props
    return (
      <NewTemplateContext.Provider
        value={{
          name: this.state.name,
          sections: this.state.sections,
          addSection: this.addSection,
          removeSection: this.removeSection
        }}>
        {children}
      </NewTemplateContext.Provider>
    )
  }
}

export const NewTemplateConsumer = NewTemplateContext.Consumer
