import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import DataForm from "./components/DataForm";
import SetAndRedirect from "./components/SetAndRedirect";
import Wrapper from './components/Wrapper'
import HomeLayout from './components/homelayout.js'
import _ from 'lodash'

import Helpers from './utils/helpers'
import logo from './logo.svg';
import './App.css';



class App extends Component {

  state = {
    userCode: null,
    dataString:null,
    error:null,
    selectedCategory:"Finances",
    column:'id',
    direction:'asc',
    formOrAnalytics: 'form',

    dataStringArray:[],    
    analyticCategories:[],
    analyticCounts:[]
  };

  //Used on DataForm component mount to maintain sycnronicity between userCode state and userCode session storage.  Also retrieves initial/pre-existing records
  setDataStrings = (value) => {
    this.setState({userCode:value}, () => {
      Helpers.retrieveDataStrings(this.state.userCode)
      .then( res => {
        this.setState({dataStringArray:_.orderBy(res.data, [this.state.column, 'id'], this.state.direction)})        
      })      
    })
  };

  //Used on Chart component mount to maintain sycnronicity between userCode state and userCode session storage.  Also retrieves initial/pre-existing aggregate records
  setAnalytics = (value) => {
    this.setState({userCode:value}, () => {
      Helpers.getAnalytics(this.state.userCode)
      .then(res => {
        
        let tempCatArray = []
        let tempCountArray = []

        for(let i=0; i<res.data.length; i++){
          tempCatArray.push(res.data[i].category)
          tempCountArray.push(res.data[i].total)
        }

        this.setState({analyticCategories:tempCatArray, analyticCounts: tempCountArray})
      })
    })
  }

  //Used to submit/create a new to-do item and then re-retrieve the list
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
        this.setState({dataStringArray:_.orderBy(res.data, [this.state.column, 'id'], this.state.direction)})
      })
    })
  
    //Reset clear out the input box -- should really be included in a promise/callback string
    this.setState({
      dataString: "",
    });
  };

  //used to set sort columns in state & sort the dataStringArray.
  handleSort = clickedColumn => () => {
    if (this.state.column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        dataStringArray: _.orderBy(this.state.dataStringArray, [clickedColumn, 'id'], 'asc'),
        direction: 'asc',
      })
      return
    }
    this.setState({
      direction: this.state.direction === 'asc' ? 'desc' : 'asc',
    }, () => {
      this.setState(
        this.setState({dataStringArray:_.orderBy(this.state.dataStringArray, [this.state.column, 'id'], this.state.direction)})        
      )
    })
  }

  //Changes status from not done to done or vice/versa.  Also resorts if columns if columns are beings sorted
  onStatusClick = (event,data) => {
    Helpers.changeStatus(data)
    .then( ()=> {
      Helpers.retrieveDataStrings(this.state.userCode)
      .then( res=> {
        this.setState({dataStringArray:_.orderBy(res.data, [this.state.column, 'id'], this.state.direction)})
        })
      })
  }

  //sets the status of the category drop down into state
  onInputWidgetMenuChange = (event, data) => {
    this.setState({selectedCategory:data.value})
  }

  //Used for input forms
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  seeList = () => {
    this.setState({formOrAnalytics:'form'})
  }

  seeAnalytics = () => {
    this.setState({formOrAnalytics:'analytics'})
  }
  
  setUserCode = (value) =>{
    this.setState({userCode:value})
  };


  componentDidMount () {
    console.log(this.state.column)
  }

  render() {
    
    return (
      <div className="App">
        <Router>
          <Wrapper>
            <Route path="/code/:userCode?" render={props => <SetAndRedirect {...props} userCode={this.state.userCode} setUserCode = {this.setUserCode} /> }/>
            <Route exact path="/" render={props => <HomeLayout  userCode =  {this.state.userCode } 
                                                                setUserCode={this.setUserCode}  
                                                                setDataStrings = {this.setDataStrings}  
                                                                dataStringArray={this.state.dataStringArray} 
                                                                handleFormSubmit={this.handleFormSubmit} 
                                                                handleInputChange={this.handleInputChange} 
                                                                dataString={this.state.dataString} 
                                                                error={this.state.error} 
                                                                sortDataStringArray={this.sortDataStringArray} 
                                                                onInputWidgetMenuChange={this.onInputWidgetMenuChange} 
                                                                handleSort={this.handleSort} onStatusClick={this.onStatusClick}  
                                                                chartData={this.state.chartData} setAnalytics={this.setAnalytics} 
                                                                formOrAnalytics={this.state.formOrAnalytics} 
                                                                analyticCategories={this.state.analyticCategories}  
                                                                analyticCounts={this.state.analyticCounts} 
                                                                seeList={this.seeList} 
                                                                seeAnalytics={this.seeAnalytics}/>}/>
          </Wrapper>
        </Router>
      </div>
    );
  }
}

export default App;
