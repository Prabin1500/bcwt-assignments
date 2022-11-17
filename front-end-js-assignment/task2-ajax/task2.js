'use strict';

const apiUrl = 'https://api.tvmaze.com/search/shows?q=';
//get reference to form
const form = document.querySelector('#search-form');
const button = form.querySelector('button');
const input = form.querySelector('input');
const results = document.querySelector('#results');

button.addEventListener('click', (event) => {
    //do not submit the form to anywhere (no page refresh)
    event.preventDefault();
    //prevent the genric event listner at the bottom
    event.stopPropagation();
    if(input.value.length > 1){
        getTvSeriesData(input.value);
    }
});


const renderResults = (data) => {
    //clear existing results before appending new result
    results.innerHTML = '';

    //loop through all search results
    for(let i=0; i<data.length; i++){
        
        const h3 = document.createElement('h3');
        h3.textContent = "Name : " + data[i].show.name;

        const a = document.createElement('a');
        a.href = data[i].show.officialSite;
        a.innerHTML = a.href;

        const summary = document.createElement("p");
        summary.innerHTML = data[i].show.summary;

        const genre = document.createElement("p");
        //genre.textContent = "Genre: " + data[i].show.genres;

        for(let j = 0; j<data[i].show.genres.length ; j++){

            if(data[i].show.genres.length < 2){
                genre.textContent = data[i].show.genres[j] ; 
            }else{
                if(j == data[i].show.genres.length - 1 ){
                    genre.textContent += data[i].show.genres[j] ;
                }else{
                    genre.textContent += data[i].show.genres[j] + " | " ;
                }
               
            }
             
                   
        };
        
        const language = document.createElement('p');
        language.textContent = "Language : " +  data[i].show.language;

        const img = document.createElement('img');
        img.src = data[i].show.image.medium;

        const line = document.createElement('hr');

        
        results.append(h3);
        results.append(a);
        results.append(genre);
        results.append(summary);
        results.append(language);
        results.append(img);
        results.append(line);
        
    }
} ;

const getTvSeriesData = async (name) => {
    try{
        const response = await fetch(apiUrl + name);
        const data = await response.json();
        console.log('results :', data);
        renderResults(data);
    }catch(error){
        console.error('Network error ',error);
    }
    
};


