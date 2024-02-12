import React, {useState} from 'react';

import './App.css';
import { InputTest } from './components/InputTest';
import { Timer } from './components/Timer';

function App() {
  return <div>

    <Timer cityCountry={"Europe/Vilnius"}/>
    <Timer cityCountry={"Europe/Vilnius"}/>
    <Timer cityCountry={"Europe/Vilnius"}/>
    <Timer cityCountry={"Europe/Vilnius"}/>
    </div>
  
}

export default App;
