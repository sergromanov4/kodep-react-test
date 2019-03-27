import React, { Component } from 'react';
import '../../../Css/Modal.css';

class PaymentForm extends Component {
  render() {
    return(
      <form className="modal-form" onSubmit={this.props.submitForm}> 
        <p>{this.props.title}</p>
        <input 
          name={this.props.name} 
          placeholder={this.props.title} 
          value={this.props.categoryValue} 
          onChange={this.props.changeValue}
        />
        <button type="submit">Save</button>
      </form>
     )
  }
}

export default PaymentForm