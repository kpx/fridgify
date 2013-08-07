var sp = getSpotifyApi();
var models = sp.require('$api/models');
var views = sp.require('$api/views');

var SpotSearch = (function (spotsearch) {
    spotsearch.func = function() {
    	var searchtext = $( "#searchtext").val();
        var search = new models.Search(searchtext);

        $( '#results' ).css('border-left', '1px solid grey');
        $( '#results' ).css('margin-left', '3px');
        search.localResults = models.LOCALSEARCHRESULTS.APPEND;

        var searchHTML = document.getElementById('results');
        searchHTML.innerHTML = ""

        search.observe(models.EVENT.CHANGE, function() {
            var resultsTracks = search.tracks;
            var fragment = document.createDocumentFragment();

            for (var i=0; i<resultsTracks.length; i++){
                var link = document.createElement('li');
                var a = document.createElement('a');
                a.href = resultsTracks[i].uri;
                link.appendChild(a);
                a.innerHTML = resultsTracks[i].name;
                fragment.appendChild(link);

            }

            searchHTML.appendChild(fragment);
        });

        search.appendNext();
    };

    spotsearch.lucky = function() {

        var searchtext = $( "#searchtext").val();
        var parts = searchtext.split(" ");
        var resultnames = [];
        var resultuppercase = [];
        var resulturis = [];
        var i = 0;

        parts.forEach(function(luckyPart){
            var search = new models.Search(luckyPart);
            search.localResults = models.LOCALSEARCHRESULTS.APPEND;

            search.observe(models.EVENT.CHANGE, function() {
                var results = search.tracks;
                var names = results.map(function(e){return e.name.split(" ")[0].toUpperCase();});
                var upperSearch = luckyPart.toUpperCase();

                var index = $.inArray(upperSearch, names);
                if (index != -1){
                    var trackName = results[index].name;
                    var trackUri = results[index].uri;

                    resultuppercase.push(upperSearch);
                    resultnames.push(trackName);
                    resulturis.push(trackUri);
                }

                i++;

                //Add the words when the last search result is returned
                //Otherwise, the order would get messed up
                if (i == parts.length){
                    parts.forEach(function(currentpart){
                        var index = $.inArray(currentpart.toUpperCase(), resultuppercase);
                        if (index != -1){
                            var trackName = resultnames[index];
                            var trackUri = resulturis[index];
                            Fridge.addMagnet(trackName, trackUri, '#poetryHolder');    
                        }
                    });

                }

            });
search.appendNext();



});


};

return spotsearch;

} (SpotSearch || {}));
