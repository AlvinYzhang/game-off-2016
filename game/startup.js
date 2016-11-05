define([
  './modules/scene',
  './modules/lights',
  './modules/player',
  './modules/colors'
], function(
  sceneClass, lightsClass, playerClass, Colors
) {
  var player, platform;
  var scene, lights;

  var startGame = function() {
    setTimeout(function() {
      // TweenMax.to(platform.position, 2, {ease: "Strong.easeOut", y: 38, x: -30});
      TweenMax.to(player.mesh.scale, 2, {ease: "Strong.easeOut", z: 0.125, y: 0.125, x: 0.125});
      TweenMax.to(player.mesh.position, 2, {ease: "Strong.easeOut", z: 0, y: 48.5, x: -50});
      TweenMax.to(player.mesh.rotation, 2, {ease: "Strong.easeOut", y: 0.9, onComplete: player.jump.bind(player)});
    }, 2000);
  }

  var lastTime = new Date();
  var deltaTime = 1000/33;
  function loop() {
    var time = new Date();
    if ((time - lastTime) > deltaTime) {
      if (player.isJumping) {
        player.checkJump();
      }

      if (player.isFalling) {
        player.checkFall();
      }
      lastTime = time;
    }
    // player.mesh.rotation.y -= 0.05;
    scene.renderer.render(scene.scene, scene.camera);
    requestAnimationFrame(loop);
  }

  function init(event) {
    scene = sceneClass.createScene();
    lights = lightsClass.createLights();
    player = playerClass.createPlayer();
    loop();
    startGame();

    var platformGeo = new THREE.CubeGeometry(100, 20, 20);
    var matHair = new THREE.MeshPhongMaterial({color: Colors.hair, shading:THREE.FlatShading});
    var platform = new THREE.Mesh(platformGeo, matHair);
    platform.castShadow = true;
    platform.receiveShadow = true;
    scene.scene.add(platform);

    scene.scene.add(player.mesh);
    scene.scene.add(lights.hemisphereLight)
    scene.scene.add(lights.shadowLight);
    scene.scene.add(lights.ambientLight);
  }

  document.onkeydown = function(e) {
    if (e.keyCode === 39) {
      player.moveRight();
    } else if (e.keyCode === 37) {
        player.moveLeft();
    }
  }

  init();
});
