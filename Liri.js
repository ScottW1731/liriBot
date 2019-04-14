require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var OMDB = require('omdb');
var Spotify = require('node-spotify-api');
var Bandsintown = require('bandsintown');
var request = require('request');
// require modules
var argument = process.argv;
var action = process.argv[2];
var input = ''
// https://www.npmjs.com/package/omdb
// https://www.npmjs.com/package/bandsintown
// https://www.npmjs.com/package/node-spotify-api

// else if(argument === "concert-this"){
//   getBandsintown();
// } 
// else if (argument === "do-what-it-says"){
//     getTxt();
// }

// 
function getInput(){
  var input = '';
  for(var i =3 ; i< argument.length; i++){
    if(i> 2 && i < argument.length){
      input = argument[i] + ' ';
    } 
    return input;
  }
}


// function expression// 
var getMovies = function(){
  var inputMovies = getInput();
if (!inputMovies){
  inputMovies = "Mr.Nobody"
}

  var queryURL = "http://www.omdbapi.com/?apikey=" + process.env.OMDB + "&t=" + inputMovies;
 request(queryURL, function(error, response, body){
   if(!error && response.statusCode === 200){

    //Through this logic we catch the value for the rottenTomatoes property (that is comming from the body)
    // I started by declaring an empty string in case that there is not value
     var rottenTomatoes = '';
     // Second, I run a array.find method over the ratings property, 
     // so if there is a rotten tomatoes property inside of ratings I want to storage it inside of rottenTomatoesData and Parse it.
     var rottenTomatoesData = JSON.parse(body).Ratings.find(function(rating){
       rating.Source === 'Rotten Tomatoes'
     })

     //If my rottenTomatoesData has a value inside I want to stablish the value of my rottenTomatoes from line 85 as that value.
    if(rottenTomatoesData){
      rottenTomatoes +=  'Rotten Tomatoes: ' + rottenTomatoesData.Value + '\n'
    }

    
    var movieInfo = '\n' +
    'Title: ' +
    JSON.parse(body).Title +
    '\n' +
    'Release Year: ' +
    JSON.parse(body).Year +
    '\n' +
    'IMDB Rating: ' +
    JSON.parse(body).imdbRating +
    '\n' +
    rottenTomatoes +
    'Country: ' +
    JSON.parse(body).Country +
    '\n' +
    'Language: ' +
    JSON.parse(body).Language +
    '\n' +
    'Plot: ' +
    JSON.parse(body).Plot +
    '\n' +
    'Actors: ' +
    JSON.parse(body).Actors +
    '\n';

    console.log(movieInfo)

   }
 })
}



var getSpotifySongs = function(input){
  var songName = '';
  // this input is optional here
  // use output instead of input
  // then run normal function
  // if not change to input
  // 
  if(!input){
    songName = getInput();
  } else{
    songName = input
  }
  var sKeys = keys.spotify;
  var spotify= new Spotify(sKeys)
  spotify.search({ type: 'track', query: songName}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
  var songInfo =    '\n' +
  'Artist Name: ' +
  data.tracks.items[0].artists[0].name +
  '\n' +
  'Song Name: ' +
  data.tracks.items[0].name +
  '\n' +
  'Spotify URL: ' +
  data.tracks.items[0].external_urls.spotify +
  '\n' +
  'Album Name: ' +
  data.tracks.items[0].album.name +
  '\n';
  
  console.log(songInfo);
    });
  }
//----------------------
//print random.txt Function
//----------------------
var getTxt = function () {
  //This function is complement other functions.
  fs.readFile('random.txt', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    


    var input = "";
    var output = data.split(',');
    // // if there is output my data is gonna be split in commas
    // //In case that our random.txt have 2 parameters, we use them to run another function, in this case spotify.
    input = output[1];
    console.log(output[0])
    console.log(input)
    // // input will become output
    if (output[0] === 'spotify-this-song') {
      getSpotifySongs(input) 
    } 
    
    //else if (output[0] === 'movie-this') {
    //   getMovies(input);
    // }
    // } else if (output[0] === 'my-tweets') {
    //   getconcert();
    // }
  });
}
// 
if(action === "spotify-this-song"){
  getSpotifySongs();
} else if (action === "movie-this"){
  getMovies();
} else if (action === 'do-what-it-says'){
  getTxt();
}