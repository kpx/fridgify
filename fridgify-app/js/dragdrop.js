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
        var drop = {};
        getSpotifyApi();
        //var trackURI = e.dataTransfer.getData('text');

        //var drop = models.Track.fromURI(e.dataTransfer.getData('text'));

        var t = models.Track.fromURI(e.dataTransfer.getData('text'), function(track) {
             drop = track;
        });
        //drop_box.innerHTML = models.Track.fromURI(e.dataTransfer.getData('text'));
        

        //models.Track.fromURI(e.dataTransfer.getData('text').load('name', 'duration').done(console.log('The track ' + track.name + ' is ' + track.duration + ' ms long.')));

        this.classList.remove('over');
        var success_message = document.createElement('p');
        success_message.innerHTML = "Track: " + drop.name;
        this.appendChild(success_message);
    }, false);
}