import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CoinAlertApp from "./containers/CoinAlertApp";


class App extends Component {
  render() {
    return (
      <div className="App">
       <MuiThemeProvider>
         <CoinAlertApp/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
