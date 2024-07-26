let LIFE_RADIUS_MAPPING = [
  1000,
  400,
  100,
  50,
  10,
  20,
  1
]

function generateCamerasParams(span) {
  let colorPalette = COLOR_PALETTES[currentPaletteIndex]
  let intensity = 0

  for (let particle of particles) {
    let spanX = span.x * CHARACTER_WIDTH
    let spanY = span.y * CHARACTER_HEIGHT
    let spanXDiff = spanX - particle.x
    let spanYDiff = spanY - particle.y
    let distance = Math.sqrt(Math.pow(spanXDiff, 2) + Math.pow(spanYDiff, 2))
    if (distance < LIFE_RADIUS_MAPPING[particle.life]) {
      intensity = (CAMERA_MAX_LIFE - particle.life + 1)/CAMERA_MAX_LIFE - Math.random() * 0.03
    }
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


let CAMERA_MAX_LIFE = 6
let CYCLE_LENGTH = 3
let CYCLE_POSITION = 0
async function updateCamerasParticles() {
  particles = particleBuffers.cameras
  if (CYCLE_POSITION % CYCLE_LENGTH == 0 ) {
    particles.push({
      x: window.innerWidth * Math.random(),
      y: window.innerHeight * Math.random(),
      life: CAMERA_MAX_LIFE
    })
  }
  CYCLE_POSITION = (CYCLE_POSITION + 1) % CYCLE_LENGTH

  particles = await async.filter(particles, async function(particle) {
    particle.life = particle.life - 1

    if (particle.x < 0 ||
        particle.x > window.innerWidth ||
        particle.y < 0 ||
        particle.y > window.innerHeight ||
        particle.life < 1) {
      return false
    } else {
      return true
    }
  })
  particleBuffers.cameras = particles
}
