import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import TemplateList from './home/TemplateList';
import DocumentList from './home/DocumentList';
import TemplatesApiClient from '../api/clients/TemplatesApiClient';
import InfoContent from './home/InfoContent';
import { withTranslation } from 'react-i18next';
import { withAppContext } from '../context/AppContext';
import { compose } from 'redux';
import DocumentsApiClient from '../api/clients/DocumentsApiClient';

class Home extends Component {
  constructor(props) {
    super(props);
    this.isLogged = props.appContext.isLogged;

    this.state = {
      templates: [],
      documents: [],
    };
    this.templatesApi = new TemplatesApiClient();
    this.documentsApi = new DocumentsApiClient();
  }

  refreshTemplateList = () => {
    this.templatesApi
      .getTemplates()
      .then(response => {
        this.setState({ templates: response.data });
      })
      .catch(error => {
        alert(`api error`);
      });
  };

  refreshDocumentList = () => {
    this.documentsApi
      .getDocuments(this.props.appContext.userProfile.sub)
      .then(({ data: documentsList }) => {
        this.setState({ documents: documentsList });
      })
      .catch(error => {
        console.error(error);
        alert('error during try get documents list');
      });
  };

  componentDidMount() {
    if (this.props.appContext.isLogged) {
      this.refreshTemplateList();
      this.refreshDocumentList();
    }
  }

  componentDidUpdate() {
    const { appContext } = this.props;
    if (this.isLogged !== appContext.isLogged) {
      this.isLogged = appContext.isLogged;
      if (this.isLogged) {
        this.refreshTemplateList();
        this.refreshDocumentList();
      }
    }
  }

  deleteTemplate = templateId => {
    this.templatesApi.deleteTemplate(templateId).then(response => {
      this.refreshTemplateList();
    });
  };

  deleteDocument = document => {
    this.documentsApi.deleteDocument(document.id).then(response => {
      this.refreshDocumentList();
    });
  };

  openDocument = document => {
    this.props.history.push(`Document/Edit/${document.id}`);
  };

  render() {
    const { t, appContext } = this.props;
    return (
      <>
        <Container className="mt-5">
          <InfoContent />
          {!appContext.isLogged && <p className="h4">{t('loginToSeeMore')}</p>}
        </Container>

        {appContext.isLogged && (
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
        )}

        {appContext.isLogged && (
          <Container className="mt-5">
            <Row>
              <Col lg={{ offset: 2 }}>
                <h4>{t('common:myDocuments')}</h4>
              </Col>
            </Row>
            <Row>
              <Col lg={{ offset: 2, span: 7 }}>
                <DocumentList
                  documents={this.state.documents}
                  templates={this.state.templates}
                  onOpenClick={this.openDocument}
                  onDeleteClick={this.deleteDocument}
                />
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
}
export default compose(
  withTranslation('Home'),
  withAppContext
)(Home);
