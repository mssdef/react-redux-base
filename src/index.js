import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.querySelector('#root')
);
