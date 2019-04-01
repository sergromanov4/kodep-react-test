import paymentReducer from './paymentReducer.js'
import incomeReducer from './incomeReducer.js'
import timeReducer from './timeReducer.js'

import { combineReducers } from 'redux'

export default combineReducers({
  paymentReducer,
  incomeReducer,
  timeReducer
})