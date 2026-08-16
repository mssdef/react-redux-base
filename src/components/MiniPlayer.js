import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { previousSong, nextSong, shuffleNext, cycleRepeatMode, toggleShuffle, setIsPlaying } from '../actions';

const MiniPlayer = () => {
  const selectedSong = useSelector(state => state.selectedSong);
  const shuffle = useSelector(state => state.shuffle);
  const repeatMode = useSelector(state => state.repeatMode);
  const songs = useSelector(state => state.songs);
  const isPlaying = useSelector(state => state.isPlaying);
  const dispatch = useDispatch();
  const navDisabled = !songs || songs.length < 2;

  const handlePrevious = () => dispatch(previousSong());
  const handleNext = () => dispatch(shuffle ? shuffleNext() : nextSong());
  const handleTogglePlay = () => dispatch(setIsPlaying(!isPlaying));

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
        display: 'flex',
        alignItems: 'center',
        gap: '1em',
        padding: '0.75em 1.5em',
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
    </div>
  );
};

export default MiniPlayer;
