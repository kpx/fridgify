var Fridge = (function (fridge) {
    
	fridge.addMagnet = function(name, uri) {
		var magnet = '<li data-uri="' + uri + '">' + name + '</li>';
		$( "#magnetHolder" ).append(magnet);
	};

	//Gets the uri from poetry in order
	fridge.getUris = function() {
		
		var res = [];
		var elems = $( "#poetryHolder li" );
		$.each(elems, function(e){
			var uri = $(this).data('uri');
			res.push(uri);
		});


		return res;
	};

	return fridge;

} (Fridge || {}));
