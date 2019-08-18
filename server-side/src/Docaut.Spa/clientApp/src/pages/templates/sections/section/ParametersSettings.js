import React, { Component } from 'react';
import { Form, Table } from 'react-bootstrap';
import { NewTemplateConsumer } from '../../../../context/NewTemplateContext';




export default class ParametersSettings extends Component {
  
  onTypeChange = (event, field, section, onSectionFieldChange) => {
    onSectionFieldChange(event, section, field);
  }

  onDisplayNameChange(event, field, section, onSectionFieldChange){
    onSectionFieldChange(event, section, field);
  }
  onMandatoryChange(event, field, section, onSectionFieldChange){        
    event.target.value = event.target.checked;
    onSectionFieldChange(event, section, field);
  }

  render() {
    return <NewTemplateConsumer>
        {({ onSectionChange, onSectionFieldChange }) => <div className="border py-2">
            <h4 className="mx-2">Parameters</h4>
            <Table responsive borderless>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Variable name</th>
                  <th scope="col">Display name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Mandatory</th>
                </tr>
              </thead>
              <tbody>
                {this.props.section.fields.map((field, key) => (
                  <tr key={field.name}>
                    <td
                      style={{ minWidth: '120pt' }}
                      className="align-middle">
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
                            onSectionFieldChange
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
                            onSectionFieldChange
                          )
                        }>
                        <option value="text">Text</option>
                        <option value="date">Date</option>
                        <option value="number">Number</option>
                        <option value="currency">Currency</option>
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
                            onSectionFieldChange
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
          </div>}
      </NewTemplateConsumer>;
  }
}
