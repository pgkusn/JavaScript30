let canvas = document.querySelector('#draw')
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext('2d')

let hue = 0
let lineWidth = 50
let direction = -1
let eraser = false
let isMouseDown = false
let lastX = 0
let lastY = 0

ctx.lineCap = 'round'
ctx.lineJoin = 'round'

function draw(e) {
  if (!isMouseDown) return

  // set strokeStyle
  if (!eraser) {
    hue = hue < 360 ? hue + 1 : 0
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
  }

  // set lineWidth
  if (lineWidth < 10 || lineWidth > 50) {
    direction *= -1
  }
  lineWidth += direction
  ctx.lineWidth = lineWidth

  ctx.beginPath()
  console.log(lastX, lastY)
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()
  ;[lastX, lastY] = [e.offsetX, e.offsetY]
}
function mousedown(e) {
  isMouseDown = true
  ;[lastX, lastY] = [e.offsetX, e.offsetY]
}

canvas.addEventListener('mousemove', draw)
document.addEventListener('mousedown', mousedown)
document.addEventListener('mouseup', () => (isMouseDown = false))

document.querySelector('#eraser').addEventListener('change', function () {
  eraser = this.checked
  ctx.strokeStyle = 'rgb(255, 255, 255)'
})
