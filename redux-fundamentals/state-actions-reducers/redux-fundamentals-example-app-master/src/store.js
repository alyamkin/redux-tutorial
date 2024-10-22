import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import rootReducer from './reducer'
import {
  print1,
  print2,
  print3,
  loggerMiddleware,
  alwaysReturnHelloMiddleware,
  delayedMessageMiddleware,
} from './exampleAddons/middleware'
// import {
//   sayHiOnDispatch,
//   includeMeaningOfLife,
// } from './exampleAddons/enhancers'

// const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife)
// const store = createStore(rootReducer, undefined, composedEnhancer)

const middlewareEnhancer = applyMiddleware()

const composedEnhancer = composeWithDevTools(middlewareEnhancer)

const store = createStore(rootReducer, composedEnhancer)

export default store
