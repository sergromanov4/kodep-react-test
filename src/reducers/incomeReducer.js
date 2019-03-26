const initialState = {
  incomeCategories:["Salary", "Donate", "Debt"],
  income :[]
}

function incomeReducer(state=initialState,action){
  switch(action.type){
    case "ADD_INCOME":
      return {...state, income:[...state.income, action.payload]}
    default:
      return state
 }
}

export default incomeReducer