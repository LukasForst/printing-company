import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import configureStore from './store';
import { loadClients, loadEmployeeMap, loadOrders, loadWorkTypes } from './utils/dataLoading';
import routes from './routes';

const syncHistoryWithStore = (store, history) => {
  const { router } = store.getState();
  if (router && router.location) {
    history.replace(router.location);
  }
};

const initialState = {
  employees: loadEmployeeMap(),
  workTypes: loadWorkTypes(),
  clients: loadClients(),
  orders: loadOrders(),
};

const routerHistory = createMemoryHistory();

const store = configureStore(initialState, routerHistory);

syncHistoryWithStore(store, routerHistory);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>
      {routes}
    </ConnectedRouter>
  </Provider>,
  rootElement,
);