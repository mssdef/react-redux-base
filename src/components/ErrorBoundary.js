import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.CompomenT {
   constructor(props) {
     super(props);
     this.state = { hasError: false, error: null };
   }

   static getDerivedStateFromError(error) {
     return { hasError: true, error };
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
             <p>{this.state.error}</p>
           </div>
         </div>
       );
     }

     return this.props.children;
   }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;