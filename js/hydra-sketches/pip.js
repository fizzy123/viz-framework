class PIPSrc {
  constructor(expressions = noStrobeExpressions) {
    this.expressions = expressions
  }

  render() {
    let movementFactorX = 0
    let movementFactorY = 0
    if (Math.random() < 0.5) {
      movementFactorX = (Math.random() - 0.5) / 30
      movementFactorY = (Math.random() - 0.5) / 30
    }
    return src(s4)
      .scrollX((Math.random() - 0.5) / 10,  movementFactorX)
      .scrollY(0.0165 + (Math.random() - 0.5) / 10, movementFactorY)
  }
}
