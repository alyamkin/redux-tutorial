import { client } from '../../api/client';
import {
  createSelector,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { StatusFilters } from '../filters/filtersSlice';

// For reference
// const initialState = {
//   0: { id: 0, text: 'Learn React', completed: true },
//   1: { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
//   2: { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
// };

const entityAdapter = createEntityAdapter();

const initialState = entityAdapter.getInitialState({ status: 'idle' });

// For reference
// const initialState = {
//   ids: [],
//   entities: {},
//   status: 'idle',
// };

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoToggled(state, action) {
      const todoId = action.payload;
      const todo = state.entities[todoId];
      todo.completed = !todo.completed;
    },
    todoColorSelected: {
      reducer(state, action) {
        const { color, todoId } = action.payload;
        state.entities[todoId].color = color;
      },
      prepare(color, todoId) {
        return {
          payload: { todoId, color },
        };
      },
    },
    todoDeleted: entityAdapter.removeOne,
    allTodosCompleted(state, action) {
      Object.values(state.entities).forEach((todo) => {
        todo.completed = true;
      });
    },
    completedTodosCleared(state) {
      const completedIds = Object.values(state.entities)
        .filter((todo) => todo.completed)
        .map((todo) => todo.id);
      entityAdapter.removeMany(state, completedIds);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        entityAdapter.setAll(state, action.payload);
        state.status = 'idle';
      })
      .addCase(saveNewTodo.fulfilled, entityAdapter.addOne);
  },
});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get('/fakeApi/todos');
  return response.todos;
});

export const saveNewTodo = createAsyncThunk(
  'todos/saveNewTodo',
  async (text) => {
    const initialTodo = { text };
    const response = await client.post('/fakeApi/todos', {
      todo: initialTodo,
    });
    return response.todo;
  }
);

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

export const {
  todoAdded,
  todoToggled,
  todoColorSelected,
  todoDeleted,
  allTodosCompleted,
  completedTodosCleared,
  todosLoaded,
  todosLoading,
} = todosSlice.actions;

export default todosSlice.reducer;
