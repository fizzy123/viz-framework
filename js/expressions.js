const expressions = [
  noOpExp,
  blackExp,
  strobeExp,
  scrollExp,
  kaleidExp,
  invertExp
]

function noOpExp(source) {
  source.out(o0)
  render(o0)
}

function blackExp(source) {
  solid(0,0,0).out(o0)
  render(o0)
}

function strobeExp(source) {
  const intensity = 0.5
  source
    .brightness(() => intensity * 2 * (Math.random() * 0.3 - 0.2))
    .scrollX(() => intensity * 4 * ((Math.random() * 0.004) - 0.002))
    .scrollY(() => intensity * 4 * ((Math.random() * 0.004) - 0.002))
    .out(o0)
  render(o0)
}

function scrollExp(source) {
  const randScrollX = Math.random()
  const randScrollY = Math.random()
  source
    .scrollX(0, ()=>(randScrollX - 0.5))
    .scrollY(0, ()=>(randScrollY - 0.5))
    .out(o0)
  render(o0)
}

function kaleidExp(source) {
  const randKaleid = Math.random()
  source
    .kaleid(()=>(randKaleid * 8))
    .rotate(Math.PI/2)
    .out(o0)
  render(o0)
}

function invertExp(source) {
  source
    .invert()
    .out(o0)
  render(o0)
}
