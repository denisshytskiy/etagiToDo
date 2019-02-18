import {deleteTask, getAllTasks, postTask, putTask} from "../apiService";
import moment from 'moment';
import {CLEAN_FORM, EDIT_TASK, IS_OPEN_FORM} from "./listTasksAction";

export const TASKS = "GET_TASKS";
export const DUMP = "DUMP_MONTH";
export const SWITCH = "SWITCH_MONTH";

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

export const dumpMonth = () => dispatch => {
	const daysInMonth = moment().daysInMonth();
	const firstMonthDate = moment().date(1).format("DD-MM-YYYY");
	const lastMonthDate = moment().date(daysInMonth).format("DD-MM-YYYY");
	dispatch({
		type: TASKS,
		payload: getAllTasks({filterType: 'monthGroup', filterProps: firstMonthDate})
	});
	dispatch({
		type: DUMP,
		payload: { firstMonthDate, lastMonthDate }
	})
};

export const changeMonth = (monthDays) => dispatch => {
	const {selectFirst, selectLast, side} = monthDays;
	let firstMonthDate;
	let lastMonthDate;
	switch (side) {
		case 'next': {
			const daysInMonth = moment(selectFirst, "DD-MM-YYYY").add(1, "month").daysInMonth();
			firstMonthDate = moment(selectFirst, "DD-MM-YYYY").add(1, 'month').format("DD-MM-YYYY");
			lastMonthDate = moment(selectFirst, "DD-MM-YYYY").add(1, "month").date(daysInMonth).format("DD-MM-YYYY");			break;
		}
		case 'prev': {
			const daysInMonth = moment(selectFirst, "DD-MM-YYYY").subtract(1, "month").daysInMonth();
			firstMonthDate = moment(selectFirst, "DD-MM-YYYY").subtract(1, 'month').format("DD-MM-YYYY");
			lastMonthDate = moment(selectLast, "DD-MM-YYYY").subtract(1, 'month').date(daysInMonth).format("DD-MM-YYYY");
			break;
		}
	}
	dispatch({
		type: TASKS,
		payload: getAllTasks({filterType: 'monthGroup', filterProps: firstMonthDate})
	});
	dispatch({
		type: SWITCH,
		payload: { firstMonthDate, lastMonthDate }
	})
};
