import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ message = 'Loading...', size = 'medium' }) => {
  return (
    <div className="ui segment" role="status" aria-live="polite">
      <div className={`ui ${size} active centered inline loader`} aria-hidden="true"></div>
      <p className="ui text center aligned" style={{ marginTop: '1rem' }}>
        {message}
      </p>
    </div>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'])
};

export default LoadingSpinner; 