import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SongDetail = ({ song }) => {
  if (song) {
    return (
      <div className="ui segment">
        <h3 className="ui header" id="selected-song-header">Selected Song</h3>
        <div className="ui card fluid" role="region" aria-labelledby="selected-song-header">
          <div className="content">
            <div className="header" role="heading" aria-level="4">{song.title}</div>
            <div className="meta">
              <span className="duration">Duration: {song.duration}</span>
            </div>
            <div className="description">
              <p>Click the play button below to start listening to this track.</p>
            </div>
          </div>
          <div className="extra content">
            <button 
              className="ui button primary fluid"
              aria-label={`Play ${song.title}`}
              type="button"
            >
              <i className="play icon" aria-hidden="true"></i>
              Play Song
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ui segment">
      <h3 className="ui header" id="selected-song-header">Selected Song</h3>
      <div 
        className="ui placeholder" 
        role="status" 
        aria-label="No song selected"
        aria-labelledby="selected-song-header"
      >
        <div className="paragraph">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <p className="ui text center aligned">
          Please select a song from the list to view details.
        </p>
      </div>
    </div>
  );
};

SongDetail.propTypes = {
  song: PropTypes.shape({
    title: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired
  })
};

const mapStateToProps = (state) => {
  return { song: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);
