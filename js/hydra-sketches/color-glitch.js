function colorGlitch() {
    let brightness = 0.5
let speed1 = 0.1
  let speed2 = 3
  let speed3 = 1
  if (brightness > 1) {
    speed1 = 1.5
    speed2 = 10
    speed3 = 5
  }
  return voronoi(4 + 8 * Math.random(),speed3)
    .mult(osc(10 * Math.random() + 1,speed1,()=>Math.sin(time)*speed2).saturate(4 * Math.random()).kaleid(200 * Math.random()))
    .modulate(o0,Math.random())
    .add(o0,0.8 * Math.random())
    .scrollY(-0.02 + 0.04 * Math.random())
    .scrollX(-0.02 + 0.04 * Math.random())
    .scale(0.99)
    .modulate(voronoi(4 + 8 * Math.random(),1),0.004 + 0.008 * Math.random())
    .luma(0.3 * Math.random())
}
