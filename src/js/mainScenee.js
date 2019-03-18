var THREE = window.THREE = require('three');
require('three/examples/js/loaders/FBXLoader');
require('three/examples/jsm/controls/OrbitControls');
require('./libs/inflate.min');


var scene = new THREE.Scene();
var clock = new THREE.Clock();
var renderer = new THREE.WebGLRenderer();
var container, mixer, light, controls, camera;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(74, window.innerWidth / window.innerHeight, 1, 3500);
    camera.position.set(700, 300, 1000);


    // controls = new THREE.OrbitControls();
    // controls.target.set(0, 100, 0);
    // controls.update();

    scene.background = new THREE.Color(0xa0a0a0);

    light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 200, 0);
    scene.add(light);

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 200, 100);
    light.castShadow = true;
    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = -100;
    light.shadow.camera.left = -120;
    light.shadow.camera.right = 120;
    scene.add(light);

    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({color: 0x999999, depthWrite: false}));
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    var loader = new THREE.FBXLoader();
    loader.load('./models/Samba Dancing.fbx', function (model) {

        mixer = new THREE.AnimationMixer(model);

        var action = mixer.clipAction(model.animations[0]);
        action.play();

        model.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.recieveShadow = true;

            }

        });
        scene.add(model);

    });
}

function animate() {
    requestAnimationFrame(animate);
    var delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera);

}


//
// var scene = new THREE.Scene();
// var loader = new THREE.FBXLoader();
//
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//
//
// var renderer = new THREE.WebGLRenderer();
// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({color: 0xff0000});
//
// var cube = new THREE.Mesh(geometry, material);
//
// loader.load('src/model/Joven_Animations.fbx', function (fbx) {
//     scene.add(fbx.scene);
// });
//
//
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// scene.add(cube);
//
// camera.position.z = 5;


//
// var animateCube = function () {
//     requestAnimationFrame(animate);
//
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//
//     renderer.render(scene, camera);
// };
//
// animateCube();