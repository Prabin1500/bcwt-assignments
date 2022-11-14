"use strict";

const balloon = document.querySelector("p");

let minSize = 40;
let maxSize = 200;
let currentSize = minSize;

balloon.style.fontSize = minSize + "px";
balloon.style.textAlign = "center";


const keyListner = (event) => {
    event.preventDefault();
    if(currentSize >= maxSize){
        balloon.innerText = "💥";
    }else{
        if(event.key === "ArrowUp"){
            currentSize *= 1.1;
            console.log(currentSize);
        }else if(event.key === "ArrowDown"){
            if(!(currentSize <= minSize)){
                currentSize *= 0.9;
                console.log(currentSize);
            }
            
        }
    }
    balloon.style.fontSize = currentSize + "px";
}

document.addEventListener("keydown",keyListner);