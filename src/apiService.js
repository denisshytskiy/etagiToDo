import uuid from 'uuid/v4';
import moment from  'moment';

const searchTasksForOneDay = (date) => getAllTasks().filter( task =>
	moment(task.dateStart, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY") === date
);

export const getAllTasks = (filter = {filterType: 'all', filterProps: null}) => {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	const { filterType, filterProps } = filter;
	let filterTasks = [];
	switch (filterType) {
		case 'all':
			filterTasks.push(...tasks.sort(function(a, b){
				return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
			}));
			break;
		case 'day':
			filterTasks.push(...searchTasksForOneDay(filterProps).sort(function(a, b){
				return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
			}));
			break;
		case 'weekList':
		{
			const week = [];
			for (let i = 1; i <= 7; i++) {
				week.push(...searchTasksForOneDay(
					moment().isoWeekday(i).format("DD-MM-YYYY")
				))
			}
			filterTasks = week.sort(function(a, b){
				return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
			});
			break;
		}
		case 'monthList':
		{
			const month = [];
			for (var i = 1; i <= moment().daysInMonth(); i++) {
				month.push(...searchTasksForOneDay(
					moment().date(i).format("DD-MM-YYYY")
				))
			}
			filterTasks = month.sort(function(a, b){
				return moment(a.dateStart, "YYYY-MM-DDTHH:mm").format('X')-moment(b.dateStart, "YYYY-MM-DDTHH:mm").format('X')
			});
			break;
		}
		case 'weekGroup':
		{
			for (let i = 0; i < 7; i++) {
				const date = moment(filterProps, "DD-MM-YYYY").add(i, 'day').format("DD-MM-YYYY");
				filterTasks.push({
					date,
					tasks: searchTasksForOneDay(date)})
			}
			break;
		}
		case 'monthGroup':
		{
			for (let i = 0; i < moment(filterProps, "DD-MM-YYYY").daysInMonth(); i++) {
				const date = moment(filterProps, "DD-MM-YYYY").add(i, 'day').format("DD-MM-YYYY");
				filterTasks.push({
					date,
					tasks: searchTasksForOneDay(date)})
			}
			break;
		}
	}
	return filterTasks;
};

export const postTask = (body) => {
	const tasks = getAllTasks();
	const newTask = {
		id: uuid(),
		...body
	};
	tasks.push(newTask);
	const serialTasks = JSON.stringify(tasks);
	localStorage.setItem("tasks", serialTasks);
};

export const putTask = (body) => {
	const tasks = getAllTasks();
	const newTasks = tasks.map(task => (task.id === body.id) ? body : task);
	const serialTasks = JSON.stringify(newTasks);
	localStorage.setItem("tasks", serialTasks);
};

export const deleteTask = (id) => {
	const tasks = getAllTasks().filter(task => task.id !== id);
	const serialTasks = JSON.stringify(tasks);
	localStorage.setItem("tasks", serialTasks);
};
