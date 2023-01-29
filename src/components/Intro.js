import React, { useState, useRef } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';
import './transition.css'

function Intro() {
  const [currentNum, setCurrentNum] = useState(1);

  const nodeRef = useRef(null);
  return (
    <Container style={{ paddingTop: '2rem' }}>

      <CSSTransition
        in={currentNum == 1}
        nodeRef={nodeRef}
        timeout={300}
        classNames="alert"
        unmountOnExit

      >
        <Alert
          ref={nodeRef}
          variant="primary"
        >
          <Alert.Heading>
          To begin analyzing your investment risk, please answer the following short questions.
          </Alert.Heading>
          <p>
          Are you an active investor?
          </p>
          <Button variant="primary" onClick={() => setCurrentNum(2)}>Yes</Button>
          <Button variant="primary" onClick={() => setCurrentNum(3)}>No</Button>
        </Alert>

      </CSSTransition>

      <CSSTransition
        in={currentNum == 2}
        nodeRef={nodeRef}
        timeout={300}
        classNames="alert"
        unmountOnExit

      >

        <Alert
          ref={nodeRef}
          variant="primary"
        >
          <Alert.Heading>
          (active investor)
          </Alert.Heading>
          <p>
          Do you invest in stocks, bonds, or mutual funds?
          </p>
          <Button variant="primary" onClick={() => setCurrentNum(4)}>Yes</Button>
          <Button variant="primary" onClick={() => setCurrentNum(5)}>No</Button>
        </Alert>

      </CSSTransition>

      <CSSTransition
        in={currentNum == 3}
        nodeRef={nodeRef}
        timeout={300}
        classNames="alert"
        unmountOnExit

      >

        <Alert
          ref={nodeRef}
          variant="secondary"
        >
          <Alert.Heading>
          (end of questions)
          </Alert.Heading>
          <p>
          Thank you for visiting this website.
          </p>
          <Button variant="secondary" onClick={() => setCurrentNum(0)}>Dismiss</Button>
        </Alert>

      </CSSTransition>

      <CSSTransition
        in={currentNum == 4}
        nodeRef={nodeRef}
        timeout={300}
        classNames="alert"
        unmountOnExit

      >

        <Alert
          ref={nodeRef}
          variant="primary"
        >
          <Alert.Heading>
          (investor information)
          </Alert.Heading>
          <p>
          The below form can be used for individual or group stock lookup by ticker. If you want to search for more than one stock at a time, separate each ticker with a comma. Each stock is given a "news score" which is determined through a sentiment analysis machine learning system that is fed relevent news articles by an api. The sector scores use the same process for a group of companies used to represent each industry. Thank you for visiting.
          </p>
          <Button variant="primary" onClick={() => setCurrentNum(0)}>Dismiss</Button>
        </Alert>

      </CSSTransition>

    </Container>
  );
}

export default Intro;