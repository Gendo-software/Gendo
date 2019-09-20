import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Sections from './Sections';
import {
  withTemplateProvider,
  withTemplateConsumer,
} from '../../context/TemplateContext';
import TemplatesApiClient from '../../api/clients/TemplatesApiClient';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';

export const templateMode = {
  edit: 'edit',
  new: 'new',
};

class Template extends Component {
  componentDidMount() {
    if (this.props.mode === templateMode.edit) {
      const templatesApi = new TemplatesApiClient();
      const templateId = this.props.match.params.templateId;
      templatesApi
        .getTemplate(templateId)
        .then(({ data }) => {
          this.props.templateContext.setTemplateData(data);
        })
        .catch(error => {
          console.dir(error);
          alert(error);
        });
    }
  }

  editTemplate = () => {
    this.props.templateContext.editTemplate().then(response => {
      this.props.history.push('');
    });
  };

  createTemplate = () => {
    this.props.templateContext.createTemplate().then(response => {
      this.props.history.push('');
    });
  };

  exit = () => {
    this.props.history.push('');
  };

  render() {
    const { t } = this.props;
    return (
      <Container className="mt-5">
        <Row className="mb-5 align-items-center justify-content-center">
          <Col md={5} className="text-center">
            <h1 className="h3 mb-3">
              {this.props.mode === templateMode.new
                ? t('createTemplate')
                : t('editTemplate')}
            </h1>
            <Form.Control
              placeholder={t('templateName')}
              onChange={this.props.templateContext.onTemplateChange}
              name="name"
              value={this.props.templateContext.name}
            />
          </Col>
        </Row>

        <Sections />
        <Row className="text-right my-5">
          <Col md={10} className="mx-auto">
            <Button
              variant="outline-success"
              onClick={this.props.templateContext.addSection}
            >
              {t('addOptionalSection')}
            </Button>{' '}
          </Col>
        </Row>

        <Row className="text-right my-5">
          <Col md={10} className="mx-auto">
            {this.props.mode === templateMode.edit && (
              <>
                <Button variant="outline-primary" onClick={this.editTemplate}>
                  {t('common:save')}
                </Button>{' '}
              </>
            )}
            {this.props.mode === templateMode.new && (
              <>
                <Button variant="outline-primary" onClick={this.createTemplate}>
                  {t('createNew')}
                </Button>{' '}
              </>
            )}
            <Button variant="outline-danger" onClick={this.exit}>
              {' '}
              {t('common:exit')}
            </Button>{' '}
          </Col>
        </Row>
      </Container>
    );
  }
}

Template.propTypes = {
  mode: PropTypes.oneOf(Object.values(templateMode)),
};

export default compose(
  withTranslation('Template'),
  withTemplateProvider,
  withTemplateConsumer
)(Template);
