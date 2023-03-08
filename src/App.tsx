import React from 'react';

import './App.css';
import { Timer } from './components/Timer';

function App() {
  return <div>
    <Timer cityCountry="London"/>
    <Timer cityCountry="Vladivostok"/>
    <Timer cityCountry="Israel"/>
    <Timer cityCountry="Toronto"/>
    </div>
}

export default App;
