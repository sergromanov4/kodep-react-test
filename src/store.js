import { createStore } from 'redux';
import combineReducers from './reducers/mainReducer';

const store = createStore(combineReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store