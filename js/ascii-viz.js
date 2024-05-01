let activeCharSpanId = 0;
let charSpans = [{}, {}];
let paramsBuffers = [{}, {}];
let particleBuffers = {
  network: [],
  shower: [],
  saturn: [],
  asteroidBelt: [],
  sun: [], // shared by sun and eclipse modes
  meteor: [],
};
let particleConfigs = [{
  limit: 1000,
  generationRate: 0.01,
  startingXRange: window.innerWidth,
  startingYRange: window.innerHeight,
  speed: 15,
  angle: 0,
  angleDiff: 90,
  speedDiff: 0.3
}];
let spanWidth
let spanHeight
let mouseX
let mouseY

let CHARACTER_HEIGHT = 15;
let CHARACTER_WIDTH = 15;
let MAX_X = 0;
let MAX_Y = 0;

const CHARACTER_INTENSITY_ARRAYS = [
  `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^\`'. `.split("").reverse().join(""),
  ` .:-=+*#%@`
]

let reset = false
let currentPaletteIndex
let currentBufferIndex = 0
let CHARSET_ID = 0

let tmpCanvas=document.createElement("canvas");

var tmpCtx=tmpCanvas.getContext("2d", { willReadFrequently: true });

function getSpanId(spanX, spanY) {
  return spanY * Math.floor(window.innerWidth/CHARACTER_WIDTH) + spanX
}

function asciiVizInit() {
  MainLoop.setMaxAllowedFPS(60)
  let canvasCtx = document.getElementById('ascii').getContext("2d", { willReadFrequently: true });

  if (MODES[CURRENT_MODE].resetFunc) {
    MODES[CURRENT_MODE].resetFunc()
  }
  let canvas = document.getElementById('ascii');
  canvas.setAttribute('width', window.innerWidth - (window.innerWidth % CHARACTER_WIDTH));
  canvas.setAttribute('height', window.innerHeight - (window.innerHeight % CHARACTER_HEIGHT));
  currentPaletteIndex = Math.floor(Math.random() * COLOR_PALETTES.length)

  document.body.style.backgroundColor = "black";
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  MAX_X = Math.floor(windowWidth/CHARACTER_WIDTH)
  MAX_Y = Math.floor(windowHeight/CHARACTER_HEIGHT)
  for (let [charSpanId, charSpan] of charSpans.entries()) {
    for(let y=0; y<windowHeight/CHARACTER_HEIGHT; y++) {
      for(let x=0; x<windowWidth/CHARACTER_WIDTH; x++) {
        let id = y * Math.floor(windowWidth/CHARACTER_WIDTH) + x
        const charSpan = {}
        charSpan.id = id
        charSpan.x = x
        charSpan.y = y
//        charSpan.intensity = Math.random();
        charSpan.intensity = 0;
        charSpan.top = y * CHARACTER_HEIGHT;
        charSpan.left = x * CHARACTER_WIDTH;
        charSpan.color = "white";
        charSpan.width = 15;
        charSpan.height = 15;
        charSpans[charSpanId][id.toString()] = charSpan

        spanWidth = x
      }
      spanHeight = y
    }
  }
}

