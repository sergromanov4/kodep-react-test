const initialState = {
  paymentCategories:["Food", "Clothes", "Car", "Study"],
  payments :[]
}

function paymentReducer(state=initialState,action){
  switch(action.type){
    case "ADD_PAYMENT":
      return {...state, payments:[...state.payments, action.payload]}
    case "ADD_NEW_CATEGORY":
      return {...state, paymentCategories:[...state.paymentCategories, action.payload]}
    case "REMOVE_PAYMENT_CATEGORY":
      return {...state, paymentCategories:state.paymentCategories.filter( item => item !== action.payload)}
    default:
      return state
 }
}

export default paymentReducer