define([
  './modules/scene',
  './modules/lights',
  './modules/player',
  './modules/platforms',
  './modules/colors',
  './modules/title',
  './modules/clouds'
], function(
  sceneClass, lights, playerClass, platforms, Colors, title, clouds
) {
  // var player, startingPlatform;

  var startingPlatform;
  var scene, lights;
  var score = 0;
  var scoreDiv;
  var GAME_RUNNING = false;
  var mousePos = {
    x: 0,
    y: 0
  };

  function handleMouseMove(event) {
    var tx = -1 + (event.clientX / scene.WIDTH)*2;
    var ty = 1 - (event.clientY / scene.HEIGHT)*2;
    mousePos = {x:tx, y:ty};
  }

  function normalize(v,vmin,vmax,tmin, tmax){

  	var nv = Math.max(Math.min(v,vmax), vmin);
  	var dv = vmax-vmin;
  	var pc = (nv-vmin)/dv;
  	var dt = tmax-tmin;
  	var tv = tmin + (pc*dt);
  	return tv;

  }

  var gameOver = function() {
    player.isJumping = player.isFalling = false;
    player.fallSpeed = player.jumpSpeed = 0;
    TweenMax.to(player.mesh.scale, 2, {ease: "Strong.easeOut", z: 0.45, y: 0.45, x: 0.45});
    TweenMax.to(player.mesh.position, 2, {ease: "Strong.easeOut", z: 60, y: 65, x: -30});
    TweenMax.to(player.mesh.rotation, 2, {ease: "Strong.easeOut", y: 0});
    platforms.platforms.forEach(function(pl) {
      TweenMax.to(pl.position, 2, {ease: "Strong.easeOut", y: -300});
    });
    TweenMax.to(startingPlatform.position, 2, {ease: "Strong.easeOut", y: -300, onComplete: function(){ GAME_RUNNING = false; }});
    title.show();
  };

  var startGame = function() {
    GAME_RUNNING = true;
    TweenMax.to(startingPlatform.position, 2, {ease: "Strong.easeOut", y: 38, x: -30});
    TweenMax.to(player.mesh.scale, 2, {ease: "Strong.easeOut", z: 0.125, y: 0.125, x: 0.125});
    TweenMax.to(player.mesh.position, 2, {ease: "Strong.easeOut", z: 0, y: 48.5, x: -50});
    TweenMax.to(player.mesh.rotation, 2, {ease: "Strong.easeOut", y: 0.9, onComplete: player.jump.bind(player)});
    platforms.platforms.forEach(function(pl) {
      TweenMax.to(pl.position, 2, {ease: "Strong.easeOut", y: pl.tempY});
    });
    platforms.platforms.forEach(function(pl) {
      pl.action();
    });
    title.hide();
  }

  var lastTime = new Date();
  var deltaTime = 1000/33;
  function loop() {
    var time = new Date();
    if ((time - lastTime) > deltaTime) {
      // if (!GAME_RUNNING) {
      //   clouds.clouds.forEach(function(cl, index) {
      //     cl.position.y -= 0.5;
      //   });
      // }
      if (player.isJumping) {
        var targetX = normalize(mousePos.x, -1, 1, -270, 200);
        targetX = Math.max(Math.min(targetX, 20), -80);
        player.checkOrientation(player.mesh.position.x, targetX);
        TweenMax.to(player.mesh.position, 0.2, {x: targetX});
        player.checkJump();
        if (player.moveRest) {
          if (player.jumpSpeed > 4.5) {
            score += Math.round(player.jumpSpeed);
          }
          platforms.platforms.forEach(function(pl) {
            pl.position.y -= player.jumpSpeed;
          });

          clouds.clouds.forEach(function(cl) {
            cl.position.y -= player.jumpSpeed * 0.5;
          });

          startingPlatform.position.y -= player.jumpSpeed;
        }
      }

      if (player.isFalling) {
        player.checkFall();
      }
      lastTime = time;
    }

    if (player.isFalling) {
      var caster = new THREE.Raycaster();
      var ray = new THREE.Vector3(0, -1, 0);
      caster.set(player.mesh.position, ray);
      // var collision = caster.intersectObjects(platforms.platforms.map(function(p){ return p.bbox; }).concat([startingPlatform]));
      var collision = caster.intersectObjects(platforms.platforms.concat([startingPlatform]));
      if (collision.length) {
        for (var i = 0; i < collision.length; i++) {
          if (collision[i].distance < player.fallSpeed+1) {
            player.fallStop();
            if (collision[i].object.super) {
              player.jumpSpeed = 12;
            }
            break;
          }
        }
      }

      scene.camera.updateMatrix();
      scene.camera.updateMatrixWorld();
      scene.camera.matrixWorldInverse.getInverse(scene.camera.matrixWorld);

      player.head.updateMatrix();
      player.head.updateMatrixWorld();

      var frustum = new THREE.Frustum();
      frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices(scene.camera.projectionMatrix, scene.camera.matrixWorldInverse));
      if (!frustum.intersectsObject(player.head)) {
        gameOver();
      }

      if (!frustum.intersectsObject(platforms.platforms[0])) {
        var oldPlatform = platforms.platforms.shift();
        if (oldPlatform.tween) {
          oldPlatform.tween.kill();
        }
        scene.scene.remove(oldPlatform);
        var newPlatform = platforms.createPlatform(platforms.platforms[platforms.platforms.length-1].position.y + platforms.distance);
        newPlatform.action();
      }

      if (!frustum.intersectsObject(clouds.clouds[0].children[0])) {
        var oldCloud = clouds.clouds.shift();
        scene.scene.remove(oldCloud);

        var newCloud = clouds.Cloud();
        newCloud.position.y = clouds.clouds[clouds.clouds.length-1].position.y + 400 + ~~(Math.random()*50);
      }
        // player.mesh.position.y = platform.position.y + 1.5;
    }
    window.clouds = clouds;
    scene.renderer.render(scene.scene, scene.camera);
    requestAnimationFrame(loop);

    scoreDiv.innerText = score;
  }

  function init(event) {
    scene = sceneClass.createScene();
    sceneClass.scene = scene.scene;
    player = playerClass.createPlayer();
    lights.createLights();
    startingPlatform = platforms.addStartingPlatform();

    document.addEventListener('mousemove', handleMouseMove, false);
    // platforms.createAll();

    scoreDiv = document.createElement('div');
    scoreDiv.className = 'score';
    scoreDiv.innerText = score;
    document.body.appendChild(scoreDiv);
    clouds.createAll();
    title.init();
    loop();
  }

  document.onclick = function() {
    if (!GAME_RUNNING) {
      score = 0;
      scoreDiv.innerText = score;
      platforms.platforms = platforms.resetPlatforms();
      startGame();
    }
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
