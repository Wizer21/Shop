<template> 
    <div id="three_scene">
    </div>
    <div id="main">
        <a href="/main">
            <h1 id="title">
                PlantShop
            </h1>
            <p id="sub">
                because we love plants 
            </p>
        </a>
    </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export default {
    name: 'Index',
    mounted() {
        const three_scene = document.getElementById('three_scene')

        // THREE JS 3S SCENE
        let scene = new THREE.Scene();

        // Light
        let light = new THREE.AmbientLight()
        light.intensity = 2
        scene.add(light)

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth * 0.99 / (window.innerHeight/2),
            0.1,
            1000
        )
        camera.position.set(4.5, -0.5, 5)

        // Render
        let renderer = new THREE.WebGLRenderer({ alpha: true })
        renderer.setClearColor( 0x000000, 0 )
        three_scene.appendChild(renderer.domElement)

        renderer.setSize(window.innerWidth, window.innerHeight)

        // Camera Controler    
        //const controls = new THREE.OrbitControls(camera, three_scene);   

        let monstera
        const loader = new GLTFLoader() 
        loader.load("/model/leaf.glb", function ( gltf ) {
            monstera = scene.add( gltf.scene )
        })


        // Animate
        const animate = function () {
            requestAnimationFrame(animate)
            if (monstera){
                monstera.rotation.y += 0.0003
            }

            renderer.render(scene, camera);
        }
        animate()
    }
}

</script>

<style scoped>
@font-face {
    font-family: Caveat;
    src: url(../font/Caveat-Regular.ttf) format('Caveat');
}
#main
{
    position: relative;
    overflow: hidden;

    display: flex;
    justify-content: center;
    padding-top: 40vh;
}

#title
{
    font-size: 4em;
    margin: 0em;
    transition-duration: 3000ms;
    overflow: visible;
}
#title:hover
{
    transition-duration: 3000ms;
    transform: scale(1.5) rotate(-2deg);
}
a
{
    color: black;
    text-decoration: none;
}
#sub
{
    text-align: center;
    font-family: 'Caveat';
}
#three_scene
{
    position: absolute;
    height: 100vh;
    width: 100vw;
}
</style>

