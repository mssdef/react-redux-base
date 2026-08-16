import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SongDetail from '../SongDetail';

const mockStore = configureStore([]);
const song = { title: 'No Scrubs', duration: '4:05' };
const fullSong = {
  title: 'No Scrubs',
  artist: 'TLC',
  album: 'FanMail',
  genre: 'R&B',
  year: 1999,
  duration: '4:05',
  artworkUrl: 'https://example.com/artwork.jpg',
};

const baseState = { selectedSong: song, shuffle: false, repeatMode: 'none', playbackSpeed: 1, volume: 1, autoPlay: false };

describe('SongDetail song schema expansion', () => {
  it('displays artist and album when provided', () => {
    const store = mockStore({ ...baseState, selectedSong: fullSong });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByText('TLC')).toBeInTheDocument();
    expect(screen.getByText('FanMail')).toBeInTheDocument();
  });

  it('displays genre and year when provided', () => {
    const store = mockStore({ ...baseState, selectedSong: fullSong });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByText('R&B')).toBeInTheDocument();
    expect(screen.getByText('1999')).toBeInTheDocument();
  });

  it('renders artwork image with alt text when artworkUrl is provided', () => {
    const store = mockStore({ ...baseState, selectedSong: fullSong });
    render(<Provider store={store}><SongDetail /></Provider>);
    const img = screen.getByAltText('No Scrubs artwork');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://example.com/artwork.jpg');
  });

  it('does not render artwork image when artworkUrl is empty', () => {
    const store = mockStore({ ...baseState, selectedSong: { ...fullSong, artworkUrl: '' } });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.queryByAltText('No Scrubs artwork')).toBeNull();
  });

  it('renders title without artist/album when those fields are absent', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByText('No Scrubs')).toBeInTheDocument();
    expect(screen.queryByText('TLC')).toBeNull();
  });

  it('binds the selected song audioUrl to the audio element src', () => {
    const store = mockStore({ ...baseState, selectedSong: { ...fullSong, audioUrl: 'https://example.com/song.mp3' } });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(document.querySelector('audio').src).toBe('https://example.com/song.mp3');
  });
});

describe('SongDetail auto-advance', () => {
  it('dispatches NEXT_SONG when audio ends and shuffle is off', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent(document.querySelector('audio'), new Event('ended'));
    expect(store.getActions()).toContainEqual({ type: 'NEXT_SONG' });
  });

  it('dispatches NEXT_SONG_SHUFFLE when audio ends and shuffle is on', () => {
    const store = mockStore({ ...baseState, shuffle: true });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent(document.querySelector('audio'), new Event('ended'));
    expect(store.getActions()).toContainEqual({ type: 'NEXT_SONG_SHUFFLE' });
  });

  it('does not dispatch when audio ends and repeatMode is one', () => {
    const store = mockStore({ ...baseState, repeatMode: 'one' });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent(document.querySelector('audio'), new Event('ended'));
    expect(store.getActions()).toHaveLength(0);
  });
});

describe('SongDetail mute toggle', () => {
  it('renders Mute button when song is selected', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
  });

  it('shows Unmute after clicking Mute', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.click(screen.getByRole('button', { name: 'Mute' }));
    expect(screen.getByRole('button', { name: 'Unmute' })).toBeInTheDocument();
  });

  it('shows Mute again after clicking Unmute', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.click(screen.getByRole('button', { name: 'Mute' }));
    fireEvent.click(screen.getByRole('button', { name: 'Unmute' }));
    expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
  });

  it('preserves audio volume after muting and unmuting', () => {
    const store = mockStore({ ...baseState });
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
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByRole('button', { name: /play no scrubs/i })).toBeInTheDocument();
  });

  it('Space key plays the audio when paused', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.keyDown(document, { code: 'Space', key: ' ' });
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('Space key pauses the audio when playing', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.keyDown(document, { code: 'Space', key: ' ' });
    fireEvent.keyDown(document, { code: 'Space', key: ' ' });
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  it('M key toggles mute on', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
    fireEvent.keyDown(document, { code: 'KeyM', key: 'm' });
    expect(screen.getByRole('button', { name: 'Unmute' })).toBeInTheDocument();
  });

  it('M key toggles mute off', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.keyDown(document, { code: 'KeyM', key: 'm' });
    fireEvent.keyDown(document, { code: 'KeyM', key: 'm' });
    expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
  });

  it('ArrowRight seeks forward 10s', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    const audio = document.querySelector('audio');
    audio.currentTime = 5;
    fireEvent.keyDown(document, { code: 'ArrowRight', key: 'ArrowRight' });
    expect(audio.currentTime).toBe(15);
  });

  it('ArrowLeft seeks backward 10s', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    const audio = document.querySelector('audio');
    audio.currentTime = 20;
    fireEvent.keyDown(document, { code: 'ArrowLeft', key: 'ArrowLeft' });
    expect(audio.currentTime).toBe(10);
  });

  it('ArrowLeft clamps seek to 0', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    const audio = document.querySelector('audio');
    audio.currentTime = 3;
    fireEvent.keyDown(document, { code: 'ArrowLeft', key: 'ArrowLeft' });
    expect(audio.currentTime).toBe(0);
  });

  it('keyboard shortcuts are ignored when no song is selected', () => {
    const store = mockStore({ ...baseState, selectedSong: null });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.keyDown(document, { code: 'Space', key: ' ' });
    expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });
});

