export const print1 = (storeAPI) => (next) => (action) => {
  console.log('1')
  const result = next(action)
  console.log(result)
  return result
}

export const print2 = (storeAPI) => (next) => (action) => {
  console.log('2')
  return next(action)
}

export const print3 = (storeAPI) => (next) => (action) => {
  console.log('3')
  return next(action)
}

export const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', storeAPI.getState())
  return result
}

export const alwaysReturnHelloMiddleware = (storeAPI) => (next) => (action) => {
  const originalResult = next(action)
  return 'Hello!'
}

export const delayedMessageMiddleware = (storeAPI) => (next) => (action) => {
  if (action.type === 'todos/todoAdded') {
    setTimeout(() => {
      console.log('Added a new todo', action.payload)
    }, 4000)
  }

  return next(action)
}
