define([
  './modules/scene',
  './modules/lights',
  './modules/player',
  './modules/platforms',
  './modules/colors'
], function(
  sceneClass, lights, playerClass, platforms, Colors
) {
  // var player, staringPlatform;
  var staringPlatform;
  var scene, lights;

  var startGame = function() {
    setTimeout(function() {
      TweenMax.to(staringPlatform.position, 2, {ease: "Strong.easeOut", y: 38, x: -30});
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

    if (player.isFalling) {
      var caster = new THREE.Raycaster();
      var ray = new THREE.Vector3(0, -1, 0);
      caster.set(player.mesh.position, ray);
      var collision = caster.intersectObjects(platforms.platforms);

      if (collision.length) {
        console.log(collision);
        // return;
      }
      for (var i = 0; i < collision.length; i++) {
        if (collision[i].distance < 3.3) {
          player.fallStop();
          break;
        }
      }
        // player.mesh.position.y = platform.position.y + 1.5;
    }

    scene.renderer.render(scene.scene, scene.camera);
    requestAnimationFrame(loop);
  }

  function init(event) {
    scene = sceneClass.createScene();
    sceneClass.scene = scene.scene;
    window.player = playerClass.createPlayer();
    lights.createLights();
    staringPlatform = platforms.addStartingPlatform();
    console.log(platforms);
    platforms.createAll();
    loop();
    startGame();
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
