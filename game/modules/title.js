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
  window.mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 150;
  mesh.position.x = -100;
  return {
    init: function() {
      scene.scene.add(mesh);
    },
    show: function() {
      TweenMax.to(mesh.position, 1, {y: 150});
    },
    hide: function() {
      TweenMax.to(mesh.position, 1, {y: 300});
    }
  };

});
