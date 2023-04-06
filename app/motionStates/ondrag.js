function initMotion() {
  changeBtnColor('init')
  console.log('initMotion')
}

function onDragMotion() {
  changeBtnColor('init')

  // pass transformed mouse positions to SVG wrapper
  CONTROLS_WRAPPER_PARAMS.matrix[5] =
    parseFloat(SVG_MOUSE_Y.current) - parseFloat(CONTROLS.getAttribute('y')) - CONTROLS.height.animVal.value / 2
  CONTROLS_WRAPPER.setAttribute('transform', `matrix(${CONTROLS_WRAPPER_PARAMS.matrix.join(',')})`)
  // }
}
