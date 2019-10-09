import AuthInfo from './AuthInfo';
import auth0lock from 'auth0-lock';
import jwt_decode from 'jwt-decode';
import Config from '../StaticConfig/config';
import AuthEvents from './AuthEvents';

export default class AuthCore {
  /// comunication with Auth0
  /// prepare auth0-lock
  /// set, get, restore session from localStorage
  /// and if required get more data
  /// session: AccessToken, IDToken, ExpireAt,
  /// renewSession

  tokenRenewalTimeout;
  UserProfile;

  constructor() {
    this.createdDate = new Date();
    this.AuthInfo = new AuthInfo();

    this.prepareLockObject();
    this.restoreLastSession();
    this._authEvents = new AuthEvents();
  }

  restoreLastSession() {
    let authInfoJSON = localStorage.getItem('AuthInfo');
    if (authInfoJSON && authInfoJSON.length > 0) {
      this.AuthInfo = JSON.parse(authInfoJSON);
    }

    if (this.AuthInfo.ExpiresAt && this.AuthInfo.ExpiresAt < Date.now()) {
      this.RenewSession();
    }
  }

  prepareLockObject() {
    //additional params:
    // https://auth0.com/docs/libraries/lock/v11/configuration#initialscreen-string-
    this.lock = new auth0lock(
      Config.AuthConfig.clientId,
      Config.AuthConfig.domain,
      Config.AuthConfig.auth0LockOptions
    );

    //events
    this.lock.on('authenticated', authResult => {
      this.setSession(authResult);
      this.lock.hide();
      this.Events.emitLoginSuccess(authResult);
    });

    this.lock.on('unrecoverable_error', result => {
      console.error('unrecoverable_error');
      console.dir(result);
    });
    this.lock.on('authorization_error', result => {
      console.error('authorization_error');
      console.dir(result);
    });
  }

  UserIsLogged() {
    if (this.AuthInfo.ExpiresAt && this.AuthInfo.ExpiresAt > Date.now()) {
      return true;
    } else {
      return false;
    }
  }

  RenewSession() {
    console.log('RenewSession');

    this.lock.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }

  async CheckSessionAsync() {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.lock.checkSession({}, (error, token) => {
        if (error) {
          console.error('Check session error', error);
          reject(error);
        } else {
          resolve(token);
        }
      });
    });
  }

  ShowLoginBox() {
    this.lock.show({
      initialScreen: 'login',
    });
  }

  ShowRegisterBox() {
    this.lock.show({
      initialScreen: 'signUp',
    });
  }
  setSession(authResult) {
    let token = jwt_decode(authResult.accessToken);

    this.AuthInfo.AccessToken = authResult.accessToken;
    this.AuthInfo.IdToken = authResult.idToken;
    this.AuthInfo.ExpiresAt = token.exp * 1000;

    localStorage.setItem('AuthInfo', JSON.stringify(this.AuthInfo));

    this.scheduleRenewal();
  }

  scheduleRenewal() {
    const timeout = this.AuthInfo.ExpiresAt - Date.now() - 10000;

    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.RenewSession();
      }, timeout);
    }
  }

  clearSession() {
    clearTimeout(this.tokenRenewalTimeout);

    this.AuthInfo.AccessToken = null;
    this.AuthInfo.IdToken = null;
    this.AuthInfo.ExpiresAt = null;
    this.UserProfile = null;

    localStorage.removeItem('AuthInfo');
  }

  logout() {
    this.clearSession();

    this.lock.logout({
      returnTo: window.location.origin,
    });
  }

  GetUserProfile(cb) {
    if (!this.UserProfile) {
      this.RefreshUserProfile()
        .then(profile => {
          return cb(null, profile);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      return cb(null, this.UserProfile);
    }
  }
  async GetUserProfileAsync() {
    if (!this.UserProfile) {
      return this.RefreshUserProfile();
    } else {
      return new Promise(resolve => {
        resolve(this.UserProfile);
      });
    }
  }
  async RefreshUserProfile() {
    const self = this;

    return new Promise((resolve, reject) => {
      self.lock.getUserInfo(self.AuthInfo.AccessToken, (error, profile) => {
        if (error) {
          reject(error);
        } else {
          resolve(profile);
        }
      });
    });
  }

  get Events() {
    return this._authEvents;
  }
}
