import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { PointerLockControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000,
);
camera.position.y = 10;
const renderer = new THREE.WebGLRenderer( { antialias: true } );
let controls;
let loader = new GLTFLoader();
const loader2 = new THREE.FontLoader();
let car;
let car2;
let mixer1;
let mixer2;
let mixer3;
let geometry485;
let textMesh1;
const clock = new THREE.Clock();

let video1 = document.getElementById('video');
let texture1 = new THREE.VideoTexture(video1);
texture1.minFilter = THREE.LinearFilter;
texture1.magFilter = THREE.LinearFilter;
texture1.format = THREE.RGBFormat;
texture1.crossOrigin = 'anonymous';

let video2 = document.getElementById('video2');
let texture2 = new THREE.VideoTexture(video2);
texture2.minFilter = THREE.LinearFilter;
texture2.magFilter = THREE.LinearFilter;
texture2.format = THREE.RGBFormat;
texture2.crossOrigin = 'anonymous';

let video3 = document.getElementById('video3');
let texture3 = new THREE.VideoTexture(video3);
texture3.minFilter = THREE.LinearFilter;
texture3.magFilter = THREE.LinearFilter;
texture3.format = THREE.RGBFormat;
texture3.crossOrigin = 'anonymous';

let video4 = document.getElementById('video4');
let texture4 = new THREE.VideoTexture(video4);
texture4.minFilter = THREE.LinearFilter;
texture4.magFilter = THREE.LinearFilter;
texture4.format = THREE.RGBFormat;
texture4.crossOrigin = 'anonymous';

let video5 = document.getElementById('video5');
let texture5 = new THREE.VideoTexture(video5);
texture5.minFilter = THREE.LinearFilter;
texture5.magFilter = THREE.LinearFilter;
texture5.format = THREE.RGBFormat;
texture5.crossOrigin = 'anonymous';

let video6 = document.getElementById('video6');
let texture6 = new THREE.VideoTexture(video6);
texture6.minFilter = THREE.LinearFilter;
texture6.magFilter = THREE.LinearFilter;
texture6.format = THREE.RGBFormat;
texture6.crossOrigin = 'anonymous';


let pointLight, pointLight2, pointLight3, pointLight4;


const objects = [];

			let raycaster;

			let moveForward = false;
			let moveBackward = false;
			let moveLeft = false;
			let moveRight = false;
			let canJump = false;

			let prevTime = performance.now();
			const velocity = new THREE.Vector3();
			const direction = new THREE.Vector3();
			const vertex = new THREE.Vector3();
			const color = new THREE.Color();
  
document.body.onload = () => {
  main();
}; 

