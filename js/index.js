window.onload = function() {
  setupHydraSources()
  asciiVizInit()
  initAbleton()
}

function setupHydraSources() {
  const canvas = document.getElementById("hydra");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // create a new hydra-synth instance
  let hydra = new Hydra({
    detectAudio: false,
    canvas: document.getElementById("hydra"),
    numSources: 16,
  })
  s3.initCam()
}

const SETLIST = [
  { 
    sources: [{
      source: imageWrapper(1),
      resetFunc: imageResetWrapper(["http://localhost:8000/images/cc/poster_opaque.png"]),
      expressions: [
        noOpExp,
      ]
    }]
  },
  { 
    sources: [{
      source: videoCalibration,
      resetFunc: videoCalibrationReset,
      expressions: [
        noOpExp,
        blackExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        colorSub,
        colorSweep,
      ]
    },{
      source: imageWrapper(2),
      resetFunc: imageResetWrapper(["http://localhost:8000/images/cc/poster.png","http://localhost:8000/images/cc/poster_opaque.png"]),
      expressions: [
        noOpExp,
        blackExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        colorSub,
        colorSweep,
      ]
    }],
    backgrounds: [webcam],
  },
  {
    sources: [{
      source: asciiMode("shower"),
      expressions: [
        noOpExp,
        blackExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        colorSub,
        colorSweep,
      ]
    },{
      source: imageWrapper(2),
      resetFunc: imageResetWrapper(["http://localhost:8000/images/cc/wide.png","http://localhost:8000/images/cc/wide_alt.png"]),
      expressions: [
        noOpExp,
        blackExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        colorSub,
        colorSweep,
      ]
    }],
    backgrounds: [webcam],
  },
  { 
    sources: [{
      source: asciiMode("fungus"),
      expressions: [
        noOpExp,
        blackExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        colorSub,
        colorSweep,
      ]
    },{
      source: imageWrapper(2),
      resetFunc: imageResetWrapper(["http://localhost:8000/images/cc/big.png","http://localhost:8000/images/cc/big_alt.png"]),
      expressions: [
        noOpExp,
        blackExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        colorSub,
        colorSweep,
      ]
    }],
    backgrounds: [webcam],
  },
  { 
    sources: [{
      source: scrollLogo, // logo scan
      resetFunc: scrollLogoReset,
      expressions: [
        noOpExp,
        blackExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        colorSub,
        colorSweep,
      ]
    },
    {
      source: asciiMode("meteor"),
      expressions: [
        noOpExp,
        blackExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        colorSub,
        colorSweep,
      ]
    }],
    backgrounds: [webcam],
  },
  { 
    sources: [{
      source: asciiMode("waves"),
      expressions: [
        noOpExp,
        blackExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        colorSub,
        colorSweep,
      ]
    },{
      source: imageWrapper(2),
      resetFunc: imageResetWrapper(["http://localhost:8000/images/cc/poster2.png","http://localhost:8000/images/cc/poster2_alt.png"]),
      expressions: [
        noOpExp,
        blackExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        colorSub,
        colorSweep,
      ]
    }],
    backgrounds: [webcam],
  },
  { 
    sources: [{
      source: asciiMode("eclipse"),
      expressions: [
        noOpExp,
        blackExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        colorSub,
        colorSweep,
      ]
    },{
      source: imageWrapper(2),
      resetFunc: imageResetWrapper(["http://localhost:8000/images/cc/wide2.png","http://localhost:8000/images/cc/wide2_alt.png"]),
      expressions: [
        noOpExp,
        blackExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        colorSub,
        colorSweep,
      ]
    }],
    backgrounds: [webcam],
  },
  { 
    sources: [{
      source: blank,
      expressions: [
        noOpExp,
      ]
    }]
  },
]

const pulseOptions = [
  invertPulse,
  solidPulse,
]

function invertPulse() {
  src(o0).invert().out(o0)
}

function solidPulse() {
  solid(0,0,0).out(o0)
}

let lastExpression = null
let playedHighSourceLast = false
localStorage.SET_INDEX = "0"
localStorage.log = "false"
function startNewExpression() {
  stopAsciiViz()
  // flash as we switch to a new thing
//  randomChoice(pulseOptions)()
  setTimeout(function() {
    // get random source
    sourceInfo = randomChoice(SETLIST[parseInt(localStorage.SET_INDEX)].sources)
    // don't do anything if it's an empty source
    if (sourceInfo) {
      // get random expression of source
      let newExpression = randomChoice(sourceInfo.expressions)
      if (localStorage.log == "true") {
        console.log(sourceInfo.source)
        console.log(newExpression)
      }

      if (SETLIST[parseInt(localStorage.SET_INDEX)].backgrounds) {
        background = randomChoice(SETLIST[parseInt(localStorage.SET_INDEX)].backgrounds)()
        output = newExpression(sourceInfo.source())
        background.layer(src(output)).out(o3)

        render(o3)
      } else {
        output = newExpression(sourceInfo.source())
        render(output)
      }
    }
  }, 0)
}

document.documentElement.style.cursor = 'none';
startAsciiViz()
let CURRENT_BEAT = 0

function initAbleton() {
  WebMidi.enable(function(err) {
    if (err) throw err;
    const busInput = WebMidi.getInputByName('LoopBe Internal MIDI')
    if (busInput) {
      busInput.addListener('noteon', 'all', function(e) {
        const canvas = document.getElementById("hydra");
        const gl = canvas.getContext("webgl");
        if (gl.isContextLost()) {
          console.log("context lost")
          location.reload()
        }
//        console.log(e.note.name)
//        console.log(e.note.octave)
        // octave is 1 higher than what is shown in ableton
        // this note means that we show a different expression
        if (e.note.name === "E" && e.note.octave === 4 ) {
          startNewExpression()
        }

        // this note means that we move onto the next song in the set and show a different expression
        if (e.note.name === "A" && e.note.octave === 4) {
          nextVisual()
        }
      })
    } else {
      console.log("ableton bus input not enabled")
    }
    for (let source of SETLIST[parseInt(localStorage.SET_INDEX)].sources) {
      if (source.resetFunc) {
        source.resetFunc()
      }
    }
    startNewExpression()
  })
}

function nextVisual() {
  localStorage.SET_INDEX = (parseInt(localStorage.SET_INDEX) + 1) % SETLIST.length
  console.log(SETLIST.length)
  for (let source of SETLIST[parseInt(localStorage.SET_INDEX)].sources) {
    if (source.resetFunc) {
      source.resetFunc()
    }
  }
  startNewExpression()
}
