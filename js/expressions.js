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

function noOpExp(sourceOut, out) {
  src(sourceOut).out(out)
}

function blackExp(sourceOut, out) {
  solid(0,0,0).out(out)
}

function strobeExp(sourceOut, out) {
  const intensity = 0.5
  src(sourceOut)
    .brightness(() => intensity * 2 * (Math.random() * 0.3 - 0.2))
    .scrollX(() => intensity * 4 * ((Math.random() * 0.004) - 0.002))
    .scrollY(() => intensity * 4 * ((Math.random() * 0.004) - 0.002))
    .out(out)
}

function scrollExp(sourceOut, out) {
  const randScrollX = Math.random()
  const randScrollY = Math.random()
  src(sourceOut)
    .scrollX(0, ()=>((randScrollX - 0.5)))
    .scrollY(0, ()=>((randScrollY - 0.5)))
    .out(out)
}

function kaleidExp(sourceOut, out) {
  const randKaleid = Math.random()
  src(sourceOut)
    .scrollX(0,0.1)
    .kaleid(()=>(randKaleid * 8))
    .rotate(Math.PI/2)
    .out(out)
}

function invertExp(sourceOut, out) {
  const randScrollX = Math.random()
  const randScrollY = Math.random()
  src(sourceOut)
    .invert()
    .scrollX(0, ()=>((randScrollX - 0.5)))
    .scrollY(0, ()=>((randScrollY - 0.5)))
    .out(out)
}

function modulateGen(sourceOut, out) {
  sourceSelect1 = Math.random()
  let source1Blend1 = 0
  let source1Blend2 = 0
  if (sourceSelect1 < 0.33) {
    source1Blend1 = 0
    source1Blend2 = 0
  } else if (sourceSelect1 > 0.67) {
    source1Blend1 = 1 // this doesn't matter but whatever
    source1Blend2 = 1
  } else {
    source1Blend1 = 1,
    source1Blend2 = 0
  }
  source1 = noise().blend(osc(), ()=>source1Blend1).blend(voronoi(), ()=>source1Blend2)
  randInnerChain1Scale = Math.random() * 4
  randInnerChain1ScrollX = 0.5 * Math.random() - 0.25
  randInnerChain1Rotate = Math.random() * Math.PI - Math.PI/2
  innerChain1 = source1
    .scale(()=>randInnerChain1Scale)
    .scrollX(0, ()=>randInnerChain1ScrollX)
    .rotate(0, ()=>randInnerChain1Rotate)
  sourceSelect2 = Math.random()
  let source2Blend1 = 0
  let source2Blend2 = 0
  if (sourceSelect2 < 0.33) {
    source2Blend1 = 0
    source2Blend2 = 0
  } else if (sourceSelect2 > 0.67) {
    source2Blend1 = 1 // this doesn't matter but whatever
    source2Blend2 = 1
  } else {
    source2Blend1 = 1,
    source2Blend2 = 0
  }
  source2 = noise().blend(osc(), ()=>source2Blend1).blend(voronoi(), ()=>source2Blend2)
  randInnerChain2Scale = Math.random() * 4
  randInnerChain2ScrollX = 0.5 * Math.random() - 0.25
  randInnerChain2Rotate = Math.random() * Math.PI - Math.PI/2
  innerChain2 = source2
    .scale(()=>randInnerChain2Scale)
    .scrollX(0, ()=>randInnerChain2ScrollX)
    .rotate(0, ()=>randInnerChain2Rotate)

  let modChoice1 = Math.random()
  let mod1 = 0
  let modRepeat1 = {
    repeatX: 1,
    repeatY: 1,
    offsetX: 0,
    offsetY: 0,
  }
  let modScale1 = {
    multiple: 0,
    offset: 1,
  }
  let modRotate1 = {
    multiple: 0,
    offset: 0,
  }
  if (modChoice1 < 0.5) {
    modRepeat1.repeatX = Math.random() * 5
    modRepeat1.repeatY = Math.random() * 5
    modRepeat1.offsetX = Math.random() * 5
    modRepeat1.offsetY = Math.random() * 5
  } else {
    modScale1.multiple = 5 * Math.random() - 2.5
    modScale1.offset = 5 * Math.random() - 2.5
  }
  innerChain3 = innerChain1
      .modulateRepeat(innerChain2, ()=>modRepeat1.repeatX, ()=>modRepeat1.repeatY, ()=>modRepeat1.offsetX, ()=>modRepeat1.offsetY)
      .modulateScale(innerChain2, ()=>modScale1.multiple, ()=>modScale1.offset)

  let modChoice2 = Math.random()
  let mod2 = 0
  let modRepeat2 = {
    repeatX: 1,
    repeatY: 1,
    offsetX: 0,
    offsetY: 0,
  }
  let modScale2 = {
    multiple: 0,
    offset: 1,
  }
  let modRotate2 = {
    multiple: 0,
    offset: 0,
  }
  if (modChoice2 < 0.5) {
    modRepeat2.repeatX = Math.random() * 5
    modRepeat2.repeatY = Math.random() * 5
    modRepeat2.offsetX = Math.random() * 5
    modRepeat2.offsetY = Math.random() * 5
  } else {
    modScale2.multiple = 5 * Math.random() - 2.5
    modScale2.offset = 5 * Math.random() - 2.5
  }
  src(sourceOut)
    .modulateRepeat(innerChain3, ()=>modRepeat2.repeatX, ()=>modRepeat2.repeatY, ()=>modRepeat2.offsetX, ()=>modRepeat2.offsetY)
    .modulateScale(innerChain3, ()=>modScale2.multiple, ()=>modScale2.offset)
    .out(out)
}

