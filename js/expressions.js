const expressions = [
  noOpExp,
  strobeExp,
  kaleidExp,
  invertExp,
  modulateNoise,
  modulateHue,
  modulateRepeatNoise,
  modulatePixelateNoise,
  modulateScaleNoise,
  modulateVoronoi,
  modulateOsc,
  modulateFeedback,
  modulateGen,
  colorSub,
  intense,
  modulateRotate,
  feedback,
  selfModulate,
  dither,
]

const noStrobeExpressions = [
  noOpExp,
  kaleidExp,
  invertExp,
  modulateNoise,
  modulateHue,
  modulateRepeatNoise,
  modulatePixelateNoise,
  modulateVoronoi,
  modulateOsc,
  modulateFeedback,
  modulateGen,
  colorSub,
  modulateRotate,
  feedback,
  selfModulate,
  dither,
]

function noOpExp(source) {
  return source
}

function blackExp(source) {
  return solid(0,0,0)
}

function strobeExp(source) {
  const intensity = 0.5
  return source
    .brightness(() => intensity * 2 * (Math.random() * 0.3 - 0.2))
    .scrollX(() => intensity * 4 * ((Math.random() * 0.004) - 0.002))
    .scrollY(() => intensity * 4 * ((Math.random() * 0.004) - 0.002))
}

function scrollExp(source) {
  const randScrollX = Math.random()
  const randScrollY = Math.random()
  return source
    .scrollX(0, ()=>(2 * (randScrollX - 0.5)))
    .scrollY(0, ()=>(2 * (randScrollY - 0.5)))
}

function kaleidExp(source) {
  const randKaleid = Math.random()
  return source
    .scrollX(0,0.1)
    .kaleid(()=>(randKaleid * 8))
    .rotate(Math.PI/2)
}

function invertExp(source) {
  return source.invert()
}

function modulateGen(source) {
  sources = [noise, osc, voronoi]
  innerChain1 = randomChoice(sources)()
    .scale(2 + Math.random() * 4)
    .scrollX(Math.random(), 0.5 * Math.random())
    .rotate(Math.random() * 3.14)
  innerChain2 = randomChoice(sources)()
    .scale(2 + Math.random() * 4)
    .scrollX(Math.random(), 0.5 * Math.random())
    .rotate(Math.random() * 3.14)
  let modChoice1 = Math.floor(Math.random() * 4)
  if (modChoice1 == 0) {
    innerChain3 = innerChain1.modulate(innerChain2)
  } else if (modChoice1 == 1) {
    innerChain3 = innerChain1.modulateRepeat(innerChain2)
  } else if (modChoice1 == 2) {
    innerChain3 = innerChain1.modulateScale(innerChain2)
  } else if (modChoice1 == 3) {
    innerChain3 = innerChain1.modulatePixelate(innerChain2, Math.random() * 20, Math.random() * 100)
  }

  let modChoice2 = Math.floor(Math.random() * 4)
  if (modChoice2 == 0) {
    return source.modulate(innerChain3)
  } else if (modChoice2 == 1) {
    return source.modulateRepeat(innerChain3)
  } else if (modChoice2 == 2) {
    return source.modulateScale(innerChain3)
  } else if (modChoice2 == 3) {
    return source.modulateScale(innerChain3, Math.random() * 20, Math.random() * 100)
  }
}

// these modulate functions could be made parametric with different modulations and different sources
function modulateNoise(source) {
  return source
      .modulate(noise()
      .scale(2 + Math.random() * 4)
      .scrollX(Math.random(), 0.5 * Math.random())
      .rotate(Math.random() * 3.14)
      .modulate(noise()
        .scale(2 + Math.random() * 4)
        .scrollX(Math.random(), 0.5 * Math.random())
        .rotate(Math.random() * 3.14)))
}

function modulateRepeatNoise(source) {
  return source
      .modulateRepeat(noise()
      .scale(2 + Math.random() * 4)
      .scrollX(Math.random(), 0.5 * Math.random())
      .rotate(Math.random() * 3.14)
      .modulate(noise()
        .scale(2 + Math.random() * 4)
        .scrollX(Math.random(), 0.5 * Math.random())
        .rotate(Math.random() * 3.14)))
}

function modulatePixelateNoise(source) {
  return source
      .modulatePixelate(noise()
      .scale(10 + Math.random() * 4)
      .scrollX(Math.random(), Math.random() * 0.2)
      .rotate(3.14 * Math.random())
      .modulate(noise()
      .scale(10 + Math.random() * 4)
      .scrollX(Math.random(), Math.random() * 0.2)
      .rotate(3.14 * Math.random())), Math.random() * 20, Math.random() * 100)
}

function modulateScaleNoise(source) {
  return source
      .modulateScale(noise()
      .scale(10 + Math.random() * 4)
      .scrollX(Math.random(), Math.random() * 0.2)
      .rotate(3.14 * Math.random())
      .modulate(noise()
      .scale(10 + Math.random() * 4)
      .scrollX(Math.random(), Math.random() * 0.2)
      .rotate(3.14 * Math.random())))
}

