

let movieList= JSON.parse(localStorage.getItem("movieList"));
console.log(movieList);

let output = document.getElementById("moviesContainer");


printMoviesCards(movieList);

function printMoviesCards(movieList){

    for(let i =0; i<movieList.length;i++){

            let movieTitle = movieList[i].title;
            let summary = movieList[i].summary;
            let rating = movieList[i].rating;
            let releaseDate = movieList[i].release;
            let poster = movieList[i].poster;
            let key = movieList[i].key = i;

        output.innerHTML += `<div class="card m-2" id=${key}>
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
            <div class="container cardActions">
            <div class="removeTxt">Remove from watchlist</div> 
              <a type="button" class="action removeBtn" onclick = "removeFromWatchList(${key})"><i class="fas fa-minus-circle fa-2x"></i></a>
              <br>
            </div>

        </div>`;


    }

}

console.log(movieList);

function removeFromWatchList(id){
    
    for (var i =0; i< movieList.length; i++) {
        
        if (movieList[i].key == id) {
            movieList.splice(i, 1);
            document.getElementById(id).remove();
        }
    }

    let updatedMovieList = JSON.stringify(movieList);
    localStorage.setItem("movieList", updatedMovieList);

}





