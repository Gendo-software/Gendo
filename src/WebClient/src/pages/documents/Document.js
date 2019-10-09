import React, { Component } from 'react';
import TemplatesApiClient from '../../api/clients/TemplatesApiClient';
import { reduxForm } from 'redux-form';
import { Container, Col, Row, Form } from 'react-bootstrap';
import FormBody from './FormBody';
import { compose } from 'redux';
import DocumentsApiClient from '../../api/clients/DocumentsApiClient';
import { withAppContext } from '../../context/AppContext';
import { withTranslation } from 'react-i18next';

export const documentMode = {
  edit: 'edit',
  new: 'new',
};

class Document extends Component {
  templatesApi = new TemplatesApiClient();
  documentsApi = new DocumentsApiClient();

  constructor(props) {
    super(props);

    //this.templatesApi = new TemplatesApiClient();
    //this.documentsApi = new DocumentsApiClient();

    this.initDocumentState = {};

    this.state = {
      template: {
        data: null,
        isLoaded: false,
      },
      document: {
        name: '',
      },
    };

    this.handleDocumentNameChange = this.handleDocumentNameChange.bind(this);
  }

  componentDidMount = async () => {
    document.title = 'Create document - Gendo';

    if (this.props.mode === documentMode.edit) {
      const documentId = this.props.match.params.templateId;
      const documentData = await this.getDocumentFromApi(documentId);
      await this.getTemplateFromApi(documentData.templateId);
      this.props.initialize(documentData.content);
    } else {
      const { templateId } = this.props.match.params;
      this.getTemplateFromApi(templateId);
    }
  };

  getDocumentFromApi(documentId) {
    return this.documentsApi
      .getDocument(documentId)
      .then(({ data: documentData }) => {
        this.setState({ document: documentData });
        return documentData;
      })
      .catch(error => {
        console.dir(error);
        alert('error during try get document data');
      });
  }

  getTemplateFromApi(templateId) {
    return this.templatesApi
      .getTemplate(templateId)
      .then(({ data }) => {
        this.setState({ template: { data: data, isLoaded: true } });
        return data;
      })
      .catch(error => {
        console.error(error);
        alert('error during download template data');
      });
  }

  async handleSubmit(formValue, ...params) {
    if (this.props.mode === documentMode.new) {
      try {
        await this.createNewDocument(formValue);
        this.props.history.push('/');
      } catch (error) {
        alert('error during try create document');
      }
    } else if (this.props.mode === documentMode.edit) {
      try {
        await this.saveDocument(formValue);
        this.props.history.push('/');
      } catch (error) {
        alert('error during try create document');
      }
    }
  }

  createDocumentObject(formValue) {
    return {
      content: formValue,
      templateVersionId: this.state.template.data.currentVersionId,
      templateId: this.state.template.data.id,
      userId: this.props.appContext.userProfile.sub,
      name: this.state.document.name,
    };
  }

  async createNewDocument(formValue) {
    const documentObject = this.createDocumentObject(formValue);
    return this.documentsApi.createDocuments(documentObject).then(result => {
      return result;
    });
  }

  async saveDocument(formValue) {
    const documentObject = {
      id: this.state.document.id,
      content: formValue,
      templateVersionId: this.state.template.data.currentVersionId,
      templateId: this.state.template.data.id,
      userId: this.props.appContext.userProfile.sub,
      name: this.state.document.name,
    };

    return this.documentsApi.editDocument(documentObject).then(result => {
      return result;
    });
  }

  async handleDownloadClick(formValue, ...params) {
    if (this.props.mode === documentMode.new) {
      await this.createNewDocument(formValue);
    } else if (this.props.mode === documentMode.edit) {
      await this.saveDocument(formValue);
    }
    alert('Sorry. Download action not implemented yet');
  }

  handleBackClick() {
    this.props.history.push('/');
  }

  handleDocumentNameChange(event) {
    const name = event.target.value;
    this.setState(prevState => ({
      document: { ...prevState.document, name: name },
    }));
  }

  render() {
    const { t } = this.props;
    const { template } = this.state;
    if (!template.isLoaded) {
      return <Container className="mt-5">Loading data...</Container>;
    } else {
      return (
        <>
          <Container className="mt-5">
            <Row className="mb-3">
              <Col md={{ span: 6, offset: 3 }} className="my-auto text-center">
                <h1>
                  <span className="text-muted">{t('contract')}:</span>{' '}
                  {template.data.name}
                </h1>
                <Form.Control
                  placeholder={t('documentName')}
                  onChange={this.handleDocumentNameChange}
                  value={this.state.document.name}
                />
              </Col>
            </Row>
            {template.isLoaded && (
              <FormBody
                formData={template.data}
                onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}
                onDownloadClick={this.props.handleSubmit(
                  this.handleDownloadClick.bind(this)
                )}
                onBackClick={this.props.handleSubmit(
                  this.handleBackClick.bind(this)
                )}
              />
            )}
          </Container>
        </>
      );
    }
  }
}

export default compose(
  reduxForm({ form: 'exampleForm' }),
  withAppContext,
  withTranslation('Document')
)(Document);
