import React from 'react'
import { componentTy } from 'src/store/reducer/stateType'
import { getStyle } from 'src/utils/style'


export function componentFactory (WrappedComponent: any, config: componentTy) {
  return class extends React.Component {
    getComponentStyle(style: any) {
      return getStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
    }
    render () {
      return (
        <WrappedComponent
          style={this.getComponentStyle(config.style)}
          propValue={config.propValue}
          {...this.props}
        />
      )
    }
  }
}