import './App.css';
import { React, useEffect } from "react";
import API from './components/API';

import sentimentBySector from './components/Sector';



function App() {
  useEffect(() => {
    sentimentBySector('energy')
  }, []);

  return (
    <div className="App">
      <header className="App-header" style={{ 'width': '100%' }}>
        <API />
        
      </header>
    </div>
  );
}

export default App;
