import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MiniPlayer from '../MiniPlayer';

const mockStore = configureStore([]);

describe('MiniPlayer', () => {
  it('shows "No song selected" when no song is selected', () => {
    const store = mockStore({ selectedSong: null, shuffle: false });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    expect(screen.getByText('No song selected')).toBeInTheDocument();
  });

  it('shows selected song title when a song is selected', () => {
    const store = mockStore({
      selectedSong: { title: 'All Star', duration: '3:15' },
      shuffle: false,
    });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    expect(screen.getByText('All Star')).toBeInTheDocument();
  });

  it('dispatches PREVIOUS_SONG when Previous button is clicked', () => {
    const store = mockStore({
      selectedSong: { title: 'All Star', duration: '3:15' },
      shuffle: false,
    });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(store.getActions()).toContainEqual({ type: 'PREVIOUS_SONG' });
  });

  it('dispatches NEXT_SONG when Next button is clicked and shuffle is off', () => {
    const store = mockStore({
      selectedSong: { title: 'All Star', duration: '3:15' },
      shuffle: false,
    });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(store.getActions()).toContainEqual({ type: 'NEXT_SONG' });
  });

  it('dispatches NEXT_SONG_SHUFFLE when Next button is clicked and shuffle is on', () => {
    const store = mockStore({
      selectedSong: { title: 'All Star', duration: '3:15' },
      shuffle: true,
    });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(store.getActions()).toContainEqual({ type: 'NEXT_SONG_SHUFFLE' });
  });

  it('renders as a fixed region with aria-label "Mini player"', () => {
    const store = mockStore({ selectedSong: null, shuffle: false });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    expect(screen.getByRole('region', { name: 'Mini player' })).toBeInTheDocument();
  });
});
