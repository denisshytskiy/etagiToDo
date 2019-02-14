import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormTask from '../components/FormTask';
import * as actions from '../actions/formAction';

function mapStateToProps(state) {
	return {
		formTask: state.formReducers
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormTask);
