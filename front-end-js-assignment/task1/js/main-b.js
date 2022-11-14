// Put code of task B here
const element = document.querySelector("main");

const article = element.querySelector("article");

const header = article.querySelector("header");
const figure = article.querySelector("figure");
const text = article.querySelector("p");

const body = document.createElement("article");

body.innerHTML = `
        <header>
            <h2>${header.querySelector("h2").innerHTML}</h2>
        </header>
        <figure> 
            <img src = "${figure.querySelector("img").src}">
            <figcaption>${figure.querySelector("figcaption").innerHTML} </figcaption>
        </figure>
        
        <p>${text.innerHTML} </p> 
`;

element.append(body);


