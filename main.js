

var request;

var movieSearch = document.getElementById("movieName");

var output = document.getElementById("moviesContainer");

var request = `https://api.themoviedb.org/3/discover/movie?api_key=ef3c6e234a561a62689d59b053e4985b&language=en-US&region=US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=1000`;    

fetchData(request);

//----------------  ES-6 way ---------------------------- //
var page = 1;
function getData(){
    var movieName = movieSearch.value;
    request = `https://api.themoviedb.org/3/search/movie?api_key=ef3c6e234a561a62689d59b053e4985b&language=en-US&query=${movieName}&${page}&include_adult=false`
    fetchData(request);
}

async function fetchData(request){
    

        
        // let initialResponse = await fetch(initialRequest);
        // let initialData = await initialResponse.json();
        // console.log(initialData);
    
        let response = await fetch(request);
        let data = await response.json();
        console.log(data);


        var resultsList = data.results;
            
            output.innerHTML = "";
            
            for (var i=0; i < resultsList.length; i++){
                
                var movieTitle = resultsList[i].title;
                var summary = resultsList[i].overview;
                var rating = resultsList[i].vote_average;
                var movieYear = resultsList[i].release_date.substring(0,7);
                var poster = resultsList[i].poster_path;
                
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
            
    //         var resultsList = movies.results;
            
    //         output.innerHTML = "";
            
    //         for (var i=0; i < resultsList.length; i++){
    //             var movieTitle;
    //             movieTitle = resultsList[i].original_title;
    //             console.log(movieTitle); 
    //             var poster;
    //             poster = resultsList[i].poster_path;
    //             console.log(poster);
    //             output.innerHTML += `<div>
    //                                     <img src = "https://image.tmdb.org/t/p/w200${poster}"/>
    //                                    <p>${movieTitle}</p> 
    //                                 </div>`;
    //         }
            
            
            // console.log(resultsList);
            // console.log(location);
            // var city = location.name;
            // var country = location.sys.country;
    
            // console.log(movies);
            // console.log(celcius);
    
    
        
    //     }
    // };

    // xhttp.open("GET", request, true);
    // xhttp.send();

    
    
