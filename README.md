# Introduction
`threejs_synthetic_moon` is a small THREE.js application for rendering photorealistic images of the Moon.

## Textures
All textures used in `threejs_synthetic_moon` originate from [NASAs CGI Moon Kit](https://svs.gsfc.nasa.gov/cgi-bin/details.cgi?aid=4720). These textures are too large to host as part of this repo so need to be downloaded separately.

`moon_texture.png` is the [27360x13680 NASA color map](https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles.tif). We need to convert this `.tif` file into a `.png`. This is done by running:

```
python3 convertToPng.py lroc_color_poles.tif moon_texture
```

`scaled_moon_displacement.png` is a scaled version of the [23040x11520 NASA displacement map](https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_64.tif) (scaled between 0 and 255). This can calculated (anf converted into a `.png`) by running:

```
python3 scaleDisplacementMap.py ldem_64.tif scaled_moon_displacement
```

`moon_normal_map.png` is a normal map calculated from the [23040x11520 NASA displacement map](https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_64.tif). To generate the normal map, run:

```
python3 displacementToNormal.py ldem_64.tif moon_normal_map
```

## Dependencies
`threejs_synthetic_moon` requires `three` and `dat.gui`. These can be installed by running:
```
npm install --save three
npm install --save dat.gui
```

## Running
From the `threejs_synthetic_moon` directory run:
```
npx vite
```
