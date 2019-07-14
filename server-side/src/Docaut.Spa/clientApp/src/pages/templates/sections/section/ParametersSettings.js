import React, { Component } from 'react'
import { Row, Col, Table, Form, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default class ParametersSettings extends Component {
  render() {
    return (
      <div className="border py-2">
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
            <tr>
              <td style={{ minWidth: '120pt' }} className="align-middle">
                <strong>BuyerName</strong>
              </td>
              <td style={{ minWidth: '120pt' }}>
                <Form.Control />
              </td>
              <td style={{ minWidth: '120pt' }}>
                <Form.Control as="select">
                  <option value="date">Date</option>
                  <option value="number">Number</option>
                  <option value="text">Text</option>
                  <option value="currency">Currency</option>
                </Form.Control>
              </td>
              <td className="align-middle text-center">
                <Form.Check onChange={() => alert('yes')} type="checkbox" />
                {/* TODO: Custom component */}
                {/* <FontAwesomeIcon icon={faCheck} /> */}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}
