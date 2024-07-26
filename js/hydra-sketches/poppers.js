function poppersReset() {
  s0.initImage("http://localhost:8000/images/poppers/1.jpg")
  s1.initImage("http://localhost:8000/images/poppers/2.jpg")
  s2.initImage("http://localhost:8000/images/poppers/3.jpg")
  s3.initImage("http://localhost:8000/images/poppers/4.jpg")
}

function poppers() {
  source = randomChoice([
    {
      "buffer": s0,
      "width": 400,
      "height": 524,
    },
    {
      "buffer": s1,
      "width": 459,
      "height": 743,
    },
    {
      "buffer": s2,
      "width": 1000,
      "height": 776,
    },
    {
      "buffer": s3,
      "width": 500,
      "height": 673,
    },
  ])
  return src(source.buffer).scale(1, source.width / window.innerWidth, source.height / window.innerHeight).scrollX(0, Math.random() - 0.5).scrollY(0, Math.random() - 0.5)
}
