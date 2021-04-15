import { AppState } from '../index'
import { Dispatch } from 'redux'
import { setAllComponents } from '../action/componentAction'
import { swap } from 'src/utils/util'
import { message } from 'antd'

export const upLayer = () => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const { componentsData, currentComponentIndex: i } = getState()
    if (i < componentsData.length - 1) {
      swap(componentsData, i, i+1)
      dispatch(setAllComponents(componentsData))
    } else {
      message.info({content: '已经到顶了'})
    }
  }
}

export const downLayer = () => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const { componentsData, currentComponentIndex: i } = getState()
    if (i > 0) {
      swap(componentsData, i, i-1)
      dispatch(setAllComponents(componentsData))
    } else {
      message.info({content: '已经到底了'})
    }
  }
}

export const upTop = () => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const { componentsData, currentComponentIndex: i } = getState()
    if (i < componentsData.length - 1) {
      swap(componentsData, i, componentsData.length-1)
      dispatch(setAllComponents(componentsData))
    } else {
      message.info({content: '已经到顶了'})
    }
  }
}

export const downBottom = () => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const { componentsData, currentComponentIndex: i } = getState()
    if (i > 0) {
      swap(componentsData, i, 0)
      dispatch(setAllComponents(componentsData))
    } else {
      message.info({content: '已经到底了'})
    }
  }
}