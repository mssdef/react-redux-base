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

describe('restoring last played song on app start', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
  });

  it('defaults to no selected song and index 0 when localStorage has no stored song', () => {
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.selectedSong).toBeNull();
    expect(state.currentSongIndex).toBe(0);
  });

  it('restores the selected song and index from a stored title', () => {
    const songs = require('../../data/songs.json');
    localStorage.setItem('lastSelectedSongTitle', songs[2].title);
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.selectedSong).toEqual(songs[2]);
    expect(state.currentSongIndex).toBe(2);
  });

  it('falls back to null/0 when the stored title no longer matches a song', () => {
    localStorage.setItem('lastSelectedSongTitle', 'Some Deleted Song');
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.selectedSong).toBeNull();
    expect(state.currentSongIndex).toBe(0);
  });

  it('still responds to SONG_SELECTED after restoring from localStorage', () => {
    const songs = require('../../data/songs.json');
    localStorage.setItem('lastSelectedSongTitle', songs[2].title);
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: 'SONG_SELECTED', payload: songs[0] });
    expect(state.selectedSong).toEqual(songs[0]);
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

describe('repeatMode reducer localStorage persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
  });

  it('defaults repeatMode to none when localStorage has no stored value', () => {
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.repeatMode).toBe('none');
  });

  it('initializes repeatMode from a value stored in localStorage', () => {
    localStorage.setItem('repeatMode', 'all');
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.repeatMode).toBe('all');
  });

  it('falls back to none when localStorage has an invalid repeatMode value', () => {
    localStorage.setItem('repeatMode', 'bogus');
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.repeatMode).toBe('none');
  });

  it('still cycles on REPEAT_MODE_CHANGED after initializing from localStorage', () => {
    localStorage.setItem('repeatMode', 'one');
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: 'REPEAT_MODE_CHANGED' });
    expect(state.repeatMode).toBe('all');
  });
});

describe('playbackSpeed reducer localStorage persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
  });

  it('defaults playbackSpeed to 1 when localStorage has no stored value', () => {
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.playbackSpeed).toBe(1);
  });

  it('initializes playbackSpeed from a value stored in localStorage', () => {
    localStorage.setItem('playbackSpeed', '1.5');
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.playbackSpeed).toBe(1.5);
  });

  it('still responds to PLAYBACK_SPEED_CHANGED after initializing from localStorage', () => {
    localStorage.setItem('playbackSpeed', '1.5');
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: 'PLAYBACK_SPEED_CHANGED', payload: 0.5 });
    expect(state.playbackSpeed).toBe(0.5);
  });
});
