import React from 'react'
import { EventKeys, EventUtil } from 'src/utils/eventUtil'
import { connector, PropsFromRedux } from './Type'
import { getComponentRotatedStyle } from 'src/utils/style'
import { componentTy } from 'src/store/reducer/stateType'

interface State {
  lines: string[],
  lineStatus: {
    [key: string]: boolean,
    xt: boolean,
    xc: boolean,
    xb: boolean,
    yl: boolean,
    yc: boolean,
    yr: boolean,
  }
}

interface Props extends PropsFromRedux {

}

class MarkLine extends React.Component<Props, State> {
  [x: string]: any;
  constructor (props: any) {
    super(props)
    // 一共6条线，x轴上中下三条，y轴左中右三条, diff:相距多少像素将自动吸附
    this.state = {
      lines: ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'],
      lineStatus: {
        xt: false,
        xc: false,
        xb: false,
        yl: false,
        yc: false,
        yr: false,
      },
    }
    this.lineRefs = {};
    this.diff = 3
    this.createLineRefs()
  }

  componentDidMount () {
    EventUtil.on(EventKeys.move, (isDownward: boolean, isRightward: boolean) => {
      this.showLine(isDownward, isRightward)
    })

    EventUtil.on(EventKeys.unMove, () => {
      this.hideLine()
    })

    console.log(this.lineRefs)
  }

  createLineRefs = () => {
    this.state.lines.forEach(l => {
      this.lineRefs[l] = React.createRef();
    })
  }

  showLine = (isDownward: boolean, isRightward: boolean) => {
    const { componentsData: components, currentComponent } = this.props
    const curComponentStyle = getComponentRotatedStyle((currentComponent as componentTy).style)
    const curComponentHalfwidth = curComponentStyle.width / 2
    const curComponentHalfHeight = curComponentStyle.height / 2

    this.hideLine()

    components.forEach((component) => {
      if (component === currentComponent) return

      const componentStyle = getComponentRotatedStyle(component.style)
      const { top, left, bottom, right } = componentStyle
      const componentHalfwidth = componentStyle.width / 2
      const componentHalfHeight = componentStyle.height / 2

      const conditions: {[key: string]: any} = {
        top: [
          {
            isNearly: this.isNearly(curComponentStyle.top, top),
            lineNode: this.lineRefs.xt.current, // xt
            line: 'xt',
            dragShift: top,
            lineShift: top,
          },
          {
            isNearly: this.isNearly(curComponentStyle.bottom, top),
            lineNode: this.lineRefs.xt.current, // xt
            line: 'xt',
            dragShift: top - curComponentStyle.height,
            lineShift: top,
          },
          {
            // 组件与拖拽节点的中间是否对齐
            isNearly: this.isNearly(curComponentStyle.top + curComponentHalfHeight, top + componentHalfHeight),
            lineNode: this.lineRefs.xc.current, // xc
            line: 'xc',
            dragShift: top + componentHalfHeight - curComponentHalfHeight,
            lineShift: top + componentHalfHeight,
          },
          {
            isNearly: this.isNearly(curComponentStyle.top, bottom),
            lineNode: this.lineRefs.xb.current, // xb
            line: 'xb',
            dragShift: bottom,
            lineShift: bottom,
          },
          {
            isNearly: this.isNearly(curComponentStyle.bottom, bottom),
            lineNode: this.lineRefs.xb.current, // xb
            line: 'xb',
            dragShift: bottom - curComponentStyle.height,
            lineShift: bottom,
          },
        ],
        left: [
          {
            isNearly: this.isNearly(curComponentStyle.left, left),
            lineNode: this.lineRefs.yl.current, // yl
            line: 'yl',
            dragShift: left,
            lineShift: left,
          },
          {
            isNearly: this.isNearly(curComponentStyle.right, left),
            lineNode: this.lineRefs.yl.current, // yl
            line: 'yl',
            dragShift: left - curComponentStyle.width,
            lineShift: left,
          },
          {
            // 组件与拖拽节点的中间是否对齐
            isNearly: this.isNearly(curComponentStyle.left + curComponentHalfwidth, left + componentHalfwidth),
            lineNode: this.lineRefs.yc.current, // yc
            line: 'yc',
            dragShift: left + componentHalfwidth - curComponentHalfwidth,
            lineShift: left + componentHalfwidth,
          },
         {
            isNearly: this.isNearly(curComponentStyle.left, right),
            lineNode: this.lineRefs.yr.current, // yr
            line: 'yr',
            dragShift: right,
            lineShift: right,
          },
          {
            isNearly: this.isNearly(curComponentStyle.right, right),
            lineNode: this.lineRefs.yr.current, // yr
            line: 'yr',
            dragShift: right - curComponentStyle.width,
            lineShift: right,
          },
        ]
      }

      const needToShow: string[] = []
      // const { rotate } = (currentComponent as componentTy).style
      Object.keys(conditions).forEach(key => {
        conditions[key].forEach((condition: any) => {
          if (!condition.isNearly) return
          this.props.SetCurrComponentSingleStyle(key, condition.dragShift)

          condition.lineNode.style[key] = `${condition.lineShift}px`
          needToShow.push(condition.line)
        })
      })

      // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
      // 同一方向上的线只显示一条，例如多条横条只显示一条横线
      if (needToShow.length) { 
        this.chooseTheTureLine(needToShow, isDownward, isRightward)
      }
    })
  }

