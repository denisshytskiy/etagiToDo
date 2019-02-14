import { getAllTasks, deleteTask, putTask } from "../apiService";
import moment from 'moment';

const searchTasksForOneDay = (date) => getAllTasks().filter( task =>
  moment(task.dateStart, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY") === date
);

export const delTask = (id) => dispatch => {
  deleteTask(id);
  const items = getAllTasks();
  dispatch({ type: "TASK_FROM_DAY", payload: items })
};

export const editTask = (id) => dispatch => {
  const items = getAllTasks().filter(t => t.id === id)[0];
  dispatch({ type: "EDIT_TASK", payload: items })
};

export const editTaskFromForm = (body) => dispatch => {
  const cleanBody = {...body};
  delete cleanBody.type;
  putTask(cleanBody);
  const items = getAllTasks();
  dispatch({ type: "TASK_FROM_DAY", payload: items });
};

export const cleanForm = () => dispatch => {
  dispatch({ type: "CLEAN_FORM" })
};

export const searchAllTasks = () => dispatch => {
  const items = getAllTasks().sort(function(a, b){
    return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
  });
  dispatch({
    type: "FILTER_TASKS",
    payload: items
  });
};

export const searchTodayTasks = () => dispatch => {
  const items = searchTasksForOneDay(moment().format("DD-MM-YYYY")).sort(function(a, b){
    return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
  });
  dispatch({
    type: "FILTER_TASKS",
    payload: items
  });
};

export const searchTomorrowTasks = () => dispatch => {
  const items = searchTasksForOneDay(moment().add(1, 'day').format("DD-MM-YYYY")).sort(function(a, b){
    return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
  });
  dispatch({
    type: "FILTER_TASKS",
    payload: items
  });
};

export const searchWeekTasks = () => dispatch => {
  const week = [];
  for (var i = 1; i <= 7; i++) {
    week.push(...searchTasksForOneDay(
      moment().isoWeekday(i).format("DD-MM-YYYY")
    ))
  }
  const items = week.sort(function(a, b){
    return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
  });
  dispatch({
    type: "FILTER_TASKS",
    payload: items
  });
};

export const searchMonthTasks = () => dispatch => {
	const month = [];
	for (var i = 1; i <= moment().daysInMonth(); i++) {
		month.push(...searchTasksForOneDay(
			moment().date(i).format("DD-MM-YYYY")
		))
	}
	const items = month.sort(function(a, b){
    return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
  });
  dispatch({
    type: "FILTER_TASKS",
    payload: items
  });
};
