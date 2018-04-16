import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import DataForm from "./components/DataForm";
import SetAndRedirect from "./components/SetAndRedirect";
import Wrapper from './components/Wrapper'
import Helpers from './utils/helpers'
import logo from './logo.svg';
import './App.css';



class App extends Component {

  state = {
    userCode: null,
    dataStringArray: [],
    dataString:""

  };

  
    handleInputChange = event => {
      // Getting the value and name of the input which triggered the change
      const { name, value } = event.target;
  
      // Updating the input's state
      this.setState({
        [name]: value
      });
    };
  
    handleFormSubmit = event => {
      // Preventing the default behavior of the form submit (which is to refresh the page)
      event.preventDefault();
  
      // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
      Helpers.savedataString({dataString: this.state.dataString,
                              userCode: this.state.userCode})
      .then( ()=> {
        Helpers.retrieveDataStrings(this.state.userCode)
        .then( res=> {
          this.setState({dataStringArray:res.data})
        })
      })
    
      this.setState({
        dataString: "",
      });
    };
  



  setUserCode = (value) =>{
    console.log("SET RAN")
    this.setState({userCode:value})
  };


  setDataStrings = (value) => {
    this.setState({userCode:value}, () => {
      Helpers.retrieveDataStrings(this.state.userCode)
      .then( res => {
        console.log(res)
        this.setState({dataStringArray:res.data})
      })
    })
  }





  render() {

    console.log("LOCATION", this.props.match)

    
    return (
      <div className="App">
        <Router>
          <Wrapper>
            <Route path="/code/:userCode?" render={props => <SetAndRedirect {...props} userCode={this.state.userCode} setUserCode = {this.setUserCode} /> }/>
            <Route exact path="/" render={props => <DataForm userCode =  {this.state.userCode } setUserCode={this.setUserCode}  setDataStrings = {this.setDataStrings}  dataStringArray={this.state.dataStringArray} handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange} dataString={this.state.dataString}/> }/>
          </Wrapper>
        </Router>
      </div>
    );
  }
}

export default App;
