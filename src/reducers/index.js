import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form'
import testReducers from "./testReducers"

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    testReducers,
    form: formReducer
  })
}
