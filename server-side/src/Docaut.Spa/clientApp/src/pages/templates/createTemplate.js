import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Sections from './Sections'
import _ from 'lodash'
import uuid from 'uuid/v1'
import NewTemplateProvider, {
  NewTemplateConsumer
} from '../../context/NewTemplateContext'

export default class CreateTemplate extends Component {
  constructor(props) {
    super(props)    
  }

  render() {
    return (
      <NewTemplateProvider>
        <NewTemplateConsumer>
          {({addSection}) => (            
            <Container className="mt-5">
              <Row className="mb-5 align-items-center justify-content-center">
                <Col md={5} className="text-center">
                  <h1 className="h3 mb-3">Create template</h1>
                  <Form.Control placeholder="Template name" />
                </Col>
              </Row>

              <Sections />
              <Row className="text-right my-5">
                <Col md={10} className="mx-auto">
                  <Button variant="outline-success" onClick={addSection}>
                    Add optional section
                  </Button>{' '}
                </Col>
              </Row>

              <Row className="text-right my-5">
                <Col md={10} className="mx-auto">
                  <Button variant="outline-primary">Save</Button>{' '}
                  <Button variant="outline-danger">Exit</Button>{' '}
                </Col>
              </Row>
            </Container>
          )}
        </NewTemplateConsumer>
      </NewTemplateProvider>
    )
  }
}
