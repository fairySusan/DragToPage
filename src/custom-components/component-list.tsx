import { FontSizeOutlined, GatewayOutlined, FileImageOutlined, BorderOutlined } from '@ant-design/icons'
import VText from './VText'
import VButton from './VButton'
import VImage from './VImage'
// 公共样式
export const commonStyle = {
  rotate: 0, 
  opacity: 1,
}

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
}

const list = [
  {
    component: VText,
    label: '文字',
    propValue: '双击编辑文字',
    icon: <FontSizeOutlined/>,
    style: {
      width: 200,
      height: 22,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: '',
    },
  },
  {
    component: VButton, 
    label: '按钮', 
    propValue: '按钮',
    icon: <GatewayOutlined />,
    style: {
        width: 100,
        height: 34,
        borderWidth: '',
        borderColor: '',
        borderRadius: '',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '',
        letterSpacing: 0,
        textAlign: '',
        color: '',
        backgroundColor: '',
    },
  },
  {
    component: VImage, 
    label: '图片', 
    icon: <FileImageOutlined />,
    propValue: require('src/assets/img/title.jpg'),
    style: {
      width: 300,
      height: 200,
      borderRadius: '',
    },
  },
  {
    component: VText,
    label: '矩形',
    propValue: '&nbsp;',
    icon: <BorderOutlined />,
    style: {
      width: 200,
      height: 200,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      borderColor: '#000',
      borderWidth: 1,
      backgroundColor: '',
      borderStyle: 'solid',
      verticalAlign: 'middle',
    },
  },
]

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i]
  item.style = { ...commonStyle, ...item.style }
  list[i] = { ...commonAttr, ...item }
}

export default list