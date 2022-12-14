export const errorImg = {
  // 钩子函数会在插入指令中执行
  inserted(dom, options) {
    dom.src = dom.src || options.value
    // dom对应的是手册中的el属性  options对应的是手册中的binding
    // js原生写法 onerror是事件
    dom.onerror = function () {
      dom.src = options.value
    }
  },
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
