class App {
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

    // gear zones
    this.rZone = document.querySelector('#btnR')
    this.nZone = document.querySelector('#btnN')
    this.dZone = document.querySelector('#btnD')
    this.zoneRND = [false, true, false]
    // bounds
    this.validArea = document.querySelector('.groove')
    this.bound = this.validArea.getBoundingClientRect()
    this.bound_control = this.control_wrapper.getBoundingClientRect()
    this.bound_rZone = this.rZone.getBoundingClientRect()
    this.bound_dZone = this.dZone.getBoundingClientRect()

    // time
    this.longPressTime = 1300
    this.transitionMotionTime = 800
    // states
    this.states = {
      isTapped: false,
      isLongPressed: false,
      isMouseUp: false,
    }
    this.inInteractiveArea = false

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

    this.sounds = {
      start: new Audio({
        volume: 0.2,
        src: 'https://cdn.pixabay.com/download/audio/2022/01/07/audio_ea449d6cea.mp3?filename=start-13691.mp3',
      }),
      loading: new Audio(
        'https://cdn.pixabay.com/download/audio/2022/03/18/audio_35451d26a8.mp3?filename=teleport-sound-95186.mp3'
      ),
      click: new Audio(
        'https://cdn.pixabay.com/download/audio/2023/01/02/audio_d2f20885a2.mp3?filename=click-for-game-menu-131903.mp3'
      ),
      error: new Audio(
        'https://cdn.pixabay.com/download/audio/2023/01/04/audio_8969bfb5fa.mp3?filename=error-warning-login-denied-132113.mp3'
      ),
    }

    this.addEventListeners(this.control_wrapper)
    this.addSnapListeners()

