define([
  './scene',
  './colors'
], function(scene, Colors) {
  var Cloud = function() {
    var cloudCollection = new THREE.Object3D();

    var cloudGeometry = new THREE.CubeGeometry(30, 30, 30);
    var cloudMaterial = new THREE.MeshPhongMaterial({color: Colors.blue, shading:THREE.FlatShading});

    var cloudElements = 2 + Math.round(Math.random()*4);

    for (var i = 0; i< cloudElements; i++) {
      var mesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
      mesh.position.x = i*15;
      mesh.position.y = Math.random()*10;
      mesh.position.z = Math.random()*10;
      // mesh.rotation.z = Math.random()*Math.PI*2;
      // mesh.rotation.y = Math.random()*Math.PI*2;

      var s = .4 + Math.random()*.6;
      mesh.scale.set(s,s,s);
      cloudCollection.add(mesh);
    }

    cloudCollection.position.z = -200;
    cloudCollection.position.x = 150 - (~~(Math.random()*500));
    scene.scene.add(cloudCollection);
    clouds.push(cloudCollection);
    return cloudCollection;
  }

  var clouds = [];
  var numberOfClouds = 5;

  var createAll = function() {
    var cloud;
    for (var i = 0; i<numberOfClouds; i++) {
      cloud = Cloud();
      cloud.position.y = (i * 80);
    }

  }

  return {
    Cloud: Cloud,
    clouds: clouds,
    createAll: createAll
  }
});
