import {getAllTasks, deleteTask, putTask, postTask} from "../apiService";
import moment from "moment";

export const TASKS = "GET_TASKS";
export const FILTER_TASKS = "FILTER_TASKS";
export const EDIT_TASK = "EDIT_TASK";
export const CLEAN_FORM = "CLEAN_FORM";
export const IS_OPEN_FORM = "IS_OPEN_FORM";
export const SWITCH = "SWITCH_BUTTON";

const witchButton = (type) => {
  switch (type) {
    case 'all':
      return { filterType: 'all'};
    case 'today':
      return { filterType: 'day', filterProps: moment().format("DD-MM-YYYY")};
    case 'tomorrow':
      return { filterType: 'day', filterProps: moment().add(1, 'day').format("DD-MM-YYYY")};
    case 'week':
      return { filterType: 'weekList'};
    case 'month':
      return { filterType: 'monthList'};
  }
};

export const addTask = (body, type) => dispatch => {
  const cleanBody = {...body};
  delete cleanBody.typeForm;
  postTask(cleanBody);
  const items = getAllTasks(witchButton(type));
  dispatch({ type: TASKS, payload: items });
  dispatch({ type: CLEAN_FORM });
  dispatch({ type: IS_OPEN_FORM, payload: false});
};

export const delTask = (id, type) => dispatch => {
  deleteTask(id);
  const tasks = getAllTasks(witchButton(type));
  dispatch({ type: TASKS, payload: [...tasks] })
};

export const editTask = (id) => dispatch => {
  const tasks = getAllTasks().filter(t => t.id === id)[0];
  dispatch({ type: EDIT_TASK, payload: tasks });
  dispatch({ type: IS_OPEN_FORM, payload: true });
};

export const editTaskFromForm = (body, type) => dispatch => {
  const cleanBody = {...body};
  delete cleanBody.type;
  putTask(cleanBody);
  const tasks = getAllTasks(witchButton(type));
  dispatch({ type: TASKS, payload: tasks });
  dispatch({ type: IS_OPEN_FORM, payload: true });
};

export const cleanForm = () => dispatch => {
  dispatch({ type: CLEAN_FORM });
  dispatch({ type: IS_OPEN_FORM, payload: true });
};

export const searchTasks = (filter) => dispatch => {
  const { selectedButton } = filter;
  const tasks = getAllTasks(filter);
  dispatch({
    type: TASKS,
    payload: tasks
  });
  dispatch({
    type: SWITCH,
    payload: selectedButton
  });
};
