


let movieList= JSON.parse(localStorage.getItem("movieList"));
console.log(movieList);

let output = document.getElementById("moviesContainer");

// movie1 = JSON.parse(localStorage.getItem("movieList"))[0]

// console.log(movie1);



for(let i =0; i<movieList.length;i++){

        let movieTitle = movieList[i].title;
		let summary = movieList[i].summary;
		let rating = movieList[i].rating;
		let releaseDate = movieList[i].release;
        let poster = movieList[i].poster;

    output.innerHTML += `<div class="card m-2">
        <img class="card-img-top" alt="Card img ${movieTitle}" src="https://image.tmdb.org/t/p/w200${poster}"/>
        <div class="rating">${rating}</div> 
            <div class="movieTitle">
                <p>${movieTitle}</p>
            </div>
        <div class = "card-body">
            <div class="container overflow-auto">
                <h6>Summary:</h6>    
                <p class="card-text">${summary}</p>  
            </div>
        </div>
    </div>`;


}


