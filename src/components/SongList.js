import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSong } from '../actions';
import { SONGS_DATA } from '../data/songs';
import { selectSong } from '../actions';

const SongList = () => {
  const songs = useSelector(state => state.songs);
  const dispatch = useDispatch();
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0);

  const nextSong = () => {
    setCurrentSongIndex(prevIndex => (prevIndex + 1) % songs.length);
  };

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
                onClick={nextSong}
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
