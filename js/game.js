//COLORS
var Colors = {
    grey: 0xA9A9A9,
    white: 0xFFFFFF,
    skin: 0xFFD5A9,
    hair: 0xFFD300,
    black: 0x4C4C4C
};

// THREEJS RELATED VARIABLES

var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH,
    mousePos = { x: 0, y: 0 };

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );

  camera.position.x = -30;
  camera.position.z = 130;
  camera.position.y = 100;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  container = document.getElementById('game');
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', handleWindowResize, false);
}

// HANDLE SCREEN EVENTS

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}


// LIGHTS

var ambientLight, hemisphereLight, shadowLight;

function createLights() {

  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);

  ambientLight = new THREE.AmbientLight(0xdc8874, .5);

  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
  scene.add(ambientLight);
}


var Player = function() {
	this.mesh = new THREE.Object3D();
  this.mesh.name = "hacker";

  // legs
	var geomLeg = new THREE.CubeGeometry(10, 10, 10);
  var matLeg = new THREE.MeshPhongMaterial({color:Colors.grey, shading:THREE.FlatShading});
  var leg1 = new THREE.Mesh(geomLeg, matLeg);
	leg1.castShadow = true;
  leg1.receiveShadow = true;
  this.mesh.add(leg1);
  leg1.position.x += 5;

	var geomLegUp = new THREE.CubeGeometry(10, 10, 20);
  var leg1a = new THREE.Mesh(geomLegUp, matLeg);
	leg1a.castShadow = true;
  leg1a.receiveShadow = true;
  this.mesh.add(leg1a);
  leg1a.position.x += 5;
  leg1a.position.y += 10;
  leg1a.position.z += 5;

  var leg2 = new THREE.Mesh(geomLeg, matLeg);
  leg2.castShadow = true;
  leg2.receiveShadow = true;
  leg2.position.x -= 15;
  this.mesh.add(leg2);

  var leg2a = new THREE.Mesh(geomLegUp, matLeg);
  leg2a.castShadow = true;
  leg2a.receiveShadow = true;
  this.mesh.add(leg2a);
  leg2a.position.y += 10;
  leg2a.position.z += 5;
  leg2a.position.x -= 15;

  // belly
  var geomBelly = new THREE.CubeGeometry(30, 20, 30);
  var belly = new THREE.Mesh(geomBelly, matLeg);
  belly.castShadow = true;
  belly.receiveShadow = true;
  this.mesh.add(belly);
  belly.position.y += 25;
  belly.position.x -= 5;
  belly.position.z += 10;
  // belly.position.x -= 20;

  // neck
  var geomNeck = new THREE.CubeGeometry(20, 10, 10);
  var matNeck = new THREE.MeshPhongMaterial({color:Colors.skin, shading:THREE.FlatShading});
  var neck = new THREE.Mesh(geomNeck, matNeck);
  neck.castShadow = true;
  neck.receiveShadow = true;
  this.mesh.add(neck);
  neck.position.y += 40;
  neck.position.x -= 5;
  neck.position.z += 15;

  //collar
  var geomCollar = new THREE.CubeGeometry(10, 10, 30);
  var matCollar = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
  var collar = new THREE.Mesh(geomCollar, matCollar);
  collar.castShadow = true;
  collar.receiveShadow = true;
  this.mesh.add(collar);
  collar.position.y += 40;
  collar.position.x -= 15;
  collar.position.z += 10;

  var collar2 = collar.clone();
  collar2.position.x += 20;
  this.mesh.add(collar2);

  var collar3 = collar.clone();
  collar3.rotation.y += Math.PI/2;
  collar3.position.z -= 10;
  collar3.position.x += 10;
  this.mesh.add(collar3);


  //head
  var geomHead = new THREE.CubeGeometry(50, 50, 40);
  var head = new THREE.Mesh(geomHead, matNeck);
  head.castShadow = true;
  head.receiveShadow = true;
  this.mesh.add(head);
  head.position.y += 70;
  head.position.x -= 5;
  head.position.z += 10;

  //glasses
  var matGlasses = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});
  var geomGlasses = new THREE.CubeGeometry(30, 30, 10);
  var glasses = new THREE.Mesh(geomGlasses, matGlasses);
  glasses.castShadow = true;
  glasses.receiveShadow = true;
  this.mesh.add(glasses);
  glasses.position.y += 70;
  glasses.position.x -= 25;
  glasses.position.z += 35;

  var glasses2 = glasses.clone();
  this.mesh.add(glasses2);
  glasses2.position.x += 40;

  var glasses3 = glasses.clone();
  this.mesh.add(glasses3);
  glasses3.position.x += 20;
  glasses3.scale.set(0.4, 0.4, 1);

  var geomGlasses2 = new THREE.CubeGeometry(10, 10, 10);
  var glasses4 = new THREE.Mesh(geomGlasses2, matCollar);
  glasses4.castShadow = true;
  glasses4.receiveShadow = true;
  this.mesh.add(glasses4);
  glasses4.position.y += 70;
  glasses4.position.x -= 25;
  glasses4.position.z += 36;

  var glasses5 = glasses4.clone();
  this.mesh.add(glasses5);
  glasses5.position.x += 40;

  var matHair = new THREE.MeshPhongMaterial({color:Colors.hair, shading:THREE.FlatShading});
  var geomHair = new THREE.CubeGeometry(70, 10, 60);
  var hair = new THREE.Mesh(geomHair, matHair);
  hair.castShadow = true;
  hair.receiveShadow = true;
  this.mesh.add(hair);
  hair.position.y += 100;
  hair.position.x -= 5;
  hair.position.z += 10;

  var geomHair2 = new THREE.CubeGeometry(70, 30, 30);
  var hair2 = new THREE.Mesh(geomHair2, matHair);
  hair2.castShadow = true;
  hair2.receiveShadow = true;
  this.mesh.add(hair2);
  hair2.position.y += 85;
  hair2.position.x -= 5;
  hair2.position.z -= 5;

  var geomHair3 = new THREE.CubeGeometry(70, 10, 10);
  var hair3 = new THREE.Mesh(geomHair3, matHair);
  hair3.castShadow = true;
  hair3.receiveShadow = true;
  this.mesh.add(hair3);
  hair3.position.y += 110;
  hair3.position.x -= 5;
  hair3.position.z += 5;


};


// 3D Models
var player;

function createPlayer() {
  player = new Player();
  player.mesh.scale.set(.5,.5,.5);
  player.mesh.position.y = 50;
  player.mesh.rotation.y -= 0.9;
  // player.mesh.rotation.y -= 0.19;
  scene.add(player.mesh);
}

function loop(){
  // player.mesh.rotation.y -= 0.05;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function normalize(v,vmin,vmax,tmin, tmax){
  var nv = Math.max(Math.min(v,vmax), vmin);
  var dv = vmax-vmin;
  var pc = (nv-vmin)/dv;
  var dt = tmax-tmin;
  var tv = tmin + (pc*dt);
  return tv;
}

function init(event){
  document.addEventListener('mousemove', handleMouseMove, false);
  createScene();
  createLights();
  createPlayer();
  loop();
}

// HANDLE MOUSE EVENTS

var mousePos = { x: 0, y: 0 };

function handleMouseMove(event) {
  var tx = -1 + (event.clientX / WIDTH)*2;
  var ty = 1 - (event.clientY / HEIGHT)*2;
  mousePos = {x:tx, y:ty};
}

window.addEventListener('load', init, false);