function modulateFeedback(sourceOut, out) {
  const randScrollX = Math.random() - 0.5
  const randScrollY = Math.random() - 0.5
  const randModulate = Math.random()
  src(sourceOut)
    .modulate(src(out).scrollX(0, ()=>randScrollX).scrollY(0, ()=>randScrollY), ()=>randModulate)
    .out(out)
}

function colorSub(sourceOut, out) {
  const rand1 = Math.random()
  const rand2 = Math.random()
  const rand3 = Math.random()
  const rand4 = Math.random()
  src(sourceOut)
    .diff(osc(()=>10 * rand1, ()=>rand2, 0.75).modulateScale(noise().scale(()=>(4 + 2 * rand3))).rotate(()=>2 * rand4))
    .out(out)
}

function colorSweep(sourceOut, out) {
  const rand1 = Math.random()
  const rand2 = Math.random()
  osc(10,()=>rand1 - 0.5,1).rotate(()=>rand2 * 3.14).mask(solid().layer(src(sourceOut))).out(out)
}

function modulateHue(sourceOut, out) {
  const rand1 = Math.random()
  src(out)
    .modulateHue(src(out).scale(1.01),1)
    .layer(osc(4,0.5,2).rotate(()=>rand1 * 3.14).mask(sourceOut))
    .out(out)
}

function intense(sourceOut, out) {
  let intensity = Math.random()
  src(sourceOut).brightness(() => intensity * 2 * (Math.random() * 0.3 - 0.2))
    .scrollX(() => intensity * 4 * ((Math.random() * 0.004) - 0.002))
    .scrollY(() => intensity * 4 * ((Math.random() * 0.004) - 0.002))
    .out(out)
}

// timing in milliseconds
function intenseBuild(timing) {
  intense = (sourceOut, out) => {
    let start = Date.now()
    let end = start + timing
    let intensity = () => {
      now = Date.now()
      return (now - start) / (end - start)
    }
    src(sourceOut).brightness(() => intensity() * 2 * (Math.random() * 0.3 - 0.2))
      .scrollX(() => intensity() * 4 * ((Math.random() * 0.004) - 0.002))
      .scrollY(() => intensity() * 4 * ((Math.random() * 0.004) - 0.002))
      .out(out)
  }
  return intense
}

function modulateRotate(sourceOut, out) {
  let rand1 = Math.random()
  let rand2 = Math.random()
  let rand3 = Math.random()
  let rand4 = Math.random()
  src(sourceOut).modulateRotate(src(sourceOut).scrollX(0, ()=>(rand1 - 0.5) * 0.1).scrollY(0, ()=>(rand2 - 0.5) * 0.1), ()=>rand3 * 20, ()=>rand4)
      .out(out)
}

function feedback(sourceOut, out) {
  let rand1 = Math.random()
  let rand2 = Math.random()
  let rand3 = Math.random()
  src(sourceOut).modulate(src(out).scrollX(0, ()=>(rand1 - 0.5) * 0.1).scrollY(0, ()=>(rand2 - 0.5) * 0.1), ()=>rand3)
      .out(out)
}

function selfModulate(sourceOut, out) {
  let rand1 = Math.random()
  let rand2 = Math.random()
  let rand3 = Math.random()
  src(sourceOut).modulate(src(sourceOut).scrollX(0, ()=>(rand1 - 0.5) * 0.1).scrollY(0, ()=>(rand2 - 0.5) * 0.1), ()=>rand3)
      .out(out)
}

function dither(sourceOut, out) {
  src(sourceOut).dither4().out(out)
}

function repeat(sourceOut, out, chromaKey) {
  if (chromaKey == undefined) {
    src(sourceOut).out(out)
    return
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
  chain = iterOffset(src(o0), iterations)
  for (let i=iterations - 1;i>0;i--) {
    chain = chain.layer(
      iterOffset(
        src(sourceOut).chroma(chromaKey.r,chromaKey.g,chromaKey.b),
        i
      )
    )
  }
  chain.out(out)
}

function repeat3d(sourceOut, out, chromaKey) {
  if (chromaKey == undefined) {
    src(sourceOut).out(out)
    return
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
  chain = solid()
  for (let i=iterations - 1;i>0;i--) {
    chain = chain.layer(
      iterOffset(
        src(sourceOut).chroma(chromaKey.r,chromaKey.g,chromaKey.b),
      )
    )
  }
  chain.out(out)
}
