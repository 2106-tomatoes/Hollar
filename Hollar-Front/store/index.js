import { createStore, combineReducers } from 'redux';
import countReducer from './count';
const rootReducer = combineReducers({
  count: countReducer
});

const store = createStore(rootReducer);
export default store;
