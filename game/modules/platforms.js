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

  var numberOfPlatforms = 10
  var platforms = [];
  var distance = 21;
  var startingY = 70;
  var createPlatform = function(y, first) {
    var platformGeo = new THREE.CubeGeometry(40, 3, 20);
    var matHair = new THREE.MeshPhongMaterial({color: Colors.hair, shading:THREE.FlatShading});
    window.platform = new THREE.Mesh(platformGeo, matHair);
    platform.castShadow = true;
    platform.receiveShadow = true;
    if (first) {
      platform.tempY = y;

      platform.position.y = -300;
      platform.position.x = 30 - (~~(Math.random()*100));
      platform.position.z = -5;

    } else {
      platform.position.y = y;
      platform.position.x = 30 - (~~(Math.random()*100));
      platform.position.z = -5;
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
