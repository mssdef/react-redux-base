import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';

jest.mock('../MiniPlayer', () => () => {
  throw new Error('MiniPlayer crashed');
});

const mockStore = configureStore([]);

const baseState = {
  selectedSong: null,
  currentSongIndex: 0,
  repeatMode: 'none',
  shuffle: false,
  playbackSpeed: 1,
  volume: 1,
  songs: [{ id: '1', title: 'All Star', artist: 'Smash Mouth', duration: '3:15' }]
};

describe('App ErrorBoundary isolation', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('contains a MiniPlayer crash without taking down SongList or SongDetail', () => {
    const store = mockStore(baseState);
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('All Star')).toBeInTheDocument();
    expect(screen.getByText('Please select a song from the list to view details.')).toBeInTheDocument();
  });
});
