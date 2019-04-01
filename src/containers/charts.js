import React, { Component } from 'react';
import { connect } from 'react-redux'
import PaymentChart from '../components/charts/paymentChart.js'
import IncomeChart from '../components/charts/incomeChart.js'

class Charts extends Component {
  state={
    allDate:[ ],
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
    const { currentDate } = this.state
    this.props.changeData(currentDate)
  }

  getAllDate(arr){
    let year, month
    arr.map(
      item => {
         year = new Date(item.date).getFullYear()
         month = new Date(item.date).getMonth()
         if (this.state.allDate.indexOf(`${month+1}/${year}`) < 0) 
          this.state.allDate.push(`${month+1}/${year}`)
        return this.state.allDate
      })
  }

  componentWillMount() {
    const { currentDate } = this.props.timeReducer
    const { income } = this.props.incomeReducer
    const { payments } = this.props.paymentReducer
    this.getAllDate(payments)
    this.getAllDate(income)
    this.setState({ currentDate: currentDate })
  }

  render() {
    const { currentDate, totalPayment, totalIncome, allDate} = this.state
    return(
      <div>
        <form onSubmit={this.handleSubmit} className="data-form">
          <select 
            name="currentDate"
            onChange={this.handleChange} 
            value={currentDate}
            ref="select"
          >
            {allDate.map((item, index) => 
              <option value={item} key={index}>
                { item }
              </option>)}
          </select>
          <button type="submit">select</button>
        </form>
        <div className="charts-box">
          <PaymentChart count={this.countPayment}/>
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
  return state
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
