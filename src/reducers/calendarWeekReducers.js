import moment from "moment";

export const TASKS_ON_WEEK = "TASKS_ON_WEEK";
export const DUMP_WEEK = "DUMP_WEEK";
export const SWITCH_WEEK = "SWITCH_WEEK";

const initialState = {
	firstWeekDate: moment().isoWeekday(1).format("DD-MM-YYYY"),
	lastWeekDate: moment().isoWeekday(7).format("DD-MM-YYYY")
};

export function week(state = initialState, action) {
	switch (action.type) {
		case SWITCH_WEEK:
			return{
				...state,
				...action.payload
			};
		case DUMP_WEEK:
			return action.payload;
		default:
			return state
	}
}

export function tasksOnWeek(state = [], action) {
	switch (action.type) {
		case TASKS_ON_WEEK:
			return action.payload;
		default:
			return state
	}
}
