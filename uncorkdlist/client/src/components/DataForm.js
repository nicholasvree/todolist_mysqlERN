import React, { Component } from "react";
import Helpers from "../utils/helpers.js";
import "./DataForm.css";
import ItemsTable from "./ItemsTable.js"
import DropDown from "./DropDown.js"
import { Table, Button, Icon, Input, Grid, Dropdown } from 'semantic-ui-react'

let categories = [
  {
    text: 'Finances',
    value: 'Finances'
  },
  {
    text: 'Health',
    value: 'Health'
  },
  {
    text: 'Work',
    value: 'Work'
  },
  {
    text: 'Leisure',
    value: 'Leisure'
  },
  {
    text: 'Family',
    value: 'Family'
  }
]



// import "./Form.css";

class DataForm extends Component {

  componentDidMount() {
    //if session storage not set, create a random session variable (SetAndDirect Component would have handled and set session variable if a parameter was given)
    if(sessionStorage.getItem('userCode') == null)
      {
        let unID = Helpers.generateUnid()
        sessionStorage.setItem('userCode', unID);
        this.props.setDataStrings(sessionStorage.getItem(unID))
    }
    //If not null, sync up state with session userCode and deliver pre-existing records
    else{
      this.props.setDataStrings(sessionStorage.getItem('userCode'))
    }
  };



  render() {

  //   let dataStringArray = this.props.dataStringArray
  //   //create an element that maps the each record to an H1 element. 
  //   const elements = dataStringArray.map(data => {    
  //     return(
  //     <tr>
  //       <td>Data: {data.data_string}</td>
  //       <td>{data.category}</td>
  //       <td>{data.created_date}</td>
  //       <td>{data.completed}</td>
  //     </tr>
  //     ) 
  // }) 

  //   console.log("DATA STRING ARRAY", dataStringArray)


    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
           <h1>Your Code: {this.props.userCode}</h1>
           {/* <button onClick={this.props.sortDataStringArray} value="asc">Sort Asc</button>
           <button onClick={this.props.sortDataStringArray} value="desc">Sort Desc</button>

          <table>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Date Entered</th>
              <th>Completed?</th>
            </tr>
            {elements}
          </table>

        <form className="form">
            New:{' '}
            <input
              value={this.props.dataString}
              name="dataString"
              onChange={this.props.handleInputChange}
              type="text"
              placeholder="Data"
            />

        
        <select name="selectedCategory" defaultValue={this.props.selectValue} onChange={this.props.handleInputChange}>
          <option value="Finances">Finances</option>
          <option value="Work">Work</option>
          <option value="Health">Health</option>
          <option value="Family">Family</option>
          <option value="Friends">Friends</option>
          <option value="Leisure">Leisure</option>
          <option value="Household">Household</option>
        </select>
        

            <button onClick={this.props.handleFormSubmit}>Submit</button>
        </form> */}

        <ItemsTable dataStringArray={this.props.dataStringArray} dataString={this.props.dataString} handInputChange={this.props.handleInputChange} handleFormSubmit={this.props.handleFormSubmit}/>
      
        
              
                    <Grid columns={3}>
                      <Grid.Row>
                        <Grid.Column>

                        New:  {' '}
                    <div class="ui input">
                        <input
                            value={this.props.dataString}
                            name="dataString"
                            onChange={this.props.handleInputChange}
                            type="text"
                            placeholder="Data"
                        />
                    </div>

                        </Grid.Column>
                        <Grid.Column>
                        Category: {' '}
                        <Dropdown placeholder='Select Category' floating={true} name="selectedCategory" fluid selection options={categories} onChange={this.props.onInputWidgetMenuChange} />
                        </Grid.Column>
                        <Grid.Column>
              
                          <Button primary size='massive' onClick= {this.props.handleFormSubmit}>
                            Submit
                          </Button>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                      {this.props.error}
                      </Grid.Row>
                      </Grid>
      </div>
    );
  }
}

export default DataForm;