    this.update()
  }

  /* -------------
   ------------ EVENTS
   -------------- */

  onTouchStart({ clientX, clientY }) {
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
  }
  onTouchEnd({ clientX, clientY }) {
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
    // element.addEventListener('mousedown', this.onTouchStart.bind(this))
    // element.addEventListener('mousemove', this.onTouchMove.bind(this))
    // element.addEventListener('mouseup', this.onTouchEnd.bind(this))
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
    this.detectBoundingBox()
    this.detectMotionStates(this.motionStateName, this.control)

    switch (this.motionStateName) {
      case 'normalState':
        this.showNormalState()
        break
      case 'prepState':
        this.showPrepState()
        break
      case 'prepFailureState':
        this.showPrepFailureState()
        break
      case 'ondragState':
        this.showOndragState()
        break
      case 'ondragEndState':
        this.showOndragEndState()
        break
    }

    // update next frames
    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }

  /* -------------
  ------------ MOTION STATUS
  -------------- */

  showNormalState() {
    this.changeBtnColor(this.motionStateName, this.control)
    // change outer shadow
    this.control_wrapper.classList.remove('btn__outerGlow-blue')
    this.control_wrapper.classList.remove('btn__outerGlow-white')
    this.control.removeAttribute('stroke')
    this.control_wrapper.classList.add('btn__dropShadow')
    console.log('normal state')
  }

  showPrepState() {
    // change outer shadow
    this.control_wrapper.classList.remove('btn__dropShadow')
    this.control_wrapper.classList.add('btn__outerGlow-blue')

    // color change effect

    console.log('prepMotion')
  }

  showPrepFailureState() {
    console.log('prepfailure shows!')

    //audio
    this.sounds.error.play()
    // bouncy effect
    this.control_wrapper.animate(
      [
        {
          transform: 'none',
        },
        {
          transform: 'scaleX(1) scaleY(1)',
          offset: 0,
        },
        {
          transform: 'scaleX(1.1) scaleY(0.95)',
          offset: 0.05,
        },
        {
          transform: 'scaleX(1) scaleY(1)',
          offset: 0.1,
        },
      ],
      {
        easing: 'ease-in-out',
        duration: 100,
        iterations: 3,
      }
    )
    // transition back to normal state
    window.setTimeout(() => {
      this.states.isTapped = false
    }, this.transitionMotionTime)
  }

  showOndragState() {
    console.log('is dragging!')
    this.changeBtnColor(this.motionStateName, this.control)

    // reset current mouse value to the center

    // pass transformed mouse positions to SVG wrapper
    this.control_wrapper_params.matrix[5] =
      parseFloat(this.mouseY_svg.current) -
      parseFloat(this.control.getAttribute('y')) -
      this.control.height.animVal.value / 2
    this.control_wrapper.setAttribute('transform', `matrix(${this.control_wrapper_params.matrix.join(',')})`)
  }

  showOndragEndState() {
    console.log('drag ends')
    // change button color
    this.changeBtnColor(this.motionStateName, this.control)
    // change button outer shadow
    this.control_wrapper.classList.remove('btn__outerGlow-blue')
    this.control_wrapper.classList.add('btn__outerGlow-white')
    this.control.setAttribute('stroke', '#94E8FF')

    // snapping
    const snapY_viewport = { min: this.bound_rZone.bottom, max: this.bound_dZone.top }
    const snapY_svgCanvas = {}

    // get Y min value in SVG coordinate
    snapY_svgCanvas.min =
      this.transformFromViewportToSVGElement(
        0,
        snapY_viewport.min,
        this.control_wrapper_params.screenCTM,
        this.control_wrapper_params.matrix
      ).y -
      parseFloat(this.control.getAttribute('y')) -
      this.control.height.animVal.value
    // get Y max value in SVG coordinate
    snapY_svgCanvas.max =
      this.transformFromViewportToSVGElement(
        0,
        snapY_viewport.max,
        this.control_wrapper_params.screenCTM,
        this.control_wrapper_params.matrix
      ).y - parseFloat(this.control.getAttribute('y'))

    const matrix = this.getSVGMatrix(this.control_wrapper)

    //snap detection
    matrix[5] = this.zoneRND[0]
      ? snapY_svgCanvas.min // snap to rzone
      : this.zoneRND[2]
      ? snapY_svgCanvas.max // snap to dzone
      : 0 // snap to nzone

    // change gear_name style
    const gearR = document.getElementById('gearR')
    const gearN = document.getElementById('gearN')
    const gearD = document.getElementById('gearD')
    if (this.zoneRND[0]) {
      gearR.classList.add('gear__name--active')
      gearN.classList.remove('gear__name--active')
      gearD.classList.remove('gear__name--active')
    } else if (this.zoneRND[1]) {
      gearR.classList.remove('gear__name--active')
      gearN.classList.add('gear__name--active')
      gearD.classList.remove('gear__name--active')
    } else if (this.zoneRND[2]) {
      gearR.classList.remove('gear__name--active')
      gearN.classList.remove('gear__name--active')
      gearD.classList.add('gear__name--active')
      gearD.style.transform = 'translateY(-2px)'
    }

    // implement snap
    this.control_wrapper.setAttribute('transform', `matrix(${matrix.join(',')})`)
  }

  /* -------------
  ------------ UTILS
  -------------- */

  detectMotionStates() {
    if (this.states.isTapped && !this.states.isMouseUp) {
      this.motionStateName = 'prepState'
    } else if (this.states.isTapped && this.states.isMouseUp) {
      this.motionStateName = 'prepFailureState'
    } else if (this.states.isLongPressed && this.inInteractiveArea) {
      this.motionStateName = 'ondragState'
    } else if (this.states.isMouseUp && !this.states.isTapped) {
      this.motionStateName = 'ondragEndState'
    } else {
      this.motionStateName = 'normalState'
    }
  }

  detectBoundingBox() {
    const yMin = this.bound.top + this.control.height.animVal.value / 1.4
    const yMax = this.bound.top + this.bound.height - this.control.height.animVal.value / 1.4
    if (yMin < this.mouseY.current && this.mouseY.current < yMax) {
      this.inInteractiveArea = true
    } else {
      this.inInteractiveArea = false
    }
  }

  changeBtnColor(motionStateName, control) {
    let controlId = control.getAttribute('class')
    let gradientId = controlId.replace(/^btn(\w+)-color$/, '#linear-gradient-$1')
    let gradient = document.querySelector(`${gradientId}`)
    let gradientVals = gradient.querySelectorAll('stop')

    if (motionStateName === 'normalState') {
      // turn grey
      gradientVals[0].setAttribute('stop-color', '#93969b')
      gradientVals[1].setAttribute('stop-color', '#1f1f1f')
    } else {
      // turn blue
      gradientVals[0].setAttribute('stop-color', '#88aaf0')
      gradientVals[1].setAttribute('stop-color', '#0d57f1')
    }
  }

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
