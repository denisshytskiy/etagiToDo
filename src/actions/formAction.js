import {getAllTasks, postTask, putTask} from "../apiService";

export const changeField = (field) => dispatch => {
	dispatch({ type: "CHANGE_FIELD", payload: field})
};

export const editTaskFromForm = (body) => dispatch => {
	const cleanBody = {...body};
	delete cleanBody.type;
	putTask(cleanBody);
	const items = getAllTasks();
	dispatch({ type: "TASK_FROM_DAY", payload: items });
};

export const addTask = (body) => dispatch => {
	const cleanBody = {...body};
	delete cleanBody.type;
	postTask(cleanBody);
	const items = getAllTasks();
	dispatch({ type: "TASK_FROM_DAY", payload: items });
	dispatch({ type: "CLEAN_FORM" })
};
