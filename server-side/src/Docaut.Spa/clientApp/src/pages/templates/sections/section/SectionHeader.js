import React from 'react';
import { Row, Button, Col, Form } from 'react-bootstrap';
import { NewTemplateConsumer } from 'context/NewTemplateContext';

const SectionHeader = props => {
  return (
    <NewTemplateConsumer>
      {({ removeSection, onSectionChange }) => (
        <div className="mb-2">
          <Row className="align-items-center">
            <Col>
              {(props.section.isOptional && (
                <Form.Control
                  value={props.section.name}
                  onChange={(...params) =>
                    onSectionChange(...params, props.section)
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
                    removeSection(...params, props.section)
                  }>
                  Remove this section
                </Button>
              </Col>
            )}
          </Row>
        </div>
      )}
    </NewTemplateConsumer>
  );
};

SectionHeader.propTypes = {};

export default SectionHeader;
