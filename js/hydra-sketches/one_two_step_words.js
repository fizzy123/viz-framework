function oneTwoStepWordsReset() {
  s0.initImage("http://localhost:8000/images/one_two_step_words/1.png")
  s1.initImage("http://localhost:8000/images/one_two_step_words/2.png")
  s2.initImage("http://localhost:8000/images/one_two_step_words/3.png")

}

function oneTwoStepWords() {
  srcBuf = randomChoice([s0, s1, s2])
  return src(srcBuf)
}
