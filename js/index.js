window.onload = function() {
  asciiVizInit()
  setupHydraSources()
  setupMode()
}

function setupHydraSources() {
  const canvas = document.getElementById("hydra");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // create a new hydra-synth instance
  let hydra = new Hydra({
    detectAudio: false,
    canvas: document.getElementById("hydra"),
  })
}

function setupMode() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const mode = urlParams.get('mode')
  if (mode == "ableton") {
    initAbleton()
  }
}

const VIBE = "chill"

const HIGH_SOURCES = [
  hydraRefract,
]

const LOW_SOURCES = [
  asciiMode("network"),
  asciiMode("shower"),
  asciiMode("waves"),
  asciiMode("noise"),
  asciiMode("fungus"),
  asciiMode("saturn"),
  asciiMode("asteroidBelt"),
  asciiMode("eclipse"),
  asciiMode("sun"),
  asciiMode("meteor"),
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
function switchExpression() {
  randomChoice(pulseOptions)()
  setTimeout(function() {
    // start current source
    source = HIGH_SOURCES[CURRENT_HIGH_SOURCE_INDEX]()
    if (playedHighSourceLast || Math.random() > 0.5) {
      source = LOW_SOURCES[CURRENT_LOW_SOURCE_INDEX]()
      playedHighSourceLast = false
    } else {
      playedHighSourceLast = true
    }

    let expressionPool = []
    for (let expression of expressions) {
      if (expression != lastExpression) {
        expressionPool.push(expression)
      }
    }
    let newExpression = randomChoice(expressionPool)
    newExpression(source)
    lastExpression = newExpression
  }, 20)
}

let CURRENT_HIGH_SOURCE_INDEX = 0
let CURRENT_LOW_SOURCE_INDEX = 0
startAsciiViz()
let CURRENT_BEAT = 0

function initAbleton() {
  WebMidi.enable(function(err) {
    if (err) throw err;
    const busInput = WebMidi.getInputByName('LoopBe Internal MIDI')
    if (busInput) {
      busInput.addListener('noteon', 'all', function(e) {
//        console.log(e.note.name)
//        console.log(e.note.octave)
        // octave is 1 higher than what is shown in ableton
        if (e.note.name === "B" && e.note.octave === 4) {
          if (CURRENT_BEAT % 4 == 0) {
            calcBpm()
          }

          CURRENT_BEAT = CURRENT_BEAT + 1
          if (CURRENT_BEAT == 16) {
            CURRENT_BEAT = 0
          }
        }
        if (e.note.name === "A" && e.note.octave === 4) {
          switchExpression()
        }
      })
    } else {
      console.log("ableton bus input not enabled")
    }
  })
}

let LAST_BEAT = Date.now()
let BPM = 120
function calcBpm() {
  newBeat = Date.now()
  BPM = (newBeat - LAST_BEAT)
  LAST_BEAT = newBeat
}
