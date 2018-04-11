import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CoinAlertApp from "./containers/CoinAlertApp";
import ErrorBoundary from './utils/ErrorBoundary'


class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <ErrorBoundary>
            <CoinAlertApp />
          </ErrorBoundary>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
