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
  var platforms = [];
  var distance = 21;
  var startingY = 70;
  var createPlatform = function(y) {
    var platformGeo = new THREE.CubeGeometry(25, 3, 200);
    var matHair = new THREE.MeshPhongMaterial({color: Colors.hair, shading:THREE.FlatShading});
    window.platform = new THREE.Mesh(platformGeo, matHair);
    platform.castShadow = true;
    platform.receiveShadow = true;
    platform.position.y = y;
    platform.position.x = 15 - (~~(Math.random()*85));
    platform.position.z = -65;
    platforms.push(platform);
    scene.scene.add(platform);
  }

  var createAll = function() {
    for (var i = 0; i< numberOfPlatforms; i++) {
      createPlatform(startingY + (i * distance));
    }
  }

  return {
    addStartingPlatform: addStartingPlatform,
    createPlatform: createPlatform,
    createAll: createAll,
    platforms: platforms
  }
});
