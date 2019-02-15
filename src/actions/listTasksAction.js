import { getAllTasks, deleteTask, putTask } from "../apiService";
import moment from 'moment';

export const TASK_FROM_DAY = "TASK_FROM_DAY";
export const FILTER_TASKS = "FILTER_TASKS";
export const EDIT_TASK = "EDIT_TASK";
export const CLEAN_FORM = "CLEAN_FORM";

const searchTasksForOneDay = (date) => getAllTasks().filter( task =>
  moment(task.dateStart, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY") === date
);

export const delTask = (id) => dispatch => {
  deleteTask(id);
  const tasks = getAllTasks();
  dispatch({ type: TASK_FROM_DAY, payload: tasks })
};

export const editTask = (id) => dispatch => {
  const tasks = getAllTasks().filter(t => t.id === id)[0];
  dispatch({ type: EDIT_TASK, payload: tasks })
};

export const editTaskFromForm = (body) => dispatch => {
  const cleanBody = {...body};
  delete cleanBody.type;
  putTask(cleanBody);
  const tasks = getAllTasks();
  dispatch({ type: TASK_FROM_DAY, payload: tasks });
};

export const cleanForm = () => dispatch => {
  dispatch({ type: CLEAN_FORM })
};

export const searchAllTasks = () => dispatch => {
  const tasks = getAllTasks().sort(function(a, b){
    return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
  });
  dispatch({
    type: FILTER_TASKS,
    payload: tasks
  });
};

export const searchTodayTasks = () => dispatch => {
  const tasks = searchTasksForOneDay(moment().format("DD-MM-YYYY")).sort(function(a, b){
    return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
  });
  dispatch({
    type: FILTER_TASKS,
    payload: tasks
  });
};

export const searchTomorrowTasks = () => dispatch => {
  const tasks = searchTasksForOneDay(moment().add(1, 'day').format("DD-MM-YYYY")).sort(function(a, b){
    return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
  });
  dispatch({
    type: FILTER_TASKS,
    payload: tasks
  });
};

export const searchWeekTasks = () => dispatch => {
  const week = [];
  for (var i = 1; i <= 7; i++) {
    week.push(...searchTasksForOneDay(
      moment().isoWeekday(i).format("DD-MM-YYYY")
    ))
  }
  const tasks = week.sort(function(a, b){
    return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
  });
  dispatch({
    type: FILTER_TASKS,
    payload: tasks
  });
};

export const searchMonthTasks = () => dispatch => {
	const month = [];
	for (var i = 1; i <= moment().daysInMonth(); i++) {
		month.push(...searchTasksForOneDay(
			moment().date(i).format("DD-MM-YYYY")
		))
	}
	const tasks = month.sort(function(a, b){
    return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
  });
  dispatch({
    type: FILTER_TASKS,
    payload: tasks
  });
};
