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
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // create a new hydra-synth instance
  let hydra = new Hydra({
    detectAudio: false,
    canvas: document.getElementById("hydra"),
    numSources: 17,
  })
  s4.initScreen()
  s5.initCam()

  SETLIST = [
    { // before music
      sources: [
        new ImageSrc("http://localhost:8000/images/mag2026/bwb_logo.jpg", s8, DEFAULT_CHROMA_COLORS, [noOpExp] ),
      ],
    },
    { // 1
      sources: [
        new AsciiVizSrc("shower", noStrobeExpressions.concat([repeat, repeat3d])),
        new AsciiVizSrc("meteor", noStrobeExpressions.concat([repeat, repeat3d])),
        new ImageSrc("http://localhost:8000/images/mag2026/bwb_logo.jpg", s8, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/mag2026/gc_logo.jpg", s9, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 2
      sources: [
        new AsciiVizSrc("eclipse", noStrobeExpressions.concat([repeat, repeat3d])),
        new AsciiVizSrc("sun", noStrobeExpressions.concat([repeat, repeat3d])),
        new ImageSrc("http://localhost:8000/images/mag2026/bwb_logo.jpg", s8, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/mag2026/gc_logo.jpg", s9, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 3
      sources: [
        new AsciiVizSrc("fungus", noStrobeExpressions.concat([repeat, repeat3d])),
        new ImageSrc("http://localhost:8000/images/mag2026/bwb_logo.jpg", s8, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 4
      sources: [
        new AsciiVizSrc("mandala", noStrobeExpressions.concat([repeat, repeat3d])),
        new ImageSrc("http://localhost:8000/images/mag2026/bwb_logo.jpg", s8, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/mag2026/gc_logo.jpg", s9, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 5
      sources: [
        new VideoSrc("http://localhost:8000/images/mag2026/blender_scene.mp4", s8, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/mag2026/bwb_logo.jpg", s9, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/mag2026/gc_logo.jpg", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 6
      sources: [
        new VideoSrc("http://localhost:8000/images/mag2026/vhs_sunset_1.mp4", s8, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new VideoSrc("http://localhost:8000/images/mag2026/vhs_sunset_2.mp4", s9, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new VideoSrc("http://localhost:8000/images/mag2026/vhs_sunset_3.mp4", s10, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new VideoSrc("http://localhost:8000/images/mag2026/vhs_sunset_4.mp4", s11, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
        new ImageSrc("http://localhost:8000/images/mag2026/bwb_logo.jpg", s12, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 7
      sources: [
        new AsciiVizSrc("waves", noStrobeExpressions.concat([repeat, repeat3d])),
        new ImageSrc("http://localhost:8000/images/mag2026/bwb_logo.jpg", s8, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // 8
      sources: [
        new ScrollLogoSrc(),
        new ImageSrc("http://localhost:8000/images/mag2026/bwb_logo.jpg", s8, DEFAULT_CHROMA_COLORS, noStrobeExpressions.concat([repeat, repeat3d]) ),
      ],
    },
    { // after music
      sources: [
        new ImageSrc("http://localhost:8000/images/mag2026/bwb_logo.jpg", s8, DEFAULT_CHROMA_COLORS, [noOpExp] ),
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
function startNewExpression() {
  stopAsciiViz()
  // get random source
  source = randomChoice(SETLIST[parseInt(localStorage.SET_INDEX)].sources)
  
  let output = ""
  // check if source has keyColor
  if (source.keyColor && Math.random() > 0.0) {
    // get another source to be background
    bgSrc = randomChoice(SETLIST[parseInt(localStorage.SET_INDEX)].sources.concat([new PIPSrc()]))
    let keyColor = source.keyColor()
    if (keyColor) {
      output = expRender(bgSrc).layer(
        expRender(source).chroma(keyColor.r,keyColor.g,keyColor.b)
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
  output.out(o3)
  render(o3)
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
    //    const busInput = WebMidi.getInputByName('LoopBe Internal MIDI')
    const busInput = WebMidi.getInputByName('Midi Fighter 3D')
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
        // octave is 1 higher than what is shown in ableton
        // this note means that we show a different expression
        //        if (e.note.name === "E" && e.note.octave === 4 ) {
        //          startNewExpression()
        //        }

        // this note means that we move onto the next song in the set and show a different expression
        //        if (e.note.name === "A" && e.note.octave === 4) {
        console.log(e)
        if (e.note.name === "C" && e.note.octave === 3 && e.type == "noteon" && e.note.accidental == undefined) {
          nextVisual()
        } else {
          startNewExpression()
        }
      })
    } else {
      console.log("ableton bus input not enabled")
    }
    resetSources()
    startNewExpression()
  })
}

function nextVisual() {
  localStorage.SET_INDEX = (parseInt(localStorage.SET_INDEX) + 1) % SETLIST.length
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
