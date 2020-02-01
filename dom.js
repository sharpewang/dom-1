window.dom = {
  create(string){
    const container = document.createElement('template')
    // template 标签可容纳任何元素，div 则不行
    container.innerHTML = string
    return container.content.firstChild
  },
  after(node, node2){ //node 后添加 node2
    node.parentNode.insertBefore(node2, node.nextSibling)
  },
  before(node, node2){ //node 前添加 node2
    node.parentNode.insertBefore(node2, node)
  },
  append(parent, child){ //给 parent 添加子元素 child
    parent.appendChild(child)
  },
  wrap(node, parent){ //给 node 新增父节点 parent
    dom.before(node, parent)
    dom.append(parent, node)
  },
  remove(node){ //删除 node
    node.parentNode.removeChild(node)
    return node
  },
  empty(node){ //删除 node 的所有子节点
    let arr = []
    let x = node.firstChild
    while(x){
      arr.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return arr
  },
  attr(node, name, value){ // 读、写属性
    if(arguments.length === 2){ //读取属性
      return node.getAttribute(name)
    }else if(arguments.length === 3){ //改写属性
      node.setAttribute(name, value)
    }
  },
  text(node, content){ //读写文本
    if(arguments.length === 1){ //读
      if('innerText' in node){
        return node.innerText        
      }else{
        return node.textContent
      }
    }else if(arguments.length === 2){ //改
      if('innerText' in node){
        node.innerText = content
      }else{
        node.textContent = content
      }
    }
  },
  html(node, html){ //读写 node 中的 HTML
    if(arguments.length === 1){ //读
      return node.innerHTML
    }else if(arguments.length ===2 ){
      node.innerHTML = html
    }
  },
  style(node, name, value){ //读写style
    if(arguments.length === 2){ 
      if(typeof name === 'string'){ //读 dom.style(node, 'color')
        return node.style[name]
      }else if(name instanceof Object){ //改 dom.style(node, {color: 'red'})
        for(let key in name){
          node.style[key] = name[key]
        }
      }
    }else if(arguments.length === 3){ //改法2
      node.style[name] = value
    }
  },
  class: {
    add(node, className){ //给 node 添加 class
      node.classList.add(className)
    },
    remove(node, className){ //移除 node 的某个 className
      node.classList.remove(className)
    },
    has(node, className){
      return node.classList.contains(className)
    }
  },
  on(node, eventName, fn){
    node.addEventListener(eventName, fn)
  },
  off(node, eventName ,fn){
    node.removeEventListener(eventName, fn)
  },
  find(selector, scope){
    return (scope || document).querySelectorAll(selector)
  },
  parent(node){
    return node.parentNode
  },
  children(node){
    return node.children
  },
  siblings(node){ //node.children 是伪数组
    return Array.from(node.parentNode.children).filter(n => n !== node)
  },
  next(node){
    let x = node.nextSibling
    while(x.nextSibling && x.nodeType === 3){
      x = x.nextSibling
    }
    return x
  },
  previous(node){
    let x = node.previousSibling
    while(x.previousSibling && x.nodeType === 3){
      x = x.previousSibling
    }
    return x
  },
  each(nodeList, fn){
    for(let i=0;i<nodeList.length;i++){
      fn.call(null, nodeList[i])
    }
  },
  index(node){
    let list = dom.children(node.parentNode)
    let i
    for(i=0;i<list.length;i++){
      if(list[i] === node){break}
    }
    return i
  }
}