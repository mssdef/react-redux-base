import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectSong, nextSong } from '../actions';

const SongList = () => {
  const songs = useSelector(state => state.songs);
  const dispatch = useDispatch();
  const currentSongIndex = useSelector(state => state.currentSongIndex);

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
              <button
                className="ui button"
                onClick={() => dispatch(nextSong())}
              >
                Next
              </button>
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