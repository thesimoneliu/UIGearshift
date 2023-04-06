function prepMotion() {
  // change controls_WRAPPER' dropshadow
  CONTROLS.classList.remove('btn__dropShadow')
  CONTROLS.classList.add('btn__outerGlow')
  console.log('prepMotion')
}

function prepMotionFailed() {
  CONTROLS_WRAPPER.animate(
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

  console.log('prepMotion failed')
}
