import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import DataForm from "./components/DataForm";
import SetAndRedirect from "./components/SetAndRedirect";
import Wrapper from './components/Wrapper'

import logo from './logo.svg';
import './App.css';



class App extends Component {

  state = {
    userCode: null,
  };

  setUserCode = (value) =>{
    console.log("SET RAN")
    this.setState({userCode:value})
  }



  render() {

    console.log("LOCATION", this.props.match)
    
    return (
      <div className="App">
        <Router>
          <Wrapper>
            <Route path="/code/:userCode?" render={props => <SetAndRedirect {...props} userCode={this.state.userCode} setUserCode = {this.setUserCode} /> }/>
            <Route exact path="/" render={props => <DataForm userCode =  {this.state.userCode } setUserCode={this.setUserCode} /> }/>
          </Wrapper>
        </Router>
      </div>
    );
  }
}

export default App;
