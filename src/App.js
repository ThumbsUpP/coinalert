import React, { Component } from 'react';
import CurrencyBox from './containers/CurrencyBox/CurrencyBox'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="PriceBox" >
        <CurrencyBox />
      </div>
      
      </div>
    );
  }
}

export default App;
