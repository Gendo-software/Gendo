export default class Config {
  static SetConfig(config) {
    this._config = config;
  }

  static get ApiBaseUrl() {
    return this._config.ApiBaseUrl;
  }

  static get ExampleValue() {
    return this._config.ExampleValue;
  }

  static get DebugMode() {
    return this._config.DebugMode;
  }

  static get FutFeat() {
    return this._config.FutFeat;
  }

  static get AuthConfig() {
    return {
      clientId: '3qDfNo1DjVMvBIK8WOJPILRvsQqvsAgz',
      domain: 'dev-gendo.eu.auth0.com',
      auth0LockOptions: {
        rememberLastLogin: true,
        languageDictionary: {
          title: 'Gendo'
        },

        theme: {
          //logo: http://myapp.example:3000/assets/logo.png ;
        },

        auth: {
          redirectUrl: 'http://myapp.example:3000/Login',
          responseType: 'token id_token',
          audience: 'basicApi',
          redirect: false
        }
      }
    };
  }
}
