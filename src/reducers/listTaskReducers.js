
import { TASKS, SWITCH } from '../actions/listTasksAction'
export const TASK_FROM_DAY = "TASK_FROM_DAY";
export const FILTER_TASKS = "FILTER_TASKS";
export const RESET_BUTTON = "RESET_BUTTON";


export function listTaskReducers(state = [], action) {
  switch (action.type) {
    case TASKS:
      return action.payload;
    default:
      return state
  }
}

const initialStateSelectedButton = "all";

export function selectedButton(state = initialStateSelectedButton, action) {
  switch (action.type) {
    case SWITCH:
      return action.payload;
    default:
      return state
  }
}
