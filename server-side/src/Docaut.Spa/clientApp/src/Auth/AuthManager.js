import AuthCore from './AuthCore';

export default class AuthManager {
  static getAuthObject() {
    if (!this.Auth) {
      this.Auth = new AuthCore();
    }

    return this.Auth;
  }
}
