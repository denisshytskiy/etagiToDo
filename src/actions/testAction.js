import { getAllTasks, deleteTask, postTask, putTask } from "../apiService";

export const getSt = (body) => dispatch => {
  postTask(body);
  const items = getAllTasks();
  dispatch({ type: "FETCH_SUCCESS", payload: items })
};

export const addTask = (body) => dispatch => {
  let items = postTask(body);
  dispatch({ type: "ADD_SUCCESS", payload: items })
};
