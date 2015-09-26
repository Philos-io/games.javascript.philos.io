import Game from './Game'
import fit from 'canvas-fit'
import loop from 'raf-loop'

var isTouchDevice = 'ontouchstart' in document.documentElement

if (!isTouchDevice) {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')

  document.body.appendChild(canvas)

  let resize = fit(canvas)
  resize.scale = window.devicePixelRatio || 1
  resize()

  window.addEventListener('resize', resize, false)
  document.addEventListener('keydown', (e) => game.onKeydown(e))

  let game = new Game(context)
  let frame = 0
  loop(() => {
    if (!(frame++ % 2)) game.step()
  }).start()
}
