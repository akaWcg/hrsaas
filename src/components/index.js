import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import print from 'vue-print-nb' // 引入打印插件
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload) // 注册导入上传组件
    Vue.use(print) // 注册 打印插件
    Vue.component('ScreenFull', ScreenFull) // 全屏
    Vue.component('ThemePicker', ThemePicker) // 动态主题的设置
  }
}
