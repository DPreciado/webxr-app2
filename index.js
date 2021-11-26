import * as THREE from './js/build/three.module.js';
import {GLTFLoader} from './js/examples/jsm/loaders/GLTFLoader.js'
import { VRButton } from './js/examples/jsm/webxr/VRButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio(wndow.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.xr.enabled = true;
container.appendChild( renderer.domElement );

const onWindowResize = ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', onWindowResize);

document.body.appendChild( VRButton.createButton( renderer ) );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

const loader = new GLTFLoader();

loader.load( './models/escena.gltf', 
 ( gltf ) => {

  scene.add( gltf.scene );
},
// called while loading is progressing
( xhr ) => {

  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
( error ) => {

  console.log( 'An error happened' );

});

// camera.position.z = 5;
// camera.position.y = 20;
// camera.rotation.y = 185.1;

function animate() {
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;
	// requestAnimationFrame( animate );
	// renderer.render( scene, camera );
  renderer.setAnimationLoop(()=>{
    renderer.render( scene, camera)
  });
}
animate();