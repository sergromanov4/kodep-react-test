const initialState = {
  paymentCategory:["Food", "Clothes", "Car", "Study"],
  payments :[]
}

function paymentReducer(state=initialState,action){
  switch(action.type){
    case "ADD_PAYMENT":
      return {...state, payments:[...state.payments, action.payload]}
    default:
      return state
 }
}

export default paymentReducer