import React from 'react';
import { connector, PropsFromRedux } from './Type'
import { canvasStyleInterface } from 'src/store/Type'
import { componentTy } from 'src/store/reducer/stateType'
import { changeStyleWithScale } from 'src/utils/tanslate'
import { componentFactory } from 'src/components/componentFactory'
import GridLine from './GridLine'
import Shape from './Shape'

interface Props extends PropsFromRedux {
}

class Editor extends React.Component<Props> {

  render () {
    const { canvasStyle, componentsData, currentComponent } = this.props
    return (
      <div className="editor" id="editor" style={{width: changeStyleWithScale(canvasStyle.width) + 'px', height: changeStyleWithScale(canvasStyle.height) + 'px'}}>
        <GridLine/>
        {
          componentsData.length > 0 && componentsData.map((item, i) => {
            const ChildCom = componentFactory(item.component, item)
            return (
              <Shape
                key={item.id}
                component={item}
                active={item.id === currentComponent.id}
              >
                <ChildCom></ChildCom>
              </Shape>
            )
          })
        }
      </div>
    )
  }
}

export default connector(Editor)