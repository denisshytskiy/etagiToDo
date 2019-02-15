import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CalendarMonth from '../components/CalendarMonth';
import * as actions from '../actions/CalendarMonthAction';

function mapStateToProps(state) {
  return {
    tasks: state.monthTasksOnDay,
    month: state.month
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarMonth);
