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
    totalPayment: 0,
    totalIncome: 0       
  }

  countPayment = value => {
   this.setState({ totalPayment: value })
  }

  countIncome = value => {
   this.setState({ totalIncome: value })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    const { date, currentDate } = this.state
    this.props.changeData(date.indexOf(currentDate))
  }

  componentWillMount() {
    const { date } = this.state
    const { currentDate } = this.props
    this.setState({ currentDate: date[currentDate] })
  }

  render(){
    const { currentDate, date, totalPayment, totalIncome } = this.state
    return(
      <div>
        <form onSubmit={this.handleSubmit} className="data-form">
          <select 
            name="currentDate"
            onChange={this.handleChange} 
            value={currentDate}
            ref="select"
          >
            {date.map((item, index) => 
              <option value={item} key={index}>
                { item }
              </option>)}
          </select>
          <button type="submit">select</button>
        </form>
        <div className="charts-box">
          <PaymentChart count={this.countPayment} />
          <IncomeChart count={this.countIncome} />
        </div>
        {totalPayment-totalIncome !== 0 ?
          totalPayment-totalIncome > 0 ? 
              <p>More payments by {Math.abs(totalPayment-totalIncome)}, $</p> 
            : 
              <p>Income more by {Math.abs(totalPayment-totalIncome)}, $</p>
          : 
          <p>Payments are equal to income</p>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.timeReducer
}

function mapDispatchToProps(dispatch) {
  return{
      changeData: data => {
        dispatch({
            type: "CHANGE_DATA",
            payload: data
          })
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Charts);
