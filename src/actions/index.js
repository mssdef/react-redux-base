import { SONG_SELECTED, REPEAT_MODE_CHANGED } from './types';

export const selectSong = song => {
  return {
    type: SONG_SELECTED,
    payload: song
  };
};

export const nextSong = () => {
  return {
    type: 'NEXT_SONG'
  };
};

export const previousSong = () => {
  return {
    type: 'PREVIOUS_SONG'
  };
};

export const cycleRepeatMode = () => {
  return {
    type: REPEAT_MODE_CHANGED
  };
};