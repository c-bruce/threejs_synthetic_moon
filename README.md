# Introduction
`threejs_synthetic_moon` is a small THREE.js application for rendering photorealistic images of the Moon.

## Textures
All textures used in `threejs_synthetic_moon` originate from [NASAs CGI Moon Kit](https://svs.gsfc.nasa.gov/cgi-bin/details.cgi?aid=4720). These textures are too large to host as part of this repo so need to be downloaded separately.

`moon_texture.tif` is the [27360x13680 NASA color map](https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles.tif).

`scaled_moon_displacement.tiff` is a scaled version of the [23040x11520 NASA displacement map](https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_64.tif) (scaled between 0.0 and 1.0). This can calculated by running `scaleDisplacementMap.py`.

`moon_normal_map.png` is a normal map calculated from the [23040x11520 NASA displacement map](https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_64.tif). This can be calculated by running `displacementToNormal.py`.

## Running
From the `threejs_synthetic_moon` directory run:
```
npx vite
```
