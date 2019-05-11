import React, { Component } from 'react';
import { connect } from 'react-redux'

class NewIncome extends Component {
  state = {
    category: this.props.incomeCategories[0],
    money: ''
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { money, category } = this.state
    this.props.addIncome({
        money: money || 0,
        category,
        date: new Date()
    })
    this.setState({ money: ''})
  }

  render() {
    const { category, money } = this.state
    const { incomeCategories } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Select income category and write price</p>
        <select 
          name="category"
          onChange={this.handleChange}
          value={category}
        >
          {incomeCategories.map((item,index) => 
            <option value={item} key={index}>
              {item}
            </option>)}
        </select>
        <input 
          type="number"
          min='0'
          max='999999'
          name="money"
          placeholder="Add your salary, $"
          onChange={this.handleChange}
          value={money}
        />
        <button type="submit">Save</button>
      </form>
    );
  }
}
  
function mapStateToProps(state) {
  return state.incomeReducer
}

function mapDispatchToProps(dispatch) {
  return{
      addIncome: income => {
        dispatch({
            type: "ADD_INCOME",
            payload: income
        })
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewIncome);
