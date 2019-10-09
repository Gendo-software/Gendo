import React, { Component } from 'react';
import { withAppContext } from './AppContext';

const DocumentContext = React.createContext();

class DocumentProvider extends Component {
  state = {};

  someAlert = () => {
    alert('test');
  };

  render() {
    const { children } = this.props;
    return (
      <DocumentContext.Provider
        value={{
          name: this.state.name,
          sections: this.state.sections,
          someAlert: this.someAlert.bind(this),
        }}
      >
        {children}
      </DocumentContext.Provider>
    );
  }
}

export const withDocumentProvider = Component => {
  const WrappedComponent = props => {
    return (
      <DocumentProvider appContext={props.appContext}>
        <Component {...props} />
      </DocumentProvider>
    );
  };

  return withAppContext(WrappedComponent);
};

export const withDocumentConsumer = Component => {
  const WrappedComponent = props => {
    return (
      <DocumentProvider.Consumer>
        {context => <Component {...props} templateContext={context} />}
      </DocumentProvider.Consumer>
    );
  };

  return WrappedComponent;
};
