import React, { Component } from 'react'
import { Container, Col, Table, Row, Button } from 'react-bootstrap'
import './Home.css'


export default class Home extends Component {
  render() {
    return (
      <>
        <Container className="mt-5">
          <Row>
            <Col lg={{ offset: 2 }}>
              <h4>Templates</h4>
            </Col>
          </Row>
          <Row>
            <Col lg={{ offset: 2, span: 5 }} className="mt-2">
              <Table hover borderless className="Home__templatesTable" size="sm">
                <tbody>
                  <tr>
                    <td> 1. Seeling Car</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="px-3">
                        Create
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2. Selling a flat</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="px-3">
                        Create
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>3. Company starting</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="px-3">
                        Create
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>

        <Container className="mt-5">
          <Row>
            <Col lg={{ offset: 2 }}>
              <h4>My documents</h4>
            </Col>
          </Row>
          <Row>
            <Col lg={{ offset: 2, span: 5 }}>
              <Table hover borderless className="Home__templatesTable" size="sm">
                <tbody>
                  <tr>
                    <td>
                      1. Volkswagen Passat
                      <span className="d-block text-right border-top text-muted font-italic">
                        Seeling Car
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="px-3 mr-1">
                        Open
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="px-3 mr-1">
                        <b>×</b>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      2. Opel Astra
                      <span className="d-block text-right border-top text-muted font-italic">
                        Seeling Car
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="px-3 mr-1">
                        Open
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="px-3 mr-1">
                        <b>×</b>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      3. BMW X5
                      <span className="d-block text-right border-top text-muted font-italic">
                        Seeling Car
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="px-3 mr-1">
                        Open
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="px-3 mr-1">
                        <b>×</b>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
