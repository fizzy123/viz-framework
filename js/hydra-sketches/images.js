const DEFAULT_CHROMA_COLORS = [
  {r:0,b:0,g:0},
  {r:1,b:1,g:1},
]
class ImageSrc {
  constructor(image, source, chromaColors = DEFAULT_CHROMA_COLORS, expressions = noStrobeExpressions) {
    this.image = image
    this.chromaColors = chromaColors
    this.expressions = expressions
    this.source = source
  }

  reset() {
    this.source.initImage(this.image)
  }

  render() {
    return src(this.source)
  }

  keyColor() {
    return randomChoice(this.chromaColors)
  }
}
