import React, { Component } from 'react';
import './App.css';

import Payments from './containers/payments.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
           <a href="/">Payments</a>
           <a href="/">Income</a>
           <a href="/">Charts</a>
           <a href="/">Settings</a>
        </header>
        <div className="content">
          <Payments />
        </div>
      </div>
    );
  }
}

export default App;
