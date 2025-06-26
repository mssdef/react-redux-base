import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong, filterSongs } from '../actions';

class SongList extends Component {
  handleSearchChange = (e) => {
    this.props.filterSongs(e.target.value);
  };

  getFilteredSongs() {
    const { songs, searchTerm } = this.props;
    if (!searchTerm) return songs;
    
    return songs.filter(song => 
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  renderList() {
    const filteredSongs = this.getFilteredSongs();
    
    if (filteredSongs.length === 0) {
      return (
        <div className="ui placeholder">
          <div className="paragraph">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      );
    }

    return filteredSongs.map((song) => {
      return (
        <div className="item" key={song.title}>
          <div className="right floated content">
            <button 
              onClick={() => this.props.selectSong(song)}
              className="ui button primary"
              aria-label={`Select ${song.title}`}
            >
              Select
            </button>
          </div>

          <div className="content">{song.title}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="ui fluid search">
          <div className="ui icon input">
            <input 
              className="prompt" 
              type="text" 
              placeholder="Search songs..."
              value={this.props.searchTerm}
              onChange={this.handleSearchChange}
            />
            <i className="search icon"></i>
          </div>
        </div>
        <div className="ui divided list" style={{ marginTop: '1rem' }}>
          {this.renderList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    songs: state.songs,
    searchTerm: state.searchTerm
  };
}

export default connect(mapStateToProps, { selectSong, filterSongs })(SongList);
