import * as THREE from "three";
import audioController from "../../utils/AudioController";
import scene from "../Scene";

export default class LogoIut {
    constructor() {

        this.group = null;

        this.matcap = scene.textureLoader.load('/textures/matcap.png');
        this.matcap2 = scene.textureLoader.load('/textures/matcap2.png');

        this.material = new THREE.MeshMatcapMaterial({
            matcap: this.matcap,
        })
        this.material2 = new THREE.MeshMatcapMaterial({
            matcap: this.matcap2,
        })

        this.left = null;
        this.right = null;
        this.top = null;
        this.bottom = null;
        this.sphere = null;

        scene.gltfLoader.load('/models/logo-iut.glb', (gltf) => {
            // console.log(gltf);

            this.group = gltf.scene; //Ici on récupère un THREE.Group

            this.group.traverse((object) => {

                //s'assurer que l'objet est un mesh qui peut recevoir un material
                if (object.type === 'Mesh') {
                    object.material = this.material;
                }

                // if (object.name === 'Icosphere') {
                //     object.material = this.material2;
                // }
            })

            this.sphere = this.group.getObjectByName('Icosphere')
            this.sphere.material = this.material2;
            this.left = this.group.getObjectByName('BezierCircle');
            this.right = this.group.getObjectByName('BezierCircle002');
            this.top = this.group.getObjectByName('BezierCircle003');
            this.bottom = this.group.getObjectByName('BezierCircle001');


            this.group.rotation.x = Math.PI / 2;
        });
    }

    update() {

        this.group.rotation.y += 0.001;
        this.group.rotation.z += 0.002;

        const remappedFrequency = audioController.fdata[0] / 255;

        const scale = 0.75 + remappedFrequency;
        const scale2 = 1 + remappedFrequency/2;

        this.sphere.scale.set(scale, scale, scale);

        this.left.position.x = -1 + remappedFrequency;
        this.right.position.x = 1 - remappedFrequency;
        this.top.position.z = -1 + remappedFrequency;
        this.bottom.position.z = 1 - remappedFrequency;

        this.left.scale.set(scale2, scale2, scale2);
        this.right.scale.set(scale2, scale2, scale2);
        this.top.scale.set(scale2, scale2, scale2);
        this.bottom.scale.set(scale2, scale2, scale2);
    }
}
