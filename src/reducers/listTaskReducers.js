export default function listTaskReducers(state = [], action) {
  if (action.type === "TASK_FROM_DAY") {
    return action.payload;
  }
  if (action.type === "FILTER_TASKS") {
    return action.payload;
  }
  return state;
}
