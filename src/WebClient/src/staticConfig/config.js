export default class Config {
  static SetConfig(config) {
    this._config = config;
  }

  static get ApiDocumentsUrl() {
    return this._config.ApiDocumentsUrl;
  }

  static get ApiTemplatesUrl() {
    return this._config.ApiTemplatesUrl;
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
          title: 'Gendo',
        },

        theme: {
          //logo: http://myapp.example:3000/assets/logo.png ;
        },

        auth: {
          redirectUrl: `${window.location.origin}/Login`,
          responseType: 'token id_token',
          audience: 'basicApi',
          redirect: false,
        },
      },
    };
  }
}
