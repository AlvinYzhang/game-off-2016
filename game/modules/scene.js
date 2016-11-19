define(function() {
  var scene,
      camera,
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane,
      renderer,
      container;

  var HEIGHT, WIDTH;

  var createScene = function() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
      );

    camera.position.x = -30;
    camera.position.z = 130;
    camera.position.y = 100;

    scene.fog = new THREE.Fog(0x1ec503, 0.5, 450);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    container = document.getElementById('game');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', handleWindowResize, false);

    return {
      scene: scene,
      renderer: renderer,
      camera: camera,
      WIDTH: WIDTH,
      HEIGHT: HEIGHT
    };
  }

  var handleWindowResize = function() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  }

  return {
    createScene: createScene,
    scene: scene,
    camera: camera
  };
});
