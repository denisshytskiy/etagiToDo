import moment from "moment";

export const TASKS_ON_MONTH = "TASKS_ON_MONTH";
export const DUMP_MONTH = "DUMP_MONTH";
export const SWITCH_MONTH = "SWITCH_MONTH";

const initialState = {
	daysInMonth : moment().daysInMonth(),
	firstMonthDate: moment().date(1).format("DD-MM-YYYY"),
	lastMonthDate: moment().date(moment().daysInMonth()).format("DD-MM-YYYY"),
};

export function month(state = initialState, action) {
	switch (action.type) {
		case SWITCH_MONTH:
			return{
				...state,
				...action.payload
			};
		case DUMP_MONTH:
			return action.payload;
		default:
			return state
	}
}

export function monthTasksOnDay(state = [], action) {
	switch (action.type) {
		case TASKS_ON_MONTH:
			return action.payload;
		default:
			return state
	}
}
