import React, { Component } from 'react';
import { connect } from 'react-redux'

class NewPayment extends Component {
  state = { 
      category: this.props.paymentCategories[0],
      price: ''
  }
  
  handleChange = event => { 
    (event.target.name === "category" &&  this.props.lastValue[event.target.value])?
      this.setState({ price: this.props.lastValue[event.target.value] })
      :
      this.setState({ price: '' })
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { price, category } = this.state
    this.props.addPayment({
        price: price || 0,
        category,
        date: new Date()
    })
    this.props.lastPrice({
      price: price || 0,
      category
    })
    this.setState({ price: ''})
  }

  render() {
    const { price, category } = this.state
    const { paymentCategories } = this.props
    return (
        <form onSubmit={this.handleSubmit}>
          <p>Select category and write price</p>
          <select 
            name="category"
            onChange={this.handleChange} 
            value={category}
          >
            {paymentCategories.map((item, index) => 
              <option value={item} key={index}>
                { item }
              </option>)}
          </select>
          <input 
            name="price" 
            type='number'
            min='0' 
            placeholder="Add price, $" 
            onChange={this.handleChange} 
            value={price}
          />
          <button type="submit">Save</button>
        </form>
    );
  }
}
  
function mapStateToProps(state) {
  return state.paymentReducer
}

function mapDispatchToProps(dispatch) {
  return{
      addPayment: payment => {
        dispatch({
            type: "ADD_PAYMENT",
            payload: payment
        })
      },
      lastPrice: price => {
        dispatch({
            type: "ADD_LAST_PRICE",
            payload: price
        })
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewPayment);
