window.onload = function() {
  setupHydraSources()
  setCustomHydraFunctions()
  asciiVizInit()
  initAbleton()
}

let SETLIST = []

// source assignment
// s0, s1 are for expressions
// s2 for ascii-viz
// s3 for final output
// s4 for screen input (usually for picture in pciture)
// s5 is for webcam
// s6 for ableon
// s7 for cmd
// s8-16 are for images and videos

function setupHydraSources() {
  const canvas = document.getElementById("hydra");
  canvas.style.width = window.innerWidth;
  canvas.style.height = window.innerHeight;
  canvas.width = 1920
  canvas.height = 1080
  // create a new hydra-synth instance
  let hydra = new Hydra({
    detectAudio: false,
    canvas: canvas,
    numSources: 17,
    numOutputs: 5,
    precision: 'highp',
  })
  s4.initScreen()
//  s5.initCam()

  SETLIST = [
    { // 1 - before music
      sources: [
        new ImageSrc("http://localhost:8000/images/nobelyoo/big.png", s8, [{r:0,g:0,b:0}, {r:212,g:212,b:212}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster1.png", s9, [{r:13,g:13,b:13}, {r:255,g:255,b:255}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster2.png", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/wide1.png", s11, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 2 - thique
      sources: [
        new AsciiVizSrc("eclipse", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/big.png", s8, [{r:0,g:0,b:0}, {r:212,g:212,b:212}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster1.png", s9, [{r:13,g:13,b:13}, {r:255,g:255,b:255}], noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 3 - poppers
      sources: [
        new AsciiVizSrc("fungus", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster1.png", s9, [{r:13,g:13,b:13}, {r:255,g:255,b:255}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster2.png", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 4 - bitch better have my money
      sources: [
        new AsciiVizSrc("waves", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster2.png", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/wide1.png", s11, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 5 - phenomenal
      sources: [
        new AsciiVizSrc("eclipse", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/big.png", s8, [{r:0,g:0,b:0}, {r:212,g:212,b:212}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/wide1.png", s11, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 6 - alright
      sources: [
        new AsciiVizSrc("fungus", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/big.png", s8, [{r:0,g:0,b:0}, {r:212,g:212,b:212}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster2.png", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 7 - thot shit
      sources: [
        new AsciiVizSrc("waves", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster1.png", s9, [{r:13,g:13,b:13}, {r:255,g:255,b:255}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/wide1.png", s11, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 8 - 1997 diana
      sources: [
        new ScrollLogoSrc(),
        new ImageSrc("http://localhost:8000/images/nobelyoo/big.png", s8, [{r:0,g:0,b:0}, {r:212,g:212,b:212}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster2.png", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 9 - call ticketron
      sources: [
        new ImageSrc("http://localhost:8000/images/video_calibration.png", s8, [], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/big.png", s9, [{r:0,g:0,b:0}, {r:212,g:212,b:212}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster2.png", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 10 - asap
      sources: [
        new AsciiVizSrc("shower", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/big.png", s8, [{r:0,g:0,b:0}, {r:212,g:212,b:212}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster1.png", s9, [{r:13,g:13,b:13}, {r:255,g:255,b:255}], noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 11 - lose control
      sources: [
        new AsciiVizSrc("waves", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster1.png", s9, [{r:13,g:13,b:13}, {r:255,g:255,b:255}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster2.png", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 12 - whistle
      sources: [
        new AsciiVizSrc("shower", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster2.png", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/wide1.png", s11, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 13 - battle theme
      sources: [
        new AsciiVizSrc("eclipse", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/wide1.png", s11, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/big.png", s8, [{r:0,g:0,b:0}, {r:212,g:212,b:212}], noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 14 - lalala
      sources: [
        new AsciiVizSrc("shower", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/big.png", s8, [{r:0,g:0,b:0}, {r:212,g:212,b:212}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster2.png", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 15 - oh yeah
      sources: [
        new AsciiVizSrc("meteor", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/wide1.png", s11, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster2.png", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 16 - next level charli
      sources: [
        new AsciiVizSrc("fungus", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/big.png", s8, [{r:0,g:0,b:0}, {r:212,g:212,b:212}], noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/wide1.png", s11, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 17 - booboo
      sources: [
        new AsciiVizSrc("waves", noStrobeExpressions.concat([repeat, repeat3d]), 8),
        new ImageSrc("http://localhost:8000/images/nobelyoo/poster2.png", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/nobelyoo/big.png", s8, [{r:0,g:0,b:0}, {r:212,g:212,b:212}], noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
  ]
}


function expImpulse( x, k )
{
    let a = Math.PI*(k*x-1.0);
    return Math.sin(a) *Math.pow(a,-1.3);
}

const impulseScale = (source) => {
  let now = Date.now()
  return source.scale(()=>{
    let dif = (Date.now() - now)/100
    return Math.min(expImpulse(dif, 3) + 1,3)
  })
}

const impulseX = (source) => {
  let now = Date.now()
  return source.scrollX(()=>{
    let dif = (Date.now() - now)/100
    return expImpulse(dif, 5)
  })
}

const impulseY = (source) => {
  let now = Date.now()
  return source.scrollY(()=>{
    let dif = (Date.now() - now)/100
    return expImpulse(dif, 5)
  })
}

IMPULSES = [
  impulseScale,
  impulseX,
  impulseY,
]

let lastExpression = null
let playedHighSourceLast = false
localStorage.SET_INDEX = "0"
localStorage.log = "false"
let CHROMA_COLOR = {}
function startNewExpression() {
  let start = Date.now()

  stopAsciiViz()
  console.log("stopped ascii viz", Date.now() - start)
  // get random source
  source = randomChoice(SETLIST[parseInt(localStorage.SET_INDEX)].sources)
  
  let output = ""
  // check if source has keyColor
  if (source.keyColor && Math.random() > 0.0) {
    // get another source to be background
    bgSrc = randomChoice(SETLIST[parseInt(localStorage.SET_INDEX)].sources.concat([new PIPSrc()]))
    let keyColor = source.keyColor()
    CHROMA_COLOR.r = keyColor.r
    CHROMA_COLOR.g = keyColor.g
    CHROMA_COLOR.b = keyColor.b
    if (keyColor) {
      output = expRender(bgSrc).layer(
        expRender(source).chroma(()=>CHROMA_COLOR.r,()=>CHROMA_COLOR.g,()=>CHROMA_COLOR.b)
      )
    } else {
      output = expRender(source)
    }
  } else {
    output = expRender(source)
  }

  if (Math.random() < 0) {
    output = randomChoice(IMPULSES)(output)
  }
  console.log("exprender", Date.now() - start)
  output.out(o3)
  console.log("output.out", Date.now() - start)
  render(o3)
  console.log("render", Date.now() - start)
}

function expRender(source) {
  console.log(source)
  let expression = randomChoice(source.expressions)
  console.log(expression)
  if (source.keyColor) {
    return expression(source.render(), source.keyColor())
  }
  return expression(source.render())
}

document.documentElement.style.cursor = 'none';
startAsciiViz()
let CURRENT_BEAT = 0

function initAbleton() {
  WebMidi.enable(function(err) {
    if (err) throw err;
    const busInput = WebMidi.getInputByName('IAC Driver Bus 1')
      WebMidi.inputs.forEach(input => console.log(input.manufacturer, input.name));

    if (busInput) {
      busInput.addListener('noteon', 'all', function(e) {
        const canvas = document.getElementById("hydra");
        const gl = canvas.getContext("webgl");
        if (gl.isContextLost()) {
          console.log("context lost")
          location.reload()
        }
        //console.log(e.note.name)
        //console.log(e.note.octave)
        console.log(e)
        // octave = 4 shows as octave 3 in ableton
        // octave = 4 is also for valentines day show. kicks are usually on octave 3
        if (e.note.name === "C" && e.note.octave === 4 && e.type == "noteon" && e.note.accidental == undefined) {
          nextVisual(e.rawVelocity)
        } else {
          startNewExpression()
        }
      })
    } else {
      console.log("ableton bus input not enabled")
    }
    window.addEventListener("click", (e) => {
      startNewExpression()
    });
    resetSources()
    startNewExpression()
  })
}

function nextVisual(index) {
  console.log("next visual", index)
  localStorage.SET_INDEX = index
  resetSources()
  startNewExpression()
}

function resetSources() {
  for (let source of SETLIST[parseInt(localStorage.SET_INDEX)].sources) {
    if (source.reset) {
      source.reset()
    }
  }
}
