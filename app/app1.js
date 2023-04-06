import GSAP from 'gsap'

// import { getSVGMatrix, transformFromViewportToSVGElement, changeBtnColor } from './utils'
// import Normal from './motionStates/normal'
// import Prep from './motionStates/prep'
// import { showPrepFailure, destroyPrepFailure } from './motionStates/prepFailure'
// import Init from './motionStates/init'
// import OnDrag from './motionStates/ondrag'
// import OnDragEnd from './motionStates/ondragEnd'

export default class App {
  constructor() {
    // moving target
    this.control_wrapper = document.querySelector('.btnController--active')
    this.control = this.control_wrapper.querySelector('rect')
    this.control_wrapper_params = {
      matrix: this.control_wrapper
        .getAttribute('transform')
        .replace(/^matrix\(/, '')
        .replace(/\)$/, '')
        .split(',')
        .map(parseFloat),
      screenCTM: this.control_wrapper.getScreenCTM(),
    }
    this.validArea = document.querySelector('.groove')
    // gear zones
    this.rZone = document.querySelector('#btnR')
    this.nZone = document.querySelector('#btnN')
    this.dZone = document.querySelector('#btnD')
    this.zoneRND = [false, true, false]
    // bounds
    this.bound = this.validArea.getBoundingClientRect()
    this.bound_control = this.control_wrapper.getBoundingClientRect()
    this.bound_rZone = this.rZone.getBoundingClientRect()
    this.bound_dZone = this.dZone.getBoundingClientRect()

    // viewport x & y
    this.mouseX = {
      start: null,
      current: 0,
      target: 0,
      lerp: 0.1,
    }
    this.mouseY = {
      start: null,
      current: 0,
      target: 0,
      lerp: 0.1,
    }
    // svg coordinate x & y
    this.mouseX_svg = {
      current: 0,
      target: 0,
      lerp: 0.1,
    }
    this.mouseY_svg = {
      current: 0,
      target: 0,
      lerp: 0.1,
    }

    this.addEventListeners(this.control_wrapper)
    this.addSnapListeners()

    this.update()
  }

  /* -------------
   ------------ EVENTS
   -------------- */

  onTouchStart({ clientX, clientY }) {
    console.log('touchstart')
    // get values
    this.mouseX.start = clientX
    this.mouseY.start = clientY

    // event states
    this.states.isTapped = true
    this.states.isMouseUp = false
    this.startModeDelay = window.setTimeout(() => {
      this.states.isTapped = false
      this.states.isLongPressed = true
    }, this.longPressTime)
  }
  onTouchMove({ clientX, clientY }) {
    console.log('touchmove')
    // get values
    this.mouseX.current = clientX
    this.mouseY.current = clientY

    // transform to svg mouse values
    this.mouseY_svg.current = this.transformFromViewportToSVGElement(
      this.mouseX.current,
      this.mouseY.current,
      this.control_wrapper_params.screenCTM,
      this.control_wrapper_params.matrix
    ).y
    console.log(clientX, clientY)
  }
  onTouchEnd({ clientX, clientY }) {
    console.log('touchend')
    this.mouseX.target = clientX
    this.mouseY.target = clientY
    this.mouseY_svg.target = this.transformFromViewportToSVGElement(
      this.mouseX.target,
      this.mouseY.target,
      this.control_wrapper_params.screenCTM,
      this.control_wrapper_params.matrix
    ).y

    // event states
    clearTimeout(this.startModeDelay)
    this.states.isLongPressed = false
    this.states.isMouseUp = true
    // dragend getback home latency
    window.setTimeout(() => {
      this.states.isMouseUp = false
    }, this.transitionMotionTime)
  }

  onMouseEnterR = (_) => (this.zoneRND = [true, false, false])
  onMouseEnterN = (_) => (this.zoneRND = [false, true, false])
  onMouseEnterD = (_) => (this.zoneRND = [false, false, true])

  /* -------------
  ------------ LISTENERS
  -------------- */

  addEventListeners(element) {
    element.addEventListener('mousedown', this.onTouchStart.bind(this))
    element.addEventListener('mousemove', this.onTouchMove.bind(this))
    element.addEventListener('mouseup', this.onTouchEnd.bind(this))
    element.addEventListener('touchstart', this.onTouchStart.bind(this))
    element.addEventListener('touchmove', this.onTouchMove.bind(this))
    element.addEventListener('touchend', this.onTouchEnd.bind(this))
  }

  addSnapListeners() {
    this.rZone.addEventListener('mouseenter', this.onMouseEnterR.bind(this))
    this.rZone.addEventListener('touchmove', this.onMouseEnterR.bind(this))
    this.nZone.addEventListener('mouseenter', this.onMouseEnterN.bind(this))
    this.nZone.addEventListener('touchmove', this.onMouseEnterN.bind(this))
    this.dZone.addEventListener('mouseenter', this.onMouseEnterD.bind(this))
    this.dZone.addEventListener('touchmove', this.onMouseEnterD.bind(this))
  }

  /* -------------
   ------------ LOOPS & FRAMES
   -------------- */

  update() {
    // pass transformed mouse positions to SVG wrapper
    // this.control_wrapper_params.matrix[5] = parseFloat(this.mouseY_svg.current) - parseFloat(this.control.getAttribute('y')) - this.control.height.animVal.value / 2

    this.control_wrapper_params.matrix[5] = parseFloat(this.mouseY_svg.current) - parseFloat(this.control.getAttribute('y')) - this.control.height.animVal.value / 2
    console.log(this.control_wrapper_params.matrix[5], this.mouseY, this.mouseY_svg)
    this.control_wrapper.setAttribute('transform', `matrix(${this.control_wrapper_params.matrix.join(',')})`)
    // update next frames
    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }

  /* -------------
  ------------ UTILS
  -------------- */

  transformFromViewportToSVGElement(mouseX, mouseY, sctm, svgMatrix) {
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

  getSVGMatrix(svgElement) {
    const matrix = svgElement.getAttribute('transform')
    return matrix
      .replace(/^matrix\(/, '')
      .replace(/\)$/, '')
      .split(',')
      .map(parseFloat)
  }

  /* -------------
  ------------ WEB SOCKET
  -------------- */
}

new App()
