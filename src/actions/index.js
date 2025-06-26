// Action creator
export const selectSong = (song) => {
  // return an Action
  return {
    type: 'SONG_SELECTED',
    payload: song
  }
}

export const filterSongs = (searchTerm) => {
  return {
    type: 'FILTER_SONGS',
    payload: searchTerm
  }
}
