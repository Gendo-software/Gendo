import React, { Component } from 'react'
import SectionComponent from 'components/CreateTemplate/SectionComponent'
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonToolbar
} from 'react-bootstrap'

export default class CreateTemplate extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Container className="mt-5">
        <Row className="mb-5 align-items-center justify-content-center">
          <Col md={5} className="text-center">
            <h1 className="h3 mb-3">Create template</h1>
            <Form.Control placeholder="Template name" />
          </Col>
        </Row>

        <SectionComponent name="MainSection" isOptional={false} />

        <SectionComponent name="Optional Section:" isOptional={true} />

        <Row className="text-right my-5">
          <Col md={10} className="mx-auto">
            <Button variant="outline-primary">Save</Button>{' '}
            <Button variant="outline-danger">Exit</Button>{' '}
          </Col>
        </Row>
      </Container>
    )
  }
}
