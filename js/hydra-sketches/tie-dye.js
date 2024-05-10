function tieDye() {
    let brightness = 0.5
  return osc(30 + 60 * Math.random(),-0.015 + 0.03 * Math.random(),Math.random() * 2).diff(osc(30 + 60 * Math.random(),0.08-0.16*Math.random()).rotate(Math.PI * Math.random()))
  .modulateScale(noise(3.5 + Math.random() * 5,0.25 - 0.5 * Math.random()).modulateScale(osc(15 * Math.random() + 15).rotate(()=>Math.sin(time * 0.5))),0.3 + Math.random() * 0.6)
  .color(Math.random(), Math.random(), Math.random()).contrast(1 + Math.random())
  .add(src(o0).modulate(o0,.04 + Math.random() * 0.04),.4 + Math.random() * 0.4)
  .invert().contrast(1.2)
  .modulateScale(osc(1 + 2 * Math.random()),-0.2)
}
