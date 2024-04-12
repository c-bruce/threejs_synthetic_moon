import * as THREE from 'three';
import * as dat from 'dat.gui';

// Helper function to convert spherical coordinates to cartesian coordinates
function sphericalToCartesian(longitude, latitude, radius) {
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (360 - longitude) * (Math.PI / 180);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return { x, y, z };
}

// Setup scene, renderer, camera and light
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    encoding: THREE.sRGBEncoding,
    toneMapping: THREE.ACESFilmicToneMapping
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = 3000;
camera.setFocalLength(35);
let cameraControlsObject = {
    longitude: 0,
    latitude: 0,
    radius: 3000,
    lookAtCenter: true,
    rotationX: 0,
    rotationY: 90,
    rotationZ: 0,
};

const light = new THREE.DirectionalLight(0xffffff, 5)
light.position.set(2000, 0, 2000);
light.castShadow = true;
light.shadow.mapSize.width = 2048;
scene.add(light);
let lightControlsObject = { longitude: 0, latitude: 0, intensity: 5};

// Setup moon mesh
const geometry = new THREE.SphereGeometry(1728.28, 4000, 2000);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/moon_texture.tif');
const displacement = textureLoader.load('/scaled_moon_displacement.tiff');
const normal = textureLoader.load('/moon_normal_map.png');

texture.minFilter = THREE.LinearFilter;
displacement.minFilter = THREE.LinearFilter;
normal.minFilter = THREE.LinearFilter;

const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    map: texture,
    displacementMap: displacement,
    normalMap: normal,
    displacementScale: 19.87,
    reflectivity: 0,
    shininess: 0
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
const meshControlsObject = { rotationX: 0, rotationY: 0, rotationZ: 0, displacementScale: 19.87 };

// Setup GUI controls
const gui = new dat.GUI();

// Light controls
const lightControls = gui.addFolder('Light Controls');
const lightLongitude = lightControls.add(lightControlsObject, 'longitude', -180, 180).name('Longitude');
const lightLatitude = lightControls.add(lightControlsObject, 'latitude', -180, 180).name('Latitude');
const lightIntensity = lightControls.add(lightControlsObject, 'intensity', 0, 10).name('Intensity');
lightControls.open();

// Camera controls
const cameraControls = gui.addFolder('Camera Controls');
const cameraLongitude = cameraControls.add(cameraControlsObject, 'longitude', -180, 180).name('Longitude');
const cameraLatitude = cameraControls.add(cameraControlsObject, 'latitude', -180, 180).name('Latitude');
const cameraRadius = cameraControls.add(cameraControlsObject, 'radius', 0, 10000).name('Radius');
const cameraLookAtCenter = cameraControls.add(cameraControlsObject, 'lookAtCenter').name('Look At Center');
const cameraRotationX = cameraControls.add(cameraControlsObject, 'rotationX', -180, 180).name('X Rotation');
const cameraRotationY = cameraControls.add(cameraControlsObject, 'rotationY', -180, 180).name('Y Rotation');
const cameraRotationZ = cameraControls.add(cameraControlsObject, 'rotationZ', -180, 180).name('Z Rotation');
cameraControls.open();

// Mesh controls
const meshControls = gui.addFolder('Mesh Controls');
const meshRotationX = meshControls.add(meshControlsObject, 'rotationX', -180, 180).name('X Rotation');
const meshRotationY = meshControls.add(meshControlsObject, 'rotationY', -180, 180).name('Y Rotation');
const meshRotationZ = meshControls.add(meshControlsObject, 'rotationZ', -180, 180).name('Z Rotation');
const displacementScale = meshControls.add(meshControlsObject, 'displacementScale', 0, 2000).name('Displacement Scale');
meshControls.open();

// Function to update light controls from GUI sliders
function updateLightControlsFromGUI() {
    const longitude = lightLongitude.getValue();
    const latitude = lightLatitude.getValue();
    const radius = 1;
    light.intensity = lightIntensity.getValue();
    const { x, y, z } = sphericalToCartesian(longitude, latitude, radius);
    light.position.x = x;
    light.position.y = y;
    light.position.z = z;
}

// Function to enable/disable camera rotation controls based on the value of lookAtCenter
function toggleCameraControls(enabled) {
    cameraRotationX.__li.style.pointerEvents = enabled ? 'auto' : 'none';
    cameraRotationY.__li.style.pointerEvents = enabled ? 'auto' : 'none';
    cameraRotationZ.__li.style.pointerEvents = enabled ? 'auto' : 'none';
}

// Function to update camera controls from GUI sliders
function updateCameraPositionControlsFromGUI() {
    const longitude = cameraLongitude.getValue();
    const latitude = cameraLatitude.getValue();
    const radius = cameraRadius.getValue();
    const { x, y, z } = sphericalToCartesian(longitude, latitude, radius);
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    const lookAtCenter = cameraLookAtCenter.getValue();
    if (lookAtCenter) {
        camera.lookAt(0, 0, 0);
    }
    toggleCameraControls(!lookAtCenter)
    camera.updateProjectionMatrix();
}

// Function to update camera rotation controls from GUI sliders
function updateCameraRotationControlsFromGUI() {
    const rotationX = cameraRotationX.getValue();
    const rotationY = cameraRotationY.getValue();
    const rotationZ = cameraRotationZ.getValue();
    camera.rotation.x = rotationX * Math.PI/180;
    camera.rotation.y = rotationY * Math.PI/180;
    camera.rotation.z = rotationZ * Math.PI/180;
    camera.updateProjectionMatrix();
}

// Function to update material controls from GUI sliders
function updateMeshControlsFromGUI() {
    const rotationX = meshRotationX.getValue();
    const rotationY = meshRotationY.getValue();
    const rotationZ = meshRotationZ.getValue();
    mesh.rotation.x = rotationX * Math.PI/180;
    mesh.rotation.y = rotationY * Math.PI/180;
    mesh.rotation.z = rotationZ * Math.PI/180;
    material.displacementScale = displacementScale.getValue();
}

// Event listeners for GUI control changes
lightLongitude.onChange(updateLightControlsFromGUI);
lightLatitude.onChange(updateLightControlsFromGUI);
lightIntensity.onChange(updateLightControlsFromGUI);

cameraLongitude.onChange(updateCameraPositionControlsFromGUI);
cameraLatitude.onChange(updateCameraPositionControlsFromGUI);
cameraRadius.onChange(updateCameraPositionControlsFromGUI);
cameraLookAtCenter.onChange(updateCameraPositionControlsFromGUI);

cameraRotationX.onChange(updateCameraRotationControlsFromGUI);
cameraRotationY.onChange(updateCameraRotationControlsFromGUI);
cameraRotationZ.onChange(updateCameraRotationControlsFromGUI);

meshRotationX.onChange(updateMeshControlsFromGUI);
meshRotationY.onChange(updateMeshControlsFromGUI);
meshRotationZ.onChange(updateMeshControlsFromGUI);
displacementScale.onChange(updateMeshControlsFromGUI);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
