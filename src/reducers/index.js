import { combineReducers } from 'redux';
import { SONG_SELECTED, FILTER_SONGS } from '../actions';

// Sample songs data - in a real app, this would come from an API
const songsReducer = () => {
  return [
    { title: 'Personal Jesus', duration: '4:05' },
    { title: 'Hit It Up', duration: '3:17' },
    { title: 'Something to Say', duration: '3:58' },
    { title: 'Fade to Black', duration: '5:30' },
    { title: 'Bohemian Rhapsody', duration: '5:55' },
    { title: 'Hotel California', duration: '6:30' }
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  switch (action.type) {
    case SONG_SELECTED:
      return action.payload;
    default:
      return selectedSong;
  }
};

const searchTermReducer = (searchTerm = '', action) => {
  switch (action.type) {
    case FILTER_SONGS:
      return action.payload;
    default:
      return searchTerm;
  }
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
  searchTerm: searchTermReducer
});
