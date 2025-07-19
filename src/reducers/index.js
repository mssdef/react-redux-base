import { combineReducers } from 'redux';
import { SONG_SELECTED } from '../actions/types';

const SONGS_DATA = [
  { title: 'No Scrubs', duration: '4:05' },
  { title: 'Macarena', duration: '2:30' },
  { title: 'All Star', duration: '3:15' },
  { title: 'I Want it That Way', duration: '1:45' }
];

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
