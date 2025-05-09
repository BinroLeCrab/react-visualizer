import * as THREE from "three";
import audioController from "../../utils/AudioController";

export default class Cube {
    constructor() {
        this.group = new THREE.Group();

        this.count = 0;
        this.beatCount = 0;

        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            color: "0xFFFFFF",
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.group.add(this.mesh);
    }

    update(time, deltaTime) {
        if (audioController.bpm) {
            this.count += deltaTime * 0.001;

            if (this.count > 60 / audioController.bpm) {
                
                this.material.color.setRGB(Math.random(), Math.random(), Math.random());
                this.group.scale.x+= 0.1;
                this.group.scale.y+= 0.1;
                this.group.scale.z+= 0.1;
                
                this.count = 0;
                this.beatCount++;

                // changer la couleur
                if (this.beatCount > 3) {
                    this.group.scale.x = 1;
                    this.group.scale.y = 1;
                    this.group.scale.z = 1;
                    this.beatCount = 0;
                }
            }
        }
        
        this.group.rotation.x += 0.003;
        this.group.rotation.y += 0.003;
    }
}