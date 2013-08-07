"use strict";
window.onload = function() {
    //var models = sp.require('$api/models');
    // Handle drops
    var drop_box = document.querySelector('#drop_box');

    drop_box.addEventListener('dragstart', function(e){
        //e.dataTransfer.setData('text/html', this.innerHTML);
        e.dataTransfer.setData('text/html', this.innerHTML);
        e.dataTransfer.effectAllowed = 'copy';
    }, false);

    drop_box.addEventListener('dragenter', function(e){
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        this.classList.add('over');
    }, false);

    drop_box.addEventListener('dragover', function(e){
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        return false;
    }, false);

    drop_box.addEventListener('dragleave', function(e){
        e.preventDefault();
        this.classList.remove('over');
    }, false);

    drop_box.addEventListener('drop', function(e){
        e.preventDefault();
        var text = e.dataTransfer.getData('text');
        if (text.indexOf("playlist") != -1){
            models.Playlist.fromURI(text, function(playlist) {
                Fridge.loadTracks(playlist.tracks);
            });
        } else {

            var t = models.Track.fromURI(text, function(track) {
                Fridge.addMagnet(track.name, track.uri, '#poetryHolder');
            });

        }


        this.classList.remove('over');

    }, false);
}