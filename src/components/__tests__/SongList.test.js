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
    });

    render(
      <Provider store={firstStore}>
        <SongList />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
  });
});