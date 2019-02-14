import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import listTaskReducers from "./listTaskReducers"
import formReducers from "./formReducers"

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    listTaskReducers,
    formReducers,
  })
}
