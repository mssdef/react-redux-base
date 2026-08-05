import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('SongDetail mute toggle', () => {
  it('renders Mute button when song is selected', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
  });

  it('shows Unmute after clicking Mute', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.click(screen.getByRole('button', { name: 'Mute' }));
    expect(screen.getByRole('button', { name: 'Unmute' })).toBeInTheDocument();
  });

  it('shows Mute again after clicking Unmute', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.click(screen.getByRole('button', { name: 'Mute' }));
    fireEvent.click(screen.getByRole('button', { name: 'Unmute' }));
    expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
  });

  it('preserves audio volume after muting and unmuting', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    const audio = document.querySelector('audio');
    audio.volume = 0.5;
    fireEvent.click(screen.getByRole('button', { name: 'Mute' }));
    fireEvent.click(screen.getByRole('button', { name: 'Unmute' }));
    expect(audio.volume).toBe(0.5);
  });
});

describe('SongDetail keyboard shortcuts', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  beforeEach(() => {
    window.HTMLMediaElement.prototype.play.mockClear();
    window.HTMLMediaElement.prototype.pause.mockClear();
  });

  it('renders play button when a song is selected', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByRole('button', { name: /play no scrubs/i })).toBeInTheDocument();
  });

  it('Space key plays the audio when paused', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.keyDown(document, { code: 'Space', key: ' ' });
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('Space key pauses the audio when playing', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.keyDown(document, { code: 'Space', key: ' ' });
    fireEvent.keyDown(document, { code: 'Space', key: ' ' });
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  it('M key toggles mute on', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
    fireEvent.keyDown(document, { code: 'KeyM', key: 'm' });
    expect(screen.getByRole('button', { name: 'Unmute' })).toBeInTheDocument();
  });

  it('M key toggles mute off', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.keyDown(document, { code: 'KeyM', key: 'm' });
    fireEvent.keyDown(document, { code: 'KeyM', key: 'm' });
    expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
  });

  it('ArrowRight seeks forward 10s', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    const audio = document.querySelector('audio');
    audio.currentTime = 5;
    fireEvent.keyDown(document, { code: 'ArrowRight', key: 'ArrowRight' });
    expect(audio.currentTime).toBe(15);
  });

  it('ArrowLeft seeks backward 10s', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    const audio = document.querySelector('audio');
    audio.currentTime = 20;
    fireEvent.keyDown(document, { code: 'ArrowLeft', key: 'ArrowLeft' });
    expect(audio.currentTime).toBe(10);
  });

  it('ArrowLeft clamps seek to 0', () => {
    const store = mockStore({ selectedSong: song, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    const audio = document.querySelector('audio');
    audio.currentTime = 3;
    fireEvent.keyDown(document, { code: 'ArrowLeft', key: 'ArrowLeft' });
    expect(audio.currentTime).toBe(0);
  });

  it('keyboard shortcuts are ignored when no song is selected', () => {
    const store = mockStore({ selectedSong: null, shuffle: false, repeatMode: 'none' });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.keyDown(document, { code: 'Space', key: ' ' });
    expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });
});
