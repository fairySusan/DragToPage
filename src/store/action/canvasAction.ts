import {ChangeCanvasStyle} from '../constant'
import {canvasStyleInterface} from '../Type'

export const changeCanvasStyleAction = (styleData: canvasStyleInterface) => {
  return {type: ChangeCanvasStyle, canvasStyleData: styleData}
}