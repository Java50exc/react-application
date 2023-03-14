import React from 'react';

import './App.css';
import { CounterMultiply } from './components/CounterMultiply';
import { CounterSquare } from './components/CounterSquare';
import { CounterUpdater } from './components/CounterUpdater';
import { Timer } from './components/Timer';

function App() {
  
  return <div style={{display: 'flex', alignItems: 'center',
   flexDirection: 'column'}}>
    <CounterUpdater operand={10}/>
    <CounterMultiply factor={2}/>
    <CounterSquare/>
  </div>
}

export default App;
