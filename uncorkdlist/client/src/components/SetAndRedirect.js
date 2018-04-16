import React from 'react';
import { Redirect } from 'react-router'

class Contacts extends React.Component {

  componentDidMount(){
    //retrieves the parameter value and sets it to local storage
    sessionStorage.setItem('userCode',this.props.match.params.userCode)  
    //syncing up the userCode state with the parameter value -- Consider if this is the cleanest way????  
    this.props.setUserCode(this.props.match.params.userCode)
  }

  render() {

    return (
      //removal of parameter URL via redirection
      <Redirect to="/"/>
    );
  }
}

export default Contacts;