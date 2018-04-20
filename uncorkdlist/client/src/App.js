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
    dataStringArray: [],
    dataString:"",
    dataCategory:"",
    error:"",
    selectedCategory:"Finances",
    column:null,
    direction:null,
    formOrAnalytics: 'analytics',

    analyticCategories:[],
    analyticCounts:[],

    chartData:{
      labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
      datasets:[
        {
          label:'Population',
          data:[
            617594,
            181045,
            153060,
            106519,
            105162,
            95072
          ],
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }
      ]
    }



  };

  handleSort = clickedColumn => () => {
    // const { column, data, direction } = this.state

    console.log("CLICKED", clickedColumn)

    if (this.state.column !== clickedColumn) {
      console.log("MATCH")
      this.setState({
        column: clickedColumn,
        dataStringArray: _.sortBy(this.state.dataStringArray, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      dataStringArray: this.state.dataStringArray.reverse(),
      direction: this.state.direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  onInputWidgetMenuChange = (event, data) => {
    this.setState({selectedCategory:data.value})
  }

  onStatusClick = (event,data) => {
    Helpers.changeStatus(data)
    .then( ()=> {
      Helpers.retrieveDataStrings(this.state.userCode)
      .then( res=> {
        this.setState({dataStringArray:res.data}, () => {
          console.log(this.state.column)
          this.setState({
            dataStringArray: _.sortBy(this.state.dataStringArray, this.state.columns)
          })
        })
      })
    })
  }

  // getAnalytics = () => {
  //   Helpers.getAnalytics(this.state.userCode)
  //   .then( res => {
  //     console.log(res)
  //     this.setState({analytics:res.data})
  //   })
  // }

  // sortDataStringArray = event =>{
  //   let intermediate = this.state.dataStringArray;
  //   // if(direction === "asc"){
  //   //   intermediate.sort(function(a, b){return a-b});
  //   // }else{
  //   if(event.target.value === 'asc'){
  //     intermediate.sort(Helpers.compareAsc)
  //   } else {
  //     intermediate.sort(Helpers.compareDesc)
  //   }
  // // }
  //   this.setState({dataStringArray:intermediate})
  // };


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
        console.log("retruned", this.state.dataStringArray)
      })
    })
  
    //Reset clear out the input box -- should really be included in a promise/callback string
    this.setState({
      dataString: "",
    });
  };

  seeList = () => {
    this.setState({formOrAnalytics:'form'})
  }

  seeAnalytics = () => {
    this.setState({formOrAnalytics:'analytics'})
  }
  



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
  };

  setAnalytics = (value) => {
    this.setState({userCode:value}, () => {
      Helpers.getAnalytics(this.state.userCode)
      .then(res => {

        console.log(res.data)

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


  render() {
    
    return (
      <div className="App">
        <Router>
          <Wrapper>
            <Route path="/code/:userCode?" render={props => <SetAndRedirect {...props} userCode={this.state.userCode} setUserCode = {this.setUserCode} /> }/>
            <Route exact path="/" render={props => <HomeLayout userCode =  {this.state.userCode } setUserCode={this.setUserCode}  setDataStrings = {this.setDataStrings}  dataStringArray={this.state.dataStringArray} handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange} dataString={this.state.dataString} error={this.state.error} sortDataStringArray={this.sortDataStringArray} onInputWidgetMenuChange={this.onInputWidgetMenuChange} handleSort={this.handleSort} onStatusClick={this.onStatusClick}  chartData={this.state.chartData} setAnalytics={this.setAnalytics} formOrAnalytics={this.state.formOrAnalytics} analyticCategories={this.state.analyticCategories}  analyticCounts={this.state.analyticCounts} seeList={this.seeList} seeAnalytics={this.seeAnalytics}/>}/>
            {/* <Route exact path="/home" render={props => <HomeLayout userCode =  {this.state.userCode } setUserCode={this.setUserCode}  setDataStrings = {this.setDataStrings}  dataStringArray={this.state.dataStringArray} handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange} dataString={this.state.dataString} error={this.state.error} sortDataStringArray={this.sortDataStringArray}/> }/> */}

          </Wrapper>
        </Router>
      </div>
    );
  }
}

export default App;
