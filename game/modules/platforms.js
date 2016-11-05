define([
  './colors',
  './scene'
],
function(Colors, scene) {

  var addStartingPlatform = function() {
    var sPlatformGeo = new THREE.CubeGeometry(100, 20, 20);
    var matHair = new THREE.MeshPhongMaterial({color: Colors.hair, shading:THREE.FlatShading});
    var startingPlatform = new THREE.Mesh(sPlatformGeo, matHair);
    startingPlatform.castShadow = true;
    startingPlatform.receiveShadow = true;
    scene.scene.add(startingPlatform);

    return startingPlatform;
  }

  var numberOfPlatforms = 7
  plarforms = [];
  platformWidth = 15;
  platformHeight = 2.5;

  var createPlatform = function() {
    var platformGeo = new THREE.CubeGeometry(25, 3, 200);
    var matHair = new THREE.MeshPhongMaterial({color: Colors.hair, shading:THREE.FlatShading});
    window.platform = new THREE.Mesh(platformGeo, matHair);
    platform.castShadow = true;
    platform.receiveShadow = true;
    platform.position.y = 70;
    platform.position.z = -65;
    scene.scene.add(platform);
  }
  return {
    addStartingPlatform: addStartingPlatform,
    createPlatform: createPlatform
  }
});
