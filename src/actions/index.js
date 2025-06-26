// Action Types - Constants for better maintainability
export const SONG_SELECTED = 'SONG_SELECTED';
export const FILTER_SONGS = 'FILTER_SONGS';

// Action creator for selecting a song
export const selectSong = (song) => {
  // Validate song object
  if (!song || typeof song !== 'object') {
    throw new Error('selectSong: Invalid song object provided');
  }
  
  if (!song.title || !song.duration) {
    throw new Error('selectSong: Song must have title and duration properties');
  }

  return {
    type: SONG_SELECTED,
    payload: song
  };
};

// Action creator for filtering songs
export const filterSongs = (searchTerm) => {
  // Validate search term
  if (typeof searchTerm !== 'string') {
    throw new Error('filterSongs: Search term must be a string');
  }

  return {
    type: FILTER_SONGS,
    payload: searchTerm
  };
};
