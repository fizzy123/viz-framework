function bitchBetterHaveMyMoneyWordsReset() {
  s0.initImage("http://localhost:8000/images/bitch_better_have_my_money_words/1.png")
  s1.initImage("http://localhost:8000/images/bitch_better_have_my_money_words/2.png")
  s2.initImage("http://localhost:8000/images/bitch_better_have_my_money_words/3.png")
  s3.initImage("http://localhost:8000/images/bitch_better_have_my_money_words/4.png")
}

function bitchBetterHaveMyMoneyWords() {
  srcBuf = randomChoice([s0, s1, s2, s3])
  return src(srcBuf)
}
