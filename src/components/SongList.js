import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectSong, nextSong, previousSong, cycleRepeatMode, toggleShuffle, shuffleNext } from '../actions';

const SongList = () => {
  const songs = useSelector(state => state.songs);
  const dispatch = useDispatch();
  const currentSongIndex = useSelector(state => state.currentSongIndex);
  const repeatMode = useSelector(state => state.repeatMode);
  const shuffle = useSelector(state => state.shuffle);

  const renderList = () => {
    return songs.map((song, index) => {
      return (
        <div className="item" key={song.title}>
          <div className="right floated content">
            <button
              className="ui button primary"
              onClick={() => dispatch(selectSong(song))}
            >
              Select
            </button>
            {index === currentSongIndex && (
              <>
                <button
                  className="ui button"
                  onClick={() => dispatch(shuffle ? shuffleNext() : nextSong())}
                >
                  Next
                </button>
                <button
                  className="ui button"
                  onClick={() => dispatch(previousSong())}
                >
                  Previous
                </button>
                <button
                  className="ui button"
                  onClick={() => dispatch(cycleRepeatMode())}
                  aria-label={`Repeat: ${repeatMode}`}
                >
                  Repeat: {repeatMode}
                </button>
                <button
                  className={`ui button${shuffle ? ' active' : ''}`}
                  onClick={() => dispatch(toggleShuffle())}
                  aria-label={`Shuffle: ${shuffle ? 'on' : 'off'}`}
                  aria-pressed={shuffle}
                >
                  Shuffle: {shuffle ? 'on' : 'off'}
                </button>
              </>
            )}
          </div>
          <div className="content">{song.title}</div>
        </div>
      );
    });
  };

  return <div className="ui divided list">{renderList()}</div>;
};

export default SongList;