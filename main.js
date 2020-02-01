//find 测试
const redDiv1 = dom.find('#test>.red', test)[0]
const redAllDiv = dom.find('#test>.red', test)
const greenDiv = dom.find('#test>.green', test)[0]
const blueDiv = dom.find('#test>.blue', test)[0]
console.log('redDiv1:')
console.log(redDiv1)
console.log('redAllDiv:')
console.log(redAllDiv)

//style 测试
const redDivStyle = dom.style(redDiv1, 'color')
console.log(redDivStyle)
dom.style(greenDiv, 'color', 'green')
dom.style(blueDiv, {color: 'blue'})

//each 测试
dom.each(test2.children, n => console.log(n))