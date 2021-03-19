import {combineReducers, createStore} from 'redux'
import {globalData, componentsData, currentComponent} from './reducer/globalData'
import {contextMenuDisplay} from './reducer/contextMenu'
import {Reducers} from './Type'

const rootReducer = combineReducers<Reducers>({
  globalData,
  componentsData, 
  currentComponent,
  contextMenuDisplay
});

export const store = createStore(rootReducer)


export type AppState = ReturnType<typeof rootReducer>