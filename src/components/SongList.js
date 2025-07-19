import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSong } from '../actions';

const SongList = () => {
  const songs = useSelector(state => state.songs);
  const dispatch = useDispatch();

  const renderList = () => {
    return songs.map(song => {
      return (
        <div className="item" key={song.title}>
          <div className="right floated content">
            <button
              className="ui button primary"
              onClick={() => dispatch(selectSong(song))}
            >
              Select
            </button>
          </div>
          <div className="content">{song.title}</div>
        </div>
      );
    });
  };

  return <div className="ui divided list">{renderList()}</div>;
};

export default SongList;
