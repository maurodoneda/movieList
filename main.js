

var request;

var movieSearch = document.getElementById("movieName");
var output = document.getElementById("moviesContainer");


// movieSearch.addEventListener("keydown",({key}) => {
//     if (key === "Enter") {
//         event.preventDefault();
//         loadData();
//     }
// })

function loadData(){

    var movieName = movieSearch.value;
    
    request = `https://api.themoviedb.org/3/search/movie?api_key=ef3c6e234a561a62689d59b053e4985b&query=${movieName}`
  

    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function (){
        if(xhttp.readyState == 4 || xhttp.readyState == 200){
            var dataResponse = xhttp.responseText;
            // console.log(xhttp.responseText);
            
            var movies = JSON.parse(dataResponse);
            
            var resultsList = movies.results;
            
            output.innerHTML = "";
            
            for (var i=0; i < resultsList.length; i++){
                var movieTitle;
                movieTitle = resultsList[i].original_title;
                console.log(movieTitle); 
                var poster;
                poster = resultsList[i].poster_path;
                console.log(poster);
                output.innerHTML += `<div>
                                        <img src = "https://image.tmdb.org/t/p/w200${poster}"/>
                                       <p>${movieTitle}</p> 
                                    </div>`;
            }
            
            
            // console.log(resultsList);
            // console.log(location);
            // var city = location.name;
            // var country = location.sys.country;
    
            // console.log(movies);
            // console.log(celcius);
    
    
        
        }
    };
    
    xhttp.open("GET", request, true);
    xhttp.send();
    
    
}