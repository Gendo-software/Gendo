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
import Home from './pages/home/Home';

const App = () => (
  <div>
    {config.DebugMode ? <DebugInfoComponent /> : ''}

    <Switch>            
      <MainLayout>        
        <Route exact path="/Login" component={LoginComponent} />
        <Route exact path="/oldHome" component={MainView} />
        <Route exact path="/" component={Home} />
        <Route exact path="/Template/Create" component={CreateTemplateView} />
        <Route exact path="/Document/Create" component={CreateDocumentView} />
      </MainLayout>
    </Switch>
  </div>
)

//

//Valid validObject // rules override in inherited class
//ValidObject.Valid() => valid only properties that has not null. ex. {this.MaxLength != null { return (value.Length < this.MaxLenght})};
//Valid object pass to frontEnd and valid with the same object in js.

export default App
