import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Form from './forms/Form.js'
import '../../css/Settings.css'

class Payment extends Component {
  state = {
    isActive: false,
    newCategory: '',
    editCategory: '',
    editIndex: 0,
    edit: false
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  uniqueFlag() {
    const { paymentCategories } = this.props;
    const { newCategory } = this.state;
    if (paymentCategories.indexOf(newCategory)>0) return true
    return false
  }

  handeleSubmitNew = event => {
    event.preventDefault()
    const { newCategory } = this.state
    const { addPaymentCategory } = this.props
    if (newCategory && !this.uniqueFlag()) addPaymentCategory(newCategory) 
    this.setState({ newCategory: "" })
    this.toggleModal()
  }

  handeleSubmitEdit = event => {
    event.preventDefault()
    const { editCategory, editIndex } = this.state
    const { editPaymentCategory } =this.props
    editPaymentCategory({ 
      category: editCategory,
      index: editIndex 
    })
    this.toggleModal()
  }

  handleRemove = index => {
    const { removePaymentCategory, paymentCategories, editRemovePaymentCategory } = this.props
    if (window.confirm("Are you sure?")){
      removePaymentCategory(paymentCategories[index])
      editRemovePaymentCategory(paymentCategories[index])
    }
  }

  toggleModal = () => {
    const { edit, isActive } = this.state
    this.setState({ isActive: !isActive })
    if (edit) this.setState({ edit: false }) 
  }
  
  toggleModalEdit = index => {
    const { edit, isActive } = this.state
    const { paymentCategories } = this.props
    this.setState({ isActive: !isActive,
                    edit: !edit,
                    editCategory: paymentCategories[index],
                    editIndex: index })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    return(
      <div className="settings">
        <h2> Payments settings</h2>
        <button onClick={this.toggleModal} className="new-btn">New payment category</button>
        {this.props.paymentCategories.map((item, index)=>
          <div className="setting-list" key={index}>
            <p>{item}</p>
            <div className='btn-box'>
               <button 
                 name="edit" 
                 onClick={this.toggleModalEdit.bind(this, index)}
              >
                Edit
              </button>
               <button onClick={this.handleRemove.bind(this, index)}>Delete</button>
            </div>
          </div>
        )}
        <Modal 
          isOpen={this.state.isActive} 
          onRequestClose={this.toggleModal} 
          className="modal" 
          overlayClassName="modal-overlay"
        >
          {this.state.edit ? 
            <Form 
              title="Edit category"
              submitForm={this.handeleSubmitEdit} 
              categoryValue={this.state.editCategory}
              changeValue={this.handleChange}
              name="editCategory"
            />
          :
            <Form 
              title="New category"
              submitForm={this.handeleSubmitNew} 
              categoryValue={this.state.newCategory}
              changeValue={this.handleChange}
              name="newCategory"
            />
          }
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
      dispatch({
        type: "REMOVE_PAYMENT_CATEGORY",
        payload: category
      })
    },
    editRemovePaymentCategory:(category) => {
      dispatch({
        type: "EDIT_REMOVE_PAYMENT_CATEGORY",
        payload: category
      })
    },
    addPaymentCategory:(payment) => {
      dispatch({
        type: "ADD_NEW_PAYMENT_CATEGORY",
        payload: payment
      })
    },
    editPaymentCategory:(category) => {
      dispatch({
        type: "EDIT_PAYMENT_CATEGORY",
        payload: category
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Payment);
