import React, { Component } from 'react';
import '../../../css/Modal.css';

class Form extends Component {
  render() {
    return(
      <form className="modal-form" onSubmit={this.props.submitForm}> 
        <p>{this.props.title}</p>
        <input 
          className={this.props.unique ? 'alarm' : ''}
          name={this.props.name} 
          placeholder={this.props.title} 
          value={this.props.categoryValue} 
          onChange={this.props.changeValue}
        />
        <button type="submit" disabled={this.props.unique}>Save</button>
      </form>
    )
  }
}

export default Form