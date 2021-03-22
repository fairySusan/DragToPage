import {combineReducers, createStore} from 'redux'
import {globalData, componentsData, currentComponent} from './reducer/globalData'
import {contextMenuDisplay} from './reducer/contextMenu'
import {snapshotData } from './reducer/snapshotData'
import {Reducers} from './Type'

const rootReducer = combineReducers<Reducers>({
  globalData,
  componentsData, 
  currentComponent,
  contextMenuDisplay,
  snapshotData
});

export const store = createStore(rootReducer)


export type AppState = ReturnType<typeof rootReducer>