window.onresize = () => {
    scene.background = new THREE.Color(0xdddddd);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, true);
  };

  export function main() {

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);




    controls = new PointerLockControls( camera, document.body );

	const blocker = document.getElementById( 'blocker' );
	const instructions = document.getElementById( 'instructions' );

	instructions.addEventListener( 'click', function () {

		controls.lock();

	} );

	controls.addEventListener( 'lock', function () {

		instructions.style.display = 'none';
		blocker.style.display = 'none';

	} );

	controls.addEventListener( 'unlock', function () {

		blocker.style.display = 'block';
		instructions.style.display = '';

	} );

	scene.add( controls.getObject() );

    const onKeyDown = function ( event ) {

        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;

            case 'Space':
                if ( canJump === true ) velocity.y += 250;
                canJump = false;
                break;

        }

    };

    const onKeyUp = function ( event ) {

        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;

        }

    };

    document.addEventListener( 'keydown', onKeyDown );
    document.addEventListener( 'keyup', onKeyUp );
    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

    // floor

    let floorGeometry = new THREE.PlaneGeometry( 200, 200, 40, 40 );
    floorGeometry.rotateX( - Math.PI / 2 );
    let position = floorGeometry.attributes.position;

				for ( let i = 0, l = position.count; i < l; i ++ ) {

					vertex.fromBufferAttribute( position, i );

					vertex.x += Math.random() * 20 - 10;
					vertex.y += Math.random() * 2;
					vertex.z += Math.random() * 20 - 10;

					position.setXYZ( i, vertex.x, vertex.y, vertex.z );

				}

				floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

				position = floorGeometry.attributes.position;
				const colorsFloor = [];

				for ( let i = 0, l = position.count; i < l; i ++ ) {

					color.setHSL( Math.random() * 0.5 + 0, 1, Math.random() * 0.1 + 0.18 );
					colorsFloor.push( color.r, color.g, color.b );

				}

				floorGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsFloor, 3 ) );

				const floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: true } );

				const floor = new THREE.Mesh( floorGeometry, floorMaterial );
				scene.add( floor );


     //Walls & Floor

  let plane2 = drawPlane(35*5, 35*5, 10*5, 10*5, 0x483D8B, true);
  plane2.rotation.x = -Math.PI /2 ;
  plane2.position.y = 50;
  scene.add(plane2);

  let plane3 = drawPlane(35*5, 35*5, 10*5, 10*5, 0x6495ED, true);
  plane3.rotation.x = Math.PI;
  plane3.rotation.y = Math.PI /2;
  plane3.position.x = 17.5*5;
  plane3.position.y = 17.5*5;
  scene.add(plane3);

  let plane4 = drawPlane(35*5, 35*5, 10*5, 10*5, 0x6495ED, true);
  plane4.rotation.x = Math.PI;
  plane4.rotation.y = Math.PI /2;
  plane4.position.x = -17.5*5;
  plane4.position.y = 17.5*5;
  scene.add(plane4);

  let plane5 = drawPlane(35*5, 35*5, 10*5, 10*5, 0x6495ED, true);
  plane5.rotation.x = Math.PI;
  plane5.rotation.y = Math.PI;
  plane5.position.z = 17.5*5;
  plane5.position.y = 17.5*5;
  scene.add(plane5);

  let plane6 = drawPlane(35*5, 36*5, 10*5, 10*5, 0x6495ED, true);
  plane6.rotation.x = Math.PI;
  plane6.rotation.y = Math.PI;
  plane6.position.z = -17.5*5;
  plane6.position.y = 17.5*5;
  scene.add(plane6);

  let wall1 = drawPlane(20*6.5, 36*5, 10*5, 10*5, 0x6495ED, true);
  wall1.rotation.x = Math.PI;
  wall1.rotation.y = Math.PI /2;
  wall1.position.x = 6.5*4;
  wall1.position.z = -3;
  wall1.position.y = 17;
  scene.add(wall1);

  let wall2 = drawPlane(20*6.5, 36*5, 10*5, 10*5, 0x6495ED, true);
  wall2.rotation.x = Math.PI;
  wall2.rotation.y = Math.PI /2;
  wall2.position.x = -6.5*4;
  wall2.position.z = -3;
  wall2.position.y = 10;
  scene.add(wall2);

  let wall3 = drawPlane(15*5, 36*5, 10*5, 10*5, 0x6495ED, true);
  wall3.rotation.x = Math.PI;
  wall3.rotation.y = Math.PI;
  wall3.position.z = 7;
  wall3.position.y = 17.5;
  wall3.position.x = 10*6.35;
  scene.add(wall3);

  let wall4 = drawPlane(15*5, 36*5, 10*5, 10*5, 0x6495ED, true);
  wall4.rotation.x = Math.PI;
  wall4.rotation.y = Math.PI;
  wall4.position.z = 7;
  wall4.position.y = 17.5;
  wall4.position.x = -10*6.35;
  scene.add(wall4);


  // Fin Walls & Floor           

// Videos Load
video1.src = "assets/BadBunny.mp4";
video1.load();
video1.play();

