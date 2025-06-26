import React from 'react';
import { connect } from 'react-redux';

const SongDetail = ({ song }) => {
  if (song) {
    return (
      <div className="ui segment">
        <h3 className="ui header">Selected Song</h3>
        <div className="ui card fluid">
          <div className="content">
            <div className="header">{song.title}</div>
            <div className="meta">
              <span className="duration">Duration: {song.duration}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ui segment">
      <h3 className="ui header">Selected Song</h3>
      <div className="ui placeholder">
        <div className="paragraph">
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return { song: state.selectedSong }
};

export default connect(mapStateToProps)(SongDetail);
