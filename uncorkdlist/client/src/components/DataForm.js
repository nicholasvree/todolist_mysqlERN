import React, { Component } from "react";
import Helpers from "../utils/helpers.js";

// import "./Form.css";

class DataForm extends Component {



  componentDidMount() {


    if(sessionStorage.getItem('userCode') == null)
      {
        let unID = Helpers.generateUnid()
        sessionStorage.setItem('userCode', unID);
        this.props.setDataStrings(sessionStorage.getItem(unID))
    }
    else{
      this.props.setDataStrings(sessionStorage.getItem('userCode'))
    }

    console.log(this.props.dataStringArray)
  };



  render() {

    let dataStringArray = this.props.dataStringArray

    const elements = dataStringArray.map(data => {    
      return(
         <h1>{data.data_string}</h1>
      ) 
  }) 

    console.log("DATA STRING ARRAY", dataStringArray)


    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (


      <div>
           <h1>{this.props.userCode}</h1>

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
      </div>
    );
  }
}

export default DataForm;
