import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CalendarWeek from '../components/CalendarWeek';
import * as actions from '../actions/CalendarWeekAction';

function mapStateToProps(state) {
  return {
    tasks: state.tasksOnWeek,
    week: state.week
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarWeek);
