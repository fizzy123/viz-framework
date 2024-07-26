let SUN_SIZE_FACTOR = 0
function generateSunParams(span) {
  let colorPalette = COLOR_PALETTES[currentPaletteIndex]

  spanX = span.x * CHARACTER_WIDTH
  spanY = span.y * CHARACTER_HEIGHT
  spanXDiff = spanX - (window.innerWidth/2)
  spanYDiff = spanY - (window.innerHeight/2)
  distance = Math.sqrt(Math.pow(spanXDiff, 2) + Math.pow(spanYDiff, 2))
  let intensity = span.intensity
  if (distance < 300 + SUN_SIZE_FACTOR) {
    intensity = 0.99
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

let sunLastReset = Date.now()
function sunResetFunc() {
  if ((Date.now() - sunLastReset) > (5 * 1000)) {
    SUN_SIZE_FACTOR = Math.random() * 200 - 100
    sunLastReset = Date.now()
  }
}
