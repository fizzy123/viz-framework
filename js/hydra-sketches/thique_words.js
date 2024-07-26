let thiqueWordsIndex = 0

function thiqueWordsReset() {
  s0.initImage("http://localhost:8000/images/thique_words/1.png")
  s1.initImage("http://localhost:8000/images/thique_words/2.png")
  s2.initImage("http://localhost:8000/images/thique_words/3.png")
  s3.initImage("http://localhost:8000/images/thique_words/4.png")
  s4.initImage("http://localhost:8000/images/thique_words/5.png")
}

let thiqueLastUpdate = Date.now()
function thiqueWords() {
  srcBufs = [s0, s1, s2, s3, s4]
  if ((Date.now() - thiqueLastUpdate) > (5 * 1000)) {
    thiqueWordsIndex = (thiqueWordsIndex + 1) % srcBufs.length
    thiqueLastUpdate = Date.now()
  }
  return src(srcBufs[thiqueWordsIndex])
}
