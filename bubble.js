/**
 * Created by aftalavera on 5/26/15.
 */

var Bubble = (function(windows, undefined){

    var Bubble = {};



    loadSupportingFiles(function() {

        loadScript('bower_components/jquery/dist/jquery.js', function() {console.log('jquery loaded')});
        loadScript('bower_components/jquery-ui/jquery-ui.js', function() {console.log('jquery-ui loaded')});
        loadScript('bower_components/maphilight/jquery.maphilight.js', function() {console.log('jquery.maphilight loaded')});



    });



    function loadSupportingFiles(callback){
        callback();
    }

    function loadScript(url, callback) {
        var script = document.createElement('script');

        script.async = true;
        script.src = url;

        var entry = document.getElementsByTagName('script')[0];
        entry.parentNode.insertBefore(script, entry);

        script.onload = script.onreadystatechange = function () {
            var rdyState = script.readyState;

            if (!rdyState || /complete|loaded/.test(script.readyState)) {
                callback();

                script.onload = null;
                script.onreadystatechange = null;
            }
        };
    }

    return Bubble;
})(window);