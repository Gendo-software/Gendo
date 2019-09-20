import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <>
      <div className="pt-3" />
      <footer className="footer">
        <Container className="text-center">
          <span className="text-muted">Broonx software © 2019 </span>
        </Container>
      </footer>
    </>
  );
}
