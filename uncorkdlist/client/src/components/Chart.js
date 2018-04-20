import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import Helpers from "../utils/helpers.js";


class Chart extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       chartData:props.chartData
//     }
//   }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

componentDidMount() {
    //if session storage not set, create a random session variable (SetAndDirect Component would have handled and set session variable if a parameter was given)
    if(sessionStorage.getItem('userCode') == null)
      {
        let unID = Helpers.generateUnid()
        sessionStorage.setItem('userCode', unID);
        this.props.setUserCode(unID)
        this.props.setAnalytics(sessionStorage.getItem(unID))
    }
    //If not null, sync up state with session userCode and deliver pre-existing records
    else{
      this.props.setAnalytics(sessionStorage.getItem('userCode'))
    }

    console.log(this.props.analyticCategories)
  };


  render(){
    return (

        <div className="chart">
        <Bar
          data={{
            labels: this.props.analyticCategories,
            datasets:[
              {
                label:'Population',
                data:this.props.analyticCounts,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ]
              }
            ]
            }
          }
          options={{
            title:{
              display:this.props.displayTitle,
              text: "To Do List Items by Category",
              fontSize:25
            },
            legend:{
              display:false,
              position:this.props.legendPosition
            }
          }}
        />
        </div>
      
    )
  }
}

export default Chart;