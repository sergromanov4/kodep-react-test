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
    const { data } = this.state
    if (data.labels[0])
      return this.props.count(data.datasets[0].data.reduce(
        (sum, current) => sum + current))
  }

  render() {
    const { data } = this.state
    return(
      <div className="charts">
        <p>Income Charts</p>
        {data.labels[0]? 
          <div> 
            <Pie 
             data={data}
             width={400}
             height={400} 
            />
            <p> Total income:  
              {data.datasets[0].data.reduce(
                (sum, current) => sum + current)}, $
            </p>
          </div>
          :
          <p>Income list is empty</p>
        }
      </div>
     )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(incomeChart);
