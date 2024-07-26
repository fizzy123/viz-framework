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
}

const SETLIST = [
  { // intro
    sources: [{
      source: kkbTitle, // movie style title card for override
      resetFunc: kkbTitleReset,
      expressions: [
        noOpExp,
      ]
    }]
  },
  { // kero kero bonito
    sources: [{
      source: kkbTitle, // movie style title card for override
      resetFunc: kkbTitleReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // thique
    sources: [{
      source: asciiMode("eclipse"), 
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    },{
      source: thiqueWords, // words
      resetFunc: thiqueWordsReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // one two step
    sources: [{
      source: asciiMode("mandala"), // ascii movement 
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    },{
      source: oneTwoStepWords, // words
      resetFunc: oneTwoStepWordsReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // poppers
    sources: [{
      source: logoPaint, // paint
      resetFunc: logoPaintReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    },{
      source: poppers, // poppers
      resetFunc: poppersReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // have mercy
    sources: [{
      source: asciiMode("shower"),
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    },{
      source: asciiMode("meteor"),
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // alright
    sources: [{
      source: asciiMode("fungus"),
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    },{
      source: setlist, // setlist
      resetFunc: setlistReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // thot shit
    sources: [{
      source: grindr, // scrolling grinder 
      resetFunc: grindrReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // lose control
    sources: [{
      source: asciiMode("errors"), // expanding error windows
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // asap
    sources: [{
      source: glitchAsapWords, // glitch distort
      resetFunc: glitchAsapWordsReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    },{
      source: asapWords, // words
      resetFunc: asapWordsReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // bitch better have my money
    sources: [{
      source: asciiMode("waves"),
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    },{
      source: bitchBetterHaveMyMoneyWords, // words
      resetFunc: bitchBetterHaveMyMoneyWordsReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // call ticketron
    sources: [{
      source: callTicketronTickets, // flyer/ticket override layout
      resetFunc: callTicketronTicketsReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // lord forgive me
    sources: [{
      source: droste,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    },{
      source: lordForgiveMeWords, // words
      resetFunc: lordForgiveMeWordsReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // whistle
    sources: [{
      source: psychWaves,
      resetFunc: psychWavesReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    },{
      source: whistleProducts,
      resetFunc: whistleProductsReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // 1997 diana
    sources: [{
      source: videoCalibration, // video/signal calibration graphics
      resetFunc: videoCalibrationReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    },{
      source: scrollLogo, // logo scan
      resetFunc: scrollLogoReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // phenomenal
    sources: [{
      source: phenomenalCover, // art magazine style override layout
      resetFunc: phenomenalCoverReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    },{
      source: phenomenalWords, // words
      resetFunc: phenomenalWordsReset,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // welcome to my island
    sources: [{
      source: abletonDistort,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }, {
      source: cmdDistort,
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // click
    sources: [{
      source: asciiMode("cameras"), // audience/self cam
      expressions: [
        noOpExp,
        blackExp,
        strobeExp,
        scrollExp,
        invertExp,
        modulateNoise,
        modulateRepeatNoise,
        modulatePixelateNoise,
        modulateVoronoi,
        modulateOsc,
        modulateFeedback,
        modulateOscChaos,
        modulateFeedbackChaos,
        colorSub,
        colorSweep,
      ]
    }]
  },
  { // ending
    sources: [{
      source: kkbTitle, // movie style title card for override
      resetFunc: kkbTitleReset,
      expressions: [
        noOpExp,
      ]
    }]
  }
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
localStorage.SET_INDEX = "9"
localStorage.log = "false"
function startNewExpression() {
  stopAsciiViz()
  // flash as we switch to a new thing
  randomChoice(pulseOptions)()
  setTimeout(function() {
    // get random source
    sourceInfo = randomChoice(SETLIST[parseInt(localStorage.SET_INDEX)].sources)
    // get random expression of source
    let newExpression = randomChoice(sourceInfo.expressions)
    if (localStorage.log == "true") {
      console.log(sourceInfo.source)
      console.log(newExpression)
    }

    newExpression(sourceInfo.source())
  }, 20)
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
        if (e.note.name === "E" && e.note.octave === 4) {
          startNewExpression()
        }

        // this note means that we move onto the next song in the set and show a different expression
        if (e.note.name === "A" && e.note.octave === 4) {
          localStorage.SET_INDEX = parseInt(localStorage.SET_INDEX) + 1
          for (let source of SETLIST[parseInt(localStorage.SET_INDEX)].sources) {
            if (source.resetFunc) {
              source.resetFunc()
            }
          }
          startNewExpression()
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
