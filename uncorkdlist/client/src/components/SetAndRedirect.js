import React from 'react';
import { Redirect } from 'react-router'

class Contacts extends React.Component {

  componentDidMount(){
    console.log("COMPONENT MOUNTED")
    sessionStorage.setItem('userCode',this.props.match.params.userCode)    
    this.props.setUserCode(this.props.match.params.userCode)
  }

  render() {
    console.log("USEr CODE", this.props.userCode)
    
    

    return (
      <Redirect to="/"/>
    );
  }
}

export default Contacts;