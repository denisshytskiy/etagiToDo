import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CalendarMonth from '../components/CalendarMonth';
import * as actions from '../actions/listTasksAction';

function mapStateToProps(state) {
  return {
    testReducers: state.testReducers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarMonth);
