var Fridge = (function (fridge) {
    
	fridge.add_magnet = function(name) {
		var magnet = '<li>' + name + '</li>';
		$( "#sortable2" ).append(magnet);
	};
	return fridge;

} (Fridge || {}));
