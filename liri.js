require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require('./keys.js');
// var inquirer = require('inquirer'); In case I used inquirer
var fs = require('fs');
var nodeArgs = process.argv;
var liri = nodeArgs[2];
var spotify = new Spotify(keys.spotify);

var liriArg = "";
for (var i = 3; i < nodeArgs.length; i++) {
  liriArg += nodeArgs[i] + " ";
}


  function tweets() {
    var client = new Twitter(keys.twitter);
    var params = {screen_name: 'LH727945284'};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) {
        return console.log(error);
      } else {
        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].created_at);
          console.log(tweets[i].text);
          console.log("=======================")
        }
      }
    });
  }

  function spotifyThis() {

    spotify.search({ type: "track", query: liriArg }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
        
      }
   
    console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("Preview URL: " + data.tracks.items[0].preview_url);
    console.log("=======================")

    });

  }

  function movieThis() {
    
    var queryUrl = "http://www.omdbapi.com/?t=" + liriArg + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
    
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Rating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    });
  }

  // function doIt() {
  //   fs.readFile("random.txt", "utf8", function(error, data)) {
  //       data = data.split(',');
  //   }

  // }


  if (liri === "my-tweets") {
    tweets();
  } else if (liri === "spotify-this-song") {
    spotifyThis();
  } else if (liri === "movie-this") {
    movieThis();
  } else if (liri === "do-what-it-says") {
    doIt();
  }


