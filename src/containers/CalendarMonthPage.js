import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CalendarMonth from '../components/CalendarMonth';
import { getSt } from '../actions/testAction';

function mapStateToProps(state) {
  return {
    testReducers: state.testReducers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSt }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarMonth);
