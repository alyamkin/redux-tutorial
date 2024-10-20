const initialState = [
  { id: 0, text: 'Learn React', completed: true },
  { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
]

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function todosReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case 'todos/todoAdded': {
      return [
        ...state,
        {
          id: nextTodoId(state.todos),
          text: payload,
          completed: false,
        },
      ]
    }
    case 'tdos/todoToggled': {
      return state.map((todo) => {
        if (todo.id === payload) {
          return { ...todo, completed: !todo.completed }
        } else {
          return todo
        }
      })
    }
    case 'todos/colorSelected': {
      const { color, todoId } = payload
      return state.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, color }
        } else {
          return todo
        }
      })
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== payload)
    }
    case 'todos/allCompleted': {
      return state.map((todo) => ({ ...todo, completed: true }))
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }
    default:
      return state
  }
}
