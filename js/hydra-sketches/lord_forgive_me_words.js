let lordForgiveMeWordsIndex = 0

let lordForgiveMeLastUpdate = Date.now()
function lordForgiveMeWordsReset() {
  s0.initImage("http://localhost:8000/images/lord_forgive_me_words/1.png")
  s1.initImage("http://localhost:8000/images/lord_forgive_me_words/2.png")
  s2.initImage("http://localhost:8000/images/lord_forgive_me_words/3.png")
  s3.initImage("http://localhost:8000/images/lord_forgive_me_words/4.png")
}

function lordForgiveMeWords() {
  srcBufs = [s0, s1, s2, s3]
  if ((Date.now() - lordForgiveMeLastUpdate) > (5 * 1000)) {
    lordForgiveMeWordsIndex = (lordForgiveMeWordsIndex + 1) % srcBufs.length
    lordForgiveMeLastUpdate = Date.now()
  }
  return src(srcBufs[lordForgiveMeWordsIndex])
}
