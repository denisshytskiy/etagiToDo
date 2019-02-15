import {getAllTasks} from "../apiService";
import moment from 'moment';

export const TASKS_ON_WEEK = "TASKS_ON_WEEK";
export const DUMP_WEEK = "DUMP_WEEK";
export const SWITCH_WEEK = "SWITCH_WEEK";

const searchTasks = (dateStart) => getAllTasks().filter( task =>
	moment(task.dateStart, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY") === dateStart
).sort(function(a, b){
	return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
});

export const dumpWeek = () => dispatch => {
	const firstWeekDate = moment().isoWeekday(1).format("DD-MM-YYYY");
	const lastWeekDate =  moment().isoWeekday(7).format("DD-MM-YYYY");
	const tasksOnWeek = [];
	for (let i = 0; i < 7; i++) {
		const date = moment(firstWeekDate, "DD-MM-YYYY").add(i, 'day').format("DD-MM-YYYY");
		tasksOnWeek.push({
			date,
			tasks: searchTasks(date)})
	}
	dispatch({
		type: TASKS_ON_WEEK,
		payload: tasksOnWeek
	});
	dispatch({
		type: DUMP_WEEK,
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
	const tasksOnWeek = [];
	for (let i = 0; i < 7; i++) {
		const date = moment(firstWeekDate, "DD-MM-YYYY").add(i, 'day').format("DD-MM-YYYY");
		tasksOnWeek.push({
			date,
			tasks: searchTasks(date)})
	}
	dispatch({
		type: TASKS_ON_WEEK,
		payload: tasksOnWeek
	});
	dispatch({
		type: SWITCH_WEEK,
		payload: { firstWeekDate, lastWeekDate }
	})
};
