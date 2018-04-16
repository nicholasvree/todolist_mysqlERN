import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import DataForm from "./components/DataForm";
import Wrapper from './components/Wrapper'

import logo from './logo.svg';
import './App.css';
import Helpers from "./utils/Helpers";


class App extends Component {

  // componentDidMount() {
  //   Helpers.getUserSession(this.props.match);
  // }

  render() {

    console.log("LOCATION", this.props.match)
    
    return (
      <div className="App">
        <Router>
          <Wrapper>
            <Route path="/:code?" component={DataForm} />
          </Wrapper>
        </Router>
      </div>
    );
  }
}

export default App;
