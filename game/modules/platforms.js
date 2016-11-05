define([
  './colors',
  './scene'
],
function(Colors, scene) {

  var addPlatform = function() {
    var platformGeo = new THREE.CubeGeometry(100, 20, 20);
    var matHair = new THREE.MeshPhongMaterial({color: Colors.hair, shading:THREE.FlatShading});
    var startingPlatform = new THREE.Mesh(platformGeo, matHair);
    startingPlatform.castShadow = true;
    startingPlatform.receiveShadow = true;
    scene.scene.add(startingPlatform);

    return startingPlatform;
  }

  return {
    addPlatform: addPlatform
  }
});
