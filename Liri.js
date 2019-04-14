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


// 
if(argument === "spotify-this-song"){
    getSpotifySongs();
} else if(argument === "concert-this"){
    getBandsintown();
} else if (argument === "movie-this"){
    getMovies();
}else if (argument === "do-what-it-says"){
    getTxt();
}

// 
function getInput(){
  var input = '';
  for(var i =3 ; i< argument.length; i++){
    if(i> 2 && i < argument.length){
      input = input + '' + argument[i];
    } 
    return input;
  }
}


// function expression

getSpotifySongs = function(songName){

    // here
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

getSpotifySongs(getInput());

// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// var pick = function(caseData, functionData){
//     switch(caseData){
//         case "spotify-this-song":
//         getSpotifySongs(functionData)
//         break;
//         default:
//         console.log("liri.exe has failed you")
//     }
// }

// function({ 
//     type: 'artist OR album OR track', 
//     query: 'My search query', 
//     limit: 20 
// }, callback);

