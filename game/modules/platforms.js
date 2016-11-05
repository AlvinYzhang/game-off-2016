define([
  './colors',
  './scene'
],
function(Colors, scene) {

  var addStartingPlatform = function() {
    var sPlatformGeo = new THREE.CubeGeometry(1000, 20, 200);
    var matHair = new THREE.MeshPhongMaterial({color: Colors.hair, shading:THREE.FlatShading});
    var startingPlatform = new THREE.Mesh(sPlatformGeo, matHair);
    startingPlatform.castShadow = true;
    startingPlatform.receiveShadow = true;
    startingPlatform.position.y = -200;
    scene.scene.add(startingPlatform);

    return startingPlatform;
  }

  var numberOfPlatforms = 7
  var platforms = [];
  var distance = 21;
  var startingY = 70;
  var createPlatform = function(y, first) {
    var platformGeo = new THREE.CubeGeometry(25, 3, 200);
    var matHair = new THREE.MeshPhongMaterial({color: Colors.hair, shading:THREE.FlatShading});
    window.platform = new THREE.Mesh(platformGeo, matHair);
    platform.castShadow = true;
    platform.receiveShadow = true;
    if (first) {
      platform.tempY = y;

      platform.position.y = -300;
      platform.position.x = 15 - (~~(Math.random()*85));
      platform.position.z = -65;

    } else {
      platform.position.y = y;
      platform.position.x = 15 - (~~(Math.random()*85));
      platform.position.z = -65;
    }

    platforms.push(platform);
    scene.scene.add(platform);
  }

  var createAll = function() {
    for (var i = 0; i< numberOfPlatforms; i++) {
      createPlatform(startingY + (i * distance), true);
    }
  }

  return {
    addStartingPlatform: addStartingPlatform,
    createPlatform: createPlatform,
    createAll: createAll,
    platforms: platforms
  }
});
