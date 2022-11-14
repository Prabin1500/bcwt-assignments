'use strict';
console.log("Hello");

const figCaptionElement = document.querySelector('figcaption');
const imgElement = document.querySelector('img');

const getData = async () =>{
    const response = await fetch('pics.json');
    console.log(response);
    const data = await response.json();
    console.log(data);
    figCaptionElement.innerText = data[0].name;
    imgElement.src = data[0].url;
    imgElement.alt = data[0].alt;
};

getData();


//generic event handling
document.addEventListener('click', (event) =>{
    console.log('Mouse clicked somewhere on the page,', event);
});
