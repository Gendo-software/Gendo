import React, { Component } from 'react';
import { Form, Table } from 'react-bootstrap';
import { withTemplateConsumer } from '../../../../context/TemplateContext';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';

class ParametersSettings extends Component {
  onTypeChange = (event, field, section, onSectionFieldChange) => {
    onSectionFieldChange(event, section, field);
  };

  onDisplayNameChange(event, field, section, onSectionFieldChange) {
    onSectionFieldChange(event, section, field);
  }
  onMandatoryChange(event, field, section, onSectionFieldChange) {
    event.target.value = event.target.checked;
    onSectionFieldChange(event, section, field);
  }

  render() {
    const { t } = this.props;
    return (
      <div className="border py-2">
        <h4 className="mx-2">{t('parameters')}</h4>
        <Table responsive borderless>
          <thead className="thead-dark">
            <tr>
              <th scope="col">{t('variableName')}</th>
              <th scope="col">{t('displayName')}</th>
              <th scope="col">{t('type')}</th>
              <th scope="col">{t('mandatory')}</th>
            </tr>
          </thead>
          <tbody>
            {this.props.section.fields.map((field, key) => (
              <tr key={field.name}>
                <td style={{ minWidth: '120pt' }} className="align-middle">
                  <strong>{field.name}</strong>
                </td>
                <td style={{ minWidth: '120pt' }}>
                  <Form.Control
                    value={field.displayName}
                    name={'displayName'}
                    onChange={(...params) =>
                      this.onDisplayNameChange(
                        ...params,
                        field,
                        this.props.section,
                        this.props.templateContext.onSectionFieldChange
                      )
                    }
                  />
                </td>
                <td style={{ minWidth: '120pt' }}>
                  <Form.Control
                    value={field.type}
                    as="select"
                    name={'type'}
                    onChange={(...params) =>
                      this.onTypeChange(
                        ...params,
                        field,
                        this.props.section,
                        this.props.templateContext.onSectionFieldChange
                      )
                    }
                  >
                    <option value="text">{t('common:text')}</option>
                    <option value="date">{t('common:date')}</option>
                    <option value="number">{t('common:number')}</option>
                    <option value="currency">{t('common:currency')}</option>
                  </Form.Control>
                </td>
                <td className="align-middle text-center">
                  <Form.Check
                    value={field.mandatory}
                    name={'mandatory'}
                    onChange={(...params) =>
                      this.onMandatoryChange(
                        ...params,
                        field,
                        this.props.section,
                        this.props.templateContext.onSectionFieldChange
                      )
                    }
                    type="checkbox"
                  />
                  {/* TODO: Custom component */}
                  {/* <FontAwesomeIcon icon={faCheck} /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default compose(
  withTranslation('Template'),
  withTemplateConsumer
)(ParametersSettings);
