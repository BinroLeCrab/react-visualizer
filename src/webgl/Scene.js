import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

// Postprocessing
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Objects
import Line from "./objects/Line";
import Board from "./objects/Board";
import LogoIut from "./objects/Logoiut";
import Cover from "./objects/Cover";
import audioController from "../utils/AudioController";
import Cube from "./objects/Cube";
import Cd from "./objects/Cd";

class Scene {
  constructor() { }

  setup(canvas) {
    this.canvas = canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight - 48;

    // instantier la logique three.js
    this.setupScene();
    this.setupCamera();
    this.setupLights();
    this.setupRenderer();
    // this.setupControls();
    // this.setupStats();
    this.setupPostprocessing();
    // this.setupGUI();

    this.setupTextureLoader();
    this.setupGLTFLoader();

    this.addEvents();
    this.addObjects();
  }

  setupGUI() {
    this.gui = new GUI();

    this.bloomFolder = this.gui.addFolder('Bloom');

    this.bloomFolder
      .add(this.bloomParams, 'threshold', 0, 1)
      .onChange(value => {
        this.bloomPass.threshold = Number(value);
      });

    this.bloomFolder
      .add(this.bloomParams, 'strength', 0, 3)
      .onChange(value => {
        this.bloomPass.strength = Number(value);
      });

    this.bloomFolder
      .add(this.bloomParams, 'radius', 0, 1)
      .onChange(value => {
        this.bloomPass.radius = Number(value);
      });
  }

  setupPostprocessing() {
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);

    this.bloomParams = {
      threshold: 1,
      strength: 0.4,
      radius: 0.85,
    };

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width, this.height),
      this.bloomParams.threshold,
      this.bloomParams.strength,
      this.bloomParams.radius
    );

    this.bloomPass.threshold = 0;
    this.bloomPass.strength = 0.5;
    this.bloomPass.radius = 0.1;

    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
  }

  setupGLTFLoader() {
    this.gltfLoader = new GLTFLoader();
  }

  setupTextureLoader() {
    this.textureLoader = new THREE.TextureLoader();
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = Math.PI / 2;
  }

  setupStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  setupLights() {
    this.spotLight = new THREE.SpotLight(0xA2D8FF);
    this.spotLight.position.set(3.5, 3.5, 5);
    this.spotLight.intensity = 50;
    this.spotLight.lookAt(0, 0, 0);

    this.scene.add(this.spotLight);

    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8);
    this.scene.add(this.ambientLight);
  }

  addObjects() {
    // Line
    this.line = new Line();
    this.board = new Board();
    this.logoIut = new LogoIut();
    this.cover = new Cover();
    this.cube = new Cube();
    this.cd = new Cd();
    // ....

    this.camera.position.z = this.width < 600 ? 2.5 : 2;

    this.scene.add(this.cd.group);
    this.currentObject = this.cd;

    //Board
    // this.scene.add(this.board.group);
  }

  onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight - 48;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
  };

  addEvents() {
    gsap.ticker.add(this.tick);
    window.addEventListener("resize", this.onResize);
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );

  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
    });

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  pickVisualizer(index) {

    // on remove l'ancien groupe
    this.scene.remove(this.currentObject.group);

    switch (index) {
      case 0:
        // Cover
        this.bloomPass.threshold = 0;
        this.bloomPass.strength = 0.74;
        this.bloomPass.radius = 0.2;
        this.currentObject = this.cover;
        this.camera.position.z = this.width < 600 ? 15 : 10;
        break;
      case 1:
        // Line
        this.bloomPass.threshold = 0;
        this.bloomPass.strength = 0.74;
        this.bloomPass.radius = 0.2;
        this.currentObject = this.line;
        this.camera.position.z = this.width < 600 ? 400 : 150;
        break;

      case 2:
        // Board
        this.bloomPass.threshold = 0.04;
        this.bloomPass.strength = 0.5;
        this.bloomPass.radius = 0.85;
        this.currentObject = this.board;
        this.camera.position.z = this.width < 600 ? 30 : 20;
        break;

      case 3:
        // Logo Iut
        this.bloomPass.threshold = 0;
        this.bloomPass.strength = 1.008;
        this.bloomPass.radius = 0.545;
        this.currentObject = this.logoIut;
        this.camera.position.z = this.width < 600 ? 8 : 5;
        break;

      case 4:
        // Cube
        this.bloomPass.threshold = 0;
        this.bloomPass.strength = 1.008;
        this.bloomPass.radius = 0.545;
        this.currentObject = this.cube;
        this.camera.position.z = 5;
        break;

      case 5:
        // CD
        this.bloomPass.threshold = 0;
        this.bloomPass.strength = 0.5;
        this.bloomPass.radius = 0.1;
        this.currentObject = this.cd;
        this.camera.position.z = this.width < 600 ? 2.5 : 2;
        break;

      default:
        break;
    }

    // on add le nouveau groupe
    this.scene.add(this.currentObject.group);
  }

  tick = (time, deltaTime, frame) => {
    // this.stats.begin();

    this.composer.render(this.scene, this.camera);

    if (this.currentObject && audioController.fdata) {
      this.currentObject.update(time, deltaTime);
    }

    // this.stats.end();
  };
}

const scene = new Scene();
export default scene;