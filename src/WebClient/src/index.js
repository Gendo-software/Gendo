import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import App from './app/App';

import './index.css';

//https://reactstrap.github.io/
import 'bootstrap/dist/css/bootstrap.min.css';

//custom css
import './assets/custom.css';

//static config
import Config from './staticConfig/config';

import './locales/i18n';
import AppContextProvider from './context/AppContext';
import AuthManager from './auth/AuthManager';

Config.SetConfig(window.StaticConfig);

let message = '';

if (
  window.location.origin !== 'http://myapp.example:3000' &&
  window.location.origin !== 'http://myapp.example:3100'
) {
  message = (
    <div style={{ background: 'red', color: 'white', width: '100%' }}>
      <p>
        This app in dev mode should be host on address
        "http://myapp.example:3000". Auth0 login/register not working corect
        with localhost. Please add [127.0.0.1 myapp.example] section: in
        "C:\Windows\System32\drivers\etc\"
        <br />
        click to redirect -->{' '}
        <a href="http://myapp.example:3000">http://myapp.example:3000</a> or
        <a href="http://myapp.example:3100">http://myapp.example:3100</a>
      </p>
    </div>
  );
}

const target = document.querySelector('#root');
window.debugInfo = { AuthManager: AuthManager.getAuthObject() };

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContextProvider>
        <>
          {message}
          <App />
        </>
      </AppContextProvider>
    </ConnectedRouter>
  </Provider>,
  target
);
