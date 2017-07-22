(function() {
    function SongPlayer(Fixtures) {
        /**
         * @desc Creates the actual SongPlayer Object to attach the subsequent methods
         * @type {Object}
         */
        var SongPlayer = {};

        /**
         * @desc the current album object from the fixtures service
         * @type {Object}
         */
        var currentAlbum = Fixtures.getAlbum();

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
         * @function getSongIndex
         * @desc returns the index of the current song in the album. Used for next and previous song buttons.
         * @param {Object} song 
         */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        }


        /**
         * @desc Current song object
         * @type {Object}
         */
        SongPlayer.currentSong = null;


        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };

        /**
         * @function play
         * @desc Play logic for the song player
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);

            } else if (SongPlayer.currentSong === song) {
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
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };


        /**
         * @function previous
         * @desc change the song to the previous song in the album from the player bar
         */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > currentAlbum.songs.length) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };


        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();