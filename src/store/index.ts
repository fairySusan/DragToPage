import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {globalData, componentsData, currentComponent, currentComponentIndex} from './reducer/globalData'
import {contextMenuDisplay} from './reducer/contextMenu'
import {snapshotData } from './reducer/snapshotData'
import {Reducers} from './Type'

const rootReducer = combineReducers<Reducers>({
  globalData,
  componentsData, 
  currentComponent,
  contextMenuDisplay,
  snapshotData,
  currentComponentIndex,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


export type AppState = ReturnType<typeof rootReducer>