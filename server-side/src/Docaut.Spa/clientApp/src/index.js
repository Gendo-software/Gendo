import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './app'

import 'sanitize.css/sanitize.css'
import './index.css'

//https://reactstrap.github.io/
import 'bootstrap/dist/css/bootstrap.min.css';

//custom css
import './assets/custom.css'


//static config
import Config from './StaticConfig/config'
Config.SetConfig(window.StaticConfig);

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
