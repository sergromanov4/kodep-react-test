import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Payments from './containers/payments.js'
import Income from './containers/income.js'
import Header from './containers/header.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="content">
          <Route exact path='/' component={Payments}/>
          <Route       path='/income' component={Income}/>
        </div>
      </div>
    );
  }
}

export default App;
