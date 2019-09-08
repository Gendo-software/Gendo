import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import FormSection from './FormSection';

function FormBody(props) {
  const mainSectinon = props.formData.content.sections.find(
    x => x.isOptional === false
  );
  const optionalSections = props.formData.content.sections.filter(
    x => x.isOptional !== false
  );

  return (
    <Form onSubmit={props.onSubmit}>
      <FormSection sectionData={mainSectinon} />

      {optionalSections.map(section => (
        <FormSection key={section.id} sectionData={section} />
      ))}

      <div className="text-center pt-5">
        <Button variant="primary" size="lg" type="submit">
          Download
        </Button>
      </div>
    </Form>
  );
}

FormBody.propTypes = {
  formData: PropTypes.object
};

export default FormBody;
