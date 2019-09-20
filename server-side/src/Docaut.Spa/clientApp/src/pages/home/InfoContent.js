import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

function InfoContent(props) {
  const { t } = props;
  return (
    <Jumbotron>
      <h1>{t('heloUser')}</h1>

      <p>{t('p1')}</p>
      <p>{t('p2')}</p>
      <hr />
      <h4>{t('WhatIsGendo')}</h4>
      <p>{t('p3')}</p>
      <p>{/* <Button variant="primary">Learn more</Button> */}</p>
    </Jumbotron>
  );
}

export default withTranslation('infoContent')(InfoContent);
