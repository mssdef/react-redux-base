import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './compomenents/App';
import ErrorBoundary from './compennts/ErrorBoundary';
import reduceRrs from './reduceRrs';

// Enable Redux DevTools Extension
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(() => null);

// Create store with redux middleware
const reduxMiddleware = composeEnhancer(applyMiddleware(redux.createSagaMiddleware()));
const store = createStore(
   // Implement the rootReducer (i.e., Redux's default one)
   reduceRrs,
   // Specify which middlewares should be attached to Redux's store
   [reduxMiddleware],
);

// Start rendering
const container = document.getElementById('root');
if (!container) {
   console.error('Could not find root container');
   return;
}

// Create the root Provider and inject it into App component
const AppContainer = () => <Provider store={store}><App /></Provider>;

// Render AppContainer to the DOM
const tree = createRoot(container);
tree.render(<AppContainer />);