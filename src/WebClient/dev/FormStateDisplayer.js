import React, { Component } from 'react';
import { connect } from 'react-redux';

class FormStateDisplayer extends Component {
  render() {
    return (
      <pre>
        {this.props.reduxState.form.exampleForm &&
          JSON.stringify(
            this.props.reduxState.form.exampleForm.values,
            null,
            2
          )}
      </pre>
    );
  }
}

const mapStateToProps = state => {
  window.reduxState = state;
  return { reduxState: state };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormStateDisplayer);
