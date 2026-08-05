import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SongDetail from '../SongDetail';

const mockStore = configureStore([]);
const song = { title: 'No Scrubs', duration: '4:05' };

describe('SongDetail auto-advance', () => {
  it('dispatches NEXT_SONG when audio ends and shuffle is off', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent(document.querySelector('audio'), new Event('ended'));
    expect(store.getActions()).toContainEqual({ type: 'NEXT_SONG' });
  });

  it('dispatches NEXT_SONG_SHUFFLE when audio ends and shuffle is on', () => {
    const store = mockStore({ selectedSong: song, shuffle: true, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent(document.querySelector('audio'), new Event('ended'));
    expect(store.getActions()).toContainEqual({ type: 'NEXT_SONG_SHUFFLE' });
  });

  it('does not dispatch when audio ends and repeatMode is one', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'one' });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent(document.querySelector('audio'), new Event('ended'));
    expect(store.getActions()).toHaveLength(0);
  });
});
