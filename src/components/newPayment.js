import React, { Component } from 'react';
import { connect } from 'react-redux'


class NewPayment extends Component {
  state = { 
      category: this.props.paymentCategories[0],
      price: ''
  }
  
  handleChange = event =>{
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { price, category } = this.state
    this.props.addPayment(
      {
        price: price || 0,
        category
      }
    )
    this.setState({
      price: ''
    })
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <p>Select category and write price</p>
          <select name="category" onChange={this.handleChange} value={this.state.category}>
            { this.props.paymentCategories.map((item, index) => 
              <option value={item} key={index}>
                { item }
              </option>) }
          </select>
          <input 
            name="price" 
            type='number' 
            placeholder="Add price, $" 
            onChange={this.handleChange} 
            value={this.state.price}
          />
          <button type="submit">Save</button>
        </form>
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
