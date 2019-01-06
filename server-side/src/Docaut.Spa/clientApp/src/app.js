import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from './containers/home'
import About from './containers/about'
import NavBarComponent from './components/NavBarComponent';
import MainView from './views/MainView';
import FooterComponent from './components/FooterComponent';
import CreateTemplateView from './views/CreateTemplateView';
import CreateDocumentView from './views/CreateDocumentView';

const AppDefault = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />    
    </main>
  </div>
)

const App = () => (
  <div>
    <NavBarComponent></NavBarComponent>
    <Route exact path="/" component={MainView} />
    <Route exact path="/CreateTemplate" component={CreateTemplateView} />
    <Route exact path="/CreateDocument" component={CreateDocumentView} />
    <FooterComponent></FooterComponent>
  </div>
)


//

//Valid validObject // rules override in inherited class
//ValidObject.Valid() => valid only properties that has not null. ex. {this.MaxLength != null { return (value.Length < this.MaxLenght})};
//Valid object pass to frontEnd and valid with the same object in js.

export default App
