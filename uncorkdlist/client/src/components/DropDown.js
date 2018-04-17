import React, { Component } from "react";
import { Dropdown } from 'semantic-ui-react'

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



class DropDownSample extends Component {
    render() {
        return(
                
        <Dropdown placeholder='Select Friend' floating={true} name="selectedCategory" fluid selection options={categories} onClick={this.props.handleInputChange} />
);
}
}


export default DropDownSample;