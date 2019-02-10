export default function testReducers(state = [], action) {
  if (action.type === "FETCH_SUCCESS") {
    return action.payload;
  }
  if (action.type === "ADD_SUCCESS") {
    return action.payload;
  }
  return state;
}
