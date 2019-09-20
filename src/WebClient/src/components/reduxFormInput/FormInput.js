import React, { Fragment } from 'react';
import { Form } from 'react-bootstrap';

export default ({
  children,
  input,
  meta: { invalid, touched, error },
  ...props
}) => (
  <Fragment>
    <Form.Control {...input} {...props} />
    {touched && error && (
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    )}
  </Fragment>
);
