function grindrReset() {
  s0.initImage("http://localhost:8000/images/grindr.png")
  let width = 1008
  let height = 8410
  src(s0).scrollY(0,0.3).scale(0.5, width / window.innerWidth, height / window.innerHeight).mask(shape(4).scale(0.5/0.308,width/window.innerWidth,height/window.innerHeight)).modulateScale(noise().scale(4).scrollY(0, -0.5)).out(o2)
}

function grindr() {
  return src(o2)
}
