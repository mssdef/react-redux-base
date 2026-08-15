import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';

const mockStore = configureStore([]);

const baseState = {
  selectedSong: null,
  currentSongIndex: 0,
  repeatMode: 'none',
  shuffle: false,
  playbackSpeed: 1,
  volume: 1
};

describe('App', () => {
  it('shows the loading spinner while the catalog has not loaded', () => {
    const store = mockStore({ ...baseState, songs: undefined });
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText('Loading catalog...')).toBeInTheDocument();
  });

  it('renders the catalog UI once songs are loaded', () => {
    const store = mockStore({ ...baseState, songs: [{ title: 'All Star', artist: 'Smash Mouth', duration: '3:15' }] });
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.queryByText('Loading catalog...')).not.toBeInTheDocument();
    expect(screen.getByText('All Star')).toBeInTheDocument();
  });
});
