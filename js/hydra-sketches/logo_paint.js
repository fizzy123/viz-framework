function logoPaintReset() {
  s4.initImage("http://localhost:8000/images/block_logo.png")
}
function logoPaint() {
  src(o1)
	.modulateHue(src(o1)
		.scale(1.01)
		.modulate(noise()), 10)
	.layer(osc(10, 0.1, 1)
		.rotate(0.5)
		.mask(src(s4)))
  .out(o1)
  return src(o1)
}
