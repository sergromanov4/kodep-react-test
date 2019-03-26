import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
 
import Payments from './containers/payments.js'
import Income from './containers/income.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
           <Link to="/">Payments</Link>
           <Link to="/income">Income</Link>
           <Link to="/">Charts</Link>
           <Link to="/">Settings</Link>
        </header>
        <div className="content">
          
          <Route exact path='/' component={Payments}/>
          <Route path='/income' component={Income}/>

        </div>
      </div>
    );
  }
}

export default App;
