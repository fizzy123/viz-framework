function setlistReset() {
  s0.initImage("http://localhost:8000/images/setlist/1.png")
  s1.initImage("http://localhost:8000/images/setlist/2.png")
  s2.initImage("http://localhost:8000/images/setlist/3.png")
}

function setlist() {
  srcBuf = randomChoice([s0, s1, s2])
  return src(srcBuf)
}
