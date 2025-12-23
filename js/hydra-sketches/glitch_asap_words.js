function glitchAsapWordsReset() {
  s0.initImage("http://localhost:8000/images/asap_words/1.png")
src(s0)
	.modulateScale(osc()
		.modulateScale(osc(1, 1)
			.rotate(Math.PI / 2)))
	.mult(osc(1, 10, 1))
	.modulate(noise())
	.pixelate(1000, 100)
	.modulateRotate(noise(1))
	.modulateScale(o1)
	.scale(1.1, 0.9)
  .out(o2)
}
function glitchAsapWords() {
  return src(o2)
}
