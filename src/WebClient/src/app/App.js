import React, { Component } from 'react';
import DebugInfoComponent from '../components/DebugInfo/DebugInfoComponent';
import config from '../StaticConfig/config';

import ContentRouter from './ContentRouter';
import SplashScreen from '../layout/SplashScreen';
import { withAppContext } from '../context/AppContext';

class App extends Component {
  render() {
    const appContext = this.props.appContext;
    return (
      <>
        {config.DebugMode ? <DebugInfoComponent /> : ''}
        {(appContext.appReady && <ContentRouter />) || <SplashScreen />}
      </>
    );
  }
}

//

//Valid validObject // rules override in inherited class
//ValidObject.Valid() => valid only properties that has not null. ex. {this.MaxLength != null { return (value.Length < this.MaxLenght})};
//Valid object pass to frontEnd and valid with the same object in js.

export default withAppContext(App);
