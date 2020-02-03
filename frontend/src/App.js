import React from 'react';
import DateSocketViewer from './DateSocketViewer';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <DateSocketViewer url="ws://localhost:8899" />
      </header>
    </div>
  );
}

export default App;
