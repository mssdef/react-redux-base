import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SongList from './SongList';
import SongDetail from './SongDetail';
import ErrorBoundary from './ErrorBoundary';
import MiniPlayer from './MiniPlayer';
import LoadingSpinner from './LoadingSpinner';

const App = () => {
  const songs = useSelector(state => state.songs);
  const [isCatalogLoading, setIsCatalogLoading] = useState(true);

  useEffect(() => {
    if (songs) {
      setIsCatalogLoading(false);
    }
  }, [songs]);

  if (isCatalogLoading) {
    return <LoadingSpinner text="Loading catalog..." />;
  }

  return (
    <div className="ui container grid" style={{ paddingBottom: '4em' }}>
      <div className="ui row">
        <div className="column eight wide">
          <ErrorBoundary>
            <SongList />
          </ErrorBoundary>
        </div>
        <div className="column eight wide">
          <ErrorBoundary>
            <SongDetail />
          </ErrorBoundary>
        </div>
      </div>
      <ErrorBoundary>
        <MiniPlayer />
      </ErrorBoundary>
    </div>
  );
};

export default App;
