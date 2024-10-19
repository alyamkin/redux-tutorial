import { createStore } from 'https://unpkg.com/redux@latest/dist/redux.browser.mjs';

const valueEl = document.getElementById('counter');
const incrementBtnEl = document.getElementById('incrementBtn');
const decrementBtnEl = document.getElementById('decrementBtn');

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

const store = createStore(counterReducer);

const incrementCounter = () => {
  store.dispatch({ type: 'counter/increment' });
};

const decrementCounter = () => {
  store.dispatch({ type: 'counter/decrement' });
};

const render = () => {
  const state = store.getState();
  valueEl.textContent = state.value.toString();
};

const init = () => {
  incrementBtnEl.addEventListener('click', incrementCounter);
  decrementBtnEl.addEventListener('click', decrementCounter);
  store.subscribe(render);
  render();
};

init();
