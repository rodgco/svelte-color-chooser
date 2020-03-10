<script>
import { onMount } from "svelte";
import pickable from "./pickable";
import { rgb2hsv, hsv2rgb, hex2rgb, rgb2hex, pureHueInHex } from "./color-helpers";

export let color = "#ff0000";

let colorBox;
let colorSquare;
let colorPicked;
let csPicker;
let huePicker;

let hsv = { h: 0, s: 0, v: 0 };

// Update other references from hsv
let rgb;
let hex;

$: if(hsv) {
  rgb = hsv2rgb(hsv);
  hex = rgb2hex(rgb);

  if (colorSquare) { colorSquare.style.background = pureHueInHex(hsv) };
  if (colorPicked) { colorPicked.style.background = `rgb(${rgb.r},${rgb.g},${rgb.b})` };
  if (huePicker) { huePicker.style.backgroud = `rgb(${rgb.r},${rgb.g},${rgb.b})` };
  if (csPicker) {csPicker.style.left = `${hsv.s * 100}%`};
  if (csPicker) {csPicker.style.top = `${(1 - hsv.v) * 100}%`};
  if (huePicker) {huePicker.style.left = `${hsv.h * 100}%`};
};

$: if (color && colorBox) {
  colorBox.style.color = color;
}

onMount(() => {
  const localRGB = hex2rgb(color) 
  hsv = rgb2hsv(localRGB);
})

function handleCSPicker(event) {
  hsv.s = event.detail.x;
  hsv.v = 1 - event.detail.y;
}

function handleHuePicker(event) {
  hsv.h = event.detail.x;
}
</script>

<div>
  <div class="colorsquare size" bind:this={colorSquare}>
    <div class="saturation-gradient">
      <div class="value-gradient">
        <div id="colorsquare-picker"
          bind:this={csPicker}></div>
        <div id="colorsquare-event"
          use:pickable
          on:picker={handleCSPicker}
        ></div>
      </div>
    </div>
  </div>
  <div class="hue-selector">
    <div id="hue-picker" bind:this={huePicker}></div>
    <div id="hue-event"
      use:pickable
      on:picker={handleHuePicker}
    ></div>
  </div>
  <div class="color-info-box">
    <div class="color-picked-bg">
      <div class="color-picked" bind:this={colorPicked}></div>
    </div>

    <div class="hex-text-block">
      <p class="text">{hex}</p>
    </div>

    <div class="rgb-text-div">
      <div class="rgb-text-block">
        <p class="text">{rgb.r}</p>
        <p class="text-label">R</p>
      </div>

      <div class="rgb-text-block">
        <p class="text">{rgb.g}</p>
        <p class="text-label">G</p>
      </div>

      <div class="rgb-text-block">
        <p class="text">{rgb.b}</p>
        <p class="text-label">B</p>
      </div>
    </div>
  </div>
</div>

<style>
.colorsquare {
  width: 240px;
}
.saturation-gradient {
	background: linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0));
	width: 240px;
	height: 160px;
}
.value-gradient {
	background: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0));
	overflow: hidden;
	width: 240px;
	height: 160px;
}
#colorsquare-picker {
	margin: 0;
	padding: 0;
	width: 12px;
	height: 12px;
	border-radius: 50%;
	border: 2px solid #FFFB;
	position: relative;
	transform: translate(-6px, -6px);
	left: 100%;
}
#colorsquare-event {
	width: 100%;
	height: 100%;
	position: relative;
	transform: translate(0px, -11px);
  touch-action: none;
}
.hue-selector {
	width: 240px;
	background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
	margin: 15px 0px 10px 0px;
	border-radius: 2px;
	height: 10px;
}
#hue-picker {
	width: 12px;
	height: 12px;
	border-radius: 50%;
  border: 2px solid #FFFB;
	left: 0%;
	position: relative;
	cursor: default;
	transform: translate(-6px, -1px);
	/* -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.67);
	-moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.67);
	box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.67); */
}
#hue-event {
  position: relative;
	width: 242px;
	height: 12px;
	transform: translate(-1px, -12px);
	cursor: default;
  touch-action: none;
}
.color-info-box {
	margin: 10px;
	width: 100%;
	height: 22px;
	vertical-align: middle;
	position: relative;
}
.color-picked {
	width: 18px;
	height: 18px;
	border-radius: 2px;
	background: rgba(255, 0, 0, 1);
	display: inline-block;
}
.color-picked-bg {
	background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
	background-size: 10px 10px;
	background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
	border: 2px solid #FFF;
	border-radius: 4px;
	width: 18px;
	height: 18px;
	color: #fff;
	display: inline-block;
}
.hex-text-block {
	display: inline-block;
	background: white;
	border-radius: 2px;
	padding: 2px;
	border: 1px solid #e3e3e3;
	height: 16px;
	width: 54px;
	vertical-align: top;
	text-align: center;
}
.rgb-text-block {
	display: inline-block;
	background: white;
	border-radius: 2px;
	padding: 2px;
	margin: 0 1px;
	border: 1px solid #dcdcdc;
	height: 16px;
	width: 23px;
	vertical-align: top;
	text-align: center;
}
.rgb-text-div {
	right: 10%;
	display: inline-block;
	vertical-align: top;
	position: absolute;
}
.text-label {
	position: relative;
	top: -12px;
	font-family: sans-serif;
	font-size: small;
  color:#888;
}
.text {
	display: inline;
	font-family: sans-serif;
	margin: 0;
	display: inline-block;
	font-size: 12px;
	font-size-adjust: 0.50;
	position: relative;
	top: -1px;
  vertical-align: middle;
  -webkit-touch-callout: all;
    -webkit-user-select: all;
     -khtml-user-select: all;
       -moz-user-select: all;
        -ms-user-select: all;
            user-select: all;
}
</style>