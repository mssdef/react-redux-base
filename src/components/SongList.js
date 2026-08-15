import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectSong, nextSong, previousSong, cycleRepeatMode, toggleShuffle, shuffleNext } from '../actions';

const SongList = () => {
  const songs = useSelector(state => state.songs);
  const dispatch = useDispatch();
  const currentSongIndex = useSelector(state => state.currentSongIndex);
  const repeatMode = useSelector(state => state.repeatMode);
  const shuffle = useSelector(state => state.shuffle);
  const [searchTerm, setSearchTerm] = useState('');
  const [artistFilter, setArtistFilter] = useState('');

  const visibleSongs = songs
    .map((song, index) => ({ song, index }))
    .filter(({ song }) => song.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(({ song }) => (song.artist || '').toLowerCase().includes(artistFilter.toLowerCase()));

  const renderList = () => {
    return visibleSongs.map(({ song, index }) => {
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

  return (
    <div>
      <div className="ui icon input fluid">
        <input
          type="text"
          placeholder="Search songs by title..."
          aria-label="Search songs by title"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
        <i className="search icon" />
      </div>
      <div className="ui icon input fluid">
        <input
          type="text"
          placeholder="Filter by artist..."
          aria-label="Filter songs by artist"
          value={artistFilter}
          onChange={event => setArtistFilter(event.target.value)}
        />
        <i className="user icon" />
      </div>
      <div className="ui divided list">{renderList()}</div>
    </div>
  );
};

export default SongList;