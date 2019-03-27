import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'

class Payment extends Component {
  state={
    isActive: false,
    newCategory: '',
    editCategory: '',
    editIndex: 0,
    edit: false
  }

  handeleSubmitNew = event => {
    event.preventDefault()
    const { newCategory } = this.state
    if (newCategory) 
      this.props.addPaymentCategory(newCategory) 
    this.setState({ newCategory: "" })
    this.toggleModal()
  }

  handeleSubmitEdit = event => {
    event.preventDefault()
    const { editCategory, editIndex } = this.state
    this.props.editPaymentCategory({ category: editCategory,
                                     index: editIndex })
    this.toggleModal()
  }

  handleRemove = index => {
    this.props.removePaymentCategory(this.props.paymentCategories[index])
  }

  toggleModal = () => {
    this.setState({ isActive: !this.state.isActive })
    if (this.state.edit)
      this.setState({ edit: false }) 
  }
  
  toggleModalEdit = index => {
    this.setState({ isActive: !this.state.isActive,
                    edit: !this.state.edit,
                    editCategory: this.props.paymentCategories[index],
                    editIndex: index })
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const newForm = 
      <form className="modal-form" onSubmit={this.handeleSubmitNew}>
        <p>New category</p>
        <input 
          name="newCategory" 
          placeholder="Add new category" 
          value={this.state.newCategory} 
          onChange={this.handleChange}
        />
        <button type="submit">Save</button>
      </form>

    const editForm = 
      <form className="modal-form" onSubmit={this.handeleSubmitEdit}>
        <p>Edit category</p>
        <input 
          name="editCategory" 
          placeholder="Edit category" 
          value={this.state.editCategory} 
          onChange={this.handleChange}
        />
        <button type="submit">Save</button>
      </form>

    return(
      <div className="settings">
        <h2> Payments settings</h2>
        <button onClick={this.toggleModal}>New payment category</button>
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
          {this.state.edit ? editForm : newForm}
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
      },
      editPaymentCategory:(category) => {
        dispatch(
          {
            type: "EDIT_CATEGORY",
            payload: category
          }
        )
      }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Payment);
