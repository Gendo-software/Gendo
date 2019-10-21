import React from 'react';
import { withRouter } from 'react-router';
import assets from 'assets/index';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faPlusSquare,
  faGrinBeamSweat,
} from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import UserSection from './UserSection';
import { withTranslation } from 'react-i18next';
import LangSwitch from './LangSwitch';
import { compose } from 'redux';
import { withAppContext } from '../../context/AppContext';
import ConfirmButton from '../../components/ConfirmButton';
import dataSeeder from '../../seedData/seed';

const restoreData = async (appContext, props) => {
  let seeder = new dataSeeder(appContext);
  await seeder.CleanAndSeedData();
  props.history.push('/');
  appContext.reloadView();
};
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
            {appContext.isLogged && (
              <>
                <ConfirmButton
                  okAction={() => restoreData(props.appContext, props)}
                  control={
                    <Nav.Item>
                      <Nav.Link>
                        <FontAwesomeIcon icon={faGrinBeamSweat} />{' '}
                        {t('RestoreExampleData')}
                      </Nav.Link>
                    </Nav.Item>
                  }
                />
              </>
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
  withRouter,
  withTranslation(),
  withAppContext
)(NavigationBar);
