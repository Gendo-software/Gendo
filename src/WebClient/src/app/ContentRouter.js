import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import Template, { templateMode } from '../pages/templates/Template';
import Document, { documentMode } from '../pages/documents/Document';
import Test from '../pages/Test';
import AuthRoute from './AuthRoute';

const ContentRouter = () => (
  <Switch>
    <MainLayout>
      <Route exact path="/" component={Home} />
      <AuthRoute
        exact
        path="/Template/Create"
        render={routeProps => (
          <Template {...routeProps} mode={templateMode.new} />
        )}
      />
      <AuthRoute
        exact
        path="/Template/Edit/:templateId"
        render={routeProps => (
          <Template {...routeProps} mode={templateMode.edit} />
        )}
      />
      <AuthRoute
        exact
        path="/Document/Create/:templateId"
        render={routeProps => (
          <Document {...routeProps} mode={documentMode.new} />
        )}
      />
      <AuthRoute
        exact
        path="/Document/Edit/:templateId"
        render={routeProps => (
          <Document {...routeProps} mode={documentMode.edit} />
        )}
      />

      <Route exact path="/Test" component={Test} />
    </MainLayout>
  </Switch>
);

export default ContentRouter;
