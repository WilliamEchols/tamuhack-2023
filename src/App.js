import './App.css';
import { React, useCallback, useEffect, useState } from "react";
import API from './components/API';

import sentimentBySector from './components/Sector';

import Spinner from './components/Spinner';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Intro from './components/Intro';

function App() {
  const [sectorNewsScores, setSectornNewsScores] = useState({ 'energy': 18.737883059999994, 'healthcare': 26.310177300000003, 'materials': 10.386444400000002, 'industrials': 18.488576899999998, 'utilities': 11.75319844, 'financials': 9.606782939999999, 'consumer-discretionary': 45.86716364000001, 'consumer-staple': 29.39496816, 'information-technology': 64.766246725, 'communications': 17.813769 })

  const [currentCardNum, setCurrentCardNum] = useState(1);

  const updateSectorNewsScore = (key, attr) => {
    let newScore = sectorNewsScores;
    newScore[key] = attr;
    setSectornNewsScores(newScore);
  }

  useEffect(() => {
    //sentimentBySector('energy').then(data => updateSectorNewsScore('energy', data))
    document.title = 'Money Mentor';
    sentimentBySector('energy').then(data => console.log('value: ' + data))
  }, []) 

  return (
    <div className="App">
      <header className="App-header" style={{ 'width': '100%' }}>

        <Intro />
        


        <API />


      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>News Score by Sector</Card.Title>
          <Card.Text>

            Energy Sector: {sectorNewsScores['energy'] ? <p>{sectorNewsScores['energy']}</p> : <><Spinner /></>} <br />
            Materials Sector: {sectorNewsScores['materials'] ? <p>{sectorNewsScores['materials']}</p> : <><Spinner /></>} <br />
            Industrials Sector: {sectorNewsScores['industrials'] ? <p>{sectorNewsScores['industrials']}</p> : <><Spinner /></>} <br />
            Utilities Sector: {sectorNewsScores['utilities'] ? <p>{sectorNewsScores['utilities']}</p> : <><Spinner /></>} <br />
            Healthcare Sector: {sectorNewsScores['healthcare'] ? <p>{sectorNewsScores['healthcare']}</p> : <><Spinner /></>} <br />
            Financials Sector: {sectorNewsScores['financials'] ? <p>{sectorNewsScores['financials']}</p> : <><Spinner /></>} <br />
            Consumer Discretionary Sector: {sectorNewsScores['consumer-discretionary'] ? <p>{sectorNewsScores['consumer-discretionary']}</p> : <><Spinner /></>} <br />
            Consumer Staples Sector: {sectorNewsScores['consumer-staple'] ? <p>{sectorNewsScores['consumer-staple']}</p> : <><Spinner /></>} <br />
            Information Technology Sector: {sectorNewsScores['information-technology'] ? <p>{sectorNewsScores['information-technology']}</p> : <><Spinner /></>} <br />
            Communications Sector: {sectorNewsScores['communications'] ? <p>{sectorNewsScores['communications']}</p> : <><Spinner /></>} <br />
            
          </Card.Text>

        </Card.Body>
      </Card>
        

      </header>
    </div>
  );
}

export default App;
