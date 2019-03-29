import React, { Component } from 'react';
import { connect } from 'react-redux'
import PaymentChart from '../components/charts/paymentChart.js'
import IncomeChart from '../components/charts/incomeChart.js'

class Charts extends Component {
  state={
    date: ['January', 'February', 'March',
            'April', 'May', 'June', 'July', 
            'August', 'September', 'October', 
            'November', 'December'],       
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    const { date, currentDate } = this.state
    this.props.changeData(date.indexOf(currentDate))
  }

  componentWillMount() {
    this.setState({ currentDate: this.state.date[this.props.currentDate] })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit} className="data-form">
          <select 
            name="currentDate"
            onChange={this.handleChange} 
            value={this.state.currentDate}
            ref="select"
          >
            {this.state.date.map((item, index) => 
              <option value={item} key={index}>
                { item }
              </option>)}
          </select>
          <button type="submit">select</button>
        </form>
        <div className="charts-box">
          <PaymentChart />
          <IncomeChart />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return state.timeReducer
}

function mapDispatchToProps(dispatch){
  return{
      changeData:(data) => {
        dispatch({
            type: "CHANGE_DATA",
            payload: data
          })
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Charts);
