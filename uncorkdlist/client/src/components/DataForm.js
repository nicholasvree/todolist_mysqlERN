import React, { Component } from "react";
import Helpers from "../utils/helpers.js";

// import "./Form.css";

class DataForm extends Component {



  componentDidMount() {
    if(sessionStorage.getItem('userCode') == null)
      {
        let unID = Helpers.generateUnid()
        sessionStorage.setItem('userCode', unID);
        this.props.setUserCode(unID);
    }
    else{
      this.props.setUserCode(sessionStorage.getItem('userCode'))
    }
  };


  // Setting the component's initial state
  state = {
    dataString: "",
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
                            userCode: this.props.userCode})
    this.setState({
      dataString: "",
    });
  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (

      <div>
           <h1>{this.props.userCode}</h1>

        <form className="form">
            New:{' '}
            <input
              value={this.state.dataString}
              name="dataString"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Data"
            />
            <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default DataForm;
