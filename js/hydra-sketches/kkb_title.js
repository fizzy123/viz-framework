function kkbTitleReset() {
  s0.initImage("http://localhost:8000/images/movie_2.png")
  s1.initImage("http://localhost:8000/images/movie_intro.png")
  s2.initImage("http://localhost:8000/images/movie_intro_2.png")
}

function kkbTitle() {
  srcBuf = randomChoice([
    s0,
    s1,
    s2,
  ])
  return src(srcBuf)
}
