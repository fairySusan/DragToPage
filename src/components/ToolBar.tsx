import React from 'react'
import { Button } from 'antd'
import { connector, PropsFromRedux } from './Type'
import { ChangeEvent } from 'react'

interface Props extends PropsFromRedux {
}

class ToolBar extends React.Component<Props> {

  onChangeCanvasWidth = (event: ChangeEvent<HTMLInputElement>) => {
    const {changeCanvasStyle, canvasStyle} = this.props
    canvasStyle.width = event.target.value
    changeCanvasStyle(canvasStyle)
  }

  onChangeCanvasHeight = (event: ChangeEvent<HTMLInputElement>) => {
    const {changeCanvasStyle, canvasStyle} = this.props
    canvasStyle.height = event.target.value
    changeCanvasStyle(canvasStyle)
  }

  onChangeCanvasScale = (event: ChangeEvent<HTMLInputElement>) => {
    const {changeCanvasStyle, canvasStyle} = this.props
    canvasStyle.scale = event.target.value
    changeCanvasStyle(canvasStyle)
  }

  undo = () => {
    this.props.Undo()
  }

  redo = () => {
    this.props.Redo()
  }

  clearAllCanvas = () => {
    this.props.clearAllComponent()
    // 记录快照
    this.props.RecordSnapshot()
  }


  render () {
    const { canvasStyle } = this.props
    return (
      <div className="toolbar">
        <Button onClick={this.undo}>撤销</Button>
        <Button onClick={this.redo}>重做</Button>
        <label htmlFor="input" className="insert">插入图片</label>
        <input type="file" id="input" hidden />
        <Button>预览</Button>
        <Button>保存</Button>
        <Button onClick={this.clearAllCanvas}>清空画布</Button>
        <div className="canvas-config">
          <span>画布大小</span>
          <input type="text" value={canvasStyle.width} onChange={this.onChangeCanvasWidth} />
          <span>*</span>
          <input type="text" value={canvasStyle.height} onChange={this.onChangeCanvasHeight} />
        </div>
        <div className="canvas-config">
          <span>画布比例</span>
          <input type="text" value={canvasStyle.scale} onChange={this.onChangeCanvasScale}/>%
        </div>
      </div>
    )
  }
}

export default connector(ToolBar)