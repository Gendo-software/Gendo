import React from 'react';
import PropTypes from 'prop-types';

import { Form, Col, Row } from 'react-bootstrap';
import { Field } from 'redux-form';
import FormInput from '../../components/reduxFormInput/FormInput';

function getInputType(type) {
  //Types: https://www.w3schools.com/tags/att_input_type.asp

  switch (type) {
    case 'text':
      return 'text';
    case 'number':
      return 'number';
    case 'date':
      return 'date';
    case 'email':
      return 'email';
    case 'url':
      return 'url';
    case 'range':
      return 'range';
    default:
      return 'text';
  }
}

function FormField(props) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm="4">
        {props.displayName}
      </Form.Label>
      <Col sm="8">
        <Field
          name={props.name}
          component={FormInput}
          type={getInputType(props.type)}
        />
      </Col>
    </Form.Group>
  );
}

FormField.propTypes = {
  displayName: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
}


export default FormField;
