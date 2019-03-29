import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Form from './forms/Form.js'
import '../../css/Settings.css'

class Income extends Component {
  state = {
    isActive: false,
    newCategory: '',
    editCategory: '',
    editIndex: 0,
    edit: false,
    unique:false
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  handeleSubmitNew = event => {
    event.preventDefault()
    const { newCategory } = this.state
    const { addIncomeCategory } = this.props
    addIncomeCategory(newCategory) 
    this.setState({ newCategory: "" })
    this.toggleModal()
  }

  handeleSubmitEdit = event => {
    event.preventDefault()
    const { editCategory, editIndex } = this.state
    const { editIncomeCategory } =this.props
    editIncomeCategory({ 
      category: editCategory,
      index: editIndex 
    })
    this.toggleModal()
  }

  handleRemove = index => {
    const { removeIncomeCategory, incomeCategories, editRemoveIncomeCategory } = this.props
    if (window.confirm("Are you sure?")) {
      removeIncomeCategory(incomeCategories[index])
      editRemoveIncomeCategory(incomeCategories[index])
    }
  }

  toggleModal = () => {
    const { edit, isActive } = this.state
    this.setState({ isActive: !isActive,
                    newCategory: '',
                    unique: false })
    if (edit) this.setState({ edit: false, }) 
  }
  
  toggleModalEdit = index => {
    const { edit, isActive } = this.state
    const { incomeCategories } = this.props
    this.setState({ isActive: !isActive,
                    edit: !edit,
                    editCategory: incomeCategories[index],
                    editIndex: index,
                    unique:true })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.props.incomeCategories.indexOf(value)<0 ? 
      this.setState({ unique: false })
      :
      this.setState({ unique: true })
    this.setState({ [name]: value })
  }

  render() {
    return(
      <div className="settings">
        <h2> Income settings</h2>
        <button onClick={this.toggleModal} className="new-btn">New income category</button>
        {this.props.incomeCategories.map((item, index)=>
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
              unique={this.state.unique}
            />
          :
            <Form 
              title="New category"
              submitForm={this.handeleSubmitNew} 
              categoryValue={this.state.newCategory}
              changeValue={this.handleChange}
              name="newCategory"
              unique={this.state.unique}
            />
          }
        </Modal>
      </div> 
    )
  } 
}

function mapStateToProps(state){
  return state.incomeReducer
}

function mapDispatchToProps(dispatch){
  return{
    removeIncomeCategory:(category) => {
      dispatch({
        type: "REMOVE_INCOME_CATEGORY",
        payload: category
      })
    },
    editRemoveIncomeCategory:(category) => {
      dispatch({
        type: "EDIT_REMOVE_INCOME_CATEGORY",
        payload: category
      })
    },
    addIncomeCategory:(income) => {
      dispatch({
        type: "ADD_NEW_INCOME_CATEGORY",
        payload: income
      })
    },
    editIncomeCategory:(category) => {
      dispatch({
        type: "EDIT_INCOME_CATEGORY",
        payload: category
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Income);
