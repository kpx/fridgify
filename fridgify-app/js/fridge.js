var Fridge = (function (fridge) {
    
	var MAX_TWIST_DEG = 3;
	var sp = getSpotifyApi();

    var models = sp.require('$api/models');


	fridge.addMagnet = function(name, uri, target) {

		var newName = cropName(name);
		var rand = Math.floor((Math.random()*MAX_TWIST_DEG)+1);
		var neg = Math.floor(Math.random()*2) == 1 ? 1 : -1;

		var rotate = 'rotate(' + neg*rand + 'deg);';
		var style = '-webkit-transform:' + rotate;
		var magnet = '<li style=' + style + '" data-uri="' + uri + '">' + newName + '</li>';
		$( target ).append(magnet);
	};

	fridge.loadTracks = function(tracks) {

		tracks.forEach(function(track){

			fridge.addMagnet(track.name, track.uri, '#poetryHolder');
		});
	}



	fridge.createPlaylistWithSongs = function() {
		//create playlist
		var name = createPlaylistName();
		var playlist = new models.Playlist(name);

		var uris = getUris();
		uris.forEach(function(e){
			//add each uri to playlist
			playlist.add(e);
		});

	};

	fridge.clearPoetry = function() {
		$("#poetryHolder").html("");
	};

	fridge.twistMagnets = function() {
		var magnets = $( "#poetryHolder li" );
		$.each(magnets, function(e){
			var rand = Math.floor((Math.random()*10)+1);
			var rotate = 'rotate('+ rand + 'deg)';
			$(this).css('-webkit-transform', rotate);
		});
	};


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
