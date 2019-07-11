import React, { Component } from 'react'
import NavBarComponent from '../components/Navbar/NavBarComponent';
import FooterComponent from '../components/FooterComponent';
import NavigationBar from './MainLayout/NavigationBar';
import Footer from './MainLayout/Footer';
import { Container } from 'react-bootstrap';

export default class MainLayout extends Component {
  render() {
    return (
      <>        
        <NavigationBar />          
            {this.props.children}          
        <Footer/>        
      </>
    )
  }
}
