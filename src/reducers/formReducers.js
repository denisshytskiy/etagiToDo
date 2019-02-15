import moment from 'moment';

export const CLEAN_FORM = "CLEAN_FORM";
export const EDIT_TASK = "EDIT_TASK";
export const CHANGE_FIELD = "CHANGE_FIELD";

const initialStateForm = {
	name: '',
	description: '',
	dateStart: moment().format('YYYY-MM-DDTHH:mm'),
	dateEnd: moment().format('YYYY-MM-DDTHH:mm'),
	type: 'create'
};

export default function formReducers(state = initialStateForm, action) {
	switch (action.type) {
		case CLEAN_FORM:
			return initialStateForm;
		case EDIT_TASK:
			return {
				type: 'edit',
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
