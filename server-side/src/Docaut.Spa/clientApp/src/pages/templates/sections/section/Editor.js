import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SimpleMDEEditor from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import _ from 'lodash';
import {InitHashMarking, MARKING_NAME}  from 'misc/HashMarking';
import {NewTemplateConsumer} from 'context/NewTemplateContext';

var showVariableState = false;
var defaultMode;


const regexForParametersParrent = /(##)(\S+?)(##)/gi;

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
export default class Editor extends Component {
  simpleMdeInstance
  mirrorCode

  constructor(props) {
    super(props)

    this.state = {
      fieldsCollection: []
    }

    this.mdeOptions = {
      spellChecker: false
    }
  }
  componentDidMount(x, y) {
    //edit text in edtiting mode:
    var baseFunctionMarkdown = this.simpleMdeInstance.markdown.bind(this)

    //edit text in preview mode:
    this.simpleMdeInstance.markdown = function(text) {
      var resultText = baseFunctionMarkdown(text)
      //here you can modify text;
      //console.log(text);
      //resultText = resultText.replace("##", "<hr>");
      return resultText
    }

    this.codeMirror = this.simpleMdeInstance.codemirror

    defaultMode = this.codeMirror.getMode()
    InitHashMarking(defaultMode)
    this.codeMirror.setOption('mode', MARKING_NAME)
  }

  showVariablesToggle(x) {
    showVariableState = !showVariableState
    if (showVariableState) {
      this.codeMirror.setOption('mode', defaultMode)
    } else {
      this.codeMirror.setOption('mode', MARKING_NAME)
    }
  }

  getMdeInstance(simpleMdeInstance) {
    this.simpleMdeInstance = simpleMdeInstance;
    this.simpleMdeInstance.gui.toolbar.remove();

    AddShowVariableToolbarAction(this);
  }

  handleChange(value, onSectionChange) {       
    
    //var test = this.context;
    
    

    const event = {
      target:{
        name:'text',
        value: value
      }
    };

    onSectionChange(event, this.props.section);
  }

  render() {
    return (
      <NewTemplateConsumer>
        {({onSectionChange, name}) => 
          (
            <Row>
              <Col>
                <SimpleMDEEditor              
                  onChange={(...params) => this.handleChange(...params, onSectionChange)}
                  value={this.props.section.text}
                  options={{
                    spellChecker: false
                  }}
                  getMdeInstance={this.getMdeInstance.bind(this)}
                />
              </Col>
            </Row>
          )
          }
      </NewTemplateConsumer>      
    )
  }
}
