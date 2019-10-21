import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import FormSection from './FormSection';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';

function FormBody(props) {
  const mainSectinon = props.formData.content.sections.find(
    x => x.isOptional === false
  );
  const optionalSections = props.formData.content.sections.filter(
    x => x.isOptional !== false
  );

  const { t } = props;
  return (
    <Form onSubmit={props.onSubmit}>
      <FormSection sectionData={mainSectinon} />

      {optionalSections.map(section => (
        <FormSection key={section.id} sectionData={section} />
      ))}
      <div className="text-center pt-5">
        <Button
          variant="danger"
          size="lg"
          type="button"
          onClick={props.onBackClick}
        >
          {t('common:back')}
        </Button>{' '}
        <Button variant="success" size="lg" type="submit">
          {t('common:save')}
        </Button>{' '}
        <Button
          variant="primary"
          size="lg"
          type="button"
          onClick={props.onDownloadClick}
        >
          {t('common:download')}
        </Button>
      </div>
    </Form>
  );
}

FormBody.propTypes = {
  formData: PropTypes.object,
};

export default compose(withTranslation())(FormBody);
