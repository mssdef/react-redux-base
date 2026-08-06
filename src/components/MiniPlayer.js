import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { previousSong, nextSong, shuffleNext } from '../actions';

const MiniPlayer = () => {
  const selectedSong = useSelector(state => state.selectedSong);
  const shuffle = useSelector(state => state.shuffle);
  const dispatch = useDispatch();

  const handlePrevious = () => dispatch(previousSong());
  const handleNext = () => dispatch(shuffle ? shuffleNext() : nextSong());

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
      >
        <i className="step backward icon" aria-hidden="true"></i>
      </button>
      <span style={{ flex: 1, fontWeight: 'bold' }} aria-live="polite">
        {selectedSong ? selectedSong.title : 'No song selected'}
      </span>
      <button
        className="ui icon button inverted"
        aria-label="Next"
        type="button"
        onClick={handleNext}
      >
        <i className="step forward icon" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default MiniPlayer;
