const initialState = localStorage['redux-store'] ? 
    JSON.parse(localStorage['redux-store']).incomeReducer 
  : 
    {
      incomeCategories: ["Salary", "Donate", "Debt"],
      income :[]
    }
 
function incomeReducer(state=initialState,action){
  switch(action.type){
    case "ADD_INCOME":
      return {...state, income:[action.payload, ...state.income]}
    case "ADD_NEW_INCOME_CATEGORY":
      return {...state, incomeCategories: [...state.incomeCategories, action.payload]}
    case "EDIT_INCOME_CATEGORY":
      return {...state, 
               incomeCategories: state.incomeCategories.map(
                 (item,index) => index === action.payload.index ? 
                   item = action.payload.category : item
               )
             }
    case "EDIT_REMOVE_INCOME_CATEGORY":
      return {...state, 
               income: state.income.map(
                 item => item.category === action.payload ? 
                   {...item, category : "Other"} : item
               )
             }
    case "REMOVE_INCOME_CATEGORY":
      return {...state, incomeCategories: state.incomeCategories.filter(item => item !== action.payload)}
    default:
      return state
 }
}

export default incomeReducer