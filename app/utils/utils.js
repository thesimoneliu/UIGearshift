export function getSVGMatrix(svgElement) {
  const MATRIX = svgElement.getAttribute('transform')

  return MATRIX.replace(/^matrix\(/, '')
    .replace(/\)$/, '')
    .split(',')
    .map(parseFloat)
}

export function transformFromViewportToSVGElement(mouseX, mouseY, sctm, svgMatrix) {
  const point = new DOMPoint(mouseX, mouseY)
  // const screenCTM = svgElement.getScreenCTM()
  // const svgElementMatrix = getSVGMatrix(svgElement)
  const transformedPoint = point.matrixTransform(sctm.inverse())
  // console.log(point, sctm, sctm.inverse(), transformedPoint)
  if (svgMatrix !== null) {
    transformedPoint.x *= svgMatrix[0] // scale x
    transformedPoint.y *= svgMatrix[3] // scale y
  }
  return { x: transformedPoint.x, y: transformedPoint.y }
}

export function changeBtnColor(motionStateName, control) {
  if (motionStateName !== 'normal') {
    // turn blue
    let controlId = control.getAttribute('id')
    let gradientId = controlId.replace(/^btn(\w)$/, '#linear-gradient-$1')
    let gradientVals = document.querySelector(`${gradientId}`).querySelectorAll('stop')

    gradientVals[0].setAttribute('stop-color', '#88aaf0')
    gradientVals[1].setAttribute('stop-color', '#0d57f1')
  } else if (motionStateName === 'normal') {
    // turn grey
    console.log(control)
    let controlId = control.getAttribute('id')
    let gradientId = controlId.replace(/^btn(\w)$/, '#linear-gradient-$1')
    let gradientVals = document.querySelector(`${gradientId}`).querySelectorAll('stop')

    gradientVals[0].setAttribute('stop-color', '#93969b')
    gradientVals[1].setAttribute('stop-color', '#1f1f1f')
  }
}
