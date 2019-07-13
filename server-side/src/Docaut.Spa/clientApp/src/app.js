import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
//import Home from './containers/home'
import About from './containers/about'
import MainView from './views/MainView'
import FooterComponent from './components/FooterComponent'
import CreateTemplateView from './views/CreateTemplateView'
import CreateDocumentView from './views/CreateDocumentView'
import config from './StaticConfig/config'
import DebugInfoComponent from './components/DebugInfo/DebugInfoComponent'
import NavBarComponent from './components/Navbar/NavBarComponent'
import LoginComponent from './components/Login/LoginComponent'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import CreateTemplate from './pages/templates/CreateTemplate';

const App = () => (
  <div>
    {config.DebugMode ? <DebugInfoComponent /> : ''}

    <Switch>            
      <MainLayout>        
        <Route exact path="/Login" component={LoginComponent} />
        <Route exact path="/oldHome" component={MainView} />
        <Route exact path="/" component={Home} />
        <Route exact path ="/Template/CreateOld" component={CreateTemplateView} />
        <Route exact path ="/Template/Create" component={CreateTemplate} />        
        <Route exact path ="/Document/Create/:templateName" component={CreateTemplate} />
      </MainLayout>
    </Switch>
  </div>
)

//

//Valid validObject // rules override in inherited class
//ValidObject.Valid() => valid only properties that has not null. ex. {this.MaxLength != null { return (value.Length < this.MaxLenght})};
//Valid object pass to frontEnd and valid with the same object in js.

export default App
