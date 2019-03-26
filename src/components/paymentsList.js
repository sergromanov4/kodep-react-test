import React, { Component } from 'react';
import { connect } from 'react-redux'

class List extends Component {

  render(){
   const { payments } = this.props

    return(
      <div className="list">
        {payments.map((item, index)=>
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
