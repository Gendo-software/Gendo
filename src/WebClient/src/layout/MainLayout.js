import React, { Component } from 'react';
import NavigationBar from './MainLayout/NavigationBar';
import Footer from './MainLayout/Footer';

const pathTitle = {
  '/Template/Create': 'Create template',
  '/Template/Edit': 'Edit template',
  '/Document/Create': 'Create document',
};

export default class MainLayout extends Component {
  componentDidUpdate() {
    this.setDocumentTitle();
  }

  setDocumentTitle() {
    const currentPath = this.props.location.pathname;

    const keyTitle =
      Object.keys(pathTitle).find(keyPath => currentPath.startsWith(keyPath)) ||
      null;

    let title = `Gendo`;
    if (keyTitle) {
      title = `${pathTitle[keyTitle]} - ${title}`;
    }

    document.title = title;
  }

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
