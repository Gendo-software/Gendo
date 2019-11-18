import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { withAppContext } from '../context/AppContext';
import assets from '../assets';
import AuthManager from '../auth/AuthManager';
import storage from '../storage';
import i18n from '../locales/i18n';

class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.appContext = props.appContext;
  }

  async componentDidMount() {
    // execute actions before load main app
    await this.FillAuthInfo();
    this.setAppLanguage();

    this.appContext.setAppContextState({ appReady: true });
  }

  setAppLanguage() {
    const lang = localStorage.getItem(storage.localStorage.appLanguage);
    if (lang) {
      i18n.changeLanguage(lang);
      this.appContext.setAppContextState({ appLang: lang });
    }
  }

  async FillAuthInfo() {
    const auth = AuthManager.getAuthObject();

    let authState = {
      isLogged: false,
      userProfile: null,
    };

    if (auth.UserIsLogged()) {
      authState.isLogged = true;

      try {
        let profile = await auth.GetUserProfileAsync();
        authState.userProfile = profile;
      } catch (error) {
        console.error('error during get user profile', error);
        authState.isLogged = false;
        authState.userProfile = null;
      }
    } else {
      authState.isLogged = false;
    }

    this.props.appContext.setAppContextState({ ...authState });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: '#2f3136',
        }}
      >
        <div className="text-center">
          <img src={assets.img.gendo179x50} alt="Gendo" />
          <br />
          <Spinner className="my-auto" animation="border" variant="secondary" />
        </div>
      </div>
    );
  }
}

export default withAppContext(SplashScreen);
