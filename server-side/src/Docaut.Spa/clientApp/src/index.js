import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './app'

import './index.css'

//https://reactstrap.github.io/
import 'bootstrap/dist/css/bootstrap.min.css';

//custom css
import './assets/custom.css'


//static config
import Config from './StaticConfig/config'
Config.SetConfig(window.StaticConfig);

let message = "";

if(window.location.origin != "http://myapp.example:3000" ){
message = 
<div style = {{background: 'red', color:'white', width:'100%'}}>
  <p>
  This app in dev mode should be host on address "http://myapp.example:3000".
  Auth0 login/register not working corect with localhost.
  Please add [127.0.0.1	myapp.example] section: in "C:\Windows\System32\drivers\etc\"<br />
  click to redirect --> <a href="http://myapp.example:3000">http://myapp.example:3000</a>
  </p>
  
</div>  
}


const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        {message}
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
