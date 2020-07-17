let movieSearch = document.getElementById("movieName");
let output = document.getElementById("moviesContainer");
let loadMore = document.getElementById("loadMore");
let page = 1;
let clearScreen = true;
let totalPages;


let initialRequest = `https://api.themoviedb.org/3/discover/movie?api_key=ef3c6e234a561a62689d59b053e4985b&language=en-US&region=US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=1000`;


printMoviesCards(initialRequest,clearScreen);


//----------------  ES-6 way usign asyncrunous functions and fetch API ---------------------------- //


function requestByName(name,page) {
    return `https://api.themoviedb.org/3/search/movie?api_key=ef3c6e234a561a62689d59b053e4985b&language=en-US&query=${name}&page=${page}&include_adult=false`;
}

function requestNewPage(page){
    return `https://api.themoviedb.org/3/discover/movie?api_key=ef3c6e234a561a62689d59b053e4985b&language=en-US&region=US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${page}&vote_count.gte=1000`;

}


//---------------------- event case the user change the search input --------------- //

function getMoviesByName() {
    page = 1;
    clearScreen = true;
    let movieName = movieSearch.value;
    let nameRequest = requestByName(movieName,page);
    printMoviesCards(nameRequest,clearScreen);
}


//-------------      Load more data        -------------- //

loadMore.addEventListener("click", function () {
    page++;
    let input = movieSearch.value;
    if(input == ""){
        request = requestNewPage(page);
        printMoviesCards(request); 
    } else {
        clearScreen = false;
        request = requestByName(input,page);
        printMoviesCards(request,clearScreen);
    }
    
});
    
 // ------------------- fetching data async and printing to screen ------------------------ //


async function printMoviesCards(request,clearScreen){
        
    let response = await fetch(request);
    let data = await response.json();
    console.log(data);
    let resultArray = data.results;

    if(clearScreen){
        output.innerHTML = "";
    }
    

    for (let i = 0; i < resultArray.length; i++) {
		let movieTitle = resultArray[i].title;
		let summary = resultArray[i].overview;
		let rating = resultArray[i].vote_average;
		let movieYear = resultArray[i].release_date.substring(0, 7);
		let poster = resultArray[i].poster_path;

        console.log(movieTitle);
        

		output.innerHTML += `<div class="card m-2">
                                        <img class="card-img-top" alt="Card img ${movieTitle}" src="https://image.tmdb.org/t/p/w200${poster}"/>
                                        <div class="rating">${rating}</div> 
                                        <div class="movieTitle">
                                        <p>${movieTitle}</p>
                                        </div>
                                        <small class="text-muted release">Release: ${movieYear}</small>
                                        
                                        <div class = "card-body">
                                            <div class="container overflow-auto">
                                            <h6>Summary:</h6>    
                                            <p class="card-text">${summary}</p>  
                                            </div>   
                                            </div>
                                            <div class="container cardActions">
                                                <a href="#" class="action addBtn"><i class="fas fa-plus-circle fa-2x"></i></a>
                                                <br>
                                                <a href="#" class="action playBtn"><i class="fas fa-play-circle fa-2x"></i></a>
                                            </div>
                                    </div>`;
    }
}


//----------------  Old way ---------------------------- //

// movieSearch.addEventListener("keydown",({key}) => {
//     if (key === "Enter") {
//         event.preventDefault();
//         loadData();
//     }
// })

// function loadData(){

//     var movieName = movieSearch.value;

//     request = `https://api.themoviedb.org/3/search/movie?api_key=ef3c6e234a561a62689d59b053e4985b&query=${movieName}`

// var xhttp = new XMLHttpRequest();

// xhttp.onreadystatechange = function (){
//     if(xhttp.readyState == 4 || xhttp.readyState == 200){
//         var dataResponse = xhttp.responseText;
//         // console.log(xhttp.responseText);

//         var movies = JSON.parse(dataResponse);

//         var resultArray = movies.results;

//         output.innerHTML = "";

//         for (var i=0; i < resultArray.length; i++){
//             var movieTitle;
//             movieTitle = resultArray[i].original_title;
//             console.log(movieTitle);
//             var poster;
//             poster = resultArray[i].poster_path;
//             console.log(poster);
//             output.innerHTML += `<div>
//                                     <img src = "https://image.tmdb.org/t/p/w200${poster}"/>
//                                    <p>${movieTitle}</p>
//                                 </div>`;
//         }

// console.log(resultArray);
// console.log(location);
// var city = location.name;
// var country = location.sys.country;

// console.log(movies);
// console.log(celcius);

//     }
// };

// xhttp.open("GET", request, true);
// xhttp.send();
