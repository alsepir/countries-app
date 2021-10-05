import { createStore, combineReducers, applyMiddleware } from 'redux'
import countries from './reducers/countries'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/root'

const rootReducer = combineReducers({
  countries,
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof rootReducer>

export default store
