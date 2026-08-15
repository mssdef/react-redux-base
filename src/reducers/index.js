import { combineReducers } from 'redux';
import songs from '../data/songs.json';
import { SONG_SELECTED, VOLUME_CHANGED, REPEAT_MODE_CHANGED, SHUFFLE_TOGGLED, PLAYBACK_SPEED_CHANGED } from '../actions/types';

const REPEAT_MODES = ['none', 'one', 'all'];

const songsReducer = () => {
  return songs;
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === SONG_SELECTED) {
    return action.payload;
  }

  return selectedSong;
};

const nextSongReducer = (currentSongIndex = 0, action) => {
  if (action.type === 'NEXT_SONG') {
    return (currentSongIndex + 1) % songs.length;
  }

  if (action.type === 'NEXT_SONG_SHUFFLE') {
    if (songs.length <= 1) return currentSongIndex;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songs.length);
    } while (newIndex === currentSongIndex);
    return newIndex;
  }

  if (action.type === 'PREVIOUS_SONG') {
    return (currentSongIndex - 1 + songs.length) % songs.length;
  }

  return currentSongIndex;
};

const repeatModeReducer = (repeatMode = 'none', action) => {
  if (action.type === REPEAT_MODE_CHANGED) {
    const currentIndex = REPEAT_MODES.indexOf(repeatMode);
    return REPEAT_MODES[(currentIndex + 1) % REPEAT_MODES.length];
  }
  return repeatMode;
};

const storedShuffle = localStorage.getItem('shuffle') === 'true';

const shuffleReducer = (shuffle = storedShuffle, action) => {
  if (action.type === SHUFFLE_TOGGLED) {
    return !shuffle;
  }
  return shuffle;
};

const playbackSpeedReducer = (playbackSpeed = 1, action) => {
  if (action.type === PLAYBACK_SPEED_CHANGED) {
    return action.payload;
  }
  return playbackSpeed;
};

const volumeReducer = (volume = 1, action) => {
  if (action.type === VOLUME_CHANGED) {
    return action.payload;
  }
  return volume;
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
  currentSongIndex: nextSongReducer,
  repeatMode: repeatModeReducer,
  shuffle: shuffleReducer,
  playbackSpeed: playbackSpeedReducer,
  volume: volumeReducer
});