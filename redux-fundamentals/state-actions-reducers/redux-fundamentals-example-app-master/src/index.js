import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store';
import { fetchTodos } from './features/todos/todoSlice';

import './api/server';

// import store from './store'
// console.log('Initial state: ', store.getState())

// const unsubscribe = store.subscribe(() =>
//   console.log('State after dispatch: ', store.getState())
// )

// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about reducers' })
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about stores' })

// store.dispatch({ type: 'todos/todoToggled', payload: 0 })
// store.dispatch({ type: 'todos/todoToggled', payload: 1 })

// store.dispatch({ type: 'filters/statusFilterChanged', payload: 'Active' })

// store.dispatch({
//   type: 'filters/colorFilterChanged',
//   payload: { color: 'red', changeType: 'added' },
// })

// store.dispatch({
//   type: 'filters/colorFilterChanged',
//   payload: { color: 'red', changeType: 'added' },
// })

// unsubscribe()

// store.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })

// console.log('Dispatching action')
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
// console.log('Dispatch complete')

// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
// console.log('State after dispatch: ', store.getState())

// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions2' })

// store.dispatch({ type: 'todos/fetchTodos' });
store.dispatch(fetchTodos());

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
