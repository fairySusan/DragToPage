import {combineReducers, createStore} from 'redux'
import {globalData, componentsData, currentComponent} from './reducer/globalData'
import {Reducers} from './Type'

const rootReducer = combineReducers<Reducers>({
  globalData,
  componentsData, 
  currentComponent
});

export const store = createStore(rootReducer)


export type AppState = ReturnType<typeof rootReducer>