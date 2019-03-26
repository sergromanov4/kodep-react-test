import React, { Component } from 'react';
import {connect} from 'react-redux'

class List extends Component {

  render(){
   let list = this.props.payments.map((item,index)=>
              <p key={index}>{`${item.price}, $`}  |  {item.category}</p>)

    return(
      <div className="list">
        {list}
      </div>
     )
  }
}

function mapStateToProps(state){
  return state.paymentReducer
}

export default connect(mapStateToProps)(List);
