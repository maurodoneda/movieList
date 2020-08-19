

let movieSearch = document.getElementById("movieName");
let output = document.getElementById("moviesContainer");
let loadMore = document.getElementById("loadMore");
let page = 1;
let clearScreen = true;
let totalPages;
let initialRequest = `https://api.themoviedb.org/3/discover/movie?api_key=ef3c6e234a561a62689d59b053e4985b&language=en-US&region=US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=3000`;

printMoviesCards(initialRequest, clearScreen);




//----------------  ES-6 way usign asyncronous functions and fetch API ---------------------------- //

function requestByName(name, page) {
	return `https://api.themoviedb.org/3/search/movie?api_key=ef3c6e234a561a62689d59b053e4985b&language=en-US&query=${name}&page=${page}&include_adult=false`;
}

function requestNewPage(page) {
	return `https://api.themoviedb.org/3/discover/movie?api_key=ef3c6e234a561a62689d59b053e4985b&language=en-US&region=US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${page}&vote_count.gte=1000`;
}

//---------------------- event case the user change the search input --------------- //

function getMoviesByName() {
	page = 1;
	clearScreen = true;
	let movieName = movieSearch.value;
	let nameRequest = requestByName(movieName, page);
	printMoviesCards(nameRequest, clearScreen);
}

//-------------      Load more data        -------------- //

loadMore.addEventListener("click", function () {
	page++;
	let input = movieSearch.value;
	if (input == "") {
		request = requestNewPage(page);
		printMoviesCards(request);
	} else {
		clearScreen = false;
		request = requestByName(input, page);
		printMoviesCards(request, clearScreen);
	}
});

// ------------------- fetching data async and printing cards to screen ------------------------ //

async function printMoviesCards(request, clearScreen) {
	let response = await fetch(request);
	let data = await response.json();
	console.log(data);
	let resultArray = data.results;

	if (clearScreen) {
		output.innerHTML = "";
	}

	for (let i = 0; i < resultArray.length; i++) {
		let movieTitle = resultArray[i].title;
		let summary = resultArray[i].overview;
		let rating = resultArray[i].vote_average;
		let movieYear = resultArray[i].release_date.substring(0, 7);
		let poster = resultArray[i].poster_path;
		let movieId = resultArray[i].id;

		console.log(movieTitle);

		output.innerHTML += `<div class="card m-2">
                                            <div class="imgWrap" id="playTrailer" onclick = "watchTrailer(${movieId})" type="button">
                                                <img class="card-img-top" alt="Card img ${movieTitle}" src="https://image.tmdb.org/t/p/w200${poster}"/>
                                                <div class="clickToSee"><i class="fas fa-play-circle fa-2x"></i><br> Click to watch Trailer</div>
                                            </div>
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
                                            <div class="addTxt">add to watchlist</div> 
                                              <a type="button" class="action addBtn" onclick = "addToWatchList(${movieId})"><i class="fas fa-plus-circle fa-2x"></i></a>
                                              <br>
                                              <a type="button" class="action playBtn" id="playTrailer" onclick = "watchTrailer(${movieId})"><i class="fas fa-play-circle fa-2x"></i></a>
                                              <div class="trailerTxt">watch trailer</div> 
                                            </div>
                                    </div>`;
	}
}





// ----------- Get the video from Yoube and open a Trailer container ---------------  //

let myMoviesArray = localStorage.getItem("movieList");
myMoviesArray = myMoviesArray ? JSON.parse(myMoviesArray) : [];

async function addToWatchList(movieId) {
	let requestById = `https://api.themoviedb.org/3/movie/${movieId}?api_key=ef3c6e234a561a62689d59b053e4985b&language=en-US`;
	let response = await fetch(requestById);
	let data = await response.json();
	// console.log(data);

	let movieObj = {
		title: `${data.title}`,
		poster: `${data.poster_path}`,
		rating: `${data.vote_average}`,
		release: `${data.release_date.substring(0, 7)}`,
		summary: `${data.overview}`,
		id: movieId,
	};
	myMoviesArray.push(movieObj);
	localStorage.setItem("movieList", JSON.stringify(myMoviesArray));
	console.log(myMoviesArray);
	alert(`${movieObj.title} has been added to your watchList succesfully!`);
}


// ----------- Get the video from Yoube and open a Trailer container ---------------  //


let trailerBox = document.getElementById("trailerBox");
let trailerContainer = document.querySelector(".trailerContainer");

async function watchTrailer(movieId) {
	let requestVideo = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ef3c6e234a561a62689d59b053e4985b&language=en-US`;
	let response = await fetch(requestVideo);
	let data = await response.json();
	let results = data.results;
	console.log(results);

	let video = {
		key: `${results[0].key}`,
		site: `${results[0].site}`,
	};

	trailerBox.innerHTML = `
        <div class="videoWrapper">
        <iframe width="965" height="401" src="https://www.youtube.com/embed/${video.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`;

	trailerContainer.style.display = "block";
	let bodyOverlay = document.getElementById("bodyOverlay");
	bodyOverlay.style.display = "block";
}


// ----------- function to close the Trailer container ---------------  //

let closeBtn = document.getElementsByClassName("closeBtn");

for (let i = 0; i < closeBtn.length; i++) {
	closeBtn[i].addEventListener("click", function () {
		trailerContainer.style.display = "none";
		bodyOverlay.style.display = "none";
	});
}














//----------------  Old way of fetching data---------------------------- //

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
