import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import DataForm from "./components/DataForm";
import SetAndRedirect from "./components/SetAndRedirect";
import Wrapper from './components/Wrapper'
import HomeLayout from './components/homelayout.js'

import Helpers from './utils/helpers'
import logo from './logo.svg';
import './App.css';



class App extends Component {

  state = {
    userCode: null,
    dataStringArray: [],
    dataString:"",
    dataCategory:"",
    error:"",
    selectedCategory:"Finances"

  };

  sortDataStringArray = event =>{

   
    let intermediate = this.state.dataStringArray;
    // if(direction === "asc"){
    //   intermediate.sort(function(a, b){return a-b});
    // }else{
    if(event.target.value === 'asc'){
      intermediate.sort(Helpers.compareAsc)
    } else {
      intermediate.sort(Helpers.compareDesc)
    }
  // }
    this.setState({dataStringArray:intermediate})
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    console.log(this.state)
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({error:""})
    
    //First add the new item to the database, when finished, retrieve all items for userCode and update dataStringArray state.
    Helpers.savedataString({dataString: this.state.dataString,
                            userCode: this.state.userCode,
                            dataCategory: this.state.selectedCategory})
    .then(response => {if (response.data.name==="SequelizeUniqueConstraintError"){
      this.setState({
        error:"Looks like you have a duplicate task.  Try something unique."
      })
    }})
    .then( ()=> {
      Helpers.retrieveDataStrings(this.state.userCode)
      .then( res=> {
        this.setState({dataStringArray:res.data})
      })
    })
  
    //Reset clear out the input box -- should really be included in a promise/callback string
    this.setState({
      dataString: "",
    });
  };
  



  setUserCode = (value) =>{
    console.log("SET RAN")
    this.setState({userCode:value})
  };

  //used on component mount to maintain sycnronicity between userCode state and userCode session storage & retrieve initial/pre-existing records
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
    
    return (
      <div className="App">
        <Router>
          <Wrapper>
            <Route path="/code/:userCode?" render={props => <SetAndRedirect {...props} userCode={this.state.userCode} setUserCode = {this.setUserCode} /> }/>
            {/* <Route exact path="/" render={props => <DataForm userCode =  {this.state.userCode } setUserCode={this.setUserCode}  setDataStrings = {this.setDataStrings}  dataStringArray={this.state.dataStringArray} handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange} dataString={this.state.dataString} error={this.state.error} sortDataStringArray={this.sortDataStringArray}/> }/> */}
            <Route exact path="/home" render={props => <HomeLayout userCode =  {this.state.userCode } setUserCode={this.setUserCode}  setDataStrings = {this.setDataStrings}  dataStringArray={this.state.dataStringArray} handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange} dataString={this.state.dataString} error={this.state.error} sortDataStringArray={this.sortDataStringArray}/> }/>

          </Wrapper>
        </Router>
      </div>
    );
  }
}

export default App;
