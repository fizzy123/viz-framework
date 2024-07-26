function psychWavesReset() {
  osc(10, 0.1, 1)
		.modulate(noise())
		.rotate(1)
		.modulateScale(noise(20, 1)
			.modulateScale(noise())
			.colorama(0.1, 1))
  .invert()
  .out(o2)
}
function psychWaves() {
  return src(o2)
}
