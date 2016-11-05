define([
  './colors',
  './scene',
  './font'
],
function(Colors, scene, font) {
  var text;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
        text = request.responseText;
    }
  };
	request.open('GET', 'dist/game.js', true);
  request.send(null);

  font = new THREE.Font(font);
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
  var lengthChars = 20;
  var createPlatform = function(y, first) {
    var platformText = text.substr(0, lengthChars);
    text = text.substr(lengthChars);


    //var platformGeo = new THREE.CubeGeometry(40, 3, 20);
    var platformGeo = new THREE.TextGeometry(platformText, {
      font: font,
      size: 5,
      height: 20,
      curveSegments: 2
    });

    var matHair = new THREE.MeshPhongMaterial({color: Colors.hair, shading:THREE.FlatShading});
    window.platform = new THREE.Mesh(platformGeo, matHair);
    platform.castShadow = true;
    platform.receiveShadow = true;
    if (first) {
      platform.tempY = y;

      platform.position.y = -300;
      platform.position.x = 20 - (~~(Math.random()*90));
      platform.position.z = -10;

    } else {
      platform.position.y = y;
      platform.position.x = 20 - (~~(Math.random()*90));
      platform.position.z = -10;
    }

    platforms.push(platform);
    scene.scene.add(platform);
  }

  var createAll = function() {
    if (!text) {
      setTimeout(createAll, 200);
      return;
    }
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
