import {deleteTask, getAllTasks, postTask, putTask} from "../apiService";
import moment from 'moment';
import {CLEAN_FORM, EDIT_TASK, IS_OPEN_FORM} from "./listTasksAction";

export const TASKS = "GET_TASKS";
export const DUMP = "DUMP_WEEK";
export const SWITCH = "SWITCH_WEEK";

export const cleanForm = () => dispatch => {
	dispatch({ type: CLEAN_FORM });
	dispatch({ type: IS_OPEN_FORM, payload: true });
};

export const addTask = (body, type) => dispatch => {
	const cleanBody = {...body};
	delete cleanBody.typeForm;
	postTask(cleanBody);
	const items = getAllTasks(type);
	dispatch({ type: TASKS, payload: items });
	dispatch({ type: CLEAN_FORM });
	dispatch({ type: IS_OPEN_FORM, payload: false});
};

export const delTask = (id, type) => dispatch => {
	deleteTask(id);
	const tasks = getAllTasks(type);
	dispatch({ type: TASKS, payload: tasks })
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
	const tasks = getAllTasks(type);
	dispatch({ type: TASKS, payload: tasks });
	dispatch({ type: IS_OPEN_FORM, payload: true });
};

export const dumpWeek = () => dispatch => {
	const firstWeekDate = moment().isoWeekday(1).format("DD-MM-YYYY");
	const lastWeekDate =  moment().isoWeekday(7).format("DD-MM-YYYY");
	dispatch({
		type: TASKS,
		payload: getAllTasks({filterType: 'weekGroup', filterProps: firstWeekDate})
	});
	dispatch({
		type: DUMP,
		payload: { firstWeekDate, lastWeekDate }
	})
};

export const changeWeek = (weekDays) => dispatch => {
	const {selectFirst, selectLast, side} = weekDays;
	let firstWeekDate;
	let lastWeekDate;
	switch (side) {
		case 'next': {
			firstWeekDate = moment(selectFirst, "DD-MM-YYYY").add(1, 'week').format("DD-MM-YYYY");
			lastWeekDate = moment(selectLast, "DD-MM-YYYY").add(1, 'week').format("DD-MM-YYYY");
			break;
		}
		case 'prev': {
			firstWeekDate = moment(selectFirst, "DD-MM-YYYY").subtract(1, 'week').format("DD-MM-YYYY");
			lastWeekDate = moment(selectLast, "DD-MM-YYYY").subtract(1, 'week').format("DD-MM-YYYY");
			break;
		}
	}
	dispatch({
		type: TASKS,
		payload: getAllTasks({filterType: 'weekGroup', filterProps: firstWeekDate})
	});
	dispatch({
		type: SWITCH,
		payload: { firstWeekDate, lastWeekDate }
	})
};
