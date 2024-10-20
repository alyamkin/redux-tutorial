import { combinedReducers } from 'redux'

import todosReducer from './features/todos/todoSlice'
import filtersReducer from './features/filters/filterSlice'

const rootReducer = combinedReducers({
  todos: todosReducer,
  filters: filtersReducer,
})

export default rootReducer
