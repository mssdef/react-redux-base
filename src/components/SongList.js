import React, { Component } from 'react';
import Redux from 'redux'; // Import the Redux library.

// Import other libraries or utilities here

const reducer = (state = initialState, action) => { // Define the reducer function.
  switch(action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, { [action.payload]: true });
    case 'REMOVE_TODO':
      return Object.assign({}, state, { [action.payload]: false });
    default:
      return state; // Return the initial state if an action of unknown type is received.
  }
};

const store = Redux.createStore(reducer); // Create a new Redux store instance with the reducer function.

// Define our application component and wrap it in our Root component
class App extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.onClick()}>Add a todo</button>
        <Redux dispatch={this.props.dispatch} store={store}>
          <div>Todo list:</div>
          <ul>
            {this.props.todos.map((todo) => (<li key={todo.id}>{todo.text}</li>))}
          </ul>
        </Redux>
      </div>
    );
  }
}