import { error } from 'console'

type Mapping = {
  [key: string]: string
}
const name2pinyin: Mapping = {
  // 使用新版map数据需要更改这里的中文转译(如广西-->广西壮族自治区)
  安徽: 'anhui',
  陕西: 'shanxi1',
  澳门: 'aomen',
  北京: 'beijing',
  重庆: 'chongqing',
  福建: 'fujian',
  甘肃: 'gansu',
  广东: 'guangdong',
  广西: 'guangxi',
  贵州: 'guizhou',
  海南: 'hainan',
  河北: 'hebei',
  黑龙江: 'heilongjiang',
  河南: 'henan',
  湖北: 'hubei',
  湖南: 'hunan',
  江苏: 'jiangsu',
  江西: 'jiangxi',
  吉林: 'jilin',
  辽宁: 'liaoning',
  内蒙古: 'neimenggu',
  宁夏: 'ningxia',
  青海: 'qinghai',
  山东: 'shandong',
  上海: 'shanghai',
  山西: 'shanxi',
  四川: 'sichuan',
  台湾: 'taiwan',
  天津: 'tianjin',
  香港: 'xianggang',
  新疆: 'xinjiang',
  西藏: 'xizang',
  云南: 'yunnan',
  浙江: 'zhejiang'
}

// 动态导入不知道为什么无法使用路径别名,只有用这种笨比方法写了
// 任何动态参数的形式都不行import()括号里面任何的参数都不行
// 真的很邪门
export const getProvinceJson = (provinceName: string) => {
  try {
    switch (provinceName) {
      case 'anhui':
        return import('@_public/static/map/province/anhui.json')
      case 'shanxi1':
        return import('@_public/static/map/province/shanxi1.json')
      case 'aomen':
        return import('@_public/static/map/province/aomen.json')
      case 'beijing':
        return import('@_public/static/map/province/beijing.json')
      case 'chongqing':
        return import('@_public/static/map/province/chongqing.json')
      case 'fujian':
        return import('@_public/static/map/province/fujian.json')
      case 'gansu':
        return import('@_public/static/map/province/gansu.json')
      case 'guangdong':
        return import('@_public/static/map/province/guangdong.json')
      case 'guangxi':
        return import('@_public/static/map/province/guangxi.json')
      case 'guizhou':
        return import('@_public/static/map/province/guizhou.json')
      case 'hainan':
        return import('@_public/static/map/province/hainan.json')
      case 'hebei':
        return import('@_public/static/map/province/hebei.json')
      case 'heilongjiang':
        return import('@_public/static/map/province/heilongjiang.json')
      case 'henan':
        return import('@_public/static/map/province/henan.json')
      case 'hubei':
        return import('@_public/static/map/province/hubei.json')
      case 'hunan':
        return import('@_public/static/map/province/hunan.json')
      case 'jiangsu':
        return import('@_public/static/map/province/jiangsu.json')
      case 'jiangxi':
        return import('@_public/static/map/province/jiangxi.json')
      case 'jilin':
        return import('@_public/static/map/province/jilin.json')
      case 'liaoning':
        return import('@_public/static/map/province/liaoning.json')
      case 'neimenggu':
        return import('@_public/static/map/province/neimenggu.json')
      case 'ningxia':
        return import('@_public/static/map/province/ningxia.json')
      case 'qinghai':
        return import('@_public/static/map/province/qinghai.json')
      case 'shandong':
        return import('@_public/static/map/province/shandong.json')
      case 'shanghai':
        return import('@_public/static/map/province/shanghai.json')
      case 'shanxi':
        return import('@_public/static/map/province/shanxi.json')
      case 'sichuan':
        return import('@_public/static/map/province/sichuan.json')
      case 'taiwan':
        return import('@_public/static/map/province/taiwan.json')
      case 'tianjin':
        return import('@_public/static/map/province/tianjin.json')
      case 'xianggang':
        return import('@_public/static/map/province/xianggang.json')
      case 'xinjiang':
        return import('@_public/static/map/province/xinjiang.json')
      case 'xizang':
        return import('@_public/static/map/province/xizang.json')
      case 'yunnan':
        return import('@_public/static/map/province/yunnan.json')
      case 'zhejiang':
        return import('@_public/static/map/province/zhejiang.json')
      default:
        console.error('未找到该省份数据')
        break
    }
  } catch (error) {
    return error
  }
}
export const isValid = (arg: string) => {
  return Object.keys(name2pinyin).indexOf(arg) !== -1
}
export const getProvinceMapInfo = (arg: string) => {
  const path = name2pinyin[arg]
  return {
    key: name2pinyin[arg],
    path: path
  }
}
