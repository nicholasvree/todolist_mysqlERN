import React, { Component } from "react";
import Helpers from "../utils/helpers.js";

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

    let dataStringArray = this.props.dataStringArray
    //create an element that maps the each record to an H1 element. 
    const elements = dataStringArray.map(data => {    
      return(
         <h1>Data: {data.data_string}</h1>
      ) 
  }) 

    console.log("DATA STRING ARRAY", dataStringArray)


    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
           <h1>Your Code: {this.props.userCode}</h1>
           <button onClick={this.props.sortDataStringArray} value="asc">Sort Asc</button>
           <button onClick={this.props.sortDataStringArray} value="desc">Sort Desc</button>


           {elements}

        <form className="form">
            New:{' '}
            <input
              value={this.props.dataString}
              name="dataString"
              onChange={this.props.handleInputChange}
              type="text"
              placeholder="Data"
            />
            <button onClick={this.props.handleFormSubmit}>Submit</button>
        </form>
        {this.props.error}
      </div>
    );
  }
}

export default DataForm;
