function setCustomHydraFunctions() {
  // Might want to add tinting at edges, but not going to worry about that for now.
  setFunction({
      name: 'chroma',
      type: 'color',
      inputs: [
      {
        type: 'float',
        name: 'keyR',
        default: 0.0,
      },
      {
        type: 'float',
        name: 'keyG',
        default: 0.0,
      },
      {
        type: 'float',
        name: 'keyB',
        default: 0.0,
      },
          ],
      glsl: `
          float colorDistance = distance(_c0.rgb, vec3(keyR,keyG,keyB));
          float k = step(0.1, colorDistance);
          return vec4(_c0.rgb, min(k, _c0.a));
  `})

  setFunction({
    name: 'polar',
    type: 'coord',
    inputs: [],
    glsl: `
      vec2 st = _st - 0.5;
     float r = length(st);
     float a = atan(st.y, st.x);
     float pi = 2.*3.1416;
     return vec2(r*2., a/pi);`
  })
  setFunction({
    name: 'blobs',
    type: 'src',
    inputs: [
      {name: 'speed', type: 'float', default: 0.1},
      {name: 'tresh', type: 'float', default: 0.2},
      {name: 'soft',  type: 'float', default: 0.05},
    ],
    glsl: `
      float edge   = 0.2;
      float border = 0.05;
      float vv = 0.5;
      vec2 st = _st-0.5;
      int dir = 1;
      float speed0= speed * time;
      vv *= distance(st * 2.0,
                     vec2(cos(speed0), sin(speed0)));
      float speed1 = -2.0 * speed * time;
      vv *= distance(st * 2.0,
                     vec2(cos(speed1), sin(speed1)));
      float speed2 = 3.0 * speed * time;
      vv *= distance(st * 2.0,
                     vec2(cos(speed2), sin(speed2)));
      float gray = smoothstep(tresh-soft,
                              tresh+soft,
                              vv);
      return vec4(gray, gray, gray, 1.0);
  `})
  setFunction({
    name: 'sdfmove',
    type: 'src',
    inputs: [
      {name: 'speed1',     type: 'float', default: 0.73},
      {name: 'speed2',     type: 'float', default: 1.0},
      {name: 'speed3',     type: 'float', default: -0.53},
    ],
    glsl: `
    vec2 st = _st;
    float d =  distance(vec2(fract(st.x+speed3*time), st.y), vec2(0.0, 0.1));
    d = min(d, distance(vec2(fract(st.x+speed2*time), st.y), vec2(0.0, 0.3)));
    d = min(d, distance(vec2(fract(st.x+speed1*time), st.y), vec2(0.0, 0.5)));
    d = min(d, distance(vec2(fract(st.x+speed2*time), st.y), vec2(0.0, 0.7)));
    d = min(d, distance(vec2(fract(st.x+speed3*time), st.y), vec2(0.0, 0.9)));
    d = pow(d, 0.4);
    return vec4(d, d, d, 1);
  `})
  setFunction({
    name: 'warpnoise',
    type: 'src',
    inputs: [
      {name: 'scalei',       type: 'float', default: 10.0},
      {name: 'offset',       type: 'float', default:  0.1},
      {name: 'octaves',      type: 'float', default:  2.0},
      {name: 'octavesinner', type: 'float', default:  3.0},
      {name: 'scale',        type: 'float', default:  1.0},
    ],
    glsl: `
    int oin = int(abs(octavesinner));
    float fri = fract(octavesinner);
    float fbmx = 0.0;
    {
    vec2 pos = scalei * _st;
    float sc = 1.0;
    for (int io = 0; io<8; io++) {
      fbmx += sc * _noise(vec3(pos, offset * time));
      pos *= 2.0;
      sc /= 2.0;
      if(io >= oin) break;
    }
    fbmx += fri * sc * _noise(vec3(pos, offset * time));
    }
    float fbmy = 0.0;
    {
    vec2 pos = scalei * (_st + vec2(5.123, 3.987));
    float sc = 1.0;
    for (int io = 0; io<8; io++) {
      fbmy += sc * _noise(vec3(pos, offset * time));
      pos *= 2.0;
      sc /= 2.0;
      if(io >= oin) break;
    }
    fbmy += fri * sc * _noise(vec3(pos, offset * time));
    }
    int on = int(abs(octaves));
    float fr = fract(octaves);
    float fbm = 0.0;
    vec2 pos = scale * vec2(fbmx, fbmy);
    float sc = 1.0;
    for (int io = 0; io<8; io++) {
      fbm += sc * _noise(vec3(pos, offset * time));
      pos *= 2.0;
      sc /= 2.0;
      if(io >= on) break;
    }
    fbm += fr * sc * _noise(vec3(pos, offset * time));
    return vec4(fbm, fbm, fbm, 1.0);
  `})
  setFunction({
    name: 'cwarpnoise',
    type: 'src',
    inputs: [
      {name: 'scalei',       type: 'float', default: 10.0},
      {name: 'offset',       type: 'float', default:  0.1},
      {name: 'octaves',      type: 'float', default:  2.0},
      {name: 'octavesinner', type: 'float', default:  3.0},
      {name: 'scale',        type: 'float', default:  1.0},
      {name: 'focus',        type: 'float', default:  0.5},
    ],
    glsl: `
    #define FOCUS pow(r, abs(focus))
    float r = length(vec2(_st.y-0.5, _st.x-0.5));
    int oin = int(abs(octavesinner));
    float fri = fract(octavesinner);
    float fbmx = 0.0;
    {
    vec2 pos = scalei * _st;
    float sc = 1.0;
    for (int io = 0; io<8; io++) {
      fbmx += sc * _noise(vec3(pos, offset * time));
      pos *= 2.0;
      sc /= 2.0;
      if(io >= oin) break;
    }
    fbmx += fri * sc * _noise(vec3(pos, offset * time));
    fbmx = (0.5 + 0.5 * fbmx) - FOCUS;
    }
    float fbmy = 0.0;
    {
    vec2 pos = scalei * (_st + vec2(5.123, 3.987));
    float sc = 1.0;
    for (int io = 0; io<8; io++) {
      fbmy += sc * _noise(vec3(pos, offset * time));
      pos *= 2.0;
      sc /= 2.0;
      if(io >= oin) break;
    }
    fbmy += fri * sc * _noise(vec3(pos, offset * time));
    fbmy = (0.5 + 0.5 * fbmy) - FOCUS;
    }
    int on = int(abs(octaves));
    float fr = fract(octaves);
    float fbm = 0.0;
    vec2 pos = scale * vec2(fbmx, fbmy);
    float sc = 1.0;
    for (int io = 0; io<8; io++) {
      fbm += sc*_noise(vec3(pos, offset*time));
      pos *= 2.0;
      sc /= 2.0;
      if(io >= on) break;
    }
    fbm += fr * sc * _noise(vec3(pos, offset * time));
    fbm = (0.5 + 0.5 * fbm) - FOCUS;
    return vec4(fbm, fbm, fbm, 1.0);
  `})
  setFunction({
    name: 'ncontour',
    type: 'src',
    inputs: [
      {name: 'thresh',  type: 'float', default: 0.5},
      {name: 'smooth',  type: 'float', default: 0.1},
      {name: 'octaves', type: 'int',   default: 3},
      {name: 'scale',   type: 'float', default: 5.0},
      {name: 'speed',   type: 'float', default: 0.5},
      {name: 'step',    type: 'float', default: 2.0},
    ],
    glsl: `
    vec2 st = _st - 0.5;
    float d0 = _noise(vec3(st*scale, speed*time));
    for(int ni=1; ni < 5; ++ni) {
      if(ni >= octaves)
        break;
      speed /= step;
      scale *= step;
      d0 += _noise(vec3(st*scale, speed*time));
    }
    float d = distance(d0, thresh);
    float g = smoothstep(0.0, smooth, d);
    return vec4(vec3(g, g, g), 1.0);
  `})
  setFunction({
    name: 'dither4',
    type: 'color',
    inputs: [
    ],
    glsl: `
    int x = int(mod(gl_FragCoord.x, 4.0));
    int y = int(mod(gl_FragCoord.y, 4.0));
    float bayer = 1.0/32.0;
    if(x == 0) {
      if(y == 0) {
      }
      else if(y == 1) {
        bayer = 8.0/16.0+1.0/32.0;
      }
      else if(y == 2) {
        bayer = 2.0/16.0+1.0/32.0;
      }
      else if(y == 3) {
        bayer = 10.0/16.0+1.0/32.0;
      }
    }
    else if(x == 1) {
      if(y == 0) {
        bayer = 12.0+1.0/32.0;
      }
      else if(y == 1) {
        bayer = 4.0/16.0+1.0/32.0;
      }
      else if(y == 2) {
        bayer = 14.0/16.0+1.0/32.0;
      }
      else if(y == 3) {
        bayer = 6.0/16.0+1.0/32.0;
      }
    }
    else if(x == 2) {
      if(y == 0) {
        bayer = 3.0/16.0+1.0/32.0;
      }
      else if(y == 1) {
        bayer = 11.0/16.0+1.0/32.0;
      }
      else if(y == 2) {
        bayer = 1.0/16.0+1.0/32.0;
      }
      else if(y == 3) {
        bayer = 9.0/16.0+1.0/32.0;
      }
    }
    else if(x == 3) {
      if(y == 0) {
        bayer = 15.0/16.0+1.0/32.0;
      }
      else if(y == 1) {
        bayer = 7.0/16.0+1.0/32.0;
      }
      else if(y == 2) {
        bayer = 13.0/16.0+1.0/32.0;
      }
      else if(y == 3) {
        bayer = 5.0/16.0+1.0/32.0;
      }
    }
    return vec4(
      step(bayer, _c0.r),
      step(bayer, _c0.g),
      step(bayer, _c0.b),
      _c0.a);
  `})
}