function modulateVoronoi(source) {
  return  source
      .modulate(voronoi()
      .scrollX(Math.random(), Math.random() * 0.5)
      .rotate(3.14 * Math.random())
      .modulate(voronoi()
        .scrollX(Math.random(), Math.random() * 0.5)
        .rotate(3.14 * Math.random())))
}

function modulateOsc(source) {
  return source
    .modulate(osc(20 * Math.random(), 0.2 * Math.random(), Math.random()).rotate(Math.random() * 3.14), Math.random())
}

function modulateFeedback(source) {
  const randScrollX = Math.random()
  const randScrollY = Math.random()
  source
    .modulate(src(o0).scrollX(randScrollY).scrollY(randScrollX), Math.random())
    .out(o0)
  return src(o0)
}

function colorSub(source) {
  source
    .diff(osc(10 * Math.random(), Math.random(), 0.75).modulateScale(noise().scale(4 + 2 * Math.random())).rotate(2 * Math.random()))
    .out(o0)
  return src(o0)
}

function colorSweep(source) {
  source.out(o0)
  osc(10,Math.random() - 0.5,1).rotate(Math.random() * 3.14).mask(solid().layer(src(o0))).out(o1)
  return src(o1)
}

function modulateHue(source) {
  source.out(o0)
src(o1)
  .modulateHue(src(o1).scale(1.01),1)
  .layer(osc(4,0.5,2).rotate(Math.random() * 3.14).mask(o0))
  .out(o1)
  return src(o1)
}

function intense(source) {
  let intensity = Math.random()
  return source.brightness(() => intensity * 2 * (Math.random() * 0.3 - 0.2))
    .scrollX(() => intensity * 4 * ((Math.random() * 0.004) - 0.002))
    .scrollY(() => intensity * 4 * ((Math.random() * 0.004) - 0.002))
}

function modulateRotate(source) {
  let intensity = Math.random()
  source.out(o0)
  source.modulateRotate(o0, intensity)
      .out(o1)
  return src(o1)
}

function feedback(source) {
  let intensity = Math.random()
  source.out(o0)
  src(o0).modulate(src(o1).scrollX((Math.random() - 0.5) * 0.01).scrollY((Math.random() - 0.5) * 0.01), intensity)
      .out(o1)
  return src(o1)
}

function selfModulate(source) {
  let intensity = Math.random()
  source.out(o0)
  source.modulate(src(o0).scrollX((Math.random() - 0.5) * 0.01).scrollY((Math.random() - 0.5) * 0.01), intensity)
      .out(o1)
  return src(o1)
}

function dither(source) {
  source.dither4().out(o0)
  return src(o0)
}

function repeat(source, chromaKey) {
  if (chromaKey == undefined) {
    return source
  }
  let iterations = 16
  let xScale = ( 0.5 - Math.random() )
  let yScale = ( 0.5 - Math.random() )
  let rScale = 1 * ( 0.5 - Math.random() )
  let now = Date.now()
  let iterOffset = (source, i) => {
    return source
      .scrollX(()=>{
        let dif = (Date.now() - now)/10000 * i * xScale
        return dif
      })
      .scrollY(()=>{
        let dif = (Date.now() - now)/10000 * i * yScale
        return dif
      })
      .rotate(()=>{
        let dif = (Date.now() - now)/10000 * i * rScale
        return dif
      })
  }
  source.out(o0)
  chain = iterOffset(src(o0), iterations)
  for (let i=iterations - 1;i>0;i--) {
    chain = chain.layer(
      iterOffset(
        src(o0).chroma(chromaKey.r,chromaKey.g,chromaKey.b),
        i
      )
    )
  }
  chain.out(o1)
  return src(o1)
}

function repeat3d(source, chromaKey) {
  if (chromaKey == undefined) {
    return source
  }
  let iterations = 10
  let xScale = ( 0.5 - Math.random() )
  let yScale = ( 0.5 - Math.random() )
  let rScale = 1 * ( 0.5 - Math.random() )
  let now = Date.now()
  let iterOffset = (source, i) => {
    return source
      .scrollX(()=>{
        let dif = (Date.now() - now)/10000 * (iterations - i) * xScale
        return dif
      })
      .scrollY(()=>{
        let dif = (Date.now() - now)/10000 * (iterations - i) * yScale
        return dif
      })
      .rotate(()=>{
        let dif = (Date.now() - now)/10000 * (iterations - i) * rScale
        return dif
      })
      .scale(2/(i + 1))
  }
  source.out(o0)
  chain = solid()
  for (let i=iterations - 1;i>0;i--) {
    chain = chain.layer(
      iterOffset(
        src(o0).chroma(chromaKey.r,chromaKey.g,chromaKey.b),
        i
      )
    )
  }
  chain.out(o1)
  return src(o1)
}
