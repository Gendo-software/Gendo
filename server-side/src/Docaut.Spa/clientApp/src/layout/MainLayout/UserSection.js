import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import AuthManager from '../../Auth/AuthManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const AuthCore = AuthManager.getAuthObject()

export default class UserSection extends Component {
  state = { userName: '' }

  refreshUser() {
    let receiveUserData = (error, profile) => {
      if (error) {
        this.setState({ userName: 'unknown' })
      } else if (profile) {
        this.setState({
          userName: profile.nickname
        })
      }
    }

    if (AuthCore.UserIsLogged()) {
      AuthCore.GetUserProfile((...params) => receiveUserData(...params))
    }
  }

  componentDidUpdate() {
    if (this.state.userName.length == 0) {
      this.refreshUser()
    }
  }
  componentDidMount() {
    AuthCore.Events.addLoginSuccess(() => this.refreshUser());    
    this.refreshUser()
  }

  onLogoutClick() {
    AuthCore.logout();
  }

  onUserClick() {
    console.log("user profile clicked. userInfo:");
    console.dir(AuthCore.UserProfile)
  }

  onLoginClick(){
    AuthCore.ShowLoginBox();
  }

  onRegisterClick(){
    AuthCore.ShowRegisterBox();
  }

  UserIsLoggedView() {
    return (
      <>
        <Nav.Item onClick={this.onUserClick}>
          <Nav.Link>
            <FontAwesomeIcon icon={faUser} />
            {' '}Witaj {this.state.userName}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={this.onLogoutClick}>
          <Nav.Link>
            <FontAwesomeIcon icon={faSignOutAlt} />
            {' '}Logout
          </Nav.Link>
        </Nav.Item>
      </>
    )
  }

  UserIsNotLoggedView() {
    return (
      <>
        <Nav.Item onClick={this.onLoginClick}>
          <Nav.Link>
            <FontAwesomeIcon icon={faUser} />
            {' '}Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={this.onRegisterClick}>
          <Nav.Link>
            <FontAwesomeIcon icon={faUserPlus} />
            {' '}Register
          </Nav.Link>
        </Nav.Item>
      </>
    )
  }

  render() {
    return (
      <div>
        <Nav>
          {(AuthCore.UserIsLogged() && this.UserIsLoggedView()) ||
            this.UserIsNotLoggedView()}
        </Nav>
      </div>
    )
  }
}
