import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import sampleText from '../../assets/sampleText';
import _ from 'lodash';
import {InitHashMarking, MARKING_NAME}  from '../../misc/HashMarking';
const regexForParametersParrent = /(##)(.+?)(##)/gi;

var showVariableState = false;
var defaultMode;

function AddShowVariableToolbarAction(context)
{
  var showVariableToolbarButton =
  {
    "name": "show-variable",
    "className": "fa fa-hashtag",
    "title": "Show variable",
    "default": true,
    action: context.showVariablesToggle.bind(context)
  }
  context.simpleMdeInstance.toolbar.push(showVariableToolbarButton);  
  context.simpleMdeInstance.createToolbar();      
}
export default class Section extends Component {
  
  simpleMdeInstance
  mirrorCode
  
  
  constructor(props) {
    super(props)
          
    this.sampleText = sampleText;
    this.state = {
      fieldsCollection:[],
    }                    

    this.mdeOptions = 
    {
      spellChecker: false
    }

  }    
  componentDidMount(x,y)
  {            
    //edit text in edtiting mode:    
    var baseFunctionMarkdown = this.simpleMdeInstance.markdown.bind(this);

    //edit text in preview mode:
    this.simpleMdeInstance.markdown = function(text){
      var resultText = baseFunctionMarkdown(text)
      //here you can modify text;
      //console.log(text);
      //resultText = resultText.replace("##", "<hr>");
      return resultText;
    }
    
    this.codeMirror = this.simpleMdeInstance.codemirror;
    
    defaultMode = this.codeMirror.getMode();
    InitHashMarking(defaultMode);    
    this.codeMirror.setOption("mode", MARKING_NAME);
          
  }

  showVariablesToggle(x){
    
    showVariableState = !showVariableState;
    if(showVariableState)
    {
      this.codeMirror.setOption("mode", defaultMode);  
    }
    else{
      this.codeMirror.setOption("mode", MARKING_NAME);  
    }    
  }

  getMdeInstance(simpleMdeInstance)
  {
    this.simpleMdeInstance = simpleMdeInstance;      
    this.simpleMdeInstance.gui.toolbar.remove();

    AddShowVariableToolbarAction(this);

  }

  handleChange(...data)
  {      
      var value = data[0];
      var regexInstance = new RegExp(regexForParametersParrent);
      
      var matches, output = [];
      while (matches = regexInstance.exec(value)) {
          output.push(matches[2]);
      }
      
      output = _.uniq(output).sort();      
          

      if(!_.isEqual(this.state.fieldsCollection, output))
      {
        console.log(`setState new fields collection: ${output}`);
        this.setState({fieldsCollection: output});
      }
      
  }

    
  render() {
    return (
      <div>
        {/*Main body*/}
        <div className="row mt-5">
          <div className="col-12 col-md-12 mx-auto">
            <h4 className={this.props.isOptional ? "text-info" : ""}>{this.props.name}</h4>

            <SimpleMDE
              onChange={this.handleChange.bind(this)}
              value = {this.sampleText.Text}
              options =   {{
                //autofocus: true,
                spellChecker: false,
                //toolbar: toolbar22  
              }}
              getMdeInstance = {this.getMdeInstance.bind(this)}
            />            
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

      </div>
    )
  }
}
