function imageResetWrapper(images) {
  return () => {
    SOURCE_ARRAY = [s0, s1, s2]
    for (let i=0;i<images.length;i++) {
      SOURCE_ARRAY[i].initImage(images[i])
    }
  }
}

// TODO: these functions should be methods of an object
function imageWrapper(imageCount) {
  return () => {
    SOURCE_ARRAY = [s0, s1, s2]
    let srcBuf = randomChoice(SOURCE_ARRAY.slice(0, imageCount))
    return src(srcBuf)
  }
}
