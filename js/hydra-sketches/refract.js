function hydraRefract() {
  let speed = -0.5
  let size = 2 + 8 * Math.random()
  return osc(size, speed, 2 * Math.random())
    .color(-1.5 + Math.random(), -1.5 + Math.random(), -1.5 + Math.random())
    .blend(o0)
    .rotate(-0.5 + Math.random(), -0.5 + Math.random())
    .modulate(shape(4 * Math.random())
      .rotate(0.5 - Math.random(), 0.5 - Math.random())
      .scale(2 + Math.random())
      .repeatX(1 + 3 * Math.random(), 1 + 3 * Math.random())
      .modulate(o0, () => mouse.x * 0.0005)
      .repeatY(1 + 3 * Math.random(), 1 + 3 * Math.random()))
}
