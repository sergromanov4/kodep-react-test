import { createStore } from 'redux';
import combineReducers from './reducers/mainReducer';

const store = createStore(combineReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => {
  localStorage['redux-store']=JSON.stringify(store.getState())
})

export default store