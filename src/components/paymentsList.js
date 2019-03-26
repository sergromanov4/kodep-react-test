import React, { Component } from 'react';
import {connect} from 'react-redux'

class List extends Component {

  render(){
   const list = this.props.payments

    return(
      <div className="list">
        {list.map((item, index)=>
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
