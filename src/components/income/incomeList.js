import React, { Component } from 'react';
import { connect } from 'react-redux'

class List extends Component {
  render() {
    return(
      <div className="list">
        {this.props.income.reverse().map((item, index)=>
          <p key={index}>
              {`${item.money}, $`}  |  {item.category}
          </p>)}
      </div>
     )
  }
}

function mapStateToProps(state){
  return state.incomeReducer
}

export default connect(mapStateToProps)(List);
