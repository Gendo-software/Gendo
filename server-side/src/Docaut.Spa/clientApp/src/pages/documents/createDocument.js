import React, { Component } from 'react';
import TemplatesApiClient from '../../api/clients/TemplatesApiClient';

export default class CreateDocument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      template: {
        data: null,
        isLoaded: false
      }
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
        console.dir('data', data);
        window.template = data;
        this.setState({ template: { data: data, isLoaded: true } });
      })
      .catch(error => {
        alert('error during download template data');
      });
  }

  generateFormFromFields(fields){
    const result = fields.map(field => {
        return (
          <>
            <b>{field.displayName}</b> <input type="text" name={field.name} />{' '}
            <br />
          </>
        );
      });

      return result;
  }

  generateFormView() {
    const { sections } = this.state.template.data.content;
    window.sections = sections;

    const mainSection = sections.find(x => x.isOptional == false);
    const optionalSections = sections.filter(x => x.isOptional == true);

    const formViews = {};
    formViews.mainView = this.generateFormFromFields(mainSection.fields);

    const optionalSectionViews = optionalSections.map(optionalSection => {
        return this.generateFormFromFields(optionalSection.fields);        
    });
    //console.dir('optionalSectionViews', optionalSectionViews);
    formViews.optionalSectionViews = optionalSectionViews;

    return formViews;
  }

  render() {
    const urlParams = this.props.match.params;
    console.dir(this.props.match);    
    

    if (!this.state.template.isLoaded) {
      return <div className="container mt-5">Loading data...</div>;
    } else {
        const sectionsViews = this.generateFormView();
        return (
        <div className="container mt-5">
            <div className="row mb-3">
                {console.dir('mainView in render', sectionsViews.mainView)}
                {sectionsViews.mainView}
            </div>
            <div className="row mb-3">
                {sectionsViews.optionalSectionViews.map(section => {
                    console.dir('section in render', section);
                    return section;
                })}
            </div>
        </div>
      )}

    return (
      <div className="container mt-5">
        {/* <div class="alert alert-primary" role="alert">
  A simple primary alert—check it out!
</div> */}
        {/* <div class="jumbotron">
  <h1 class="display-4">Hello, world!</h1>
  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
    featured content or information.</p>
  <hr class="my-4">
  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
  <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
</div> */}
        {/* Header*/}
        <div className="row mb-3">
          <div className="col-12  my-auto text-center">
            <h1>
              <span className="text-muted">Contract:</span>{' '}
              {this.state.template.data.name}
            </h1>
          </div>
        </div>
        {/* BuyerParam*/}
        <div className="row">
          <div className="col-md-6 mx-auto mt-4">
            <h2>Buyer</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="row align-items-center mt-1">
              <div className="col-4">Name</div>
              <div className="col">
                <input className="form-control d-inline" type="text" />
              </div>
            </div>
            <div className="row align-items-center mt-1">
              <div className="col-4">Surname</div>
              <div className="col">
                <input className="form-control d-inline" type="text" />
              </div>
            </div>
            <div className="row align-items-center mt-1">
              <div className="col-4">Id Number</div>
              <div className="col">
                <input className="form-control d-inline" type="text" />
              </div>
            </div>
            <div className="row align-items-center mt-1">
              <div className="col-4">Address</div>
              <div className="col">
                <input className="form-control d-inline" type="text" />
              </div>
            </div>
            <div className="row align-items-center mt-1">
              <div className="col-4">Birth Date</div>
              <div className="col">
                <input className="form-control d-inline" type="date" />
              </div>
            </div>
          </div>
        </div>
        {/* Product Param*/}
        <div className="row">
          <div className="col-md-6 mx-auto mt-4">
            <h2>Product</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="row align-items-center mt-1">
              <div className="col-4">Price</div>
              <div className="col">
                <input className="form-control d-inline" type="text" />
              </div>
            </div>
            <div className="row align-items-center mt-1">
              <div className="col-4">Something param</div>
              <div className="col">
                <input className="form-control d-inline" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 mx-auto">
            <div className="row align-items-center">
              <div className="col-4">
                <h2>Secret</h2>
              </div>
              <div className="col">
                <label className="btn btn-secondary btn-sm">
                  <input
                    name="choices[2][]"
                    className="form-control"
                    type="checkbox"
                    defaultValue={1}
                  />
                  <i className="fa fa-check glyphicon glyphicon-ok" />
                  {/* also */}
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-4">Secret until date:</div>
              <div className="col">
                <input className="form-control d-inline" type="date" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center pt-5">
          <button type="button" className="btn btn-primary btn-lg">
            Buy &amp; Download
          </button>
        </div>
      </div>
    );
  }
}
