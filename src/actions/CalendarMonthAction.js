import {getAllTasks} from "../apiService";
import moment from 'moment';

export const TASKS_ON_MONTH = "TASKS_ON_MONTH";
export const DUMP_MONTH = "DUMP_MONTH";
export const SWITCH_MONTH = "SWITCH_MONTH";

const searchTasks = (dateStart) => getAllTasks().filter( task =>
	moment(task.dateStart, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY") === dateStart
).sort(function(a, b){
	return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
});

export const dumpMonth = () => dispatch => {
	const daysInMonth = moment().daysInMonth();
	const firstMonthDate = moment().date(1).format("DD-MM-YYYY");
	const lastMonthDate = moment().date(daysInMonth).format("DD-MM-YYYY");
	const tasksOnMonth = [];
	for (let i = 0; i < 31; i++) {
		const date = moment(firstMonthDate, "DD-MM-YYYY").add(i, 'day').format("DD-MM-YYYY");
		tasksOnMonth.push({
			date,
			tasks: searchTasks(date)})
	}
	console.log(tasksOnMonth);
	dispatch({
		type: TASKS_ON_MONTH,
		payload: tasksOnMonth
	});
	dispatch({
		type: DUMP_MONTH,
		payload: { daysInMonth, firstMonthDate, lastMonthDate }
	})
};

export const changeMonth = (monthDays) => dispatch => {
	const {selectFirst, selectLast, side} = monthDays;
	let firstMonthDate;
	let lastMonthDate;
	switch (side) {
		case 'next': {
			firstMonthDate = moment(selectFirst, "DD-MM-YYYY").add(1, 'month').format("DD-MM-YYYY");
			lastMonthDate = moment(selectLast, "DD-MM-YYYY").add(1, 'month').format("DD-MM-YYYY");
			break;
		}
		case 'prev': {
			firstMonthDate = moment(selectFirst, "DD-MM-YYYY").subtract(1, 'month').format("DD-MM-YYYY");
			lastMonthDate = moment(selectLast, "DD-MM-YYYY").subtract(1, 'month').format("DD-MM-YYYY");
			break;
		}
	}
	const tasksOnMonth = [];
	for (let i = 0; i < 31; i++) {
		const date = moment(firstMonthDate, "DD-MM-YYYY").add(i, 'day').format("DD-MM-YYYY");
		tasksOnMonth.push({
			date,
			tasks: searchTasks(date)})
	}
	dispatch({
		type: TASKS_ON_MONTH,
		payload: tasksOnMonth
	});
	dispatch({
		type: SWITCH_MONTH,
		payload: { firstMonthDate, lastMonthDate }
	})
};
