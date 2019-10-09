import React from 'react';
import { Nav } from 'react-bootstrap';
import AuthManager from '../../Auth/AuthManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import { withAppContext } from '../../context/AppContext';

const AuthCore = AuthManager.getAuthObject();

function onLogoutClick() {
  AuthCore.logout();
}

function onUserClick(props) {
  console.log('user profile clicked. userInfo:');
  console.dir(props.userProfile, AuthCore.AuthInfo);
}

function onLoginClick() {
  AuthCore.ShowLoginBox();
}

function onRegisterClick() {
  AuthCore.ShowRegisterBox();
}

function UserIsLoggedView(props) {
  const { t } = props;
  return (
    <>
      <Nav.Item onClick={() => onUserClick(props)}>
        <Nav.Link>
          <FontAwesomeIcon icon={faUser} /> {t('hello')}{' '}
          {props.userProfile.nickname}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item onClick={onLogoutClick}>
        <Nav.Link>
          <FontAwesomeIcon icon={faSignOutAlt} /> {t('logout')}
        </Nav.Link>
      </Nav.Item>
    </>
  );
}

function UserIsNotLoggedView(props) {
  const { t } = props;
  return (
    <>
      <Nav.Item onClick={onLoginClick}>
        <Nav.Link>
          <FontAwesomeIcon icon={faUser} /> {t('login')}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item onClick={onRegisterClick}>
        <Nav.Link>
          <FontAwesomeIcon icon={faUserPlus} /> {t('register')}
        </Nav.Link>
      </Nav.Item>
    </>
  );
}

const UserSection = props => {
  const { userProfile, isLogged } = props.appContext;
  const t = props.t;
  return (
    <div>
      <Nav>
        {(isLogged && <UserIsLoggedView userProfile={userProfile} t={t} />) || (
          <UserIsNotLoggedView t={t} />
        )}
      </Nav>
    </div>
  );
};

export default compose(
  withTranslation(),
  withAppContext
)(UserSection);
