/*eslint-disable react-hooks/exhaustive-deps */
import React, { Component} from 'react'; //importation de react et de component
import {BrowserRouter as Router} from 'react-router-dom'; //importation du routeur

import BaseRouter from './Routes'; //importation du component de routing

class App extends Component { //declaration de classe

  render() {
    return ( 
        <Router >
          <BaseRouter /> 
        </Router>
    );
  }
}

export default App;
