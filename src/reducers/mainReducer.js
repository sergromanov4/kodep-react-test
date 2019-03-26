import paymentReducer from './paymentReducer.js'
import incomeReducer from './incomeReducer.js'

import { combineReducers } from 'redux'

export default combineReducers({
  paymentReducer,
  incomeReducer
})