(function() {
    function SongPlayer() {
        /**
         * @desc Creates the actual SongPlayer Object to attach the subsequent methods
         * @type {Object}
         */
        var SongPlayer = {};

        /**
         * @desc Current song object
         * @type {Object}
         */
        var currentSong = null;

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /**
         * @function PlaySong
         * @desc Plays the current Buzz object and sets the playing attribute to true
         * @param {Object} song 
         */
        var playSong = function(song) {
            song.playing = true;
            currentBuzzObject.play();
        };

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };

        /**
         * @function play
         * @desc Play logic for the song player
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);

            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
         * @function pause
         * @desc Pause logic for the song player
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };


        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();