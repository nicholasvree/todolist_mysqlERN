import React, { Component } from "react";

import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Button } from 'semantic-ui-react'
import DataForm from './DataForm.js'
import Chart from './Chart'


class HomeLayout extends Component {

  render() {
    return(
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image
            size='small'
            src='/logo.png'
            style={{ marginRight: '1.5em' }}
          />
          ToDo List App
        </Menu.Item>
        <Menu.Item onClick={this.props.seeList}>List</Menu.Item>
        <Menu.Item onClick={this.props.seeAnalytics}>Analytics</Menu.Item>
      </Container>
    </Menu>

    <Container text style={{ marginTop: '7em' }}>

    <h1>Your Code: {this.props.userCode}</h1>


    {this.props.formOrAnalytics === "form" ? <DataForm userCode={this.props.userCode } 
                                                      setUserCode={this.props.setUserCode}  
                                                      setDataStrings = {this.props.setDataStrings}  
                                                      dataStringArray={this.props.dataStringArray} 
                                                      handleFormSubmit={this.props.handleFormSubmit} 
                                                      handleInputChange={this.props.handleInputChange} 
                                                      dataString={this.props.dataString} 
                                                      error={this.props.error} 
                                                      sortDataStringArray={this.props.sortDataStringArray} 
                                                      onInputWidgetMenuChange={this.props.onInputWidgetMenuChange} 
                                                      handleSort={this.props.handleSort} 
                                                      onStatusClick={this.props.onStatusClick} />
                                            : <Chart userCode={this.props.userCode} 
                                                    setAnalytics={this.props.setAnalytics} 
                                                    analyticCategories={this.props.analyticCategories}  
                                                    analyticCounts={this.props.analyticCounts}/> 
      }
    </Container>
    <Segment
      inverted
      vertical
      style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
    >
      <Container textAlign='center'>
        App By Nick Vree
      </Container>
    </Segment>
  </div>
    );
  }
}

export default HomeLayout
