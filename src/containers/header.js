import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header(){
  return(
    <header className="App-header">
      <NavLink exact to="/">Payments</NavLink>
      <NavLink to="/income">Income</NavLink>
      <NavLink to="/charts">Charts</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </header>
    )
}