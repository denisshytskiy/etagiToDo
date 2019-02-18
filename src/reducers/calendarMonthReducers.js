import moment from "moment";

import {TASKS, DUMP, SWITCH} from '../actions/CalendarMonthAction';

const initialState = {
	daysInMonth : moment().daysInMonth(),
	firstMonthDate: moment().date(1).format("DD-MM-YYYY"),
	lastMonthDate: moment().date(moment().daysInMonth()).format("DD-MM-YYYY"),
};

export function month(state = initialState, action) {
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

export function monthTasksOnDay(state = [], action) {
	switch (action.type) {
		case TASKS:
			return action.payload;
		default:
			return state
	}
}
