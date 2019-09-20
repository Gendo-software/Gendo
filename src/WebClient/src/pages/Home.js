import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import TemplateList from './home/TemplateList';
import DocumentList from './home/DocumentList';
import TemplatesApiClient from '../api/clients/TemplatesApiClient';
import InfoContent from './home/InfoContent';
import { withTranslation } from 'react-i18next';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: [],
    };
  }

  refreshTemplateList = () => {
    const templatesApi = new TemplatesApiClient();
    templatesApi
      .getTemplates()
      .then(response => {
        this.setState({ templates: response.data });
      })
      .catch(error => {
        alert(`api error`);
      });
  };
  componentDidMount() {
    this.refreshTemplateList();
  }

  deleteTemplate = templateId => {
    const templatesApi = new TemplatesApiClient();

    templatesApi.deleteTemplate(templateId).then(response => {
      this.refreshTemplateList();
    });
  };

  render() {
    const { t } = this.props;
    return (
      <>
        <Container className="mt-5">
          <InfoContent />
        </Container>
        <Container className="mt-5">
          <Row>
            <Col lg={{ offset: 2 }}>
              <h4>{t('common:templates')}</h4>
            </Col>
          </Row>
          <Row>
            <Col lg={{ offset: 2, span: 7 }}>
              <TemplateList
                templates={this.state.templates}
                onDeleteClick={this.deleteTemplate}
              />
            </Col>
          </Row>
        </Container>

        <Container className="mt-5">
          <Row>
            <Col lg={{ offset: 2 }}>
              <h4>{t('common:myDocuments')}</h4>
            </Col>
          </Row>
          <Row>
            <Col lg={{ offset: 2, span: 5 }}>
              <DocumentList
                onOpenClick={() => alert('onOpenClick')}
                onDeleteClick={() => alert('onDeleteClick')}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default withTranslation('Home')(Home);