  chooseTheTureLine (needToShow: string[], isDownward: boolean, isRightward: boolean) {
    // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
    // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
    if (isRightward) {
      if (needToShow.includes('yr')) {
          this.setState((state) => {
            state.lineStatus.yr = true
            return { lineStatus: state.lineStatus }
          })
      } else if (needToShow.includes('yc')) {
        this.setState((state) => {
          state.lineStatus.yc = true
          return { lineStatus: state.lineStatus }
        })
      } else if (needToShow.includes('yl')) {
        this.setState((state) => {
          state.lineStatus.yl = true
          return { lineStatus: state.lineStatus }
        })
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (needToShow.includes('yl')) {
        this.setState((state) => {
          state.lineStatus.yl = true
          return { lineStatus: state.lineStatus }
        })
      } else if (needToShow.includes('yc')) {
        this.setState((state) => {
          state.lineStatus.yc = true
          return { lineStatus: state.lineStatus }
        })
      } else if (needToShow.includes('yr')) {
        this.setState((state) => {
          state.lineStatus.yr = true
          return { lineStatus: state.lineStatus }
        })
      }
    }

    if (isDownward) {
      if (needToShow.includes('xb')) {
        this.setState((state) => {
          state.lineStatus.yb = true
          return { lineStatus: state.lineStatus }
        })
      } else if (needToShow.includes('xc')) {
        this.setState((state) => {
          state.lineStatus.yc = true
          return { lineStatus: state.lineStatus }
        })
      } else if (needToShow.includes('xt')) {
        this.setState((state) => {
          state.lineStatus.xt = true
          return { lineStatus: state.lineStatus }
        })
      }
    } else {
        // eslint-disable-next-line no-lonely-if
        if (needToShow.includes('xt')) {
          this.setState((state) => {
            state.lineStatus.xt = true
            return { lineStatus: state.lineStatus }
          })
        } else if (needToShow.includes('xc')) {
          this.setState((state) => {
            state.lineStatus.xc = true
            return { lineStatus: state.lineStatus }
          })
        } else if (needToShow.includes('xb')) {
          this.setState((state) => {
            state.lineStatus.xb = true
            return { lineStatus: state.lineStatus }
          })
        }
    }
  }

  isNearly(dragValue: number, targetValue: number) {
    return Math.abs(dragValue - targetValue) <= this.diff
  }

  hideLine = () => {
    Object.keys(this.state.lineStatus).forEach(line => {
      this.setState(state => {
        state.lineStatus[line] = false
        return { lineStatus: state.lineStatus}
      })
     })
  }

  render () {
    const { lines, lineStatus } = this.state
    return (
      <div className="mark-line">
        {
          lines.map(line => (
            <div
              key={line}
              style={{display: lineStatus[line] ? 'block' : 'none'}}
              className={['line',line.includes('x') ? 'xline' : 'yline'].join(' ')}
              ref={this.lineRefs[line]}
            ></div>
          )) 
        }
      </div>
    )
  }
}

export default connector(MarkLine)