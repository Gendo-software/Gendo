import React, { Component } from 'react';
import AuthManager from '../Auth/AuthManager';

const AppContext = React.createContext();
const authCore = AuthManager.getAuthObject();

export default class AppContextProvider extends Component {
  state = {
    appReady: false,
    isLogged: false,
    userProfile: null,
  };

  componentDidMount() {
    authCore.Events.addLoginSuccess(() => {
      authCore.GetUserProfileAsync().then(userProfile => {
        this.setState({ userProfile, isLogged: true });
      });
    });
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setAppContextState: this.setState.bind(this),
        }}
      >
        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const withAppContext = Component => {
  const WrappedComponent = props => {
    return (
      <AppContext.Consumer>
        {context => <Component {...props} appContext={{ ...context }} />}
      </AppContext.Consumer>
    );
  };

  return WrappedComponent;
};
