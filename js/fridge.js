var Fridge = (function (fridge) {
    
	var PLAYLIST_NAME = "frigdename1";
	var sp = getSpotifyApi();

    var models = sp.require('$api/models');


	fridge.addMagnet = function(name, uri, target) {
		var magnet = '<li data-uri="' + uri + '">' + name + '</li>';
		$( target ).append(magnet);
	};



	fridge.loadPlaylist = function(playlistUri) {

	};

	fridge.loadWords = function(words) {
		var words = ["hej", "how", "bow"];
		words.forEach(function(word){
			fridge.addMagnet(word, '', '#poetryHolder');
		});
	}

		//Gets the uri from poetry in order
	var getUris = function() {
		
		var res = [];
		var elems = $( "#poetryHolder li" );
		$.each(elems, function(e){
			var uri = $(this).data('uri');
			res.push(uri);
		});


		return res;
	};

	fridge.createPlaylistWithSongs = function() {
		//create playlist
		var name = createPlaylistName();
		//var playlist = models.Playlist.fromURI('spotify:user:magerleagues:playlist:3S0u0nTWj4P2bF5oq0DzLl');
		//new api??
		//var playlist = models.Playlist.create(name).done(function(){

		//});
		
		var playlist = new models.Playlist(name);


		// var uris = getUris();
		// uris.forEach(function(e){
		// 	//add each uri to playlist
		// 	playlist.add(e);
		// });

	};

	var createPlaylistName = function() {
		return PLAYLIST_NAME;
	};

	return fridge;

} (Fridge || {}));
