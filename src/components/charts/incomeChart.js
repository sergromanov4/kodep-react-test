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
    this.props.income.forEach( item => {
      total[item.category] ?
      total[item.category] += +item.money
      :
      total[item.category] = +item.money
    })
    for (let key in total) {
      labels.push(key)
      datasets[0].data.push(total[key])
    }
  }

  render() {
    return(
      <div className="charts">
        <p>Income Charts</p>
        {this.props.income[0]? 
          <div>
            <Pie 
              data={this.state.data}
              width={400}
              height={400} 
            />
            <p> Total income:  
              {this.state.data.datasets[0].data.reduce((sum, current) => sum + current)}
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
  return state.incomeReducer
}

export default connect(mapStateToProps)(incomeChart);
