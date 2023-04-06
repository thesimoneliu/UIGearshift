function dragEndMotion() {
  const snapY = {
    min: {
      viewport: TOP_SECTION_BOUND.top,
    },
    max: {
      viewport: BOTTOM_SECTION_BOUND.bottom,
    },
  }
  // get Y min value in SVG coordinate
  snapY.min['svgCanvas'] = transformFromViewportToSVGElement(
    0,
    snapY.min.viewport,
    CONTROLS_WRAPPER_PARAMS.screenCTM,
    CONTROLS_WRAPPER_PARAMS.matrix
  ).y
  // get Y max value in SVG coordinate
  snapY.max['svgCanvas'] =
    transformFromViewportToSVGElement(0, snapY.max.viewport, CONTROLS_WRAPPER_PARAMS.screenCTM, CONTROLS_WRAPPER_PARAMS.matrix).y -
    parseFloat(CONTROLS.getAttribute('y')) -
    CONTROLS.height.animVal.value / 2

  const matrix = getSVGMatrix(CONTROLS_WRAPPER)
  //snap detection
  if (inRZone) {
    // if move into RZone thn snap to the upper section
    matrix[5] = snapY.min.svgCanvas
    console.log('in RZONE')
  } else if (inDZone) {
    // snap to the upper section
    matrix[5] = snapY.max.svgCanvas
    console.log('in DZONE')
  } else if (inNZone) {
    // if dragend falls into the medium half
    matrix[5] = 0
    console.log('in NZONE')
  }
  // implement snap
  CONTROLS_WRAPPER.setAttribute('transform', `matrix(${matrix.join(',')})`)
}
