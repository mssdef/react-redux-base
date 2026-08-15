import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers);

store.subscribe(() => {
  localStorage.setItem('shuffle', String(store.getState().shuffle));
  localStorage.setItem('volume', String(store.getState().volume));
  localStorage.setItem('autoPlay', String(store.getState().autoPlay));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
