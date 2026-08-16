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
  localStorage.setItem('repeatMode', store.getState().repeatMode);
  localStorage.setItem('playbackSpeed', String(store.getState().playbackSpeed));

  const { selectedSong } = store.getState();
  localStorage.setItem('lastSelectedSongId', selectedSong ? String(selectedSong.id ?? '') : '');
  localStorage.setItem('lastSelectedSongTitle', selectedSong ? selectedSong.title : '');
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
