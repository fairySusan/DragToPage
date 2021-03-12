import React from 'react';
import { connector } from './Type'
import { canvasStyleInterface } from 'src/store/Type'
import { componentTy } from 'src/store/reducer/stateType'
import { changeStyleWithScale } from 'src/utils/tanslate'
import { componentFactory } from 'src/components/componentFactory'
import GridLine from './GridLine'
import Shape from './Shape'

interface Props {
  canvasStyle: canvasStyleInterface,
  componentData: componentTy[]
}

class Editor extends React.Component<Props> {

  render () {
    const { canvasStyle, componentData } = this.props
    console.log(componentData)
    return (
      <div className="editor" id="editor" style={{width: changeStyleWithScale(canvasStyle.width) + 'px', height: changeStyleWithScale(canvasStyle.height) + 'px'}}>
        <GridLine/>
        {
          componentData.length > 0 && componentData.map((item, i) => {
            const childCom: any = componentFactory(item.component, item)
            return (
              <Shape key={i} config={item}>
                <childCom></childCom>
              </Shape>
            )
          })
        }
      </div>
    )
  }
}

export default connector(Editor)