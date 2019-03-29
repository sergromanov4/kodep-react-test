import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { colors } from './colors.js'
import '../../css/Charts.css'

class paymentChart extends Component {
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
    const { paymentReducer, timeReducer } = this.props
    paymentReducer.payments.forEach(item => {
    if (new Date(item.date).getMonth() === timeReducer.currentDate) {
      total[item.category] ?
      total[item.category] += +item.price
      :
      total[item.category] = +item.price}
    })
    for (let key in total) {
      labels.push(key)
      datasets[0].data.push(total[key])
    }
    if (this.state.data.labels[0])
    this.props.count(this.state.data.datasets[0].data.reduce((sum, current) => sum + current))
  }

  difference() {
    if (this.state.data.labels[0])
    return this.props.count(this.state.data.datasets[0].data.reduce((sum, current) => sum + current))
  }

  render() {
    return(
      <div className="charts">
        <p>Payment Charts</p>
        {this.state.data.labels[0]? 
          <div> 
            <Pie 
             data={this.state.data}
             width={400}
             height={400} 
            />
            <p> Total payment:  
              {this.state.data.datasets[0].data.reduce((sum, current) => sum + current)}, $
            </p>
          </div>
          :
          <p>Payment list is empty</p>
        }
      </div>
     )
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(paymentChart);
