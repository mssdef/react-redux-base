import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // In a real app, you might want to send this to an error reporting service
    // like Sentry, LogRocket, etc.
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="ui container" role="alert" aria-live="assertive">
          <div className="ui negative message">
            <div className="header">Something went wrong</div>
            <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>
            <button 
              className="ui button"
              onClick={this.handleRefresh}
              type="button"
              aria-label="Refresh the page to recover from error"
            >
              <i className="refresh icon" aria-hidden="true"></i>
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary; 