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
            var results = search.tracks;
            var fragment = document.createDocumentFragment();
            for (var i=0; i<results.length; i++){
                var link = document.createElement('li');
                var a = document.createElement('a');
                a.href = results[i].uri;
                link.appendChild(a);
                a.innerHTML = results[i].name;
                fragment.appendChild(link);
            }

            searchHTML.appendChild(fragment);
        });

        search.appendNext();
	};

    spotsearch.lucky = function() {
        var searchtext = $( "#searchtext").val();
        var search = new models.Search(searchtext);
        search.localResults = models.LOCALSEARCHRESULTS.APPEND;

        var searchHTML = document.getElementById('results');
        searchHTML.innerHTML = ""

        search.observe(models.EVENT.CHANGE, function() {
            var results = search.tracks;
            var fragment = document.createDocumentFragment();
            var link = document.createElement('li');
            var a = document.createElement('a');
            a.href = results[0].uri;
            link.appendChild(a);
            a.innerHTML = results[0].name;
            fragment.appendChild(link);
            

            searchHTML.appendChild(fragment);
        });

        search.appendNext();
    };


	return spotsearch;

} (SpotSearch || {}));