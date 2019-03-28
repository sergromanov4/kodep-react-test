const initialState = localStorage['redux-store'] ? 
    JSON.parse(localStorage['redux-store']).paymentReducer 
  :
    {
      paymentCategories: ["Food", "Clothes", "Car", "Study"],
      payments : []
    }

function paymentReducer(state=initialState,action){
  switch(action.type){
    case "ADD_PAYMENT":
      return {...state, payments:[...state.payments, action.payload]}
    case "ADD_NEW_PAYMENT_CATEGORY":
      return {...state, paymentCategories: [...state.paymentCategories, action.payload]}
    case "EDIT_PAYMENT_CATEGORY":
      return {...state, 
               paymentCategories: state.paymentCategories.map(
                 (item,index) => index === action.payload.index ? 
                   item = action.payload.category : item
               )
             }
    case "REMOVE_PAYMENT_CATEGORY":
      return {...state, paymentCategories: state.paymentCategories.filter( item => item !== action.payload )}
    default:
      return state
  }
}

export default paymentReducer