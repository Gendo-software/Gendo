import React, { Component } from 'react'
import NavBarComponent from '../components/Navbar/NavBarComponent';
import FooterComponent from '../components/FooterComponent';
import NavigationBar from './MainLayout/NavigationBar';

export default class MainLayout extends Component {
  render() {
    return (
      <div>
        <NavBarComponent />
        <NavigationBar />
          {this.props.children}
        <FooterComponent />
      </div>
    )
  }
}
