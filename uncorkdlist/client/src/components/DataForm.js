import React, { Component } from "react";
import Helpers from "../utils/helpers.js";
import "./DataForm.css";
import ItemsTable from "./ItemsTable.js"
import DropDown from "./DropDown.js"
import { Table, Button, Icon, Input, Grid, Dropdown } from 'semantic-ui-react'
import './style.css';

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
        // this.props.setUserCode(unID)
        this.props.setDataStrings(sessionStorage.getItem(unID))
    }
    //If not null, sync up state with session userCode and deliver pre-existing records
    else{
      this.props.setDataStrings(sessionStorage.getItem('userCode'))
    }
  };


  render() {
    return (
      <div>

        <ItemsTable dataStringArray={this.props.dataStringArray} 
                    dataString={this.props.dataString} 
                    handInputChange={this.props.handleInputChange} 
                    handleFormSubmit={this.props.handleFormSubmit} 
                    handleSort={this.props.handleSort} 
                    onStatusClick={this.props.onStatusClick}
        />
    
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              New:  {' '}
              <div className="ui input">
                <input
                  value={this.props.dataString}
                  name="dataString"
                  onChange={this.props.handleInputChange}
                  type="text"
                  placeholder="To Do Item"
                />
              </div>

            </Grid.Column>
            <Grid.Column>
              Category: {' '}
              <Dropdown placeholder='Select Category' floating={true} name="selectedCategory" fluid selection options={categories} onChange={this.props.onInputWidgetMenuChange} />
            </Grid.Column>
            <Grid.Column>
              <div className='submit-button'>
                <Button primary size='massive' onClick= {this.props.handleFormSubmit}>
                  Submit
                </Button>
              </div>
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
