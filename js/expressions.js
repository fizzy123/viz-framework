const expressions = [
  noOpExp,
  strobeExp,
  kaleidExp,
  invertExp,
  modulateHue,
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
  scrollExp,
  kaleidExp,
  invertExp,
  modulateHue,
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
    .scrollX(0, ()=>((randScrollX - 0.5)))
    .scrollY(0, ()=>((randScrollY - 0.5)))
}

function kaleidExp(source) {
  const randKaleid = Math.random()
  return source
    .scrollX(0,0.1)
    .kaleid(()=>(randKaleid * 8))
    .rotate(Math.PI/2)
}

function invertExp(source) {
  const randScrollX = Math.random()
  const randScrollY = Math.random()
  return source
    .invert()
    .scrollX(0, ()=>((randScrollX - 0.5)))
    .scrollY(0, ()=>((randScrollY - 0.5)))
}

function modulateGen(source) {
  sources = [noise, osc, voronoi]
  randInnerChain1Scale = 2 + Math.random() * 4
  randInnerChain1ScrollX = 0.5 * Math.random()
  randInnerChain1Rotate = Math.random() * 3.14
  innerChain1 = randomChoice(sources)()
    .scale(()=>randInnerChain1Scale)
    .scrollX(0, ()=>randInnerChain1ScrollX)
    .rotate(()=>randInnerChain1Rotate)
  randInnerChain2Scale = 2 + Math.random() * 4
  randInnerChain2ScrollX = 0.5 * Math.random()
  randInnerChain2Rotate = Math.random() * 3.14
  innerChain2 = randomChoice(sources)()
    .scale(()=>randInnerChain1Scale)
    .scrollX(0, ()=>randInnerChain1ScrollX)
    .rotate(()=>randInnerChain1Rotate)
  let modChoice1 = Math.floor(Math.random() * 4)
  if (modChoice1 == 0) {
    innerChain3 = innerChain1.modulate(innerChain2)
  } else if (modChoice1 == 1) {
    innerChain3 = innerChain1.modulateRepeat(innerChain2)
  } else if (modChoice1 == 2) {
    innerChain3 = innerChain1.modulateScale(innerChain2)
  } else if (modChoice1 == 3) {
    pixelateMod1Param1 = Math.random() * 20
    pixelateMod1Param2 = Math.random() * 100
    innerChain3 = innerChain1.modulatePixelate(innerChain2, ()=>pixelateMod1Param1, ()=>pixelateMod1Param2)
  }

  let modChoice2 = Math.floor(Math.random() * 4)
  if (modChoice2 == 0) {
    return source.modulate(innerChain3)
  } else if (modChoice2 == 1) {
    return source.modulateRepeat(innerChain3)
  } else if (modChoice2 == 2) {
    return source.modulateScale(innerChain3)
  } else if (modChoice2 == 3) {
    pixelateMod2Param1 = Math.random() * 20
    pixelateMod2Param2 = Math.random() * 100
    return source.modulateScale(innerChain3, ()=>pixelateMod2Param1, ()=>pixelateMod2Param2)
  }
}

function modulateFeedback(source) {
  const randScrollX = Math.random()
  const randScrollY = Math.random()
  const randModulate = Math.random()
  source
    .modulate(src(o0).scrollX(0, ()=>randScrollY).scrollY(0, ()=>randScrollX), ()=>randModulate)
    .out(o0)
  return src(o0)
}

function colorSub(source) {
  const rand1 = Math.random()
  const rand2 = Math.random()
  const rand3 = Math.random()
  const rand4 = Math.random()
  return source
    .diff(osc(()=>10 * rand1, ()=>rand2, 0.75).modulateScale(noise().scale(()=>(4 + 2 * rand3))).rotate(()=>2 * rand4))
}

function colorSweep(source) {
  const rand1 = Math.random()
  const rand2 = Math.random()
  source.out(o0)
  osc(10,()=>rand1 - 0.5,1).rotate(()=>rand2 * 3.14).mask(solid().layer(src(o0))).out(o1)
  return src(o1)
}

function modulateHue(source) {
  const rand1 = Math.random()
  source.out(o0)
  src(o1)
    .modulateHue(src(o1).scale(1.01),1)
    .layer(osc(4,0.5,2).rotate(()=>rand1 * 3.14).mask(o0))
    .out(o1)
  return src(o1)
}

function intense(source) {
  let intensity = Math.random()
  return source.brightness(() => intensity * 2 * (Math.random() * 0.3 - 0.2))
    .scrollX(() => intensity * 4 * ((Math.random() * 0.004) - 0.002))
    .scrollY(() => intensity * 4 * ((Math.random() * 0.004) - 0.002))
}

// timing in milliseconds
function intenseBuild(timing) {
  intense = (source) => {
    let start = Date.now()
    let end = start + timing
    let intensity = () => {
      now = Date.now()
      return (now - start) / (end - start)
    }
    return source.brightness(() => intensity() * 2 * (Math.random() * 0.3 - 0.2))
      .scrollX(() => intensity() * 4 * ((Math.random() * 0.004) - 0.002))
      .scrollY(() => intensity() * 4 * ((Math.random() * 0.004) - 0.002))
  }
  return intense
}

function modulateRotate(source) {
  let rand1 = Math.random()
  let rand2 = Math.random()
  let rand3 = Math.random()
  source.out(o0)
  source.modulateRotate(src(o0).scrollX(0, ()=>(rand1 - 0.5) * 0.1).scrollY(0, ()=>(rand2 - 0.5) * 0.1), ()=>rand3)
      .out(o1)
  return src(o1)
}

function feedback(source) {
  let rand1 = Math.random()
  let rand2 = Math.random()
  let rand3 = Math.random()
  source.out(o0)
  src(o0).modulate(src(o1).scrollX(0, ()=>(rand1 - 0.5) * 0.1).scrollY(0, ()=>(rand2 - 0.5) * 0.1), ()=>rand3)
      .out(o1)
  return src(o1)
}

function selfModulate(source) {
  let rand1 = Math.random()
  let rand2 = Math.random()
  let rand3 = Math.random()
  source.out(o0)
  source.modulate(src(o0).scrollX(0, ()=>(rand1 - 0.5) * 0.1).scrollY(0, ()=>(rand2 - 0.5) * 0.1), ()=>rand3)
      .out(o1)
  return src(o1)
}

function dither(source) {
  return source.dither4()
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
