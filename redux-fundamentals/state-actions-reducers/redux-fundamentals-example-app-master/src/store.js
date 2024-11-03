import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducer';
import { client } from './api/client';
import {
  print1,
  print2,
  print3,
  loggerMiddleware,
  alwaysReturnHelloMiddleware,
  delayedMessageMiddleware,
  fetchTodosMiddleware,
  asyncFunctionMiddleware,
} from './exampleAddons/middleware';
// import {
//   sayHiOnDispatch,
//   includeMeaningOfLife,
// } from './exampleAddons/enhancers'

// const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife)
// const store = createStore(rootReducer, undefined, composedEnhancer)

const middlewareEnhancer = applyMiddleware(thunk);

const composedEnhancer = composeWithDevTools(middlewareEnhancer);

const store = createStore(rootReducer, composedEnhancer);

// const fetchSomeData = (dispatch, getState) => {
//   // Make an async HTTP request
//   client.get('/fakeApi/todos').then((todos) => {
//     // Dispatch an action with the todos we received
//     dispatch({ type: 'todos/todosLoaded', payload: todos });
//     // Check the updated store state after dispatching
//     const allTodos = getState().todos;
//     console.log('Number of todos after loading: ', allTodos.length);
//   });
// };

// store.dispatch(fetchSomeData);

export default store;
