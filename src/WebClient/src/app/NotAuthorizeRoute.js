import React from 'react';
import { Container } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

const NotAuthorizeRoute = props => {
  const { t } = props;
  return (
    <Container className="my-5 text-center">
      <h2>{t('notAuthorized')}</h2>
      <p>{t('notAuthorizedDesc')}</p>
    </Container>
  );
};

export default withTranslation('AuthRoute')(NotAuthorizeRoute);
