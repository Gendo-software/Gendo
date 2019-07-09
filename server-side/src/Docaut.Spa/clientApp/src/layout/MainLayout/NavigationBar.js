import assets from 'assets/index';
import React, { Component } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {faFileAlt} from '@fortawesome/free-regular-svg-icons';
import {LinkContainer} from 'react-router-bootstrap';
import UserSection from './UserSection';




export default class NavigationBar extends Component {
  render() {  
    return <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" className='py-0'>
        <Container>
          <Navbar.Brand href="#home">
            <img src={assets.img.logo128x50} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/" exact>
                <Nav.Link>
                  <FontAwesomeIcon icon={faHome} />
                  {' '} Home
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/Template/Create" exact>
                <Nav.Link>
                  <FontAwesomeIcon icon={faPlusSquare} />
                  {' '} Create template
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Document/Create" exact>
                <Nav.Link>
                  <FontAwesomeIcon icon={faFileAlt} />
                  {' '} Create document
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <UserSection />
          </Navbar.Collapse>
        </Container>
      </Navbar>
  }
}
