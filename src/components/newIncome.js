import React, { Component } from 'react';
import { connect } from 'react-redux'

class NewIncome extends Component {
  state={
    category: this.props.incomeCategories[0],
    money: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { money, category } = this.state
    this.props.addIncome({
        money: money || 0,
        category
    })
    this.setState({ money: ''})
  }

  render() {
    const { category, money } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Select income category and write price</p>
        <select 
          name="category"
          onChange={this.handleChange}
          value={category}
        >
          {this.props.incomeCategories.map((item,index) => 
            <option key={index}>
              {item}
            </option>)}
        </select>
        <input 
          type="number"
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
  
function mapStateToProps(state){
  return state.incomeReducer
}

function mapDispatchToProps(dispatch){
  return{
      addIncome:(income) => {
        dispatch(
          {
            type: "ADD_INCOME",
            payload: income
          }
        )
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewIncome);
