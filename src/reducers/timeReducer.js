const initialState = localStorage['redux-store'] ? 
    JSON.parse(localStorage['redux-store']).timeReducer 
  :
    {
      currentDate: '',
    }

function timeReducer(state=initialState,action){
  switch(action.type){
    case "CHANGE_DATA":
      return {...state, currentDate: action.payload}
    default:
      return state
  }
}

export default timeReducer