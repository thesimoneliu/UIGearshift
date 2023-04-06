function detectBoundingBox() {
  if (SVG_BOUND.y < MOUSE_Y.current && SVG_BOUND.y + SVG_BOUND.height > MOUSE_Y.current && SVG_BOUND.x < MOUSE_X.current && SVG_BOUND.x + SVG_BOUND.width > MOUSE_X.current) {
    withinInteractiveArea = true
  } else {
    withinInteractiveArea = false
  }
}

window.addEventListener('mousemove', function onTouchMove(e) {
  const { clientX, clientY } = e

  // temp value
  MOUSE_X.end = clientX
  MOUSE_Y.end = clientY
  // calculate moving distance
  let xDistance = MOUSE_X.start - MOUSE_X.end
  let yDistance = MOUSE_Y.start - MOUSE_Y.end
  // pass it to target val
  MOUSE_X.target = MOUSE_X.start - xDistance
  MOUSE_Y.target = MOUSE_Y.start - yDistance

  // pass the value to SVG Mouse
  SVG_MOUSE_Y.current = transformFromViewportToSVGElement(MOUSE_X.current, MOUSE_Y.current, CONTROLS_WRAPPER_PARAMS.screenCTM, CONTROLS_WRAPPER_PARAMS.matrix).y
  SVG_MOUSE_Y.target = transformFromViewportToSVGElement(MOUSE_X.target, MOUSE_Y.target, CONTROLS_WRAPPER_PARAMS.screenCTM, CONTROLS_WRAPPER_PARAMS.matrix).y
})

CONTROLS.addEventListener('mouseup', function onTouchEnd(e) {
  MOUSE_X.start = MOUSE_X.target
  MOUSE_Y.start = MOUSE_X.target
})

/* -------------
  ------------ WEBSOCKET
  -------------- */

const ws = new WebSocket('ws://localhost:4444')
ws.addEventListener('open', () => {
  // when websocket is connected
  console.log('WebSocket connection established in the front-end')
  socket.send(gearStatus) // send string
})
