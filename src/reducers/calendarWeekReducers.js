import moment from "moment";

import { TASKS, DUMP, SWITCH } from '../actions/CalendarWeekAction';

const initialState = {
	firstWeekDate: moment().isoWeekday(1).format("DD-MM-YYYY"),
	lastWeekDate: moment().isoWeekday(7).format("DD-MM-YYYY")
};

export function week(state = initialState, action) {
	switch (action.type) {
		case SWITCH:
			return{
				...state,
				...action.payload
			};
		case DUMP:
			return action.payload;
		default:
			return state
	}
}

export function tasksOnWeek(state = [], action) {
	switch (action.type) {
		case TASKS:
			return action.payload;
		default:
			return state
	}
}
