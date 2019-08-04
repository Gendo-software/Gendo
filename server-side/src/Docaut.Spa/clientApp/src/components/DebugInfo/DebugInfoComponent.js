import React, { Component } from 'react';
import AuthManager from '../../Auth/AuthManager';
import TemplatesApiClient from '../../api/clients/TemplatesApiClient';

const debugInfoStyle = {
  background: '#777'
};

const shortenString = value => {
  let shortString = value;

  if (value && value.length > 10) {
    shortString = value.substr(0, 7);
    shortString = `${shortString}... + ${value.length} char `;
  }

  return shortString;
};

export default class DebugInfoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: null
    };
    this.authCore = AuthManager.getAuthObject();
    this.refreshCounter = 0;
  }

  componentDidMount() {}

  getTemplatesOnClick = () => {
    this.getTemplates();
  };

  getTemplates() {
    const templatesApi = new TemplatesApiClient();
    let templates = null;

    templatesApi
      .getTemplates()
      .then(response => {
        console.dir(['templates', response]);
        this.setState({ templates: response.data });
      })
      .catch(exception => {
        console.dir('exception', exception);
        alert('error!');
      });
  }

  refresh(event) {
    console.log('debug force update ' + this.refreshCounter);
    this.refreshCounter++;
    this.forceUpdate();
  }

  componentDidUpdate(a, b, c) {
    console.log('DebugInfo -> componentDidUpdate');
  }

  componentWillUpdate(a, b, c) {
    console.log('DebugInfo -> componentWillUpdate');
  }

  someAction(event) {
    event.stopPropagation();
    alert('action');
  }

  render() {
    const expireDateTime = new Date(
      this.authCore.AuthInfo.ExpiresAt
    ).toLocaleString();

    return (
      <div onClick={this.refresh.bind(this)} style={debugInfoStyle}>
        <div className="container">
          <div className="row">
            <div className="col">
              <b>Auth:</b> <br />
              authCoreCreated: {this.authCore.createdDate.toLocaleTimeString()}
              <br />
              currentDateTime: {new Date().toLocaleTimeString()} <br />
            </div>
            <div className="col">
              <b>AuthInfo: </b> <br />
              token: {shortenString(this.authCore.AuthInfo.AccessToken)} <br />
              idToken: {shortenString(this.authCore.AuthInfo.IdToken)}
              <br />
              ExpiresAt: {expireDateTime} <br />
            </div>
            <div className="col">
              click to refresh data! <br />
              counter: {this.refreshCounter} <br />
              <button onClick={this.someAction.bind(this)}>Action!</button>
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <b>Tempates: </b> <br />
              <button onClick={this.getTemplatesOnClick}>get templates!</button>
              <br />
              {this.state.templates &&
                this.state.templates.map(template => {
                  return (
                    <>
                      {template.name}
                      <br />
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
