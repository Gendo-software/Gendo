import React from 'react';
import { Row, Button, Col, Form } from 'react-bootstrap';
import { withTemplateConsumer } from 'context/TemplateContext';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';

const SectionHeader = props => {
  const { t } = props;
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
              placeholder={t('common:name')}
            />
          )) || <h4>{t('common:mainSection')}</h4>}
        </Col>
        {props.section.isOptional && (
          <Col className="text-right">
            <Button
              variant={'outline-danger'}
              onClick={(...params) =>
                props.templateContext.removeSection(...params, props.section)
              }
            >
              {t('removeThisSection')}
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
};

SectionHeader.propTypes = {};

export default compose(
  withTranslation('Template'),
  withTemplateConsumer
)(SectionHeader);
