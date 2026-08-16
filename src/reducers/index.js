import { combineReducers } from 'redux';
import songs from '../data/songs.json';
import { SONG_SELECTED, VOLUME_CHANGED, REPEAT_MODE_CHANGED, SHUFFLE_TOGGLED, PLAYBACK_SPEED_CHANGED, AUTOPLAY_TOGGLED, PLAYING_STATE_CHANGED } from '../actions/types';

const REPEAT_MODES = ['none', 'one', 'all'];

const songsReducer = () => {
  return songs;
};

const storedLastSelectedSongId = localStorage.getItem('lastSelectedSongId');
const storedLastSelectedSongTitle = localStorage.getItem('lastSelectedSongTitle');

const findLastPlayedSongIndex = () => {
  if (storedLastSelectedSongId) {
    const index = songs.findIndex(song => String(song.id ?? '') === storedLastSelectedSongId);
    if (index !== -1) return index;
  }

  if (storedLastSelectedSongTitle) {
    const index = songs.findIndex(song => song.title === storedLastSelectedSongTitle);
    if (index !== -1) return index;
  }

  return -1;
};

const lastPlayedSongIndex = findLastPlayedSongIndex();
const initialSelectedSong = lastPlayedSongIndex !== -1 ? songs[lastPlayedSongIndex] : null;
const initialSongIndex = lastPlayedSongIndex !== -1 ? lastPlayedSongIndex : 0;

const selectedSongReducer = (selectedSong = initialSelectedSong, action) => {
  if (action.type === SONG_SELECTED) {
    return action.payload;
  }

  return selectedSong;
};

const nextSongReducer = (currentSongIndex = initialSongIndex, action) => {
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

const storedRepeatMode = localStorage.getItem('repeatMode');
const initialRepeatMode = REPEAT_MODES.includes(storedRepeatMode) ? storedRepeatMode : 'none';

const repeatModeReducer = (repeatMode = initialRepeatMode, action) => {
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

const storedPlaybackSpeed = parseFloat(localStorage.getItem('playbackSpeed'));
const initialPlaybackSpeed = Number.isNaN(storedPlaybackSpeed) ? 1 : storedPlaybackSpeed;

const playbackSpeedReducer = (playbackSpeed = initialPlaybackSpeed, action) => {
  if (action.type === PLAYBACK_SPEED_CHANGED) {
    return action.payload;
  }
  return playbackSpeed;
};

const storedVolume = parseFloat(localStorage.getItem('volume'));
const initialVolume = Number.isNaN(storedVolume) ? 1 : storedVolume;

const volumeReducer = (volume = initialVolume, action) => {
  if (action.type === VOLUME_CHANGED) {
    return action.payload;
  }
  return volume;
};

const storedAutoPlay = localStorage.getItem('autoPlay') === 'true';

const autoPlayReducer = (autoPlay = storedAutoPlay, action) => {
  if (action.type === AUTOPLAY_TOGGLED) {
    return !autoPlay;
  }
  return autoPlay;
};

const isPlayingReducer = (isPlaying = false, action) => {
  if (action.type === PLAYING_STATE_CHANGED) {
    return action.payload;
  }
  return isPlaying;
};

const combinedReducer = combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
  currentSongIndex: nextSongReducer,
  repeatMode: repeatModeReducer,
  shuffle: shuffleReducer,
  playbackSpeed: playbackSpeedReducer,
  volume: volumeReducer,
  autoPlay: autoPlayReducer,
  isPlaying: isPlayingReducer
});

const QUEUE_NAVIGATION_ACTIONS = ['NEXT_SONG', 'PREVIOUS_SONG', 'NEXT_SONG_SHUFFLE'];

const rootReducer = (state, action) => {
  const nextState = combinedReducer(state, action);

  if (QUEUE_NAVIGATION_ACTIONS.includes(action.type)) {
    return {
      ...nextState,
      selectedSong: songs[nextState.currentSongIndex] || null
    };
  }

  return nextState;
};

export default rootReducer;