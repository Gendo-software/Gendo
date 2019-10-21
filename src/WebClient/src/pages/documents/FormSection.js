import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import FormField from './FormField';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';

function FormSection(props) {
  const { t } = props;
  return (
    <>
      <Row>
        <Col md={6} className="mx-auto mt-4">
          <h2>
            {(props.sectionData.isOptional && props.sectionData.name) ||
              t('common:mainSection')}
          </h2>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mx-auto mt-4">
          {props.sectionData.fields.map(field => (
            <FormField
              key={field.name}
              displayName={field.displayName || field.name}
              name={field.name}
              type={field.type}
            />
          ))}
        </Col>
      </Row>
    </>
  );
}

FormSection.propTypes = {
  sectionData: PropTypes.object,
};

export default compose(withTranslation())(FormSection);
