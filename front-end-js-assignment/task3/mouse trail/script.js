"use strict";

let dotArrayValue = [];

const createTrail = () =>{
    for (let i = 0; i<10; i++){
        const dot = document.createElement("div");
        dot.className = "trail";
        dotArrayValue.push(dot);
    }
}

let currentDot = 0;

const mouseTrail = (event) => {
    
    let dot = dotArrayValue[currentDot];
    dot.style.left = (event.pageX) + "px";
    dot.style.top= (event.pageY) + "px";   
    document.body.appendChild(dot);
    currentDot = (currentDot + 1) % dotArrayValue.length;   
};


createTrail();

document.addEventListener('mousemove', mouseTrail);