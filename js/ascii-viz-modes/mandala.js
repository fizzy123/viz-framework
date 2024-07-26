function generateMandalaParams(span) {
  let colorPalette = COLOR_PALETTES[currentPaletteIndex]

  let intensity = 0

  if (span.intensity >= 0.01) {
    intensity = span.intensity - 2/CHARACTER_INTENSITY_ARRAYS[0].length
  } else {
    intensity = span.intensity
  }

  if (span.intensityOverride) {
    intensity = span.intensityOverride
    span.intensityOverride = 0
  }

  splitInt = intensitySplit(intensity)
  let charColor = intensityToColor(splitInt.charIntensity)
  let bgColor = intensityToColor(splitInt.bgIntensity)
  return {
    intensity,
    charIntensity: splitInt.charIntensity,
    bgIntensity: splitInt.bgIntensity,
    color: charColor,
    backgroundColor: bgColor,
  }
};

let MOUSE_X = 0
let MOUSE_Y = 0
onmousemove = function(e) {
  MOUSE_X = e.clientX
  MOUSE_Y = e.clientY
}
async function updateMandalaParticles() {
  let particles = particleBuffers.mandala

  particles.filter( function(particle) {
    // fill inbetweens but only if edge of screen wasn't crossed
    let distance = Math.sqrt(Math.pow(particle.x - particle.oldX, 2) + Math.pow(particle.y - particle.oldY, 2))
    if (distance < 500) {
      let startingXIndex = Math.round(particle.oldX / CHARACTER_WIDTH)
      let startingYIndex = Math.round(particle.oldY / CHARACTER_HEIGHT)
      let finalXIndex = Math.round(particle.x / CHARACTER_WIDTH)
      let finalYIndex = Math.round(particle.y / CHARACTER_HEIGHT)
      let xDiff = finalXIndex - startingXIndex
      let yDiff = finalYIndex - startingYIndex
      let xSpanCount = Math.abs(xDiff) + 1
      let ySpanCount = Math.abs(yDiff) + 1

      let steps = ySpanCount
      if (Math.abs(xSpanCount) > Math.abs(ySpanCount)) {
        steps = xSpanCount
      }

      for (let i=0; i<steps; i++) {
        let spanId = getSpanId(Math.floor(startingXIndex), Math.floor(startingYIndex))
        let span = charSpans[activeCharSpanId][spanId.toString()]
        if (span) {
          span.intensityOverride = 1
        }

        if (xDiff > 0) {
          startingXIndex = startingXIndex + xSpanCount/steps
        } else {
          startingXIndex = startingXIndex - xSpanCount/steps
        }

        if (yDiff > 0) {
          startingYIndex = startingYIndex + ySpanCount/steps
        } else {
          startingYIndex = startingYIndex - ySpanCount/steps
        }
      }
    }

    // mark final pixel
    let spanX = Math.round(particle.x / CHARACTER_WIDTH)
    let spanY = Math.round(particle.y / CHARACTER_HEIGHT)
    let spanId = getSpanId(spanX, spanY)
    let span = charSpans[activeCharSpanId][spanId.toString()]
    if (span) {
      span.intensityOverride = 1
    }
    let targetPos = particle.mappingFunc(MOUSE_X, MOUSE_Y)
    particle.oldX = particle.x
    particle.oldY = particle.y
    particle.x = particle.x + (targetPos.x - particle.x) / 10
    particle.y = particle.y + (targetPos.y - particle.y) / 10
  })
}


function createMandalaParticles() {
  particleBuffers.mandala = [
    {
      x: 0,
      y: 0,
      mappingFunc: mappingFuncGen(0, 0)
    },
    {
      x: 0,
      y: 0,
      mappingFunc: mappingFuncGen(2 * Math.PI / 3, 0)
    },
    {
      x: 0,
      y: 0,
      mappingFunc: mappingFuncGen(2 * Math.PI * 2 / 3, 0)
    },
    {
      x: 0,
      y: 0,
      mappingFunc: mappingFuncGen(0, 200, true)
    },
    {
      x: 0,
      y: 0,
      mappingFunc: mappingFuncGen(2 * Math.PI / 5, 200, true)
    },
    {
      x: 0,
      y: 0,
      mappingFunc: mappingFuncGen(2 * Math.PI * 2 / 6, 200, true)
    },
    {
      x: 0,
      y: 0,
      mappingFunc: mappingFuncGen(2 * Math.PI * 3 / 6, 200, true)
    },
    {
      x: 0,
      y: 0,
      mappingFunc: mappingFuncGen(2 * Math.PI * 4 / 6, 200, true)
    },
    {
      x: 0,
      y: 0,
      mappingFunc: mappingFuncGen(2 * Math.PI * 5 / 6, 200, true)
    },
  ]
}

let MAX_DISTANCE = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2))
function mappingFuncGen(angleOffset, radiusOffset, reverse = false) {
  return (x, y) => {
    let centerX = x - window.innerWidth/2
    let centerY = y - window.innerHeight/2
    let distance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2))
    let acos = Math.acos(centerX/distance)
    let angle = acos
    if (centerY <= 0) {
      angle = 360 - acos
    }
    angle = (angle + angleOffset) % (2 * Math.PI)
    radius = distance + radiusOffset
    if (reverse) {
      radius = MAX_DISTANCE - radius
    }
    radius = radius % MAX_DISTANCE
    return {
      x: radius * Math.cos(angle) + window.innerWidth/2,
      y: radius * Math.sin(angle) + window.innerHeight/2,
    }

  }
}
