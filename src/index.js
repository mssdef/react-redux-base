const React = require('react');
const Redux = require('redux');
const ReduxThunk = require('redux-thunk');
const Immer = require('immer');
const Provider = Redux.createStore;

// Enable Redux DevTools Extension
const composeEnhancers = Redux.applyMiddle(ReduxThunk);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}; // initialize state as an empty object to avoid null references
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <App />
        </div>
      </Provider>
    );
  }
}

// Create the root Redux store and initialize it with initial state
const initialState = Immer.map(state => ({
  // Add your app's initial state here, including any necessary initialization steps
}));

// Start rendering
const container = Provider(
  (props) => <App {...props} />,
  { store: composeEnhancers(Redux.connect(initialState)) }
);
container.key = 'app'; // set a unique key to help identify the component in DevTools and other tools