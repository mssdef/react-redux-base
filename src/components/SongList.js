import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectSong, nextSong, previousSong, cycleRepeatMode, toggleShuffle, shuffleNext } from '../actions';

const SEARCH_DEBOUNCE_MS = 300;

const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightMatches = (text, keywords) => {
  if (!keywords.length) return text;
  const pattern = keywords.map(escapeRegExp).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  return text
    .split(regex)
    .map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : part));
};

const SongList = () => {
  const songs = useSelector(state => state.songs);
  const dispatch = useDispatch();
  const currentSongIndex = useSelector(state => state.currentSongIndex);
  const repeatMode = useSelector(state => state.repeatMode);
  const shuffle = useSelector(state => state.shuffle);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [artistFilter, setArtistFilter] = useState('');
  const [albumFilter, setAlbumFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [yearFromFilter, setYearFromFilter] = useState('');
  const [yearToFilter, setYearToFilter] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedSearchTerm(searchTerm), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  const searchKeywords = debouncedSearchTerm.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const matchesSearch = song => {
    if (searchKeywords.length === 0) return true;
    const haystack = [song.title, song.artist, song.album, song.genre]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return searchKeywords.every(keyword => haystack.includes(keyword));
  };

  const visibleSongs = songs
    .map((song, index) => ({ song, index }))
    .filter(({ song }) => matchesSearch(song))
    .filter(({ song }) => (song.artist || '').toLowerCase().includes(artistFilter.toLowerCase()))
    .filter(({ song }) => (song.album || '').toLowerCase().includes(albumFilter.toLowerCase()))
    .filter(({ song }) => (song.genre || '').toLowerCase().includes(genreFilter.toLowerCase()))
    .filter(({ song }) => yearFromFilter === '' || (song.year || 0) >= Number(yearFromFilter))
    .filter(({ song }) => yearToFilter === '' || (song.year || 0) <= Number(yearToFilter));

  const renderList = () => {
    return visibleSongs.map(({ song, index }) => {
      const isCurrentSong = index === currentSongIndex;
      return (
        <div
          className={`item${isCurrentSong ? ' active' : ''}`}
          key={song.id}
          aria-current={isCurrentSong ? 'true' : undefined}
        >
          <div className="right floated content">
            <button
              className="ui button primary"
              onClick={() => dispatch(selectSong(song))}
            >
              Select
            </button>
            {isCurrentSong && (
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
          <div className="content">
            {isCurrentSong && (
              <i className="play icon" aria-hidden="true" title="Now playing"></i>
            )}
            {highlightMatches(song.title, searchKeywords)}
            {isCurrentSong && <span className="ui label mini">Now Playing</span>}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="ui icon input fluid">
        <input
          type="text"
          placeholder="Search by title, artist, album, or genre..."
          aria-label="Search songs by title, artist, album, or genre"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
        {searchTerm ? (
          <i
            className="close link icon"
            role="button"
            tabIndex={0}
            aria-label="Clear search"
            onClick={clearSearch}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') clearSearch();
            }}
          />
        ) : (
          <i className="search icon" />
        )}
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
      <div className="ui icon input fluid">
        <input
          type="text"
          placeholder="Filter by album..."
          aria-label="Filter songs by album"
          value={albumFilter}
          onChange={event => setAlbumFilter(event.target.value)}
        />
        <i className="compact disc icon" />
      </div>
      <div className="ui icon input fluid">
        <input
          type="text"
          placeholder="Filter by genre..."
          aria-label="Filter songs by genre"
          value={genreFilter}
          onChange={event => setGenreFilter(event.target.value)}
        />
        <i className="tags icon" />
      </div>
      <div className="ui icon input fluid">
        <input
          type="number"
          placeholder="Year from..."
          aria-label="Filter songs by year from"
          value={yearFromFilter}
          onChange={event => setYearFromFilter(event.target.value)}
        />
        <i className="calendar icon" />
      </div>
      <div className="ui icon input fluid">
        <input
          type="number"
          placeholder="Year to..."
          aria-label="Filter songs by year to"
          value={yearToFilter}
          onChange={event => setYearToFilter(event.target.value)}
        />
        <i className="calendar icon" />
      </div>
      {visibleSongs.length === 0 && songs.length > 0 ? (
        <div className="ui message">No songs match your search or filters.</div>
      ) : (
        <div className="ui divided list">{renderList()}</div>
      )}
    </div>
  );
};

export default SongList;