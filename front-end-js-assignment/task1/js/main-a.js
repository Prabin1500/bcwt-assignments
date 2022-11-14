// Put code of task A here
const element = document.querySelector("main");

const article = element.querySelector("article");

const header = article.querySelector("header");
const figure = article.querySelector("figure");
const text = article.querySelector("p");

element.innerHTML += `
    <article> 
        <header>
            <h2>${header.querySelector("h2").innerHTML}</h2>
        </header>
        <figure> 
            <img src = "${figure.querySelector("img").src}">
            <figcaption>${figure.querySelector("figcaption").innerHTML} </figcaption>
        </figure>
        
        <p>${text.innerHTML} </p>
    </article>
    
`;
