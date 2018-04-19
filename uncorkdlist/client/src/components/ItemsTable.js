import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Icon, Input } from 'semantic-ui-react'

const tableData = [
  { name: 'John', age: 15, gender: 'Male' },
  { name: 'Amber', age: 40, gender: 'Female' },
  { name: 'Leslie', age: 25, gender: 'Female' },
  { name: 'Ben', age: 70, gender: 'Male' },
]

export default class TableExampleSortable extends Component {
  state = {
    column: null,
    data: tableData,
    direction: null,
  }

  render() {
    const { column, data, direction } = this.state
    console.log(this.props.dataStringArray)

    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={column === 'data_string' ? direction : null} onClick={this.props.handleSort('data_string')}>
              Item
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'category' ? direction : null} onClick={this.props.handleSort('category')}>
              Category
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'created_date' ? direction : null} onClick={this.props.handleSort('created_date')}>
              Created Date
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'completed' ? direction : null} onClick={this.props.handleSort('completed')}>
              Completed?
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(this.props.dataStringArray, ({ data_string, category, created_date, completed}) => (
            <Table.Row key={data_string}>
              <Table.Cell>Data: {data_string}</Table.Cell>
              <Table.Cell>{category}</Table.Cell>
              <Table.Cell>{created_date}</Table.Cell>
              <Table.Cell>{completed === false ? "FALSE" : "TRUE"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

      </Table>


    )
  }
}