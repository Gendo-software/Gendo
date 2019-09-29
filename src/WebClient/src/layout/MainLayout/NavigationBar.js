import assets from 'assets/index';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import UserSection from './UserSection';
import { withTranslation } from 'react-i18next';
import LangSwitch from './LangSwitch';
import { compose } from 'redux';
import { withAppContext } from '../../context/AppContext';

const NavigationBar = props => {
  const { t, appContext } = props;
  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      variant="dark"
      expand="lg"
      className="py-0"
    >
      <Container>
        <Navbar.Brand href="#home">
          <LinkContainer to="/" exact>
            <img src={assets.img.gendo179x50} alt="Gendo" />
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/" exact>
              <Nav.Link>
                <FontAwesomeIcon icon={faHome} /> {t('home')}
              </Nav.Link>
            </LinkContainer>

            {appContext.isLogged && (
              <LinkContainer to="/Template/Create" exact>
                <Nav.Link>
                  <FontAwesomeIcon icon={faPlusSquare} /> {t('createTemplate')}
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <LangSwitch />
          <UserSection />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default compose(
  withTranslation(),
  withAppContext
)(NavigationBar);