describe('SongDetail playback speed', () => {
  it('renders speed selector with default 1x selected', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    const select = screen.getByLabelText('Playback speed');
    expect(select).toBeTruthy();
    expect(select.value).toBe('1');
  });

  it('renders all speed options', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    const select = screen.getByLabelText('Playback speed');
    const options = Array.from(select.options).map(o => o.value);
    expect(options).toEqual(['0.5', '0.75', '1', '1.25', '1.5', '2']);
  });

  it('dispatches PLAYBACK_SPEED_CHANGED with correct payload when speed changes', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.change(screen.getByLabelText('Playback speed'), { target: { value: '1.5' } });
    expect(store.getActions()).toContainEqual({ type: 'PLAYBACK_SPEED_CHANGED', payload: 1.5 });
  });

  it('reflects stored playback speed from redux state', () => {
    const store = mockStore({ ...baseState, playbackSpeed: 2 });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByLabelText('Playback speed').value).toBe('2');
  });

  it('does not render speed selector when no song is selected', () => {
    const store = mockStore({ ...baseState, selectedSong: null });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.queryByLabelText('Playback speed')).toBeNull();
  });
});

describe('SongDetail volume control', () => {
  it('renders volume slider with default value of 1', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByLabelText('Volume').value).toBe('1');
  });

  it('dispatches VOLUME_CHANGED with correct payload when volume changes', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.change(screen.getByLabelText('Volume'), { target: { value: '0.4' } });
    expect(store.getActions()).toContainEqual({ type: 'VOLUME_CHANGED', payload: 0.4 });
  });

  it('applies volume changes to the audio element', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.change(screen.getByLabelText('Volume'), { target: { value: '0.4' } });
    expect(document.querySelector('audio').volume).toBe(0.4);
  });

  it('reflects stored volume from redux state', () => {
    const store = mockStore({ ...baseState, volume: 0.2 });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByLabelText('Volume').value).toBe('0.2');
  });

  it('does not render volume slider when no song is selected', () => {
    const store = mockStore({ ...baseState, selectedSong: null });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.queryByLabelText('Volume')).toBeNull();
  });
});

describe('SongDetail seek bar', () => {
  it('sets numeric max in seconds when duration is an M:SS string', () => {
    const store = mockStore({ ...baseState, selectedSong: { ...song, duration: '4:05' } });
    render(<Provider store={store}><SongDetail /></Provider>);
    const seekBar = screen.getByLabelText('Seek bar for No Scrubs');
    expect(seekBar.max).toBe('245');
  });

  it('uses numeric duration directly when duration is already a number', () => {
    const store = mockStore({ ...baseState, selectedSong: { ...song, duration: 300 } });
    render(<Provider store={store}><SongDetail /></Provider>);
    const seekBar = screen.getByLabelText('Seek bar for No Scrubs');
    expect(seekBar.max).toBe('300');
  });
});

describe('SongDetail auto-play preference', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  beforeEach(() => {
    window.HTMLMediaElement.prototype.play.mockClear();
    window.HTMLMediaElement.prototype.pause.mockClear();
  });

  it('renders Auto-play: off by default', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByRole('button', { name: 'Auto-play: off' })).toBeInTheDocument();
  });

  it('dispatches AUTOPLAY_TOGGLED when the auto-play button is clicked', () => {
    const store = mockStore({ ...baseState });
    render(<Provider store={store}><SongDetail /></Provider>);
    fireEvent.click(screen.getByRole('button', { name: 'Auto-play: off' }));
    expect(store.getActions()).toContainEqual({ type: 'AUTOPLAY_TOGGLED' });
  });

  it('does not auto-play a newly selected song when the preference is disabled', () => {
    const store = mockStore({ ...baseState, autoPlay: false });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });

  it('auto-plays a newly selected song when the preference is enabled', () => {
    const store = mockStore({ ...baseState, autoPlay: true });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('renders Auto-play: on when the preference is enabled', () => {
    const store = mockStore({ ...baseState, autoPlay: true });
    render(<Provider store={store}><SongDetail /></Provider>);
    expect(screen.getByRole('button', { name: 'Auto-play: on' })).toBeInTheDocument();
  });
});
