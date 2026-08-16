import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
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

  it('should show a Now Playing indicator only on the active row', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    const activeLabels = screen.getAllByText('Now Playing');
    expect(activeLabels).toHaveLength(1);

    const activeItem = activeLabels[0].closest('.item');
    expect(activeItem).toHaveClass('active');
    expect(activeItem).toHaveAttribute('aria-current', 'true');
    expect(activeItem).toHaveTextContent('Macarena');
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
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Search songs by title, artist, album, or genre'), {
      target: { value: 'star' },
    });
    act(() => jest.advanceTimersByTime(300));

    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.queryByText('No Scrubs')).toBeNull();
    expect(screen.queryByText('Macarena')).toBeNull();
    expect(screen.queryByText('I Want it That Way')).toBeNull();
    jest.useRealTimers();
  });

  it('should not filter the song list until the debounce delay elapses', () => {
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Search songs by title, artist, album, or genre'), {
      target: { value: 'star' },
    });

    act(() => jest.advanceTimersByTime(100));
    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.getByText('Macarena')).toBeTruthy();
    expect(screen.getByText('I Want it That Way')).toBeTruthy();

    act(() => jest.advanceTimersByTime(200));
    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.queryByText('No Scrubs')).toBeNull();
    jest.useRealTimers();
  });

  it('should filter case-insensitively and show all songs when search is cleared', () => {
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    const searchInput = screen.getByLabelText('Search songs by title, artist, album, or genre');

    fireEvent.change(searchInput, { target: { value: 'MACARENA' } });
    act(() => jest.advanceTimersByTime(300));
    expect(screen.getByText('Macarena')).toBeTruthy();
    expect(screen.queryByText('All Star')).toBeNull();

    fireEvent.change(searchInput, { target: { value: '' } });
    act(() => jest.advanceTimersByTime(300));
    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.getByText('Macarena')).toBeTruthy();
    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.getByText('I Want it That Way')).toBeTruthy();
    jest.useRealTimers();
  });

  it('should match songs when the combined search keyword matches artist, album, or genre instead of title', () => {
    const combinedStore = mockStore({
      songs: [
        { title: 'No Scrubs', artist: 'TLC', album: 'FanMail', genre: 'R&B' },
        { title: 'Macarena', artist: 'Los Del Rio', album: 'A mi me gusta', genre: 'Latin Pop' },
        { title: 'All Star', artist: 'Smash Mouth', album: 'Astro Lounge', genre: 'Rock' },
      ],
      currentSongIndex: 0,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={combinedStore}>
        <SongList />
      </Provider>
    );

    const searchInput = screen.getByLabelText('Search songs by title, artist, album, or genre');
    jest.useFakeTimers();

    fireEvent.change(searchInput, { target: { value: 'tlc' } });
    act(() => jest.advanceTimersByTime(300));
    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.queryByText('Macarena')).toBeNull();
    expect(screen.queryByText('All Star')).toBeNull();

    fireEvent.change(searchInput, { target: { value: 'astro' } });
    act(() => jest.advanceTimersByTime(300));
    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.queryByText('No Scrubs')).toBeNull();

    fireEvent.change(searchInput, { target: { value: 'latin' } });
    act(() => jest.advanceTimersByTime(300));
    expect(screen.getByText('Macarena')).toBeTruthy();
    expect(screen.queryByText('All Star')).toBeNull();
    jest.useRealTimers();
  });

  it('should require every space-separated keyword to match, even across different fields', () => {
    const combinedStore = mockStore({
      songs: [
        { title: 'No Scrubs', artist: 'TLC', album: 'FanMail', genre: 'R&B' },
        { title: 'No Diggity', artist: 'Blackstreet', album: 'Another Level', genre: 'R&B' },
      ],
      currentSongIndex: 0,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={combinedStore}>
        <SongList />
      </Provider>
    );

    jest.useFakeTimers();
    fireEvent.change(screen.getByLabelText('Search songs by title, artist, album, or genre'), {
      target: { value: 'no tlc' },
    });
    act(() => jest.advanceTimersByTime(300));

    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.queryByText('No Diggity')).toBeNull();
    jest.useRealTimers();
  });

  it('should still show queue controls on the current song row when filtered', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    jest.useFakeTimers();
    fireEvent.change(screen.getByLabelText('Search songs by title, artist, album, or genre'), {
      target: { value: 'Macarena' },
    });
    act(() => jest.advanceTimersByTime(300));

    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('should filter the song list by artist as the user types', () => {
    const artistStore = mockStore({
      songs: [
        { title: 'No Scrubs', artist: 'TLC', duration: '4:05' },
        { title: 'Macarena', artist: 'Los Del Rio', duration: '2:30' },
        { title: 'All Star', artist: 'Smash Mouth', duration: '3:15' },
        { title: 'I Want it That Way', artist: 'Backstreet Boys', duration: '1:45' },
      ],
      currentSongIndex: 1,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={artistStore}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Filter songs by artist'), {
      target: { value: 'smash' },
    });

    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.queryByText('No Scrubs')).toBeNull();
    expect(screen.queryByText('Macarena')).toBeNull();
    expect(screen.queryByText('I Want it That Way')).toBeNull();
  });

  it('should combine title search and artist filter', () => {
    const artistStore = mockStore({
      songs: [
        { title: 'No Scrubs', artist: 'TLC', duration: '4:05' },
        { title: 'No Diggity', artist: 'Blackstreet', duration: '4:15' },
      ],
      currentSongIndex: 0,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={artistStore}>
        <SongList />
      </Provider>
    );

    jest.useFakeTimers();
    fireEvent.change(screen.getByLabelText('Search songs by title, artist, album, or genre'), {
      target: { value: 'No' },
    });
    act(() => jest.advanceTimersByTime(300));
    fireEvent.change(screen.getByLabelText('Filter songs by artist'), {
      target: { value: 'TLC' },
    });

    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.queryByText('No Diggity')).toBeNull();
    jest.useRealTimers();
  });

  it('should not error filtering by artist when a song has no artist field', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Filter songs by artist'), {
      target: { value: 'TLC' },
    });

    expect(screen.queryByText('No Scrubs')).toBeNull();
    expect(screen.queryByText('Macarena')).toBeNull();
  });

  it('should filter the song list by album as the user types', () => {
    const albumStore = mockStore({
      songs: [
        { title: 'No Scrubs', album: 'FanMail', duration: '4:05' },
        { title: 'Macarena', album: 'A mi me gusta', duration: '2:30' },
        { title: 'All Star', album: 'Astro Lounge', duration: '3:15' },
        { title: 'I Want it That Way', album: 'Millennium', duration: '1:45' },
      ],
      currentSongIndex: 1,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={albumStore}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Filter songs by album'), {
      target: { value: 'astro' },
    });

    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.queryByText('No Scrubs')).toBeNull();
    expect(screen.queryByText('Macarena')).toBeNull();
    expect(screen.queryByText('I Want it That Way')).toBeNull();
  });

  it('should combine title search and album filter', () => {
    const albumStore = mockStore({
      songs: [
        { title: 'No Scrubs', album: 'FanMail', duration: '4:05' },
        { title: 'No Diggity', album: 'Another Level', duration: '4:15' },
      ],
      currentSongIndex: 0,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={albumStore}>
        <SongList />
      </Provider>
    );

    jest.useFakeTimers();
    fireEvent.change(screen.getByLabelText('Search songs by title, artist, album, or genre'), {
      target: { value: 'No' },
    });
    act(() => jest.advanceTimersByTime(300));
    fireEvent.change(screen.getByLabelText('Filter songs by album'), {
      target: { value: 'FanMail' },
    });

    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.queryByText('No Diggity')).toBeNull();
    jest.useRealTimers();
  });

  it('should not error filtering by album when a song has no album field', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Filter songs by album'), {
      target: { value: 'FanMail' },
    });

    expect(screen.queryByText('No Scrubs')).toBeNull();
    expect(screen.queryByText('Macarena')).toBeNull();
  });

  it('should filter the song list by genre as the user types', () => {
    const genreStore = mockStore({
      songs: [
        { title: 'No Scrubs', genre: 'R&B', duration: '4:05' },
        { title: 'Macarena', genre: 'Latin Pop', duration: '2:30' },
        { title: 'All Star', genre: 'Rock', duration: '3:15' },
        { title: 'I Want it That Way', genre: 'Pop', duration: '1:45' },
      ],
      currentSongIndex: 1,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={genreStore}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Filter songs by genre'), {
      target: { value: 'rock' },
    });

    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.queryByText('No Scrubs')).toBeNull();
    expect(screen.queryByText('Macarena')).toBeNull();
    expect(screen.queryByText('I Want it That Way')).toBeNull();
  });

  it('should combine title search and genre filter', () => {
    const genreStore = mockStore({
      songs: [
        { title: 'No Scrubs', genre: 'R&B', duration: '4:05' },
        { title: 'No Diggity', genre: 'Hip Hop', duration: '4:15' },
      ],
      currentSongIndex: 0,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={genreStore}>
        <SongList />
      </Provider>
    );

    jest.useFakeTimers();
    fireEvent.change(screen.getByLabelText('Search songs by title, artist, album, or genre'), {
      target: { value: 'No' },
    });
    act(() => jest.advanceTimersByTime(300));
    fireEvent.change(screen.getByLabelText('Filter songs by genre'), {
      target: { value: 'R&B' },
    });

    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.queryByText('No Diggity')).toBeNull();
    jest.useRealTimers();
  });

  it('should not error filtering by genre when a song has no genre field', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Filter songs by genre'), {
      target: { value: 'Rock' },
    });

    expect(screen.queryByText('No Scrubs')).toBeNull();
    expect(screen.queryByText('Macarena')).toBeNull();
  });

  it('should filter the song list by year range', () => {
    const yearStore = mockStore({
      songs: [
        { title: 'No Scrubs', year: 1999, duration: '4:05' },
        { title: 'Macarena', year: 1995, duration: '2:30' },
        { title: 'All Star', year: 1999, duration: '3:15' },
        { title: 'I Want it That Way', year: 1999, duration: '1:45' },
      ],
      currentSongIndex: 1,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={yearStore}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Filter songs by year from'), {
      target: { value: '1996' },
    });

    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.getByText('I Want it That Way')).toBeTruthy();
    expect(screen.queryByText('Macarena')).toBeNull();
  });

  it('should filter the song list using both year from and year to bounds', () => {
    const yearStore = mockStore({
      songs: [
        { title: 'No Scrubs', year: 1999, duration: '4:05' },
        { title: 'Macarena', year: 1995, duration: '2:30' },
        { title: 'All Star', year: 2001, duration: '3:15' },
      ],
      currentSongIndex: 0,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={yearStore}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Filter songs by year from'), {
      target: { value: '1996' },
    });
    fireEvent.change(screen.getByLabelText('Filter songs by year to'), {
      target: { value: '2000' },
    });

    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.queryByText('Macarena')).toBeNull();
    expect(screen.queryByText('All Star')).toBeNull();
  });

  it('should combine title search and year range filter', () => {
    const yearStore = mockStore({
      songs: [
        { title: 'No Scrubs', year: 1999, duration: '4:05' },
        { title: 'No Diggity', year: 1996, duration: '4:15' },
      ],
      currentSongIndex: 0,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={yearStore}>
        <SongList />
      </Provider>
    );

    jest.useFakeTimers();
    fireEvent.change(screen.getByLabelText('Search songs by title, artist, album, or genre'), {
      target: { value: 'No' },
    });
    act(() => jest.advanceTimersByTime(300));
    fireEvent.change(screen.getByLabelText('Filter songs by year from'), {
      target: { value: '1998' },
    });

    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.queryByText('No Diggity')).toBeNull();
    jest.useRealTimers();
  });

  it('should highlight the matching search term within song titles', () => {
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Search songs by title, artist, album, or genre'), {
      target: { value: 'star' },
    });
    act(() => jest.advanceTimersByTime(300));

    const mark = screen.getByText('Star', { selector: 'mark' });
    expect(mark).toBeTruthy();
    expect(screen.getByText('All Star')).toBeTruthy();
    jest.useRealTimers();
  });

  it('should highlight matches case-insensitively while preserving original title casing', () => {
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Search songs by title, artist, album, or genre'), {
      target: { value: 'MACARENA' },
    });
    act(() => jest.advanceTimersByTime(300));

    expect(screen.getByText('Macarena', { selector: 'mark' })).toBeTruthy();
    jest.useRealTimers();
  });

  it('should not wrap any title text in mark elements when there is no search term', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    expect(document.querySelector('mark')).toBeNull();
  });

  it('should show an empty-state message when the search returns no results', () => {
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Search songs by title, artist, album, or genre'), {
      target: { value: 'nonexistent song' },
    });
    act(() => jest.advanceTimersByTime(300));

    expect(screen.getByText('No songs match your search or filters.')).toBeTruthy();
    expect(screen.queryByText('No Scrubs')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Select' })).toBeNull();
    jest.useRealTimers();
  });

  it('should not show the empty-state message when there are matching results', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    expect(screen.queryByText('No songs match your search or filters.')).toBeNull();
  });

  it('should not show a clear-search button when the search field is empty', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull();
  });

  it('should show a clear-search button once the user types a search term', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Search songs by title, artist, album, or genre'), {
      target: { value: 'star' },
    });

    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('should clear the search term and restore the full list when the clear-search button is clicked', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    const searchInput = screen.getByLabelText('Search songs by title, artist, album, or genre');
    jest.useFakeTimers();
    fireEvent.change(searchInput, { target: { value: 'star' } });
    act(() => jest.advanceTimersByTime(300));
    expect(screen.queryByText('No Scrubs')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(searchInput.value).toBe('');
    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.getByText('Macarena')).toBeTruthy();
    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.getByText('I Want it That Way')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull();
    jest.useRealTimers();
  });

  it('should not error filtering by year when a song has no year field', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Filter songs by year from'), {
      target: { value: '2000' },
    });

    expect(screen.queryByText('No Scrubs')).toBeNull();
    expect(screen.queryByText('Macarena')).toBeNull();
  });

  it('should render both songs distinctly when two songs share the same title but have different ids', () => {
    const duplicateTitleStore = mockStore({
      songs: [
        { id: 'song-1', title: 'Same Title', artist: 'Artist One', duration: '3:00' },
        { id: 'song-2', title: 'Same Title', artist: 'Artist Two', duration: '4:00' },
      ],
      currentSongIndex: 0,
      repeatMode: 'none',
      shuffle: false,
    });

    render(
      <Provider store={duplicateTitleStore}>
        <SongList />
      </Provider>
    );

    expect(screen.getAllByText('Same Title')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Select' })).toHaveLength(2);
  });
});