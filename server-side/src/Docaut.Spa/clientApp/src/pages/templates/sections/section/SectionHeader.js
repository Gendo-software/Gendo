import React from 'react';
import { Row, Button, Col, Form } from 'react-bootstrap';
import { withTemplateConsumer } from 'context/TemplateContext';

const SectionHeader = props => {
  return (
    <div className="mb-2">
      <Row className="align-items-center">
        <Col>
          {(props.section.isOptional && (
            <Form.Control
              value={props.section.name}
              onChange={(...params) =>
                props.templateContext.onSectionChange(...params, props.section)
              }
              name={'name'}
            />
          )) || <h4>{props.section.name}</h4>}
        </Col>
        {props.section.isOptional && (
          <Col className="text-right">
            <Button
              variant={'outline-danger'}
              onClick={(...params) =>
                props.templateContext.removeSection(...params, props.section)
              }
            >
              Remove this section
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
};

SectionHeader.propTypes = {};

export default withTemplateConsumer(SectionHeader);