let intensityOn = false
async function draw() {
  let canvasCtx = document.getElementById('ascii').getContext("2d", { willReadFrequently: true });
  // update particles
  await MODES[CURRENT_MODE].updateParticles()

  tmpParamsBuffer = {}
  // render spans
  for (let spanId in charSpans[activeCharSpanId]) {
      start = Date.now()
      let span = charSpans[activeCharSpanId][spanId]
      let newParams = await MODES[CURRENT_MODE].generateParams(span);

      tmpParamsBuffer[spanId] = newParams;
      if (reset) {
        newParams = {}
        newParams.color = "#000"
        newParams.intensity = 0
      }

      // pass on intensity
      if (newParams.intensity !== undefined) {
        span.intensity = newParams.intensity
      }

      // configure bg params
      if (newParams.bgIntensity !== undefined) {
        span.backgroundColor = newParams.backgroundColor
        span.bgIntensity = newParams.bgIntensity

        canvasCtx.fillStyle = newParams.backgroundColor
        canvasCtx.fillRect(span.x * CHARACTER_WIDTH, span.y * CHARACTER_HEIGHT, span.width, span.height)
      }

      // configure text params
      if (newParams.color) {
        span.color = newParams.color
      }
      if (newParams.weight) {
        span.fontWeight = newParams.weight;
      }
      if (newParams.charIntensity !== undefined) {
        let currentCharIntensityArray = CHARACTER_INTENSITY_ARRAYS[CHARSET_ID]
        let spanCharIndex = Math.floor(newParams.charIntensity * currentCharIntensityArray.length)
        if (spanCharIndex >= currentCharIntensityArray.length) {
          spanCharIndex = currentCharIntensityArray.length - 1
        }
        if (spanCharIndex < 0) {
          spanCharIndex = 0
        }
        span.charIntensity = newParams.charIntensity

        canvasCtx.fillStyle = newParams.color
        canvasCtx.font = "16px Roboto Mono";

        outputX = span.x * CHARACTER_WIDTH + 3
        outputY = (span.y + 1) * CHARACTER_HEIGHT - 1
        canvasCtx.fillText(currentCharIntensityArray[spanCharIndex], outputX, outputY)
      }
  }
//  document.getElementById("fps").innerText = MainLoop.getFPS()
  paramsBuffers[activeCharSpanId] = tmpParamsBuffer
  reset = false
}

MAX_LIFE = 150

STARTING_POINTS = []

let CURRENT_MODE = 'network';
let MODES = {
    network: {
      generateParams: generateNetworkParams,
      updateParticles: updateNetworkParticles,
    },
    shower: {
      generateParams: generateShowerParams,
      updateParticles: updateShowerParticles,
    },
    waves: {
      generateParams: generateWavesParams,
      updateParticles: async () => {},
    },
    noise: {
      generateParams: generateNoiseParams,
      updateParticles: async () => {},
    },
    fungus: {
      generateParams: generateFungusParams,
      updateParticles: async () => {},
    },
    saturn: {
      generateParams: generateSaturnParams,
      updateParticles: updateSaturnParticles,
      resetFunc: saturnResetFunc,
    },
    asteroidBelt: {
      generateParams: generateAsteroidBeltParams,
      updateParticles: updateAsteroidBeltParticles,
      resetFunc: asteroidBeltResetFunc,
    },
    eclipse: {
      generateParams: generateEclipseParams,
      updateParticles: updateEclipseParticles,
      resetFunc: sunResetFunc,
    },
    sun: {
      generateParams: generateSunParams,
      updateParticles: updateEclipseParticles,
      resetFunc: sunResetFunc,
    },
    meteor: {
      generateParams: generateMeteorParams,
      updateParticles: updateMeteorParticles,
      resetFunc: meteorResetFunc,
    },
  }

function switchPalette() {
  if (activeCharSpanId == 0) {
    activeCharSpanId = 1
  } else {
    activeCharSpanId = 0
  }
  currentPaletteIndex = Math.floor(Math.random() * COLOR_PALETTES.length)
}

function asciiMode(asciiModeName) {
  return () => {
    if (MODES[CURRENT_MODE].resetFunc) {
      MODES[CURRENT_MODE].resetFunc()
    }
    if (asciiModeName == "eclipse" || asciiModeName == "sun") {
      reset = true
    }
    CURRENT_MODE = asciiModeName
    switchPalette()

    // init hydra
    const ascii = document.getElementById("ascii");
    s0.init({src: ascii})

    return src(s0)
  }
}

function startAsciiViz() {
  MainLoop.setDraw(draw).start();
}

function stopAsciiViz() {
  MainLoop.stop();
}

