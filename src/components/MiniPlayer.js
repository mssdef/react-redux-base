import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { previousSong, nextSong, shuffleNext, cycleRepeatMode, toggleShuffle, setIsPlaying, setCurrentTime, setVolume } from '../actions';
import { parseDurationToSeconds } from '../utils/duration';

const MiniPlayer = () => {
  const selectedSong = useSelector(state => state.selectedSong);
  const shuffle = useSelector(state => state.shuffle);
  const repeatMode = useSelector(state => state.repeatMode);
  const songs = useSelector(state => state.songs);
  const isPlaying = useSelector(state => state.isPlaying);
  const currentTime = useSelector(state => state.currentTime) || 0;
  const volume = useSelector(state => state.volume) ?? 1;
  const dispatch = useDispatch();
  const navDisabled = !songs || songs.length < 2;
  const duration = selectedSong ? parseDurationToSeconds(selectedSong.duration) : 0;
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handlePrevious = () => dispatch(previousSong());
  const handleNext = () => dispatch(shuffle ? shuffleNext() : nextSong());
  const handleTogglePlay = () => dispatch(setIsPlaying(!isPlaying));
  const handleSeek = (e) => {
    if (!selectedSong || duration <= 0) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (e.clientX - left) / width));
    dispatch(setCurrentTime(fraction * duration));
  };
  const handleVolumeChange = (e) => dispatch(setVolume(parseFloat(e.target.value)));

  return (
    <div
      className="ui inverted segment"
      role="region"
      aria-label="Mini player"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 0,
        borderRadius: 0,
        zIndex: 1000,
        padding: '0.75em 1.5em',
      }}
    >
      <div
        role="progressbar"
        aria-label="Playback progress"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={Math.min(currentTime, duration)}
        onClick={handleSeek}
        style={{
          height: '3px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          marginBottom: '0.75em',
          cursor: selectedSong && duration > 0 ? 'pointer' : 'default',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            backgroundColor: '#2185d0',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1em',
        }}
      >
        <button
          className="ui icon button inverted"
          aria-label="Previous"
          type="button"
          onClick={handlePrevious}
          disabled={navDisabled}
        >
          <i className="step backward icon" aria-hidden="true"></i>
        </button>
        {selectedSong && selectedSong.artworkUrl && (
          <img
            className="ui avatar image"
            src={selectedSong.artworkUrl}
            alt={`${selectedSong.title} artwork`}
            style={{ width: '2.5em', height: '2.5em', objectFit: 'cover' }}
          />
        )}
        <span style={{ flex: 1, fontWeight: 'bold' }} aria-live="polite">
          {selectedSong ? (
            <>
              {selectedSong.title}
              {selectedSong.artist && <span style={{ fontWeight: 'normal' }}> &mdash; {selectedSong.artist}</span>}
            </>
          ) : (
            'No song selected'
          )}
        </span>
        <button
          className="ui icon button inverted"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          type="button"
          onClick={handleTogglePlay}
          disabled={!selectedSong}
        >
          <i className={`${isPlaying ? 'pause' : 'play'} icon`} aria-hidden="true"></i>
        </button>
        <button
          className="ui icon button inverted"
          aria-label="Next"
          type="button"
          onClick={handleNext}
          disabled={navDisabled}
        >
          <i className="step forward icon" aria-hidden="true"></i>
        </button>
        <button
          className="ui icon button inverted"
          type="button"
          onClick={() => dispatch(cycleRepeatMode())}
          aria-label={`Repeat: ${repeatMode}`}
        >
          Repeat: {repeatMode}
        </button>
        <button
          className={`ui icon button inverted${shuffle ? ' active' : ''}`}
          type="button"
          onClick={() => dispatch(toggleShuffle())}
          aria-label={`Shuffle: ${shuffle ? 'on' : 'off'}`}
          aria-pressed={shuffle}
        >
          Shuffle: {shuffle ? 'on' : 'off'}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
          <i className="volume up icon" aria-hidden="true"></i>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="ui range input"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
