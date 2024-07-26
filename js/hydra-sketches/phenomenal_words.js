function phenomenalWordsReset() {
  s0.initImage("http://localhost:8000/images/phenomenal_words/1.png")
  s1.initImage("http://localhost:8000/images/phenomenal_words/2.png")
  s2.initImage("http://localhost:8000/images/phenomenal_words/3.png")
  s3.initImage("http://localhost:8000/images/phenomenal_words/4.png")
  s4.initImage("http://localhost:8000/images/phenomenal_words/5.png")
}

function phenomenalWords() {
  srcBuf = randomChoice([s0, s1, s2, s3, s4])
  return src(srcBuf)
}
