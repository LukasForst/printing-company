import React from 'react';

import routes from './data/routes';

import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import SavePage from './containers/SavePage';
import WorkTypeListPage from './containers/WorkTypeListPage';
import EmployeeListPage from './containers/EmployeeListPage';
import OrderDetailPage from './containers/OrderPage';
import OrdersListPage from './containers/OrdersListPage';
import ClientsReportsListPage from './containers/reports/ClientsReportsListPage';
import ClientReportSelectionPage from './containers/reports/ClientReportSelectionPage';
import EmployeesReportSelectionPage from './containers/reports/EmployeesReportSelectionPage';
import EmployeesReportListPage from './containers/reports/EmployeesReportListPage';
import EmployeesYearReportListPage from './containers/reports/EmployeesYearReportListPage';
import ClientsListPage from './containers/ClientsListPage';
import EmployeeTaxCardPage from './containers/reports/EmployeeTaxCardPage';

export default (
  <Switch>
    <Route path={routes.EMPLOYEES_REPORTS} component={EmployeesReportSelectionPage}/>
    <Route
      path={`${routes.SPECIFIC_EMPLOYEES_REPORTS}:filter?`}
      component={EmployeesReportListPage}
    />

    <Route
      path={`${routes.SPECIFIC_EMPLOYEES_YEARLY_REPORTS}:filter?`}
      component={EmployeesYearReportListPage}
    />

    <Route
      path={`${routes.SPECIFIC_EMPLOYEES_TAX_CARD}:filter?`}
      component={EmployeeTaxCardPage}
    />

    <Route path={routes.ORDER_REPORTS} component={ClientReportSelectionPage}/>
    <Route path={`${routes.SPECIFIC_ORDER_REPORTS}:filter?`} component={ClientsReportsListPage}/>

    <Route path={`${routes.ORDER_DETAIL}:id?`} component={OrderDetailPage}/>
    <Route path={routes.ORDERS} component={OrdersListPage}/>

    <Route path={routes.SAVE_STATE} component={SavePage}/>

    <Route path={routes.CLIENTS} component={ClientsListPage}/>
    <Route path={routes.WORK_TYPES} component={WorkTypeListPage}/>
    <Route path={routes.EMPLOYEES} component={EmployeeListPage}/>
    <Route path={routes.HOME} component={HomePage}/>
  </Switch>
);
