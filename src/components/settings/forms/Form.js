import React, { Component } from 'react';
import '../../../css/Modal.css';

class Form extends Component {
  render() {
    const { submitForm, title, unique, 
            name, categoryValue, changeValue} = this.props
    return(
      <form className="modal-form" onSubmit={submitForm }> 
        <p>{title}</p>
        <input 
          className={(unique || !categoryValue) ? 'alarm' : ''}
          name={name} 
          placeholder={this.props.title} 
          value={categoryValue} 
          onChange={changeValue}
        />
        <button 
          type="submit" 
          disabled={unique || !categoryValue}
        >
        Save
        </button>
      </form>
    )
  }
}

export default Form