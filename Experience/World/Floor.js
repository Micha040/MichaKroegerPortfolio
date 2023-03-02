import Experience from "../Experience.js";
import * as THREE from "three"
import GSAP from "gsap"
import { BackSide } from "three";

export default class Floor{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircles();

    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry (100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,

    })
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.2;
    this.plane.receiveShadow = true;

    }


    setCircles(){
        const geometry = new THREE.CircleGeometry( 5, 128 );
        const material = new THREE.MeshStandardMaterial( { color: 0xe5a1aa } );
        const material2 = new THREE.MeshStandardMaterial( { color: 0x8395cd } );
        const material3 = new THREE.MeshStandardMaterial( { color: 0x7ad0ac } );

        this.circleFirst = new THREE.Mesh( geometry, material );
        this.circleSecond = new THREE.Mesh( geometry, material2 );
        this.circleThird = new THREE.Mesh( geometry, material3 );

        this.circleFirst.position.y = -0.19;

        this.circleSecond.position.y = -0.18;
        this.circleSecond.position.x = 1.5;
        
        this.circleThird.position.y = -0.17;
        
        this.circleFirst.scale.set(0,0,0);
        this.circleSecond.scale.set(0,0,0);
        this.circleThird.scale.set(0,0,0);

        this.circleFirst.rotation.x = 
            this.circleSecond.rotation.x = 
            this.circleThird.rotation.x = 
                -Math.PI/2
 
            this.circleFirst.receiveShadow = true;
            this.circleSecond.receiveShadow = true;
            this.circleThird.receiveShadow = true;
        
        this.scene.add( this.circleFirst );
        this.scene.add( this.circleSecond );
        this.scene.add( this.circleThird );

    }


    resize() {}
 
    update(){}

}