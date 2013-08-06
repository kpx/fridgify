var sp = getSpotifyApi();
var models = sp.require('$api/models');

var SpotSearch = (function (spotsearch) {
    spotsearch.func = function() {
    	var searchtext = $( "#searchtext").val();
        var search = new models.Search(searchtext);
        search.localResults = models.LOCALSEARCHRESULTS.APPEND;

        var searchHTML = document.getElementById('results');
        searchHTML.innerHTML = ""

        search.observe(models.EVENT.CHANGE, function() {
            var resultsTracks = search.tracks;
            var fragment = document.createDocumentFragment();

            for (var i=0; i<resultsTracks.length; i++){
                var link = document.createElement('li');
                var a = document.createElement('a');
                a.href = resultsTracks[i].name; 
                a.href = resultsTracks[i].uri;
                link.appendChild(a);
                a.innerHTML = resultsTracks[i].name;
                fragment.appendChild(link);
             
            }

            searchHTML.appendChild(fragment);
        });

        search.appendNext();
	};
	return spotsearch;

} (SpotSearch || {}));