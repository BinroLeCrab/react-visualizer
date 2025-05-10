import * as THREE from "three";
import audioController from "../../utils/AudioController";
import scene from "../Scene";

export default class Cd {
    constructor() {

        this.group = null;

        this.matcap = scene.textureLoader.load('/textures/image3.png', (texture) => {
            texture.flipY = false;
        });

        this.material = new THREE.MeshStandardMaterial({
            map: this.matcap,
        })


        this.cover = null;

        scene.gltfLoader.load('/models/newcdbinro.gltf', (gltf) => {
            console.log(gltf);

            this.group = gltf.scene; //Ici on récupère un THREE.Group

            this.group.traverse((object) => {

                //s'assurer que l'objet est un mesh qui peut recevoir un material
                // if (object.type === 'Mesh') {
                //     object.material = this.material;
                // }

                // if (object.name === 'Icosphere') {
                //     object.material = this.material2;
                // }
            })

            this.cover = this.group.getObjectByName('cover_avant');
            this.cover.material = this.material;
            console.log(this.cover);

            console.log(this.group);
            this.group.rotation.x = Math.PI / 2;
            this.group.position.x = 0;
            this.group.position.y = 0;
            this.group.position.z = 0;
        });
    }

    setCover(src) {

        // charger la texture
        this.texture = scene.textureLoader.load(src, (texture) => {
            texture.flipY = false;
        });
        // donner la texture au material
        this.material.map = this.texture;
        // force la recompilation du material
        this.material.needsUpdate = true;

    }

    update() {
        const remappedFrequency = audioController.fdata[0] / 255;

        const scale = 1 + remappedFrequency/5;

        this.group.scale.set(scale, scale, scale);
    }
}
