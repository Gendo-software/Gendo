import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SimpleMDEEditor from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import _ from 'lodash';
import {InitHashMarking, MARKING_NAME}  from 'misc/HashMarking';

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

  handleChange(...data) {
    var value = data[0]
    var regexInstance = new RegExp(regexForParametersParrent)

    var matches,
      output = []
    while ((matches = regexInstance.exec(value))) {
      output.push(matches[2])
    }

    output = _.uniq(output).sort()

    if (!_.isEqual(this.state.fieldsCollection, output)) {
      console.log(`setState new fields collection: ${output}`)
      this.setState({ fieldsCollection: output })
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <SimpleMDEEditor
              onChange={this.handleChange.bind(this)}
              //value={this.sampleText.Text}
              options={{
                spellChecker: false
              }}
              getMdeInstance={this.getMdeInstance.bind(this)}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
