import { combineReducers } from 'redux';
import { SONGS_DATA } from '../data/songs';
import { SONG_SELECTED, REPEAT_MODE_CHANGED } from '../actions/types';

const REPEAT_MODES = ['none', 'one', 'all'];

const songsReducer = () => {
  return SONGS_DATA;
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === SONG_SELECTED) {
    return action.payload;
  }

  return selectedSong;
};

const nextSongReducer = (currentSongIndex = 0, action) => {
  if (action.type === 'NEXT_SONG') {
    return (currentSongIndex + 1) % SONGS_DATA.length;
  }

  if (action.type === 'PREVIOUS_SONG') {
    return (currentSongIndex - 1 + SONGS_DATA.length) % SONGS_DATA.length;
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

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
  currentSongIndex: nextSongReducer,
  repeatMode: repeatModeReducer
});