import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js" ;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0.5, 0.5,7);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement )

var plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 10, 5, 10), 
new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  wireframe: true
}));
plane.rotation.x = -Math.PI * 0.5;
scene.add(plane);

var ball = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 8), new THREE.MeshStandardMaterial({
    color: 0xff0051, flatShading: true, metalness: 0, roughness: 1
}));
scene.add(ball);

var ball2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 8), new THREE.MeshBasicMaterial({
    color: "white", wireframe: true, transparent: true
}));
scene.add(ball2);

// lights
var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.4)
scene.add( ambientLight )
var pointLight = new THREE.PointLight(0xfffff,0.9)
pointLight.position.set(25,20,25)
scene.add(pointLight)
var pointLight = new THREE.PointLight(0xfffff,0.5)
pointLight.position.set(-25,-20,-25)
scene.add(pointLight)

var clock = new THREE.Clock();
var time = 0;
var delta = 0;

render();

function render() {
  requestAnimationFrame(render);
  delta = clock.getDelta();
  time += delta;
  ball.rotation.x = time * 4;
  ball.position.y = 0.5 + Math.abs(Math.sin(time * 3)) * 2;
  ball.position.z = Math.cos(time) ;
  ball2.rotation.x = -(time * 4);
  ball2.position.y = -(0.5 + Math.abs(Math.sin(time * 3)) * 2) ;
  ball2.position.z = -(Math.cos(time) * 4);
  renderer.render(scene, camera);
}