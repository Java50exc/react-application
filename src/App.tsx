import React, {useState} from 'react';

import './App.css';
import { InputTest } from './components/InputTest';
import { Timer } from './components/Timer';

function App() {

  const [cityCountry1, setCityCountry1] = useState("Jerusalem");
  const [cityCountry2, setCityCountry2] = useState("Jerusalem");
  const [cityCountry3, setCityCountry3] = useState("Jerusalem");
  const [cityCountry4, setCityCountry4] = useState("Jerusalem");
  return <div>

    <Timer cityCountry={"Europe/Vilnius"}/>
    <Timer cityCountry={"Europe/Vilnius"}/>
    <Timer cityCountry={"Europe/Vilnius"}/>
    <Timer cityCountry={"Europe/Vilnius"}/>
    </div>
  
}

export default App;
