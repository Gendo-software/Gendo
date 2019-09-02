import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

export default function InfoContent() {
  return (
    <Jumbotron>
      <h1>Hello, my dear user!</h1>
      <p>This is demo project created to show you our workshop.</p>
      <p>In this project we use most popular technologies - .net core, react.js, docker and another.</p>
      <hr />

      <h4>What is Gendo?</h4>
      <p>
        The main feature of this system is to organize and speed up the process
        of creating any kind of documents from templates. In our system it is
        possible to design templates for different purposes.
      </p>
      <p>
        {/* <Button variant="primary">Learn more</Button> */}
      </p>
    </Jumbotron>
  );
}
