import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll'

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.sizes = this.experience.sizes;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child=>{
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        })
        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;
        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        this.setSmoothScroll();
        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.1,
          disableRaf: true });
      
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
      }


    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }


    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //Desktop
            //first section
            "(min-width: 969px)": ()=> {

                //Resets
                this.room.scale.set(0.11, 0.11, 0.11)
                this.room.position.set(0,0,0)
                this.rectLight.width = 0.5,
                this.rectLight.height = 0.7,

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * 0.0012;
                    },
                });

                //second section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: ()=>{
                        return 1;
                    },
                    z:()=>{
                        return this.sizes.height * 0.0032
                    },
                }, "same");
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                }, "same");
                this.secondMoveTimeline.to(this.rectLight,
                    {
                        width: 0.5*4,
                        height: .7*4,
                }, "same");

                //Third section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.camera.orthographicCamera.position, {
                    y: -1,
                    x: -3,
                });
                            

            },
          
            //Mobile
            "(max-width: 968px)": ()=> {
                
                //Resets

                this.room.scale.set(0.07, 0.07, 0.07);
                this.rectLight.width = 0.3;
                this.room.position.set(0,0,0)
                this.rectLight.height = 0.4;

                //First Section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale,{
                    x: .1,
                    y: .1,
                    z: .1,
                })
                //second section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale,{
                    x: .25,
                    y: .25,
                    z: .25,
                },"same1").to(this.rectLight,{
                    width: 0.3 * 3.4,
                    height: 0.4 * 3.4,
                }, "same1").to(this.room.position,{
                    x: 1.5,
                },"same1")

                //Third section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.camera.orthographicCamera.position, {
                    y: -.3,
                });
            },

            //All
            "all": ()=> {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section)=>{
                    this.progressWrapper = section.querySelector(".progress-wrapper")
                    this.progressBar = section.querySelector(".progress-bar")

                    if(section.classList.contains("right")){
                        GSAP.to(section,{
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: .6,
                            } 
                        })
                        GSAP.to(section,{
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: .6,
                            } 
                        })
                    }else{
                        GSAP.to(section,{
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: .6,
                            } 
                        })
                        GSAP.to(section,{
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: .6,
                            } 
                        })
                    }
                    GSAP.from(this.progressBar,{
                        scaleY: 0,
                        scrollTrigger:{
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    })

                })


                //Circle Animations



                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })

                //second section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circleSecond.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                }, "same").to(this.room.position, {
                    y: 0.5
                }, "same")


                //Third section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleThird.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })







                //Mini Platform Animations
                                //Third section
                                this.secondPartTimeline = new GSAP.timeline({
                                    scrollTrigger:{
                                        trigger: ".third-move",
                                        start: "center center",
                                        scrub: 0.6, 
                                    }
                                });

                                this.room.children.forEach((child)=>{
                                    if(child.name === "Mini_Floor") {
                                        this.first = GSAP.to(child.position, {
                                            x: -5,
                                            z: 9.3,
                                            duration: 0.3
                                        })
                                    }
                                    if(child.name === "Mailbox") {
                                        this.second = GSAP.to(child.scale, {
                                            x: 1,
                                            y: 1,
                                            z: 1,
                                            ease: "back.out(2)",
                                            duration: 0.3,

                                        })
                                    }
                                    if(child.name === "lamp") {
                                        this.third = GSAP.to(child.scale, {
                                            x: 1,
                                            y: 1,
                                            z: 1,
                                            ease: "back.out(2)",
                                            duration: 0.3,

                                        })
                                    }
                                    if(child.name === "FloorFirst") {
                                        this.fourth = GSAP.to(child.scale, {
                                            x: 1,
                                            y: 1,
                                            z: 1,
                                            ease: "back.out(2)",
                                            duration: 0.3,

                                        })
                                    }
                                    if(child.name === "FloorSecond") {
                                        this.fifth = GSAP.to(child.scale, {
                                            x: 1,
                                            y: 1,
                                            z: 1,
                                            ease: "back.out(2)",
                                            duration: 0.3,

                                        })
                                    }
                                    if(child.name === "FloorThird") {
                                        this.sixth = GSAP.to(child.scale, {
                                            x: 1,
                                            y: 1,
                                            z: 1,
                                            ease: "back.out(2)",
                                            duration: 0.3,

                                        })
                                    }
                                    if(child.name === "dirt") {
                                        this.seventh = GSAP.to(child.scale, {
                                            x: 1,
                                            y: 1,
                                            z: 1,
                                            ease: "back.out(2)",
                                            duration: 0.3,

                                        })
                                    }
                                    if(child.name === "flower1") {
                                        this.eighth = GSAP.to(child.scale, {
                                            x: 1,
                                            y: 1,
                                            z: 1,
                                            ease: "back.out(2)",
                                            duration: 0.3,

                                        })
                                    }
                                    if(child.name === "flower2") {
                                        this.ninth = GSAP.to(child.scale, {
                                            x: 1,
                                            y: 1,
                                            z: 1,
                                            ease: "back.out(2)",
                                            duration: 0.3,

                                        })
                                    }

                                })

                                this.secondPartTimeline.add(this.first);
                                this.secondPartTimeline.add(this.second);
                                this.secondPartTimeline.add(this.third);
                                this.secondPartTimeline.add(this.fourth);
                                this.secondPartTimeline.add(this.fifth);
                                this.secondPartTimeline.add(this.sixth);
                                this.secondPartTimeline.add(this.seventh);
                                this.secondPartTimeline.add(this.eighth);
                                this.secondPartTimeline.add(this.ninth);
            }
              
          }); 

            }

    resize() { }
 
    update(){ 

    }

}