require("dotenv").config();

var axios = require("axios");

var moment = require("moment");

var inquirer = require("inquirer");

var Spotify = require('node-spotify-api');

var fs = require("fs");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// Function that starts the inquirer prompt
function inquirerLoop() {

    inquirer.prompt([

        {
            type: "list",
            name: "selector",
            message: "What would you like LIRI to do?",
            choices: ["Find concert info for a band", "Search Spotify for a song", "Find details about a movie", "Do what it says", "All done, thanks LIRI"]
        }

    ]).then(function (user) {
        switch (user.selector) {
            case "Find concert info for a band":
                bandsInTown();
                break;
            case "Search Spotify for a song":
                spotifyQuery();
                break;
            case "Find details about a movie":
                omdbQuery();
                break;
            case "Do what it says":
                doWhatItSays();
        }
    });

};


// Function that calls the bandsintown api 
function bandsInTown() {

    inquirer.prompt([
        {
            type: "input",
            name: "band",
            message: "Please type the bands Name"
        }
    ]).then(function (bandInput) {

        var bandNameRaw = bandInput.band;

        var bandName = bandNameRaw.split(',').join('+');

        var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

        // Axios call to the BiT api
        axios.get(queryUrl).then(
            function (response) {
                for (i = 0; i < response.data.length; i++) {
                    console.log("\n")
                    console.log("Venue: " + response.data[i].venue.name);
                    console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);

                    // Formating the date the specified way
                    var dateFormat = "MM/DD/YYYY";

                    var rawDate = response.data[i].datetime;

                    var date = rawDate.substring(0, rawDate.indexOf("T"));

                    var convertedDate = moment(date, "YYYY/MM/DD").format(dateFormat);

                    console.log("Date: " + convertedDate);
                }

            }
        );
        inquirerLoop();
    });

};

// Function that calls the spotify api
function spotifyQuery() {

    inquirer.prompt([
        {
            type: "input",
            name: "song",
            message: "Please type the song name"
        }
    ]).then(function (songInput) {
        var song = songInput.song;



        spotify
            .search({ type: 'track', query: song })
            .then(function (response) {
                console.log("\nArtist(s): " + response.tracks.items[0].artists[0].name);
                console.log("\nSong: " + response.tracks.items[0].name);
                console.log("\nPreview Link: " + response.tracks.items[0].preview_url);
                console.log("\nAlbum: " + response.tracks.items[0].album.name);

            })
            .catch(function (err) {
                console.log(err);
            });
        inquirerLoop();
    });
};


// Function that calls the omdb api
function omdbQuery() {

    inquirer.prompt([
        {
            type: "input",
            name: "movie",
            message: "Please type the movie name"
        }
    ]).then(function (movieInput) {
        if (movieInput.movie > 0) {

            var movie = movieInput.movie;

            movieName = movie.split(',').join('+');

            var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

            axios.get(queryURL).then(
                function (response) {
                    console.log("\nMovie Title: " + response.data.Title + "\nYear Released: " + response.data.Year
                        + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value
                        + "\nCountry where movie was produced: " + response.data.Country + "\nLanguage: " + response.data.Language
                        + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
                }
            );
            inquirerLoop();
        } else {
            // Searches Mr. Nobody if nothing is typed
            var queryURL = "https://www.omdbapi.com/?t=" + "Mr. Nobody" + "&apikey=trilogy";

            axios.get(queryURL).then(
                function (response) {
                    console.log("\nMovie Title: " + response.data.Title + "\nYear Released: " + response.data.Year
                        + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value
                        + "\nCountry where movie was produced: " + response.data.Country + "\nLanguage: " + response.data.Language
                        + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
                }
            );
            inquirerLoop();
        }
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        song = data.split(',').pop();

        spotify
            .search({ type: 'track', query: song })
            .then(function (response) {
                console.log("\nArtist(s): " + response.tracks.items[0].artists[0].name);
                console.log("\nSong: " + response.tracks.items[0].name);
                console.log("\nPreview Link: " + response.tracks.items[0].preview_url);
                console.log("\nAlbum: " + response.tracks.items[0].album.name);

            })
            .catch(function (err) {
                console.log(err);
            });
        inquirerLoop();
    })
}

inquirerLoop();

debugger;






