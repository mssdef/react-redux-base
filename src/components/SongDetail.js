import React from 'react';
import {connect } from 'react-redux';

const SongDetail = ({ song }) => {
  if (song) {
    return <div><h4>{song.title}</h4>length: {song.duration}</div>;
  }

  return <div/>;
};

const mapStateToProps = (state) => {
    return { song: state.selectedSong }
};

export default connect(mapStateToProps)(SongDetail);
