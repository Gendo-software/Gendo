import React, { Component } from 'react';
import NavigationBar from './MainLayout/NavigationBar';
import Footer from './MainLayout/Footer';

export default class MainLayout extends Component {
  render() {
    return (
      <>
        <NavigationBar />
        {this.props.children}
        <Footer />
      </>
    );
  }
}
