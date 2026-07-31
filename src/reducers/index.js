import { combineReducers } from 'redux';
import { SONGS_DATA } from '../data/songs';
import { SONG_SELECTED } from '../actions/types';

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

  return currentSongIndex;
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
  currentSongIndex: nextSongReducer
});