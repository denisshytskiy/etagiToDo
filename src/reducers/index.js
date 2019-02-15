import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import listTaskReducers from "./listTaskReducers"
import formReducers from "./formReducers"
import * as weekTasksOnDay from "./calendarWeekReducers"
import * as weekTasksOnMonth from "./calendarMonthReducers"

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    listTaskReducers,
    formReducers,
    ...weekTasksOnDay,
    ...weekTasksOnMonth
  })
}
