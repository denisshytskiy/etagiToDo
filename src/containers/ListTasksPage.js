import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ListTasks from '../components/ListTasks';
import * as actions from '../actions/listTasksAction';

function mapStateToProps(state) {
  return {
    tasks: state.listTaskReducers,
    formTask: state.formReducers,
    selectedButton: state.selectedButton
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTasks);
