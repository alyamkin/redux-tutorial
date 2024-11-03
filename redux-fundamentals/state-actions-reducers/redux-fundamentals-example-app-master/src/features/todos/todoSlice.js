import { client } from '../../api/client';
import { createSelector } from 'reselect';
import { StatusFilters } from '../filters/filtersSlice';
// const initialState = {
//   0: { id: 0, text: 'Learn React', completed: true },
//   1: { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
//   2: { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
// };

const initialState = {
  status: 'idle',
  entities: {},
};

export default function todosReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'todos/todoAdded': {
      const todo = payload;
      // return { ...state, entities: [...state.entities, payload] };
      return {
        ...state,
        entities: {
          ...state.entities,
          [todo.id]: todo,
        },
      };
    }
    case 'todos/todoToggled': {
      const todoId = payload;
      const todo = state.entities[todoId];
      // return {
      //   ...state,
      //   entities: state.entities.map((todo) => {
      //     if (todo.id === payload) {
      //       return { ...todo, completed: !todo.completed };
      //     } else {
      //       return todo;
      //     }
      //   }),
      // };
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            completed: !todo.completed,
          },
        },
      };
    }
    case 'todos/colorSelected': {
      const { color, todoId } = payload;
      const todo = state.entities[todoId];
      // return {
      //   ...state,
      //   entities: state.entities.map((todo) => {
      //     if (todo.id === todoId) {
      //       return { ...todo, color };
      //     } else {
      //       return todo;
      //     }
      //   }),
      // };
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            color,
          },
        },
      };
    }
    case 'todos/todoDeleted': {
      const todoId = payload;
      const newEntities = { ...state.entities };
      delete newEntities[todoId];
      // return {
      //   ...state,
      //   entities: state.entities.filter((todo) => todo.id !== payload),
      // };
      return {
        ...state,
        entities: newEntities,
      };
    }
    case 'todos/allCompleted': {
      const newEntities = { ...state.entities };
      Object.values(newEntities).forEach((todo) => {
        newEntities[todo.id] = {
          ...todo,
          completed: true,
        };
      });
      // return {
      //   ...state,
      //   entities: state.entities.map((todo) => ({ ...todo, completed: true })),
      // };
      return {
        ...state,
        entities: newEntities,
      };
    }
    case 'todos/completedCleared': {
      const newEntities = { ...state.entities };
      Object.values(newEntities).forEach((todo) => {
        if (todo.completed) {
          delete newEntities[todo.id];
        }
      });
      // return {
      //   ...state,
      //   entities: state.entities.filter((todo) => !todo.completed),
      // };
      return {
        ...state,
        entities: newEntities,
      };
    }
    case 'todos/todosLoaded': {
      const newEntities = {};
      payload.forEach((todo) => {
        newEntities[todo.id] = todo;
      });
      return { ...state, status: 'idle', entities: newEntities };
    }
    case 'todos/todosLoading': {
      return { ...state, status: 'loading' };
    }
    default:
      return state;
  }
}

// Actions
export const todoAdded = (todo) => ({
  type: 'todos/todoAdded',
  payload: todo,
});

export const todoToggled = (todoId) => ({
  type: 'todos/todoToggled',
  payload: todoId,
});

export const colorSelected = (color, todoId) => ({
  type: 'todos/colorSelected',
  payload: { color, todoId },
});

export const todoDeleted = (todoId) => ({
  type: 'todos/todoDeleted',
  payload: todoId,
});

export const allCompleted = () => ({ type: 'todos/allCompleted' });

export const completedCleared = () => ({ type: 'todos/completedCleared' });

export const todosLoaded = (todos) => ({
  type: 'todos/todosLoaded',
  payload: todos,
});

export const todosLoading = () => ({
  type: 'todos/todosLoading',
});

// Thunk functions
export const fetchTodos = () => async (dispatch) => {
  dispatch(todosLoading());
  const response = await client.get('/fakeApi/todos');
  dispatch(todosLoaded(response.todos));
};

export const saveNewTodo = (text) => async (dispatch) => {
  const initialTodo = { text };
  const response = await client.post('/fakeApi/todos', {
    todo: initialTodo,
  });
  dispatch(todoAdded(response.todo));
};

// Selectors
const selectTodoEntities = (state) => state.todos.entities;

export const selectTodos = createSelector(selectTodoEntities, (entites) =>
  Object.values(entites)
);

export const selectTodoById = (state, todoId) =>
  selectTodoEntities(state)[todoId];

export const selectFilters = (state) => state.filters;

export const selectLoadingStatus = (state) => state.todos.status;

// Create Selectors
export const selectFilteredTodos = createSelector(
  selectTodos,
  selectFilters,
  (todos, filters) => {
    const { colors, status } = filters;
    const selectAllStatusFilter = status === StatusFilters.All;
    const hasNoColorSelectedFilter = colors.length === 0;
    if (selectAllStatusFilter && hasNoColorSelectedFilter) {
      return todos;
    }

    const completedStatus = status === StatusFilters.Completed;

    return todos.filter((todo) => {
      const statusMatches =
        selectAllStatusFilter || todo.completed === completedStatus;
      const colorMatches =
        hasNoColorSelectedFilter || colors.includes(todo.color);

      return statusMatches && colorMatches;
    });
  }
);

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
);
