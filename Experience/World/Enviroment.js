import Experience from "../Experience.js";
import * as THREE from "three"
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Enviroment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        //this.gui = new GUI({ container: document.querySelector(".hero-main")});
        this.obj = {
            colorObj: {r: 0, g:0, b:0},
            intensity: 3,
        }

        
        this.setSunLight();
        //this.setGUI();
    }

    setGUI(){
        this.gui.addColor(this.obj, "colorObj").onChange(()=>{
            this.sunLight.color.copy(this.obj.colorObj)
            this.ambientLight.color.copy(this.obj.colorObj)
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(()=>{
            this.sunLight.intensity = this.obj.intensity;
            this.ambientLight.intensity = this.obj.intensity;
        })
    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.bottom= -7;
        this.sunLight.shadow.camera.far = 30; 
        this.sunLight.shadow.camera.near = 0; 
        this.sunLight.shadow.mapSize.set(4096,4096);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(-1.5, 7, 3);
        this.scene.add(this.sunLight)

        this.ambientLight = new THREE.AmbientLight("#ffffff",1.1)
        this.scene.add(this.ambientLight)
    }



    switchTheme(theme){
        if(theme === "dark"){
            GSAP.to(this.sunLight.color, {
                r: 0.17254901960784313,   
                g: 0.23137254901960785,        
                b: 0.6862745098039216,    
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.17254901960784313,   
                g: 0.23137254901960785,        
                b: 0.6862745098039216,  
            });
            GSAP.to(this.sunLight, {intensity: 0.78})
            GSAP.to(this.ambientLight, {intensity: 0.78})
        } else {
            GSAP.to(this.sunLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
        });
        GSAP.to(this.ambientLight.color, {
            r: 255 / 255,
            g: 255 / 255,
            b: 255 / 255,
        });
        GSAP.to(this.sunLight, {intensity: 1.1})
        GSAP.to(this.ambientLight, {intensity: 1.1})
    }
    }

    resize() {}

    update(){}

}