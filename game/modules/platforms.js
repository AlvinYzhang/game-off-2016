define([
  './colors',
  './scene',
  './font'
],
function(Colors, scene, font) {
  var text;
  var textCopy;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
        textCopy = text = request.responseText;
    }
  };
	request.open('GET', typeof gamefile === 'undefined' ? 'dist/game.js' : gamefile, true);
  request.send(null);

  font = new THREE.Font(font);

  var addStartingPlatform = function() {
    var sPlatformGeo = new THREE.CubeGeometry(1000, 20, 200);
    var matHair = new THREE.MeshPhongMaterial({color: Colors.hair, shading:THREE.FlatShading});
    startingPlatform = new THREE.Mesh(sPlatformGeo, matHair);
    startingPlatform.castShadow = true;
    startingPlatform.receiveShadow = true;
    startingPlatform.position.y = -200;
    scene.scene.add(startingPlatform);

    return startingPlatform;
  }

  var numberOfPlatforms = 30;
  var platforms = [];
  var distance = 20;
  var startingY = 70;
  var lengthChars = 10;

  var createPlatform = function(y, first) {
    var platformText = text.substr(0, lengthChars);
    text = text.substr(lengthChars);
    platformText = platformText.replace(/\@/gi, 'E').toLowerCase();
    var platformGeo2 = new THREE.CubeGeometry(60, 5, 30);
    var platformGeo = new THREE.TextGeometry(platformText, {
      font: font,
      size: 4,
      height: 18,
      curveSegments: 2
    });

    var finalPlGeo = new THREE.Geometry();
    var pl1Mesh = new THREE.Mesh(platformGeo);
    var pl2Mesh = new THREE.Mesh(platformGeo2);


    pl1Mesh.updateMatrix();
    finalPlGeo.merge(pl1Mesh.geometry, pl1Mesh.matrix);

    pl2Mesh.position.y = 1.5;
    pl2Mesh.position.x = 21;
    pl2Mesh.updateMatrix();
    finalPlGeo.merge(pl2Mesh.geometry, pl2Mesh.matrix);

    var matSuper = new THREE.MeshPhongMaterial({color: Colors.green, shading:THREE.FlatShading});
    var matHair = new THREE.MeshPhongMaterial({color: Colors.hair, shading:THREE.FlatShading});
    var matMoving = new THREE.MeshPhongMaterial({color: Colors.blue, shading:THREE.FlatShading});

    window.platform = new THREE.Mesh(finalPlGeo, matHair);
    platform.action = function() {};
    var useSuper = false;
    var superKeyword = ['function', 'for', 'new', 'window', 'return'];
    superKeyword.forEach(function(keyword) {
      if (platformText.indexOf(keyword) > -1) {
        useSuper = true;
        platform.material = matSuper;
      }
    });

    var movingKeywords = ['var', 'new', 'interval', 'timeout', 'array', 'call'];
    movingKeywords.forEach(function(keyword) {
      if (platformText.indexOf(keyword) > -1) {
        platform.action = function() {
          this.position.x = 70;
          this.tween = TweenMax.to(this.position, Math.ceil(Math.random()*5), { x: -100, repeat: -1, yoyo: true});
        }.bind(platform);
        platform.material = matMoving;
      }
    });
    platform.super = useSuper;
    platform.castShadow = true;
    platform.receiveShadow = true;
    if (first) {
      platform.tempY = y;

      platform.position.y = -300;
      platform.position.x = 10 - (~~(Math.random()*70));
      platform.position.z = -15;

    } else {
      platform.position.y = y;
      platform.position.x = 20 - (~~(Math.random()*90));
      platform.position.z = -15;
    }
    platform.scale.set(0.5, 1, 1);

    // platform.bbox = new THREE.BoundingBoxHelper( platform, new THREE.MeshBasicMaterial());
    // platform.bbox.visible = false;

    // scene.scene.add(platform.bbox);
    platforms.push(platform);
    scene.scene.add(platform);
    return platform;
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

  var resetPlatforms = function() {
    text = textCopy;
    platforms.forEach(function(pl) {
      scene.scene.remove(pl);
    });

    startingPlatform.position.y = -200;
    platforms = [];
    createAll();
    return platforms;
  }

  return {
    addStartingPlatform: addStartingPlatform,
    createPlatform: createPlatform,
    createAll: createAll,
    platforms: platforms,
    distance: distance,
    resetPlatforms: resetPlatforms
  }
});
