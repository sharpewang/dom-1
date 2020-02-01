window.dom = {
  find(selector, scope){ //以选择器 selector 查找元素，scope 为查找范围
    return (scope || document).querySelectorAll(selector)
  },
  style(node, name, value){ //读写style
    if(arguments.length === 2){
      if(name instanceof Object){
        // 调用形式 dom.style(div, {color: 'red'})，修改style
        for(let key in name){
          node.style[key] = name[key]
        }
      }else if(typeof name === 'string'){
        // 调用形式 dom.style(div, 'color')，读取属性
        return node.style[name]
      }
    }else if(arguments.length === 3){
      // 调用形式 dom.style(div, 'color', 'red')
      node.style[name] = value
    }
  },
  each(nodeList, fn){ //遍历 nodeList 中所有元素
    for(let i=0;i<nodeList.length;i++){
      fn.call(null, nodeList[i])
    }
  }
}