video2.src = "assets/BadBunny2.mp4";
video2.load();
video2.play();

video3.src = "assets/BadBunny3.mp4";
video3.load();
video3.play();

video4.src = "assets/BadBunny4.mp4";
video4.load();
video4.play();

video5.src = "assets/BadBunny5.mp4";
video5.load();
video5.play();

video6.src = "assets/BadBunny6.mp4";
video6.load();
video6.play();
video6.volume = 0.05;

    //Fin Videos Load
  //Panels

  let plane31 = new DrawVideos(8*5, 6*5, 10, 10, texture1);
  plane31.rotation.x = Math.PI;
  plane31.rotation.y = -Math.PI;
  plane31.rotation.z = Math.PI;
  plane31.position.x = 17.4*3.25;
  plane31.position.y = 5.5*5;
  plane31.position.z = 1.8*4 + 0.2;
  scene.add(plane31);
  let plane312 = drawPlane(8.5*5, 6.5*5, 10, 10, 0xF0FFFF, true);
  plane312.rotation.x = Math.PI;
  plane312.rotation.y = Math.PI;
  plane312.position.x = 17.4*3.25;
  plane312.position.y = 5.5*5;
  plane312.position.z = 1.8*4 - 0.18;
  scene.add(plane312);
//------------------------------------------//
let plane311 = new DrawVideos(8*5, 6*5, 10, 10, texture2);
plane311.rotation.x = Math.PI;
plane311.rotation.y = -Math.PI;
plane311.rotation.z = Math.PI;
plane311.position.x = -17.4*3.3;
plane311.position.y = 5.5*5;
plane311.position.z = 1.8*4 + 0.2;
scene.add(plane311);
let plane3121 = drawPlane(8.5*5, 6.5*5, 10, 10, 0xF0FFFF, true);
plane3121.rotation.x = Math.PI;
plane3121.rotation.y = Math.PI;
plane3121.position.x = -17.4*3.3;
plane3121.position.y = 5.5*5;
plane3121.position.z = 1.8*4 - 0.18;
scene.add(plane3121);
//------------------------------------------//
  let plane41 = DrawVideos(8*5, 6*5, 10, 10, texture3);
  plane41.rotation.y = Math.PI;
  plane41.position.x = -17.4*3.25;
  plane41.position.y = 5.5*5;
  plane41.position.z = 6.8;
  scene.add(plane41);
  let plane412 = drawPlane(8.5*5, 6.5*5, 10, 10, 0xF0FFFF, true);
  plane412.rotation.y = Math.PI;
  plane412.position.x = -17.4*3.25;
  plane412.position.y = 5.5*5;
  plane412.position.z = 6.9;
  scene.add(plane412);
