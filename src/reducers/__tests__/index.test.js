describe('selectedSong sync with currentSongIndex on next/previous', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
  });

  it('sets selectedSong to the song at the new index on NEXT_SONG', () => {
    const reducers = require('../index').default;
    const songs = require('../../data/songs.json');
    const state = reducers(undefined, { type: 'NEXT_SONG' });
    expect(state.currentSongIndex).toBe(1);
    expect(state.selectedSong).toEqual(songs[1]);
  });

  it('sets selectedSong to the song at the new index on PREVIOUS_SONG', () => {
    const reducers = require('../index').default;
    const songs = require('../../data/songs.json');
    const state = reducers(undefined, { type: 'PREVIOUS_SONG' });
    expect(state.currentSongIndex).toBe(songs.length - 1);
    expect(state.selectedSong).toEqual(songs[songs.length - 1]);
  });

  it('sets selectedSong to the song at the new index on NEXT_SONG_SHUFFLE', () => {
    const reducers = require('../index').default;
    const songs = require('../../data/songs.json');
    const state = reducers(undefined, { type: 'NEXT_SONG_SHUFFLE' });
    expect(state.selectedSong).toEqual(songs[state.currentSongIndex]);
  });

  it('does not touch selectedSong for unrelated actions', () => {
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.selectedSong).toBeNull();
  });
});

describe('volume reducer localStorage persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
  });

  it('defaults volume to 1 when localStorage has no stored value', () => {
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.volume).toBe(1);
  });

  it('initializes volume from a value stored in localStorage', () => {
    localStorage.setItem('volume', '0.3');
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.volume).toBe(0.3);
  });

  it('still responds to VOLUME_CHANGED after initializing from localStorage', () => {
    localStorage.setItem('volume', '0.3');
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: 'VOLUME_CHANGED', payload: 0.7 });
    expect(state.volume).toBe(0.7);
  });
});

describe('autoPlay reducer localStorage persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
  });

  it('defaults autoPlay to false when localStorage has no stored value', () => {
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.autoPlay).toBe(false);
  });

  it('initializes autoPlay from a value stored in localStorage', () => {
    localStorage.setItem('autoPlay', 'true');
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.autoPlay).toBe(true);
  });

  it('toggles autoPlay on AUTOPLAY_TOGGLED', () => {
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: 'AUTOPLAY_TOGGLED' });
    expect(state.autoPlay).toBe(true);
  });
});
