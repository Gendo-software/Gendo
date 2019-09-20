import React, { Component } from 'react';
import TemplatesApiClient from '../../api/clients/TemplatesApiClient';
import { reduxForm } from 'redux-form';
import { Container, Col, Row } from 'react-bootstrap';
import FormBody from './FormBody';

class CreateDocument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      template: {
        data: null,
        isLoaded: false,
      },
    };

    this.templatesApi = new TemplatesApiClient();
  }

  componentDidMount() {
    document.title = 'Create document - Gendo';

    this.getTemplateFromApi();
  }

  getTemplateFromApi() {
    const { templateId } = this.props.match.params;

    this.templatesApi
      .getTemplate(templateId)
      .then(({ data }) => {
        this.setState({ template: { data: data, isLoaded: true } });
      })
      .catch(error => {
        alert('error during download template data');
      });
  }

  handleSubmit(formValue) {
    //this.documentsApi.saveDocument(formValue);
    console.dir(formValue);
    alert('not implemented yet - post document to api.');
  }

  render() {
    const { template } = this.state;
    if (!template.isLoaded) {
      return <Container className="mt-5">Loading data...</Container>;
    } else {
      return (
        <>
          <Container>
            <Row className="mb-3">
              <Col md={10} className="my-auto text-center">
                <h1>
                  <span className="text-muted">Contract:</span>{' '}
                  {template.data.name}
                </h1>
              </Col>
            </Row>
            {template.isLoaded && (
              <FormBody
                formData={template.data}
                onSubmit={this.props.handleSubmit(this.handleSubmit)}
              />
            )}
          </Container>
        </>
      );
    }
  }
}

export default reduxForm({ form: 'exampleForm' })(CreateDocument);
