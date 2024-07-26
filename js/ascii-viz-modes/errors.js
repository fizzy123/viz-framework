function generateErrorsParams(span) {
  let colorPalette = COLOR_PALETTES[currentPaletteIndex]

  let intensity = 0
  if (span.intensity >= 0.01) {
    intensity = span.intensity - 1/CHARACTER_INTENSITY_ARRAYS[0].length
  } else {
    intensity = span.intensity
  }

  if (span.intensityOverride != null) {
    intensity = span.intensityOverride
    span.intensityOverride = null
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

// these are in span indexes, not raw x/y position
let ERR_POS = {
  x: 0,
  y: 0
}
let MOVE_DIFF = {
  x: 4,
  y: 2
}
let ERROR_MESSAGE_SHAPE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

let ERR_INDEX = 0
async function writeErrorWindow() {
  let MESSAGE_WIDTH = ERROR_MESSAGE_SHAPE[0].length
  let MESSAGE_HEIGHT = ERROR_MESSAGE_SHAPE.length
  for (let i=0; i<MESSAGE_WIDTH; i++) {
    for (let j=0; j<MESSAGE_HEIGHT; j++) {
      let spanX = ERR_POS.x + i 
      let spanY = ERR_POS.y + j
      let spanId = getSpanId(spanX, spanY)
      let span = charSpans[activeCharSpanId][spanId.toString()]
      if (span) {
        if (ERROR_MESSAGE_SHAPE[j][i] == 1) {
          span.intensityOverride = Math.random() * 0.2 + 0.8
        } else {
          span.intensityOverride = 0
        }
      }
    }
  }


  ERR_POS.x = Math.floor(MAX_X * Math.random())
  ERR_POS.y = Math.floor(MAX_Y * Math.random())
}
