import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Payments from './containers/payments.js'
import Income from './containers/income.js'
import Header from './containers/header.js'
import Charts from './containers/charts.js'
import Settings from './containers/settings.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="content">
          <Route exact path='/' component={Payments}/>
          <Route       path='/income' component={Income}/>
          <Route       path='/charts' component={Charts}/>
          <Route       path='/settings' component={Settings}/>
        </div>
      </div>
    );
  }
}

export default App;
