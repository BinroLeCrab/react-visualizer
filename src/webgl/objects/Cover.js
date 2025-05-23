import * as THREE from "three";
import audioController from "../../utils/AudioController";
import scene from "../Scene";
import fragmentShader from "../shaders/cover/fragment.glsl";
import vertexShader from "../shaders/cover/vertex.glsl";

export default class Cover {

    constructor() {

        this.group = new THREE.Group();
        this.geometry = new THREE.PlaneGeometry(12, 12, 256, 256);
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uMap: new THREE.Uniform(),
                uSize: new THREE.Uniform(2),
                uTime : new THREE.Uniform(0),
                uAudioFrequency: new THREE.Uniform(0),
                uFreqAigu: new THREE.Uniform(0),
            },
            side: THREE.DoubleSide,
            fragmentShader: fragmentShader,
            vertexShader: vertexShader,
        });

        this.mesh = new THREE.Points(this.geometry, this.material);
        this.group.add(this.mesh);

    }

    setCover(src) {

        // charger la texture
        this.texture = scene.textureLoader.load(src);
        // donner la texture au material
        // this.material.map = this.texture;
        this.material.uniforms.uMap.value = this.texture;
        // force la recompilation du material
        this.material.needsUpdate = true;

    }

    update(time) { 
        this.material.uniforms.uTime.value = time;
        this.material.uniforms.uAudioFrequency.value = audioController.fdata[0];
        this.material.uniforms.uFreqAigu.value = audioController.fdata[100];
    }

}