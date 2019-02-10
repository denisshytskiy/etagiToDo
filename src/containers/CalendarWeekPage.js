import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CalendarWeek from '../components/CalendarWeek';
import * as actions from '../actions/testAction';

function mapStateToProps(state) {
  return {
    testReducers: state.testReducers,
    addTasks: state.addTasks
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarWeek);
