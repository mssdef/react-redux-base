import { combineReducers } from 'redux';
import { SONG_SELECTED } from '../actions/types';
import { SONGS_DATA } from '../data/songs';

const songsReducer = () => {
  return SONGS_DATA;
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === SONG_SELECTED) {
    return action.payload;
  }

  return selectedSong;
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer
});
