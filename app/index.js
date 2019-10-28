import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Modal from 'react-modal';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import loadEmployeeMap from './utils/DataLoader';

const store = configureStore({
  employees: loadEmployeeMap(),
  counter: 10
});

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

Modal.setAppElement(document.getElementById('root'));

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);
