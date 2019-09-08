import React, { Component } from 'react';
import uuid from 'uuid/v1';
import _ from 'lodash';
import detectHashInText from '../misc/detectHashInText';
import sampleText from './../assets/sampleText';
import TemplatesApiClient from '../api/clients/TemplatesApiClient';
import AuthManager from '../Auth/AuthManager';

const NewTemplateContext = React.createContext();

export default class NewTemplateProvider extends Component {
  state = {
    name: '',
    sections: [
      {
        name: 'Main section',
        id: uuid(),
        isOptional: false,
        text: sampleText.Text,
        fields: []
      }
    ]
  };

  componentDidUpdate() {
    console.dir(this.state);
  }
  componentDidMount() {
    let newSections = [...this.state.sections];
    this.state.sections.forEach(section => {
      newSections = [...this.detectFields(section.text, newSections, section)];
    });
    this.setState({ sections: newSections });
  }
  addSection = () => {
    alert(sampleText);

    const newOptionalSection = {
      name: 'tets1',
      id: uuid(),
      isOptional: true,
      text: '',
      fields: []
    };
    this.setState(prevState => {
      prevState.sections.push(newOptionalSection);
      return prevState;
    });
  };

  removeSection = (event, section) => {
    const filteredSections = this.state.sections.filter(
      x => x.id !== section.id
    );
    this.setState({ sections: filteredSections });
  };

  onSectionChange = (event, section) => {
    const newValue = event.target.value;
    let newSections = [...this.state.sections];
    const propName = event.target.name;
    const index = newSections.findIndex(x => x.id === section.id);

    newSections[index][propName] = newValue;

    if (event.target.name === 'text') {
      newSections = [...this.detectFields(newValue, newSections, section)];
    }
    this.setState({ sections: newSections });
  };

  detectFields(text, sections, section) {
    const index = sections.findIndex(x => x.id === section.id);
    const fields = detectHashInText(text);
    if (!_.isEqual(sections[index].fields.map(x => x.name).sort(), fields)) {
      //console.log(`setState new fields collection: ${fields}`);
      const newFieldsToAdd = _.difference(
        fields,
        sections[index].fields.map(x => x.name)
      );
      const newFieldsToRemove = _.difference(
        sections[index].fields.map(x => x.name),
        fields
      );
      let fieldsCollection = sections[index].fields;
      newFieldsToAdd.forEach(newFieldName => {
        fieldsCollection.push({
          name: newFieldName,
          type: 'text',
          mandatory: false,
          displayName: ''
        });
      });
      fieldsCollection = fieldsCollection.filter(
        x => !newFieldsToRemove.includes(x.name)
      );
      sections[index].fields = [...fieldsCollection];
    }

    return sections;
  }

  onSectionFieldChange = (event, section, field) => {
    let valueTemp = event.target.value;
    if (event.target.type === 'checkbox') {
      valueTemp = event.target.checked;
    }

    const newValue = valueTemp;

    const propName = event.target.name;
    let newSections = [...this.state.sections];
    const sectionIndex = newSections.findIndex(x => x.id === section.id);
    const fieldIndex = newSections[sectionIndex].fields.findIndex(
      x => x.name === field.name
    );
    newSections[sectionIndex].fields[fieldIndex][propName] = newValue;

    this.setState({ sections: newSections });
  };

  saveTemplate() {
    const userProfile = AuthManager.getAuthObject().UserProfile;
    console.dir(userProfile);

    let template = {
      name: this.state.name,
      content: { sections: this.state.sections },
      userId: userProfile.sub
    };

    const templatesApi = new TemplatesApiClient();
    templatesApi
      .saveTemplate(template)
      .then(response => {
        alert('success?');
        console.dir(response);
      })
      .catch(error => {
        alert('error during save template');
      });
  }

  onTemplateChange(event) {
    const propName = event.target.name;
    let newState = { ...this.state };
    newState[propName] = event.target.value;

    this.setState({ ...newState });
  }

  render() {
    const { children } = this.props;
    return (
      <NewTemplateContext.Provider
        value={{
          name: this.state.name,
          sections: this.state.sections,
          addSection: this.addSection.bind(this),
          removeSection: this.removeSection.bind(this),
          onSectionChange: this.onSectionChange.bind(this),
          onSectionFieldChange: this.onSectionFieldChange.bind(this),
          saveTemplate: this.saveTemplate.bind(this),
          onTemplateChange: this.onTemplateChange.bind(this)
        }}>
        {children}
      </NewTemplateContext.Provider>
    );
  }
}

export const NewTemplateConsumer = NewTemplateContext.Consumer;
