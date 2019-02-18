import moment from 'moment';

export const CLEAN_FORM = "CLEAN_FORM";
export const EDIT_TASK = "EDIT_TASK";
export const CHANGE_FIELD = "CHANGE_FIELD";
export const IS_OPEN_FORM = "IS_OPEN_FORM";

const initialStateForm = {
	name: '',
	description: '',
	dateStart: moment().format('YYYY-MM-DDTHH:mm'),
	dateEnd: moment().format('YYYY-MM-DDTHH:mm'),
	important: '',
	members: [],
	typeForm: 'create'
};

export function formReducers(state = initialStateForm, action) {
	switch (action.type) {
		case CLEAN_FORM:
			return initialStateForm;
		case EDIT_TASK:
			return {
				typeForm: 'edit',
				...action.payload
			};
		case CHANGE_FIELD:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
}

export function isOpenForm(state = false, action) {
	switch (action.type) {
		case IS_OPEN_FORM:
			return action.payload;
		default:
			return state;
	}
}
