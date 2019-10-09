import React, { Component } from 'react';
import uuid from 'uuid/v1';
import _ from 'lodash';
import detectHashInText from '../misc/detectHashInText';
import sampleText from './../assets/sampleText';
import TemplatesApiClient from '../api/clients/TemplatesApiClient';
import { withAppContext } from './AppContext';
import AppException from '../exceptions/AppException';

const TemplateContext = React.createContext();

class TemplateProvider extends Component {
  state = {
    name: '',
    sections: [
      {
        name: 'mainSection',
        id: uuid(),
        isOptional: false,
        text: sampleText.Text,
        fields: [],
      },
    ],
    id: '',
  };

  componentDidMount() {
    let newSections = [...this.state.sections];
    this.state.sections.forEach(section => {
      newSections = [...this.detectFields(section.text, newSections, section)];
    });
    this.setState({ sections: newSections });
  }
  addSection = () => {
    const newOptionalSection = {
      name: '',
      id: uuid(),
      isOptional: true,
      text: '',
      fields: [],
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
          displayName: this.generateDisplayName(newFieldName),
        });
      });
      fieldsCollection = fieldsCollection.filter(
        x => !newFieldsToRemove.includes(x.name)
      );
      sections[index].fields = [...fieldsCollection];
    }

    return sections;
  }

  generateDisplayName = fieldName => {
    return fieldName.replace(/\./g, ' ');
  };

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

  async createTemplate() {
    const { appContext } = this.props;

    let template = {
      name: this.state.name,
      content: { sections: this.state.sections },
      userId: appContext.userProfile.sub,
    };

    const templatesApi = new TemplatesApiClient();
    return templatesApi
      .createTemplate(template)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.dir('error details', error);
        throw new AppException('error during save template', error);
      });
  }

  async editTemplate() {
    const { appContext } = this.props;

    let template = {
      name: this.state.name,
      content: { sections: this.state.sections },
      userId: appContext.userProfile.sub,
      id: this.state.id,
    };

    const templatesApi = new TemplatesApiClient();
    return templatesApi
      .editTemplate(template)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.dir('error details', error);
        throw new AppException('error during save template', error);
      });
  }

  onTemplateChange(event) {
    const propName = event.target.name;
    let newState = { ...this.state };
    newState[propName] = event.target.value;

    this.setState({ ...newState });
  }

  setTemplateData(templateData) {
    this.setState({
      name: templateData.name,
      sections: templateData.content.sections,
      id: templateData.id,
    });
  }

  render() {
    const { children } = this.props;
    return (
      <TemplateContext.Provider
        value={{
          name: this.state.name,
          sections: this.state.sections,
          addSection: this.addSection.bind(this),
          removeSection: this.removeSection.bind(this),
          onSectionChange: this.onSectionChange.bind(this),
          onSectionFieldChange: this.onSectionFieldChange.bind(this),
          createTemplate: this.createTemplate.bind(this),
          editTemplate: this.editTemplate.bind(this),
          onTemplateChange: this.onTemplateChange.bind(this),
          setTemplateData: this.setTemplateData.bind(this),
        }}
      >
        {children}
      </TemplateContext.Provider>
    );
  }
}

export const withTemplateProvider = Component => {
  const WrappedComponent = props => {
    return (
      <TemplateProvider appContext={props.appContext}>
        <Component {...props} />
      </TemplateProvider>
    );
  };

  return withAppContext(WrappedComponent);
};

export const withTemplateConsumer = Component => {
  const WrappedComponent = props => {
    return (
      <TemplateContext.Consumer>
        {context => <Component {...props} templateContext={context} />}
      </TemplateContext.Consumer>
    );
  };

  return WrappedComponent;
};
