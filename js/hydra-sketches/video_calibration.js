function videoCalibrationReset() {
  srcUrl = "http://localhost:8000/images/video_calibration.png",
  s1.initImage(srcUrl)
}
function videoCalibration() {
  return src(s1).scrollX(0, Math.random() - 0.5).scrollY(0, Math.random() - 0.5)
}
