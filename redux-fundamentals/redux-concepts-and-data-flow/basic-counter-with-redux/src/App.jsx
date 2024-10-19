import { useState } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import './App.css';

const initialState = {
  value: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'counter/increment':
      return { ...state, value: state.value + 1 };
    case 'counter/decrement':
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};

const store = configureStore(counterReducer);

function App() {
  const onIncrement = () => {
    store.dispatch({ type: 'counter/increment' });
  };

  const onDecrement = () => {
    store.dispatch({ type: 'counter/decrement' });
  };

  return (
    <>
      <p>Counter: {count}</p>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </>
  );
}

export default App;
