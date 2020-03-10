export function rgb2hsv({r, g, b}) {
    const rperc = r / 255;
    const gperc = g / 255;
    const bperc = b / 255;
    const max = Math.max(rperc, gperc, bperc);
    const min = Math.min(rperc, gperc, bperc);
    const diff = max - min;
  
    let hnew = 0;
    const vnew = max;
    const snew = (vnew == 0) ? 0 : diff / max;
  
    let pr;
    for (let i=0;i<3;i++) {
      if ([rperc,gperc,bperc][i] === max) {
        pr=i;
        break;
      }
    }
    if (diff!=0) {
      switch (pr) {
        case 0:
          hnew=60*(((gperc-bperc)/diff)%6)/360
          break;
        case 1:
          hnew=60*(((bperc-rperc)/diff)+2)/360
          break;
        case 2:
          hnew=60*(((rperc-gperc)/diff)+4)/360
          break;
      }
      if (hnew < 0) hnew+=6;
    }
  
    return {h:hnew,s:snew,v:vnew};
}
  
export function hsv2rgb({h, s, v}) {
let r, g, b;

const i = Math.floor(h * 6);
const f = h * 6 - i;
const p = v * (1 - s);
const q = v * (1 - f * s);
const t = v * (1 - (1 - f) * s);

switch (i % 6) {
case 0:
    r = v, g = t, b = p;
    break;
case 1:
    r = q, g = v, b = p;
    break;
case 2:
    r = p, g = v, b = t;
    break;
case 3:
    r = p, g = q, b = v;
    break;
case 4:
    r = t, g = p, b = v;
    break;
case 5:
    r = v, g = p, b = q;
    break;
}

r = Math.round(r * 255);
g = Math.round(g * 255)
b = Math.round(b * 255)

return ({r, g, b});
}

export function hex2rgb(color) {
let hex = color.replace('#','');
if (hex.length !== 6 && hex.length !== 3 && !hex.match(/([^A-F0-9])/gi)) {
    alert('Invalid property value (startColor)');
    return;
}
let hexFiltered='';
if (hex.length === 3) {
    hex.split('').forEach( c => {hexFiltered += c+c;});
} else {
    hexFiltered=hex;
}
hex = hexFiltered;
const r = parseInt(hexFiltered.substring(0,2), 16);
const g = parseInt(hexFiltered.substring(2,4), 16);
const b = parseInt(hexFiltered.substring(4,6), 16);

return ({ r, g, b});
}

export function rgb2hex({r, g, b}) {
let rHex = r.toString(16);
let gHex = g.toString(16);
let bHex = b.toString(16);

if (rHex.length == 1) { rHex = "0" + rHex };
if (gHex.length == 1) { gHex = "0" + gHex };
if (bHex.length == 1) { bHex = "0" + bHex };
return ("#" + rHex + gHex + bHex).toUpperCase();
}

export function pureHueInHex({h, s, v}) {
const rgb = hsv2rgb({h: h, s: 1, v: 1});
return (rgb2hex(rgb));
}