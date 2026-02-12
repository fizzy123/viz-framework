class VideoSrc {
  constructor(video, source, chromaColors = DEFAULT_CHROMA_COLORS, expressions = noStrobeExpressions) {
    this.video = video
    this.chromaColors = chromaColors
    this.expressions = expressions
    this.source = source
  }

  reset() {
    this.source.initVideo(this.video)
  }

  render() {
    return src(this.source)
  }

  keyColor() {
    return randomChoice(this.chromaColors)
  }
}
