import React from 'react';

import './App.css';
import { CounterMultiply } from './components/CounterMultiply';
import { CounterSquare } from './components/CounterSquare';
import { CounterUpdater } from './components/CounterUpdater';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector<any, string>(state => state.auth.authUser);
  
  return <div style={{display: 'flex', alignItems: 'center',
   flexDirection: 'column'}}>
    {user || <Login/>}
    {user && <Logout/>}
    {user && <CounterUpdater operand={1} canReset={user.includes("admin")}/>}
    {user.includes("admin") && <CounterMultiply factor={2}/>}
    {user && <CounterSquare/>}
  </div>
}

export default App;
