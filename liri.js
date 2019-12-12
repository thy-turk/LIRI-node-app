require("dotenv").config();

var axios = require("axios");

var moment = require("moment");

var inquirer = require("inquirer");

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

inquirerLoop();

function inquirerLoop() {

inquirer.prompt([

    {
        type: "list",
        name: "selector",
        message: "What would you like LIRI to do?",
        choices: ["Find concert info for a band", "Search Spotify for a song", "Find details about a movie", "All done, thanks LIRI"]
    }

]).then(function (user) {
    switch (user.selector) {
        case "Find concert info for a band":
            inquirer.prompt([
                {
                    type: "input",
                    name: "band",
                    message: "Please type the bands Name"
                }
            ]).then(function (bandInput) {
                var bandPre = bandInput.band;
                global.band = bandPre
                bandsInTown();
                inquirerLoop();
            })
            break;
        case "Search Spotify for a song":
            inquirer.prompt([
                {
                    type: "input",
                    name: "song",
                    message: "Please type the song name"
                }
            ]).then(function (songInput) {
                var songPre = songInput.song;
                global.song = songPre;
                spotifyQuery();
                // inquirerLoop();
            })
            break;
        case "Find details about a movie":
            inquirer.prompt([
                {
                    type: "input",
                    name: "movie",
                    message: "Please type the movie name",
                    default: "Mr. Nobody"
                }
            ]).then(function (movieInput) {
                var moviePre = movieInput.movie;
                global.movie = moviePre;
                omdbQuery();
                inquirerLoop();
            })
    }
});

};


function bandsInTown() {

    var bandNameRaw = band;

    var bandName = bandNameRaw.split(',').join('+');


    console.log(bandName);

    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            for (i = 0; i < response.data.length; i++) {
                console.log("\n")
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);

                var dateFormat = "MM/DD/YYYY";

                var rawDate = response.data[i].datetime;

                var date = rawDate.substring(0, rawDate.indexOf("T"));

                var convertedDate = moment(date, "YYYY/MM/DD").format(dateFormat);

                console.log("Date: " + convertedDate);
            }
        }
    );
};

function spotifyQuery() {

    spotify
    .search({ type: 'track', query: song})
    .then(function(response) {
        // console.log(JSON.stringify(response, null, 4));
        console.log("\nArtist(s): " + response.tracks.items[0].artists[0].name);
        console.log("\nSong: " + response.tracks.items[0].name);
        console.log("\nPreview Link: " + response.tracks.items[0].preview_url);
        console.log("\nAlbum: " + response.tracks.items[0].album.name);
    })
    .catch(function(err) {
        console.log(err);
    });
};


function omdbQuery() {
    movieName = movie.split(',').join('+');
    
    var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

    axios.get(queryURL).then(
        function (response) {
            console.log("\nMovie Title: " + response.data.Title + "\nYear Released: " + response.data.Year
            + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value
            + "\nCountry where movie was produced: " + response.data.Country + "\nLanguage: " + response.data.Language
            + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
        }
    )
};

debugger;






