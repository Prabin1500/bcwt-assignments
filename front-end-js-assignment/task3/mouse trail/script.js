"use strict";

let dotArrayValue = [];


for (let i = 0; i<15; i++){
    const dot = document.createElement("div");
    dot.className = "trail";
    
    dotArrayValue.push(dot);
    document.body.appendChild(dot);
}

let newDot = 0;

const mouseTrail = (event) => {
    dotArray[newDot].style.left = (event.pageX) + "px";
    dotArray[newDot].style.top= (event.pageY) + "px";
  
    newDot = (newDot + 1)% dotArray.length;
}

document.addEventListener('mousemove', mouseMoving);