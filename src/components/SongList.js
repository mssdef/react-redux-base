import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSong, filterSongs } from '../actions';

const SongList = ({ songs, searchTerm, selectSong, filterSongs }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    filterSongs(value);
  }, [filterSongs]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      const filteredSongs = getFilteredSongs();
      if (filteredSongs.length > 0) {
        selectSong(filteredSongs[0]);
      }
    }
  }, []);

  const getFilteredSongs = () => {
    if (!searchTerm) return songs;
    
    return songs.filter(song => 
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderList = () => {
    const filteredSongs = getFilteredSongs();
    
    if (filteredSongs.length === 0) {
      return (
        <div className="ui placeholder" role="status" aria-label="No songs found">
          <div className="paragraph">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <p className="ui text center aligned">
            {searchTerm ? 'No songs match your search.' : 'No songs available.'}
          </p>
        </div>
      );
    }

    return filteredSongs.map((song, index) => {
      return (
        <div 
          className="item" 
          key={song.title} 
          role="listitem"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              selectSong(song);
            }
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="right floated content">
            <button 
              onClick={() => selectSong(song)}
              className="ui button primary"
              aria-label={`Select ${song.title}`}
              type="button"
            >
              Select
            </button>
          </div>

          <div className="content">
            <div className="header" role="heading" aria-level="3">
              {song.title}
            </div>
            <div className="meta">
              Duration: {song.duration}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="ui fluid search" role="search">
        <div className="ui icon input">
          <input 
            className="prompt" 
            type="text" 
            placeholder="Search songs... (Press Enter to select first result)"
            value={localSearchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            aria-label="Search songs by title"
          />
          <i className="search icon" aria-hidden="true"></i>
        </div>
      </div>
      <div 
        className="ui divided list" 
        style={{ marginTop: '1rem' }}
        role="list"
        aria-label="Song list"
      >
        {renderList()}
      </div>
    </div>
  );
};

SongList.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
  selectSong: PropTypes.func.isRequired,
  filterSongs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return { 
    songs: state.songs,
    searchTerm: state.searchTerm
  };
};

export default connect(mapStateToProps, { selectSong, filterSongs })(SongList);
