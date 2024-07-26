function asapWordsReset() {
  s0.initImage("http://localhost:8000/images/asap_words/1.png")
  s1.initImage("http://localhost:8000/images/asap_words/2.png")
  s2.initImage("http://localhost:8000/images/asap_words/3.png")
  s2.initImage("http://localhost:8000/images/asap_words/4.png")
}

function asapWords() {
  srcBuf = randomChoice([s0, s1, s2])
  return src(srcBuf)
}
