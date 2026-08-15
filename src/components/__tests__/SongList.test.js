import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SongList from '../SongList';

const mockStore = configureStore([]);

describe('SongList', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      songs: [
        { title: 'No Scrubs', duration: '4:05' },
        { title: 'Macarena', duration: '2:30' },
        { title: 'All Star', duration: '3:15' },
        { title: 'I Want it That Way', duration: '1:45' },
      ],
      currentSongIndex: 1,
      repeatMode: 'none',
      shuffle: false,
    });
  });

  it('should render a list of songs and previous button when current song is not first', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.getByText('Macarena')).toBeTruthy();
    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.getByText('I Want it That Way')).toBeTruthy();
    expect(screen.getAllByRole('button', { name: 'Select' })).toHaveLength(4);
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
  });

  it('should dispatch PREVIOUS_SONG when Previous button is clicked', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'PREVIOUS_SONG' });
  });

  it('should show Previous button when current song is the first song (wraps around)', () => {
    const firstStore = mockStore({
      songs: [
        { title: 'No Scrubs', duration: '4:05' },
        { title: 'Macarena', duration: '2:30' },
      ],
      currentSongIndex: 0,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={firstStore}>
        <SongList />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
  });

  it('should render repeat button showing current repeat mode for current song', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Repeat: none' })).toBeInTheDocument();
  });

  it('should dispatch REPEAT_MODE_CHANGED when Repeat button is clicked', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Repeat: none' }));

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'REPEAT_MODE_CHANGED' });
  });

  it('should display updated repeat mode label when store state changes', () => {
    const oneStore = mockStore({
      songs: [
        { title: 'No Scrubs', duration: '4:05' },
        { title: 'Macarena', duration: '2:30' },
        { title: 'All Star', duration: '3:15' },
        { title: 'I Want it That Way', duration: '1:45' },
      ],
      currentSongIndex: 1,
      repeatMode: 'one',
      shuffle: false,
    });

    render(
      <Provider store={oneStore}>
        <SongList />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Repeat: one' })).toBeInTheDocument();
  });

  it('should render shuffle button showing off when shuffle is false', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Shuffle: off' })).toBeInTheDocument();
  });

  it('should render shuffle button showing on when shuffle is true', () => {
    const shuffleOnStore = mockStore({
      songs: [
        { title: 'No Scrubs', duration: '4:05' },
        { title: 'Macarena', duration: '2:30' },
        { title: 'All Star', duration: '3:15' },
        { title: 'I Want it That Way', duration: '1:45' },
      ],
      currentSongIndex: 1,
      repeatMode: 'none',
      shuffle: true,
    });

    render(
      <Provider store={shuffleOnStore}>
        <SongList />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Shuffle: on' })).toBeInTheDocument();
  });

  it('should dispatch SHUFFLE_TOGGLED when Shuffle button is clicked', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Shuffle: off' }));

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'SHUFFLE_TOGGLED' });
  });

  it('should dispatch NEXT_SONG_SHUFFLE when Next is clicked and shuffle is on', () => {
    const shuffleOnStore = mockStore({
      songs: [
        { title: 'No Scrubs', duration: '4:05' },
        { title: 'Macarena', duration: '2:30' },
        { title: 'All Star', duration: '3:15' },
        { title: 'I Want it That Way', duration: '1:45' },
      ],
      currentSongIndex: 1,
      repeatMode: 'none',
      shuffle: true,
    });

    render(
      <Provider store={shuffleOnStore}>
        <SongList />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    const actions = shuffleOnStore.getActions();
    expect(actions).toContainEqual({ type: 'NEXT_SONG_SHUFFLE' });
  });

  it('should dispatch NEXT_SONG when Next is clicked and shuffle is off', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'NEXT_SONG' });
  });

  it('should filter the song list by title as the user types', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Search songs by title'), {
      target: { value: 'star' },
    });

    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.queryByText('No Scrubs')).toBeNull();
    expect(screen.queryByText('Macarena')).toBeNull();
    expect(screen.queryByText('I Want it That Way')).toBeNull();
  });

  it('should filter case-insensitively and show all songs when search is cleared', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    const searchInput = screen.getByLabelText('Search songs by title');

    fireEvent.change(searchInput, { target: { value: 'MACARENA' } });
    expect(screen.getByText('Macarena')).toBeTruthy();
    expect(screen.queryByText('All Star')).toBeNull();

    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.getByText('Macarena')).toBeTruthy();
    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.getByText('I Want it That Way')).toBeTruthy();
  });

  it('should still show queue controls on the current song row when filtered', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Search songs by title'), {
      target: { value: 'Macarena' },
    });

    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
  });
});