//---------------------------------------------//
let plane411 = DrawVideos(8*5, 6*5, 10, 10, texture4);
plane411.rotation.y = Math.PI;
plane411.position.x = 17.4*3.25;
plane411.position.y = 5.5*5;
plane411.position.z = 6.8;
scene.add(plane411);
let plane4121 = drawPlane(8.5*5, 6.5*5, 10, 10, 0xF0FFFF, true);
plane4121.rotation.y = Math.PI;
plane4121.position.x = 17.4*3.25;
plane4121.position.y = 5.5*5;
plane4121.position.z = 6.9;
scene.add(plane4121);
//---------------------------------------------//
let plane51 = DrawVideos(8*3, 6*3, 10, 10,texture5);
  plane51.position.z = -87.2;
  plane51.position.y = 35;
  scene.add(plane51);
  let plane512 = drawPlane(8.5*3, 6.5*3, 10, 10, 0xF0FFFF, true);
  plane512.position.z = -87.4;
  plane512.position.y = 35;
  scene.add(plane512);

  let plane61 = new DrawVideos(10, 10, 10, 10, texture6);
  plane61.rotation.y = -Math.PI
  plane61.position.x = 200;
  plane61.position.y = 200;
  scene.add(plane61);

  // Fin Panels


  //Luces Esfera
  pointLight = createLight( 0x00FA9A );
  pointLight.position.set(-39, 40, -13);
  pointLight.rotation.set(0, 10, 6);
  scene.add( pointLight );

  pointLight = createLight( 0xFF00FF );
  pointLight.position.set(35, 40, -13);
  pointLight.rotation.set(0, 5, 6);
  scene.add( pointLight );

  pointLight = createLight( 0x7FFF00 );
  pointLight.position.set(60, 30, -70);
  pointLight.rotation.set(0, -4, 6);
  scene.add( pointLight );

  pointLight = createLight( 0x8B0000 );
  pointLight.position.set(50, 40, 23);
  pointLight.rotation.set(0, 2, 10);
  scene.add( pointLight );

  pointLight = createLight( 0x8A2BE2 );
  pointLight.position.set(-60, 20, 70);
  pointLight.rotation.set(0, 2, 6);
  scene.add( pointLight );

  pointLight = createLight( 0xFF1493 );
  pointLight.position.set(10, 20, 60);
  pointLight.rotation.set(40, 2, 6);
  scene.add( pointLight );

  pointLight = createLight( 0xFF1493 );
  pointLight.position.set(10, 20, -60);
  pointLight.rotation.set(0, 2, 6);
  scene.add( pointLight );

  pointLight = createLight( 0xFF1493 );
  pointLight.position.set(-20, 20, 0);
  pointLight.rotation.set(10, 2, 40);
  scene.add( pointLight );
   //Fin luces esfera

   //Modelos 3D Animados
  loadInitialModels(-60, 30, -20, 0, 800, 1)
  loadInitialModels2(-65, 20, 70, 0, 700, 2)
  loadInitialModels3(50, 20, 30, 0, 700, 3)
    // Fin Modelos 3D

    //Texto 3D
    l3dtext('buenosdias', 75, 40, 0, 0, 0, Math.PI, 6, 0.2, 0x7FFFD4, 0x7FFFD4);
    l3dtext('buenasnoches', -35, 20, 0, 0, 0, Math.PI, 6, 0.2, 0x00CED1, 0x00CED1);
    l3dtext('bienvenidos', 25, 40, -40, 0, 0, Math.PI, 8, 0.2, 0x00CED1, 0x00CED1);
    // Fin Texto 3D


    animate();
  }


  function l3dtext(string, x, y, z, x1, y1, z1, s1, s2, color1, color2) {
    loader2.load('assets/Origy.json', 
    function (font) {
         geometry485 = new THREE.TextGeometry(string, {
          font: font,
          size: s1,
          height: s2,
      });
      
        textMesh1 = new THREE.Mesh(geometry485, 
        new THREE.MeshPhongMaterial({ color: color1 }), // front
        new THREE.MeshPhongMaterial({ color: color2 }) // side
        );
      textMesh1.castShadow = true
      textMesh1.position.y = y
      textMesh1.position.z = z
      textMesh1.position.x = x
      textMesh1.rotation.y = y1
      textMesh1.rotation.x = x1
      textMesh1.rotation.z = z1
      scene.add(textMesh1)
  });
  }

  function loadInitialModels(x, y, z, rotacion, escala, modelo) {
    loader.load(
      `assets/Modelos/1/scene.gltf`,
      function (gltf) {
        car = gltf.scene.children[0];
        car.position.set(x, y, z);
        car.rotation.z = rotacion;
        car.scale.multiplyScalar(escala / 100);
        scene.add(car);

        mixer1 = new THREE.AnimationMixer( car );
				mixer1.clipAction( gltf.animations[ 0 ] ).play();
        animate();
      },
    );
  }
  function loadInitialModels2(x, y, z, rotacion, escala, modelo) {
    loader.load(
      `assets/Modelos/2/scene.gltf`,
      function (gltf) {
        car2 = gltf.scene.children[0];
        car2.position.set(x, y, z);
        car2.rotation.z = rotacion;
        car2.scale.multiplyScalar(escala / 100);
        scene.add(car2);

        mixer2 = new THREE.AnimationMixer( car2);
				mixer2.clipAction( gltf.animations[ 0 ] ).play();
        animate();
      },
    );
  }

  function loadInitialModels3(x, y, z, rotacion, escala, modelo) {
    loader.load(
      `assets/Modelos/${modelo}/scene.gltf`,
      function (gltf) {
        car = gltf.scene.children[0];
        car.position.set(x, y, z);
        car.rotation.z = rotacion;
        car.scale.multiplyScalar(escala / 100);
        scene.add(car);

        mixer3 = new THREE.AnimationMixer( car );
				mixer3.clipAction( gltf.animations[ 0 ] ).play();
        animate();
      },
    );
  }








  function drawPlane(w, h, sh, sw, color, ds = false) {
    const geometry = new THREE.PlaneGeometry(w, h, sw, sh);
    const material = new THREE.MeshPhongMaterial({
      color,
      side: ds ? THREE.DoubleSide : undefined,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;
    plane.castShadow = true;
    return plane;
  }
  
  function DrawVideos(w, h, sh, sw, texture) {
    const geometryv1 = new THREE.PlaneGeometry(w, h, sw, sh);
    const materialv3 = new THREE.MeshBasicMaterial({ map: texture });
    const plane2 = new THREE.Mesh(geometryv1, materialv3);
    return plane2;
  }

  function createLight( color ) {

    const intensity = 2;

    const light = new THREE.PointLight( color, intensity, 40 );
    light.castShadow = true;
    light.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects

    let geometry = new THREE.SphereGeometry( 1, 20, 6 );
    let material = new THREE.MeshBasicMaterial( { color: color } );
    material.color.multiplyScalar( intensity );
    let sphere = new THREE.Mesh( geometry, material );
    light.add( sphere );

    const texture = new THREE.CanvasTexture( generateTexture() );
    texture.magFilter = THREE.NearestFilter;
    texture.wrapT = THREE.RepeatWrapping;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set( 1, 5.5 );

    geometry = new THREE.SphereGeometry( 2, 30, 20 );
    material = new THREE.MeshPhongMaterial( {
      side: THREE.DoubleSide,
      alphaMap: texture,
      alphaTest: 0.5
    } );

    sphere = new THREE.Mesh( geometry, material );
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    light.add( sphere );

    // custom distance material
    const distanceMaterial = new THREE.MeshDistanceMaterial( {
      alphaMap: material.alphaMap,
      alphaTest: material.alphaTest
    } );
    sphere.customDistanceMaterial = distanceMaterial;

    return light;

  }

  function generateTexture() {

    const canvas = document.createElement( 'canvas' );
    canvas.width = 2;
    canvas.height = 2;

    const context = canvas.getContext( '2d' );
    context.fillStyle = 'white';
    context.fillRect( 0, 1, 2, 1 );

    return canvas;

  }



  function animate() {

    requestAnimationFrame( animate );
    const delta = clock.getDelta();
    mixer1.update( delta );
    mixer2.update( delta );
    mixer3.update( delta );
    const time = performance.now();

    if ( controls.isLocked === true ) {

        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;

        const intersections = raycaster.intersectObjects( objects, false );

        const onObject = intersections.length > 0;

        const delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        if ( onObject === true ) {

            velocity.y = Math.max( 0, velocity.y );
            canJump = true;

        }

        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );

        controls.getObject().position.y += ( velocity.y * delta ); // new behavior

        if ( controls.getObject().position.y < 10 ) {

            velocity.y = 0;
            controls.getObject().position.y = 10;

            canJump = true;

        }

    }
    prevTime = time;

    renderer.render( scene, camera );
}