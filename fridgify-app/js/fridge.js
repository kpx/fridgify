var Fridge = (function (fridge) {
    
	//var PLAYLIST_NAME = "frigdename1";
	var sp = getSpotifyApi();

    var models = sp.require('$api/models');


	fridge.addMagnet = function(name, uri, target) {

		var newName = cropName(name);
		var magnet = '<li data-uri="' + uri + '">' + newName + '</li>';
		$( target ).append(magnet);
	};

	fridge.loadTracks = function(tracks) {

		//var words = ["hej", "how", "bow"];
		tracks.forEach(function(track){

			fridge.addMagnet(track.name, track.uri, '#poetryHolder');
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

	var getMagnetTexts = function() {
		
		var res = [];
		var elems = $( "#poetryHolder li" );
		$.each(elems, function(e){
			var magnettext = $(this).text();
			res.push(magnettext);
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


		var uris = getUris();
		uris.forEach(function(e){
			//add each uri to playlist
			playlist.add(e);
		});

	};

	var cropName = function(words) {
		return words.split(" ")[0];
	}

	var createPlaylistName = function() {
		var magnettexts = getMagnetTexts();
		var textres = "";

		magnettexts.forEach(function(e){
			textres = textres + e + " ";
		})
		return $.trim(textres);
	};

	return fridge;

} (Fridge || {}));
