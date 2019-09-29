import React from 'react';
import { Route } from 'react-router-dom';
import { withAppContext } from '../context/AppContext';
import NotAuthorizeRoute from './NotAuthorizeRoute';

class AuthRoute extends React.Component {
  render() {
    const { appContext, component, render, ...params } = this.props;
    if (appContext.isLogged) {
      return <Route {...this.props} />;
    } else {
      return <Route {...params} component={NotAuthorizeRoute} />;
    }
  }
}

export default withAppContext(AuthRoute);
