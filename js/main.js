var clock, container, camera, scene, renderer, controls, listener;

var ground, character;
var light;
var textureLoader = new THREE.TextureLoader();
var loader = new THREE.JSONLoader();
var isLoaded = false;
var action = {}, mixer;
var activeActionName = 'idle';

var arrAnimations = [
  'idle',
  'walk',
  'run',
  'hello'
];
var actualAnimation = 0;

init();

function init () {
  

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
       
  container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 1, 2.1);
  listener = new THREE.AudioListener();
  camera.add(listener);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0.6, 0);
  // Lights
  
  
  light = new THREE.PointLight(0xffffff, 1);
  light.position.set(400,-500,246);

  light = new THREE.PointLight(0xffffff, .9);
  light.position.set(-400,0,0);
  
  light = new THREE.PointLight(0xffffff, .9);
  light.position.set(0,400,0);
  
    light = new THREE.PointLight(0xffffff, .9);
  light.position.set(0,-1000,0);
  
  light = new THREE.PointLight(0xffffff, .9);
  light.position.set(0,1000,0);
  scene.add(light);

  textureLoader.load('textures/ground.png', function (texture) {
    var geometry = new THREE.PlaneBufferGeometry(2, 2);
    geometry.rotateX(-Math.PI / 2);
    var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    ground = new THREE.Mesh(geometry, material);
   
   
  });

  loader.load('./models/head.json', function (geometry, materials) {
    materials.forEach(function (material) {
      material.skinning = false;
    });
    character = new THREE.SkinnedMesh(
      geometry,
      new THREE.MeshFaceMaterial(materials)
    );

    mixer = new THREE.AnimationMixer(character);


    scene.add(character);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', onDoubleClick, false);
    animate();

    isLoaded = true;

  });
}







function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

var mylatesttap;
function onDoubleClick () {
  var now = new Date().getTime();
  var timesince = now - mylatesttap;
  if ((timesince < 600) && (timesince > 0)) {
    if (actualAnimation == arrAnimations.length - 1) {
      actualAnimation = 0;
    } else {
      actualAnimation++;
    }


  } else {
    // too much time to be a doubletap
  }

  mylatesttap = new Date().getTime();

}

function animate () {
  requestAnimationFrame(animate);
  controls.update();
  render();

}

function render () {
  renderer.render(scene, camera);
}
