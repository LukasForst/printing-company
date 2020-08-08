import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EmployeeTaxCard from '../../components/reports/employees/taxes/EmployeeTaxCard';
import { computedWageToDisplayed, computeWage } from '../../utils/wageComputation';

function mapStateToProps(state, ownProps) {
  if (!ownProps.match.params.filter) {
    console.log('Filter is not defined, this page should not be displayed!');
    return {
      startDate: undefined,
      endDate: undefined,
      employee: undefined,
      wage: -1,
    };
  }

  const { employeesIds, startDate, endDate } = JSON.parse(ownProps.match.params.filter);
  const employeeId = employeesIds[0];

  const start = new Date(startDate);
  const end = new Date(endDate);

  const computedWage = Object.values(state.orders)
    .filter((o) => {
      const date = new Date(o.date);
      return start <= date && date <= end;
    })
    .map((o) =>
      o.works
        .filter(w => w.employeeId === employeeId)
        .map(w => computeWage(w.amount, state.workTypes[w.workTypeId].employeeWage))
        .reduce((a, b) => a + b, 0),
    ).reduce((a, b) => a + b, 0);

  return {
    startDate: start,
    endDate: end,
    employee: state.employees[employeeId],
    wage: computedWageToDisplayed(computedWage),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeTaxCard);