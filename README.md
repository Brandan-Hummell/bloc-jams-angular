# README
# BlocJams

BlocJams is a JavaScript based music player application. All of the image assets were made by Bloc (see below for offical acknowledgment), but I am responsible for coding and testing the music player functionality. 

There are two versions on my GitHub. This version is built primarily using the AngularJS framework. 

This particular application does not have a way to import and save music to a data base - the provided music serves as a way to test functionality. BlocJams uses the Buzz! library as a lightweight song management solution. 

One of the greatest challenges in this project was the music player bar. The song seek functionality and filling the seek bar to match the progress in the song were especially fantastic learning experiences.

## Getting Started

These instructions will help you set up BlocJams on your local machine for development and testing purposes. 

### Prerequisites & Installation

#### Pull Down the Code

Start by pulling the repository:

```
$ git add remote origin https://github.com/Brandan-Hummell/bloc-jams-angular.git
$ git pull 
$ git pull origin master
```

#### Configuration

The project uses Node to run a JS server in development. This will be important when we want to use urls /album or /collection instead of the basic album.html or collection.html.

Install the project dependencies by running:

```
$ npm install
```

#### Run the Application

Run the application server:

```
$ npm start
```

The server will start up. To stop the server, press `cntrl + c`.

## Built With

* [AngularJS](https://angularjs.org/) - JavaScript Framework
* [Node.js](https://nodejs.org/en/)   - JavaScript Runtime
* [Buzz!](http://buzz.jaysalvat.com/) - Audio Management Library

## Authors

* **Brandan Hummell** Front-End Developer - [GitHub](https://github.com/Brandan-Hummell)

* **Bloc** Checkpoint Coordinator - [GitHub](https://github.com/Bloc/)  

See also the list of [contributors](https://github.com/Brandan-Hummell/bloc-jams/graphs/contributors) who participated in this project.

## Acknowledgments

* [Bloc](https://github.com/Bloc/) - Provided image assets, user stores, and layout goals

