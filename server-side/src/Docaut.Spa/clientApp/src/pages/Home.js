import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import TemplateList from './home/TemplateList';
import DocumentList from './home/DocumentList';


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
            <Col lg={{ offset: 2, span: 5 }}>
              <TemplateList onCreateClick={() => alert('onCreateClick')}/>
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
              <DocumentList onOpenClick={() => alert('onOpenClick')} onDeleteClick={() => alert('onDeleteClick')}/>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
