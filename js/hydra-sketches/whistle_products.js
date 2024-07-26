function whistleProductsReset() {
  s0.initImage("http://localhost:8000/images/product1.png")
  s1.initImage("http://localhost:8000/images/product2.png")
}

function whistleProducts() {
  let srcBuf = randomChoice([s0, s1])
  return src(srcBuf)
}
