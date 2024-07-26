function scrollLogoReset() {
  s0.initImage("http://localhost:8000/images/scroll_logo_big.png")
  let width = 1920
  let height = 1080
  return src(s0)
	.add(src(s0)
    .scrollX(0.5, 1)
		.scrollY(0.5))
	.scrollX(0, -0.5)
	.scrollY(0, 0.1)
//	.scale(0.5, 0.7)
	.add(
        osc(10,0.2,1.5).rotate(Math.PI/2).modulateRepeat(
		noise()
		.colorama(10)
		.mult(osc(10, 0.1, 0.5)
			.rotate(Math.PI / 2))
		.modulate(osc(10)
			.rotate(Math.PI / 2)
			.colorama(4))).brightness(-0.2).contrast(1.1)
	).out(o2)
}

function scrollLogo() {
  return src(o2)
}
