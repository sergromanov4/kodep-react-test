import React, { Component } from 'react';
import { connect } from 'react-redux'

class List extends Component {

  render(){
    return(
      <div className="list">
        {this.props.payments.map((item, index)=>
          <p key={index}>
              {`${item.price}, $`}  |  {item.category}
          </p>)}
      </div>
     )
  }
}

function mapStateToProps(state){
  return state.paymentReducer
}

export default connect(mapStateToProps)(List);
