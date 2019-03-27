import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'

class Payment extends Component {
  state={
    isActive: false,
    newCategory: ''
  }

  handleRemove = index => {
    this.props.removePaymentCategory(this.props.paymentCategories[index])
  }

  handeleSubmit = event => {
    event.preventDefault()
    this.props.addPaymentCategory(this.state.newCategory)
    this.setState({newCategory: ""})
    this.toggleModal()
  }

  toggleModal = () => {
    this.setState({isActive: !this.state.isActive})
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {
    return(
      <div className="settings">
        <h2> Payments settings</h2>
        <button onClick={this.toggleModal}>New payment category</button>
        {this.props.paymentCategories.map((item, index)=>
          <div className="setting-list" key={index}>
            <p>{item}</p>
            <div className='btn-box'>
               <button>Edit</button>
               <button onClick={this.handleRemove.bind(this,index)}>Delete</button>
            </div>
          </div>
        )}

        <Modal 
          isOpen={this.state.isActive} 
          onRequestClose={this.toggleModal} 
          className="modal" 
          overlayClassName="modal-overlay"
        >
        <form className="modal-form" onSubmit={this.handeleSubmit}>
          <p>New category</p>
          <input 
            name="newCategory" 
            placeholder="Add new category" 
            value={this.state.newCategory} 
            onChange={this.handleChange}
          />
          <button type="submit">Save</button>
        </form>
        </Modal>
      </div> 
    )
  } 
}

function mapStateToProps(state){
  return state.paymentReducer
}

function mapDispatchToProps(dispatch){
  return{
     removePaymentCategory:(category) => {
        dispatch(
          {
            type: "REMOVE_PAYMENT_CATEGORY",
            payload: category
          }
        )
      },
      addPaymentCategory:(payment) => {
        dispatch(
          {
            type: "ADD_NEW_CATEGORY",
            payload: payment
          }
        )
      }

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Payment);
