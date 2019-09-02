import React, { Component } from 'react';
import {formValueSelector} from 'redux-form';
import { connect } from 'react-redux'


class FormStateDisplayer extends Component {
  render() {
    console.dir('FormStateDisplayer', this.props);
    return (
      <pre>

        {this.props.reduxState.form.exampleForm && JSON.stringify(this.props.reduxState.form.exampleForm.values, null, 2)}
      </pre>
    )
  }
}

const mapStateToProps = (state) => {
  window.reduxState = state;
  console.log('mapStateToProps');
  console.log(state);
  return {reduxState:state}
  
}

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(FormStateDisplayer)
