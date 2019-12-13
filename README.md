# LIRI-node-app

## What is Liri?
Have you ever forgotten who wrote a song, or who that one actor is in a movie? Maybe you just want to see your favorite bands tour schedule. 
Liri aims to help with this. Liri is a Language Interpretation and Recognition Interface. 
It is able to take in user input and provide information on movies, songs, bands and more!

## App Orginzation 

<details><summary>Flow</summary>
<p>

* The app starts with an inquirer prompt list. The selction from this prompt is then sent to a switch statment which will run the selected function.

##### Concert Choice:
* The user is asked to enter a band name.
* The name is stored in a variable and plugged into an api call using axios.
* The response is logged to the console

##### Spotify Choice: 
* The user is asked to enter a song name.
* The name is stored in a variable and plugged into an api call using the spotify node npm package.
* If no song is entered a default is used.
* The response is logged to the console.

#### Movie Choice: 
* The user is asked to enter a movie name.
* The name is stored in a variable and plugged into an api call using axios.
* If no movie is entered a default is used.
* The response is logged to the console.

#### Do What is Says Choice:
* The random.txt file is read using the file system "fs".
* The info from the file is extracted in a way that is usable.
* The info is run through an api call using axios.
* The response is logged to the console.
</p>
</details>



## Images showing the app working as intended:

<details><summary>Image Proofs</summary>
<p>

#### Shows the concert search functionality:
![App Screenshot](/images/concert-proof.png)

#### Shows the spotify search working with and without an input:
![App Screenshot](/images/spotify-proof.png)

#### Shows the movie search working with and without an input: 
![App Screenshot](/images/movie-proof.png)

#### Shows the "Do What it Says" functionality:
![App Screenshot](/images/do-proof.png)

#### Shows the log.txt file: 
![App Screenshot](/images/log-proof1.png)
![App Screenshot](/images/log-proof2.png)


</p>
</details>

## Technologies used: 
* node.js
* javascript
* npm 

## How to run the app: 
In order to run the app you'll need to clone the files in this repo to your machine. You'll also need your own spotify client ID and secret as mine is hidden.
You'll need to install the following npm packages: axios, moment, node-spotify-api and inquirer. These can be installed using the npm install command
in the terminal whilst in the root folder. Once setup is complete, run the file by typing ```node liri.js``` and inquirer will prompt you from there!

## Roles
I am the only developer who worked on this App.
