function dimensions() {
    let brightness = 0.5
 let speed1 = 0.2
  if (brightness > 1) {
    speed1 = 0.7
  }
  return osc(5 + Math.random() * 35,speed1,Math.random() * 2)
  .modulateScale(osc(5 + Math.random() * 35,speed1,Math.random() * 2).kaleid(Math.random() * 16))
  .repeat(Math.random() * 3 + 1,Math.random() * 6 + 1)
  .modulate(o0,0.1 * Math.random())
  .modulateKaleid(shape(Math.round(8 * Math.random()),0.1 * Math.random(),1 * Math.random()))
}
