import './App.css';
import { React, useCallback, useEffect, useState } from "react";
import API from './components/API';

import sentimentBySector from './components/Sector';

import Spinner from './components/Spinner';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Intro from './components/Intro';

import RangeSlider from 'react-bootstrap-range-slider';

function App() {
  const [sectorNewsScores, setSectornNewsScores] = useState({ 'energy': 18.737883059999994, 'healthcare': 26.310177300000003, 'materials': 10.386444400000002, 'industrials': 18.488576899999998, 'utilities': 11.75319844, 'financials': 9.606782939999999, 'consumer-discretionary': 45.86716364000001, 'consumer-staple': 29.39496816, 'information-technology': 64.766246725, 'communications': 17.813769 })

  const [age, setAge] = useState(20);

  const [slider1, setSlider1] = useState(100);
  const [slider2, setSlider2] = useState(0);
  const [slider3, setSlider3] = useState(0);

  const updateSectorNewsScore = (key, attr) => {
    let newScore = sectorNewsScores;
    newScore[key] = attr;
    setSectornNewsScores(newScore);
  }

  const logSectorUpdate = (sector) => {
    console.log('reloading');
    sentimentBySector(sector).then(data => console.log(sector + ' value: ' + data));
  }

  useEffect(() => {
    //sentimentBySector('energy').then(data => updateSectorNewsScore('energy', data))
    document.title = 'AInvest';
    //sentimentBySector('energy').then(data => console.log('value: ' + data))
  }, []) 

  return (
    <div className="App">
      <header className="App-header" style={{ 'width': '100%' }}>

          <h1 style={{ 'fontSize': 70, 'marginTop': '2rem' }}><b>AInvest</b></h1>

        <Intro />
        


        <API />


      <Card style={{ width: '90%', 'margin': '5rem', 'color': 'black' }}>
        <Card.Body>
          <Card.Title><h1>News Score by Sector</h1></Card.Title>
            <Row>
            <Col>
            <Button onClick={() => { logSectorUpdate('energy'); }}>reload</Button>Energy Sector: {sectorNewsScores['energy'] ? <p>{Math.round(sectorNewsScores['energy'])}</p> : <><Spinner /></>} <br />
            <Button onClick={() => { logSectorUpdate('materials'); }}>reload</Button>Materials Sector: {sectorNewsScores['materials'] ? <p>{Math.round(sectorNewsScores['materials'])}</p> : <><Spinner /></>} <br />
            <Button onClick={() => { logSectorUpdate('industrials'); }}>reload</Button>Industrials Sector: {sectorNewsScores['industrials'] ? <p>{Math.round(sectorNewsScores['industrials'])}</p> : <><Spinner /></>} <br />
            </Col>
            <Col>
            <Button onClick={() => { logSectorUpdate('utilities'); }}>reload</Button>Utilities Sector: {sectorNewsScores['utilities'] ? <p>{Math.round(sectorNewsScores['utilities'])}</p> : <><Spinner /></>} <br />
            <Button onClick={() => { logSectorUpdate('healthcare'); }}>reload</Button>Healthcare Sector: {sectorNewsScores['healthcare'] ? <p>{Math.round(sectorNewsScores['healthcare'])}</p> : <><Spinner /></>} <br />
            <Button onClick={() => { logSectorUpdate('financials'); }}>reload</Button>Financials Sector: {sectorNewsScores['financials'] ? <p>{Math.round(sectorNewsScores['financials'])}</p> : <><Spinner /></>} <br />
            </Col>
            <Col>
            <Button onClick={() => { logSectorUpdate('consumer-discretionary'); }}>reload</Button>Consumer Discretionary Sector: {sectorNewsScores['consumer-discretionary'] ? <p>{Math.round(sectorNewsScores['consumer-discretionary'])}</p> : <><Spinner /></>} <br />
            <Button onClick={() => { logSectorUpdate('consumer-staples'); }}>reload</Button>Consumer Staples Sector: {sectorNewsScores['consumer-staple'] ? <p>{Math.round(sectorNewsScores['consumer-staple'])}</p> : <><Spinner /></>} <br />
            <Button onClick={() => { logSectorUpdate('information-technology'); }}>reload</Button>Information Technology Sector: {sectorNewsScores['information-technology'] ? <p>{Math.round(sectorNewsScores['information-technology'])}</p> : <><Spinner /></>} <br />
            </Col>
            <Col>
            <Button onClick={() => { logSectorUpdate('communications'); }}>reload</Button>Communications Sector: {sectorNewsScores['communications'] ? <p>{Math.round(sectorNewsScores['communications'])}</p> : <><Spinner /></>} <br />
            </Col>
            </Row>

        </Card.Body>
      </Card>

      <Card style={{ width: '90%', 'margin': '5rem', 'color': 'black' }}>
        <Card.Body>
          <Card.Title><h1>Portfolio Percentages</h1></Card.Title><br />
          Age: <input type='number' min='0' max='100' value={age} onChange={event => setAge(event.target.value)} />

            <Row className="row justify-content-center">
            <Col>
            Savings: $<input style={{'marginBottom': '2rem'}} type='number' value={slider1} onChange={(event) => { setSlider1(parseInt(event.target.value)) }} /><br />
            Bonds: $<input style={{'marginBottom': '2rem'}} type='number' value={slider2} onChange={(event) => setSlider2(parseInt(event.target.value))} /><br />
            Markets: $<input style={{'marginBottom': '2rem'}} type='number' value={slider3} onChange={(event) => setSlider3(parseInt(event.target.value))} />
            </Col>
            <Col>
            Savings Percent: <RangeSlider style={{ 'marginRight': '3rem' }}
              value={Math.round(slider1 / (slider1 + slider2 + slider3) * 100)}
              min={0}
              max={100}
            /> 
            Bonds Percent: <RangeSlider style={{ 'marginRight': '3rem' }}
              value={Math.round(slider2 / (slider1 + slider2 + slider3) * 100)}
              min={0}
              max={100}
            />
            Markets Percent: <RangeSlider
              value={Math.round(slider3 / (slider1 + slider2 + slider3) * 100)}
              min={0}
              max={100}
            />
            </Col>
            <Col>
            { Math.round(slider1 / (slider1 + slider2 + slider3) * 100) < 20 ? 'Low savings percentage': '' }<br/><br />
            { Math.round(slider2 / (slider1 + slider2 + slider3) * 100) < age ? 'Low bond percentage for age': '' }<br/><br />
            { Math.round(slider3 / (slider1 + slider2 + slider3) * 100) < 80 - age ? 'Low market securities percentage for age': '' }<br/>
            </Col>
            </Row>


        </Card.Body>
      </Card>
        

      </header>
    </div>
  );
}

export default App;
