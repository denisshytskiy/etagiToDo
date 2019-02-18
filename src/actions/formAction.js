import {IS_OPEN_FORM} from "../reducers/formReducers";

export const CHANGE_FIELD = "CHANGE_FIELD";
export const TASKS = "GET_TASKS";
export const CLEAN_FORM = "CLEAN_FORM";

export const changeField = (field) => dispatch => {
	dispatch({ type: CHANGE_FIELD, payload: field})
};

export const closeForm = () => dispatch => {
	dispatch({ type: IS_OPEN_FORM, payload: false})
};
