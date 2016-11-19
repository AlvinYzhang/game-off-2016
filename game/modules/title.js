define([
  './scene',
  './font',
  './colors'
], function(scene, font, Colors) {
  font = new THREE.Font(font);
  var geometry = new THREE.TextGeometry('codexplorer', {
    font: font,
    size: 10,
    height: 4,
    curveSegments: 2
  });
  var material = new THREE.MeshPhongMaterial({color: Colors.hair, shading:THREE.FlatShading});
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 150;
  mesh.position.x = -100;

  var instructGeometry = new THREE.TextGeometry('click to play', {
    font: font,
    size: 8,
    height: 4,
    curveSegments: 2
  });

  window.instructMesh = new THREE.Mesh(instructGeometry, material);
  instructMesh.position.y = 20;
  instructMesh.position.x = -10;
  instructMesh.position.z = -50;

  return {
    init: function() {
      scene.scene.add(mesh);
      scene.scene.add(instructMesh);
    },
    show: function() {
      TweenMax.to(mesh.position, 1, {y: 150});
      TweenMax.to(instructMesh.position, 1, {y: 20});
    },
    hide: function() {
      TweenMax.to(mesh.position, 1, {y: 300});
      TweenMax.to(instructMesh.position, 1, {y: -250});
    }
  };

});
