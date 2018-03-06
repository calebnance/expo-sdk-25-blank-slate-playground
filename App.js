import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './App/redux/configureStore';
import App from './App/index';

const store = configureStore();

export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
