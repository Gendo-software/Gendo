import React, { Component } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import "simplemde/dist/simplemde.min.css"


export default class CreateTemplateView extends Component {

    componentDidMount(){        
        document.title = "Create template - Document Automation"
        // var Main_simplemde = new SimpleMDE({ element: $("#main-text-area")[0] });
        // var Optional_1_simplemde = new SimpleMDE({ element: $("#aditional-1-text-area")[0] });

    }

    handleChange = value => {
        console.log(value);
        //this.setState({ mdeValue: value });
      };

      OptionalHandleChange = value => {
        console.log("*" + value);
      }


  render() {
    return (
        <div className="container mt-5">
        {/*Header*/}      
        <div className="row mb-5 align-items-center justify-content-center">
          <div className="col-md-5 col-12">
            <input type="text" className="form-control" placeholder="Template name" />
          </div>
        </div>
        {/*Main body*/}
        <div className="row">
          <div className="col-12 col-md-12 mx-auto">
            <h4>Main body:</h4>
            <SimpleMDE
                onChange={this.handleChange}                   
            />
            {/* <textarea id="main-text-area" className="form-control" defaultValue={""} /> */}
          </div>
        </div>
        {/*Main body param*/}
        <div className="row mx-0">
          <div className="col border">
            <div className="row">
              <div className="col-12 col-md-12 mx-auto">
                <h4>Parameters:</h4>
              </div>
              <div className="table-responsive col-12 col-md-12 mx-auto">
                {/*table*/}
                <table className="table parameterTable">
                  <thead className="thead-dark">
                    <tr>                      
                      <th scope="col">Variable name</th>
                      <th scope="col">Display name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Mandatory</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">BuyerName</th>
                      <td> <input type="text" className="form-control" /> </td>
                      <td> 
                        <select className="form-control">
                          <option value="date">Date</option>
                          <option value="number">Number</option>
                          <option value="text">Text</option>
                          <option value="currency">Currency</option>
                        </select>   
                      </td>
                      <td>
                        <label className="btn btn-secondary btn-sm">
                          <input name="choices[2][]" className="form-control" type="checkbox" defaultValue={1} />
                          <i className="fa fa-check glyphicon glyphicon-ok" />
                          {/* also */}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">BuyerSurname</th>
                      <td> <input type="text" className="form-control" /> </td>
                      <td> 
                        <select className="form-control">
                          <option value="date">Date</option>
                          <option value="number">Number</option>
                          <option value="text">Text</option>
                          <option value="currency">Currency</option>
                        </select>   
                      </td>
                      <td>
                        <label className="btn btn-secondary btn-sm">
                          <input name="choices[2][]" className="form-control" type="checkbox" defaultValue={1} />
                          <i className="fa fa-check glyphicon glyphicon-ok" />
                          {/* also */}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">BuyerIdNumber</th>
                      <td> <input type="text" className="form-control" /> </td>
                      <td> 
                        <select className="form-control">
                          <option value="date">Date</option>
                          <option value="number">Number</option>
                          <option value="text">Text</option>
                          <option value="currency">Currency</option>
                        </select>   
                      </td>
                      <td>
                        <label className="btn btn-secondary btn-sm">
                          <input name="choices[2][]" className="form-control" type="checkbox" defaultValue={1} />
                          <i className="fa fa-check glyphicon glyphicon-ok" />
                          {/* also */}
                        </label>
                      </td>
                    </tr>                    
                  </tbody>
                </table>              
                {/* end table*/}
                {/* <table class="table table-hover table-borderless tamplatesTable">
                <tbody>
                  <tr>
                    <td> 1. Seeling Car</td>
                    <td><button type="button" class="btn btn-outline-primary btn-sm px-md-3">Create</button></td>
                  </tr>
                </tbody>
              </table> */}
              </div>
            </div>
          </div>
        </div>
        {/*Optional section*/}      
        <div className="row mt-5">
          <div className="col-12 col-md-12 mx-auto">
            <h4 className="text-info">Optional Section:</h4>
            <SimpleMDE
             onChange={this.OptionalHandleChange}                   
            />
            {/* <textarea id="aditional-1-text-area" className="form-control" defaultValue={""} />   */}
          </div>
        </div>
        {/*Optional param*/}  
        <div className="row mx-0">
          <div className="col border">
            <div className="row">
              <div className="col-12 col-md-12 mx-auto">
                <h4>Parameters:</h4>
              </div>
              <div className="table-responsive col-12 col-md-12 mx-auto">
                {/*table*/}
                <table className="table parameterTable">
                  <thead className="thead-dark">
                    <tr>                      
                      <th scope="col">Variable name</th>
                      <th scope="col">Display name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Mandatory</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">BuyerName</th>
                      <td> <input type="text" className="form-control" /> </td>
                      <td> 
                        <select className="form-control">
                          <option value="date">Date</option>
                          <option value="number">Number</option>
                          <option value="text">Text</option>
                          <option value="currency">Currency</option>
                        </select>   
                      </td>
                      <td>
                        <label className="btn btn-secondary btn-sm">
                          <input name="choices[2][]" className="form-control" type="checkbox" defaultValue={1} />
                          <i className="fa fa-check glyphicon glyphicon-ok" />
                          {/* also */}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">BuyerSurname</th>
                      <td> <input type="text" className="form-control" /> </td>
                      <td> 
                        <select className="form-control">
                          <option value="date">Date</option>
                          <option value="number">Number</option>
                          <option value="text">Text</option>
                          <option value="currency">Currency</option>
                        </select>   
                      </td>
                      <td>
                        <label className="btn btn-secondary btn-sm">
                          <input name="choices[2][]" className="form-control" type="checkbox" defaultValue={1} />
                          <i className="fa fa-check glyphicon glyphicon-ok" />
                          {/* also */}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">BuyerIdNumber</th>
                      <td> <input type="text" className="form-control" /> </td>
                      <td> 
                        <select className="form-control">
                          <option value="date">Date</option>
                          <option value="number">Number</option>
                          <option value="text">Text</option>
                          <option value="currency">Currency</option>
                        </select>   
                      </td>
                      <td>
                        <label className="btn btn-secondary btn-sm">
                          <input name="choices[2][]" className="form-control" type="checkbox" defaultValue={1} />
                          <i className="fa fa-check glyphicon glyphicon-ok" />
                          {/* also */}
                        </label>
                      </td>
                    </tr>                    
                  </tbody>
                </table>              
                {/* end table*/}
                {/* <table class="table table-hover table-borderless tamplatesTable">
                  <tbody>
                    <tr>
                      <td> 1. Seeling Car</td>
                      <td><button type="button" class="btn btn-outline-primary btn-sm px-md-3">Create</button></td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
            </div>
          </div>
        </div>      
        {/*Buttons*/}
        <div className="row my-5 text-right">
          <div className="col-10 mx-auto">
            <button type="button" className="btn btn-outline-primary btn-sm px-md-3">Save</button>{' '}
            <button type="button" className="btn btn-outline-danger btn-sm px-md-3">Exit</button>
          </div>
        </div>
      </div>      
    )
  }
}
