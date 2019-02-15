export const TASK_FROM_DAY = "TASK_FROM_DAY";
export const FILTER_TASKS = "FILTER_TASKS";

export default function listTaskReducers(state = [], action) {
  switch (action.type) {
    case TASK_FROM_DAY:
      return action.payload;
    case FILTER_TASKS:
      return action.payload;
    default:
      return state
  }
}
