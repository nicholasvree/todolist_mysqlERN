import React, { Component } from 'react';
// import { BrowserRouter as Router, Route} from "react-router-dom";
import DataForm from "./components/DataForm";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DataForm/>
      </div>
    );
  }
}

export default App;
