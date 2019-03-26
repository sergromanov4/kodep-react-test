import React, { Component } from 'react';
import { connect } from 'react-redux'


class NewPayment extends Component {
  
  addNewPayment = () => {
    let value = this.refs.price.value
    const price = value ? value : 0

    this.props.addPayment(
      {
        price: price,
        category: this.refs.select.value
      }
    )
    value = ""
  }

  render() {
    const { paymentCategory }= this.props

    return (
        <div className = "form">
          <p>Select category and write price</p>

          <select ref = 'select'>
            { paymentCategory.map((item, index) => 
              <option value = {item} key = {index}>
                {item}
              </option>) }
          </select>

          <input type='number' placeholder="Add price, $" ref="price"/>
          <button onClick={this.addNewPayment}>Save</button>
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
