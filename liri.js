require("dotenv").config();

var axios = require("axios");

var moment = require("moment");

var inquirer = require("inquirer");

var keys = require("./keys.js");

// var spotify = new spotify(keys.spotify);

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
                console.log("Nice");
                // inquirerLoop();
            }) 
    }
});

};


function bandsInTown(callback) {

    var bandNameRaw = band;

    var bandName = bandNameRaw.split(',').join('+');


    console.log(bandName);

    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            for (i = 0; i < 10; i++) {
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
}




