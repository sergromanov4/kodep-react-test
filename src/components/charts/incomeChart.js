import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { colors } from './colors.js'
import '../../css/Charts.css'

class incomeChart extends Component {
  state={
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: colors
      }]
   }
  }

  componentWillMount() {
    let total = {}
    const { labels, datasets } =  this.state.data
    const { incomeReducer, timeReducer } = this.props
    incomeReducer.income.forEach(item => {
      console.log()
    if (new Date(item.date).getMonth() === timeReducer.currentDate) {
      total[item.category] ?
      total[item.category] += +item.money
      :
      total[item.category] = +item.money}
    })
    for (let key in total) {
      labels.push(key)
      datasets[0].data.push(total[key])
    }
    this.difference()
  }

  difference() {
    if (this.state.data.labels[0])
    return this.props.count(this.state.data.datasets[0].data.reduce((sum, current) => sum + current))
  }

  render() {
    return(
      <div className="charts">
        <p>Income Charts</p>
        {this.state.data.labels[0]? 
          <div> 
            <Pie 
             data={this.state.data}
             width={400}
             height={400} 
            />
            <p> Total income:  
              {this.state.data.datasets[0].data.reduce((sum, current) => sum + current)}, $
            </p>
          </div>
          :
          <p>Income list is empty</p>
        }
      </div>
     )
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(incomeChart);
