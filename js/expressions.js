const expressions = [
  noOpExp,
  blackExp,
  strobeExp,
  scrollExp,
  kaleidExp,
  invertExp,
  modulateNoise,
  modulateHue,
  modulateRepeatNoise,
  modulatePixelateNoise,
  modulateVoronoi,
  colorSweep,
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

function modulateNoise(source) {
    source
      .modulateNoise(noise().scale(2 + Math.random() * 4).scrollX(Math.random()).scrollY(Math.random())
      .out(o0)
    render(o0)
}

function modulateHue(source) {
    source
      .modulate(noise().scale(2 + Math.random() * 4).scrollX(Math.random())
      .out(o0)
    src(o1)
      .modulateHue(src(o1).scale(1.01),10)
      .layer(o0)
      .out(o1)
    render(o1)
}

function modulateRepeatNoise(source) {
    source
      .modulateRepeat(noise().scale(2 + Math.random() * 4).scrollX(Math.random())
      .out(o0)
    render(o0)
}

function modulatePixelateNoise(source) {
    source
      .modulateRepeat(noise().scale(2 + Math.random() * 4).scrollX(Math.random())
      .out(o0)
    render(o0)
}

function modulateVoronoi(source) {
    source
      .modulate(voronoi().scrollX(Math.random()))
      .out(o0)
    render(o0)
}

function modulateSelf(source) {
  source
    .modulate(source, ()=>Math.random())
    .out(o0)
  render(o0)
}

function modulateOsc(source) {
  source
    .modulate(osc(10, 0.1, 0.5), ()=>Math.random())
    .out(o0)
  render(o0)
}

function modulateFeedback(source) {
  source
    .modulate(src(o0).scrollX(0.01).scrollY(0.005), ()=>(Math.random()))
    .out(o0)
  render(o0)
}

function modulateFeedback(source) {
  source
    .modulate(src(o0).scrollX(0.01).scrollY(0.005), ()=>(Math.random()))
    .out(o0)
  render(o0)
}

function colorSub(source) {
  source
    .sub(osc(10, 1, 0.25).modulateScale(noise().scale(5)).rotate(2), ()=>cc[11])
    .out(o0)
  render(o0)
}

function colorSweep(source) {
    source.out(o0)
    osc(10,Math.random(),1).rotate(Math.random()).mask(solid().layer(src(o0))).out(o1)
    render(o1)
}
