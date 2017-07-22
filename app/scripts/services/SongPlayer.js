(function() {
    function SongPlayer(Fixtures) {
        /**
         * @desc Creates the actual SongPlayer Object to attach the subsequent methods
         * @type {Object}
         */
        var SongPlayer = {};

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
         * @function stopSong
         * @desc stops the current song object from playing and sets the song.playing value to null
         * @param {Object} song 
         */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };



        /**
         * @function getSongIndex
         * @desc returns the index of the current song in the album. Used for next and previous song buttons.
         * @param {Object} song 
         */
        var getSongIndex = function(song) {
            return SongPlayer.currentAlbum.songs.indexOf(song);
        }


        /**
         * @desc Current song object
         * @type {Object}
         */
        SongPlayer.currentSong = null;


        /**
         * @desc the current album object from the fixtures service
         * @type {Object}
         */
        SongPlayer.currentAlbum = Fixtures.getAlbum();

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
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
                stopSong(SongPlayer.currentSong);
            } else {
                stopSong(SongPlayer.currentSong);
                var song = Songplayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };


        /**
         * @function next
         * @desc change the song to the next song in the album from the player bar
         */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > SongPlayer.currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                stopSong(SongPlayer.currentSong);
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
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