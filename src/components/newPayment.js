import React, { Component } from 'react';
import { connect } from 'react-redux'


class NewPayment extends Component {
  constructor(props){
    super(props)
    this.state = { 
      actualSelect: this.props.paymentCategory[0],
      actualPrice: ''
    }
  }
  
  changePrice = (event) => {
    let { actualPrice } = this.state
    actualPrice = event.target.value
    this.setState({
      actualPrice: actualPrice
    })
  }

  changeSelect = (event) => {
    let { actualSelect } = this.state
    actualSelect = event.target.value
    this.setState({
      actualSelect: actualSelect
    })
  }

  addNewPayment = () => {
    const { actualPrice, actualSelect } = this.state
    const price = actualPrice ? actualPrice : 0
    this.props.addPayment(
      {
        price: price,
        category: actualSelect
      }
    )
    this.setState({
      actualPrice: ''
    })
  }

  render() {
    return (
        <div className="form">
          <p>Select category and write price</p>
          <select onChange={this.changeSelect} value={this.state.actualSelect}>
            { this.props.paymentCategory.map((item, index) => 
              <option value={item} key={index}>
                { item }
              </option>) }
          </select>
          <input type='number' placeholder="Add price, $" 
                onChange={this.changePrice} value={this.state.actualPrice}/>
          <button onClick ={this.addNewPayment}>Save</button>
        </div>
    );
  }
}
  
function mapStateToProps(state){
  return state.paymentReducer
}
function mapDispatchToProps(dispatch){
  return{
      addPayment:(payment) => {
        dispatch(
          {
            type:"ADD_PAYMENT",
            payload: payment
          }
        )
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewPayment);
