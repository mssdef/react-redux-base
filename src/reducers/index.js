import { combineReducers } from 'redux';

const songsReducer = () => {
  return [
    { title: 'personal jesus', duration: '4:05'},
    { title: 'hit it up', duration: '3:17'},
    { title: 'something to say', duration: '3:58'},
    { title: 'fade to black', duration: '5:30'}

  ]
};


const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload;
  }

  return selectedSong;
};


export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer
});
