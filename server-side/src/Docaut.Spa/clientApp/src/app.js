import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DebugInfoComponent from './components/DebugInfo/DebugInfoComponent';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import CreateTemplate from './pages/templates/CreateTemplate';
import Test from './pages/Test';
import config from './StaticConfig/config';
import CreateDocument from './pages/documents/CreateDocument';

const App = () => (
  <div>
    {config.DebugMode ? <DebugInfoComponent /> : ''}
    <Switch>
      <MainLayout>
        <Route exact path="/" component={Home} />
        <Route exact path="/Template/Create" component={CreateTemplate} />
        <Route
          exact
          path="/Document/Create/:templateId"
          component={CreateDocument}
        />
        <Route exact path="/Test" component={Test} />
      </MainLayout>
    </Switch>
  </div>
);
//

//Valid validObject // rules override in inherited class
//ValidObject.Valid() => valid only properties that has not null. ex. {this.MaxLength != null { return (value.Length < this.MaxLenght})};
//Valid object pass to frontEnd and valid with the same object in js.

export default App;
