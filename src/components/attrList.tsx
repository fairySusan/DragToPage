import React from 'react'
import { Form, Input, InputNumber, Select, Checkbox } from 'antd';
import { PropsFromRedux, connector } from './Type'
import { componentTy } from 'src/store/reducer/stateType';

const { Option } = Select;

interface Props extends PropsFromRedux {}

interface State {
  mapLabel: {
    [key: string]: string
  },
  numberInputs: string[],
  colorPickers: string[],
  selectors: string[],
  options: { [key: string]: {label: string; value: string}[]}
}

class AttrList extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      mapLabel: {
        rotate: '旋转角度',
        left: 'x 坐标',
        top: 'y 坐标',
        height: '高',
        width: '宽',
        color: '颜色',
        backgroundColor: '背景色',
        borderWidth: '边框宽度',
        borderColor: '边框颜色',
        borderRadius: '边框半径',
        fontSize: '字体大小',
        fontWeight: '字体粗细',
        lineHeight: '行高',
        letterSpacing: '字间距',
        textAlign: '对齐方式',
        opacity: '透明度',
      },
      numberInputs: [
        'rotate',
        'left',
        'top',
        'height',
        'width',
        'borderWidth',
        'borderRadius',
        'fontSize',
        'fontWeight',
        'lineHeight',
        'letterSpacing',
        'opacity'
      ],
      colorPickers: [
        'color',
        'borderColor',
        'backgroundColor'
      ],
      selectors: [
        'textAlign'
      ],
      options: {
        textAlign: [
          {
            label: '左对齐',
            value: 'left',
          },
          {
            label: '居中',
            value: 'center',
          },
          {
            label: '右对齐',
            value: 'right',
          }
        ]
      }
    }
  }

  onChange = (value: string, keyname: string) => {
    const { SetCurrComponentSingleStyle } = this.props
    SetCurrComponentSingleStyle(keyname, value)
  }

  render () {
    const { currentComponent } = this.props
    const { style } = currentComponent as componentTy
    const { mapLabel, numberInputs, colorPickers, selectors, options } = this.state
    return (
      <div className="attr-list">
        {
          currentComponent.id > -1
          ?
          <Form
            name="attributeList"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
          >
            {
              Object.keys(style).map((keyname, i) => (
                <Form.Item
                  label={mapLabel[keyname]}
                  key={i}
                >
                  {
                    numberInputs.includes(keyname)
                    && <InputNumber defaultValue={style[keyname]} onChange={(value: string) => this.onChange(value, keyname)}></InputNumber>
                  }
                  {
                    colorPickers.includes(keyname)
                    &&
                    <input
                      type='color'
                      value={style[keyname]}
                      onChange={(e) => this.onChange((e.nativeEvent.target as HTMLInputElement).value, keyname)}>
                    </input>
                  }
                  {
                    selectors.includes(keyname)
                    &&
                    <Select
                      defaultValue={style[keyname]}
                      style={{ width: 120 }}
                      onChange={(value: string) => this.onChange(value, keyname)}
                    >
                      {
                        options[keyname].map((option, opIndex) => (
                          <Option key={opIndex} value={option.value}>{option.label}</Option>
                        ))
                      }
                    </Select>
                  }
                </Form.Item>
              ))
            }
          </Form>
          :
          <div>请选择一个组件</div>
        }
      </div>
    )
  }
}

export default connector(AttrList)