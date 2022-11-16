"use strict";

let dotArrayValue = [];

const createTrail = () =>{
    for (let i = 0; i<15; i++){
        const dot = document.createElement("div");
        dot.className = "trail";
        dotArrayValue.push(dot);
    }
}

const mouseTrail = (event) => {

    for (let i = 0; i < dotArrayValue.length; i++) {

        dotArrayValue[i].style.left = (event.pageX) + "px";
        dotArrayValue[i].style.top= (event.pageY) + "px";   
        document.body.appendChild(dotArrayValue[i]);
        
    }  
};

createTrail();

document.addEventListener('mousemove', mouseTrail);