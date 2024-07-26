function phenomenalCoverReset() {
  s5.initImage("http://localhost:8000/images/art_magazine.png")
  s6.initImage("http://localhost:8000/images/big_logo_poster.png")
}
function phenomenalCover() {
  srcBuf = randomChoice([s5, s6])
  return src(srcBuf)
}
