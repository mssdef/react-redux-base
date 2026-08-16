import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MiniPlayer from '../MiniPlayer';

const mockStore = configureStore([]);

describe('MiniPlayer', () => {
  const twoSongs = [
    { id: 'song-1', title: 'All Star', duration: '3:15' },
    { id: 'song-2', title: 'No Scrubs', duration: '4:05' },
  ];

  it('shows "No song selected" when no song is selected', () => {
    const store = mockStore({ selectedSong: null, shuffle: false, repeatMode: 'none', songs: twoSongs });
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
      repeatMode: 'none',
      songs: twoSongs,
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
      repeatMode: 'none',
      songs: twoSongs,
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
      repeatMode: 'none',
      songs: twoSongs,
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
      repeatMode: 'none',
      songs: twoSongs,
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
    const store = mockStore({ selectedSong: null, shuffle: false, repeatMode: 'none', songs: twoSongs });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    expect(screen.getByRole('region', { name: 'Mini player' })).toBeInTheDocument();
  });

  it('disables Previous and Next when the catalog has fewer than 2 songs', () => {
    const store = mockStore({
      selectedSong: { title: 'All Star', duration: '3:15' },
      shuffle: false,
      repeatMode: 'none',
      songs: [{ id: 'song-1', title: 'All Star', duration: '3:15' }],
    });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('enables Previous and Next when the catalog has 2 or more songs', () => {
    const store = mockStore({
      selectedSong: { title: 'All Star', duration: '3:15' },
      shuffle: false,
      repeatMode: 'none',
      songs: twoSongs,
    });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  it('shows the current repeat mode and dispatches REPEAT_MODE_CHANGED when clicked', () => {
    const store = mockStore({
      selectedSong: { title: 'All Star', duration: '3:15' },
      shuffle: false,
      repeatMode: 'one',
      songs: twoSongs,
    });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    const repeatButton = screen.getByRole('button', { name: 'Repeat: one' });
    expect(repeatButton).toBeInTheDocument();
    fireEvent.click(repeatButton);
    expect(store.getActions()).toContainEqual({ type: 'REPEAT_MODE_CHANGED' });
  });

  it('shows the current shuffle state and dispatches SHUFFLE_TOGGLED when clicked', () => {
    const store = mockStore({
      selectedSong: { title: 'All Star', duration: '3:15' },
      shuffle: false,
      repeatMode: 'none',
      songs: twoSongs,
    });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    const shuffleButton = screen.getByRole('button', { name: 'Shuffle: off' });
    expect(shuffleButton).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(shuffleButton);
    expect(store.getActions()).toContainEqual({ type: 'SHUFFLE_TOGGLED' });
  });

  it('shows a Play button and dispatches PLAYING_STATE_CHANGED with true when clicked', () => {
    const store = mockStore({
      selectedSong: { title: 'All Star', duration: '3:15' },
      shuffle: false,
      repeatMode: 'none',
      songs: twoSongs,
      isPlaying: false,
    });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    const playButton = screen.getByRole('button', { name: 'Play' });
    fireEvent.click(playButton);
    expect(store.getActions()).toContainEqual({ type: 'PLAYING_STATE_CHANGED', payload: true });
  });

  it('shows a Pause button and dispatches PLAYING_STATE_CHANGED with false when clicked while playing', () => {
    const store = mockStore({
      selectedSong: { title: 'All Star', duration: '3:15' },
      shuffle: false,
      repeatMode: 'none',
      songs: twoSongs,
      isPlaying: true,
    });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    const pauseButton = screen.getByRole('button', { name: 'Pause' });
    fireEvent.click(pauseButton);
    expect(store.getActions()).toContainEqual({ type: 'PLAYING_STATE_CHANGED', payload: false });
  });

  it('disables the play/pause button when no song is selected', () => {
    const store = mockStore({ selectedSong: null, shuffle: false, repeatMode: 'none', songs: twoSongs, isPlaying: false });
    render(
      <Provider store={store}>
        <MiniPlayer />
      </Provider>
    );
    expect(screen.getByRole('button', { name: 'Play' })).toBeDisabled();
  });
});
