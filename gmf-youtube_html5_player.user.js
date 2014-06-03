// ==UserScript==
// @name        GMF - Youtube HTML5 Player
// @author      razorih
// @namespace   gmf.fi
// @description 
// @include     http://www.gmf.fi/forums/*
// @version     1
// @grant       none
// ==/UserScript==

/**
 * Todo
 *
 * - Lazy loading       ==> Done
 * - Fix regex          ==> Done
 * - Investigate nulls  ==> Done
 * - Touch Events       ==> Done
 */

var reg = /\/v\/(.+)$/i, // RegExp for matching embed URLs, captures "video_id" in "/v/video_id"
    fallback = "https://www.youtube.com/embed/3WAOxKOmR90"; // If the extracting fails, this video will be displayed instead

/**
 * Extracts properties from <object> elements
 * Originally this method did much much more, but since they weren't in the scope of this project I have commented them
 * 
 * @param  {Element} element <object> element where the attributes will be ripped
 * @return {Object}          Attributes
 */
function ripAttributes(elem) {
    var out = {}; // Object to store our data

    // Element properties
    /*var attrs = elem["attributes"];
    if(!!attrs) {
        out["attrs"] = {};
        for (var i = attrs.length - 1; i >= 0; i--) {
            out["attrs"][attrs[i]["name"]] = attrs[i]["value"];
        };
    }*/

    // Parameters
    /*var params = elem.getElementsByTagName("param");
    if(!!params) {                                       // If <object> has params
        out["params"] = {};                              // Place where params will be extracted
        for (var i = params.length - 1; i >= 0; i--) {   // Loop though all parameters
            out["params"][params[i].getAttribute("name")] = params[i].getAttribute("value"); // <param name="xxx" value="yyy"> --> { "xxx": "yyy" }
        };
    }*/

    // Embed data
    var embed = elem.getElementsByTagName("embed");
    if(!!embed) {          // Make sure that the <object> has an embed in it
        out["embed"] = {}; // Embed data will be placed here
        
        // I'm pretty sure that there can be only one <embed> in a <object>, so assume embed[0]
        for (var i = embed[0]["attributes"].length - 1; i >= 0; i--) {
            var pair = embed[0]["attributes"][i]; // Placeholder var for current attribute pair
            out["embed"][pair["name"]] = pair.value; // <embed xxx="yyy"> --> { "xxx": "yyy" }
        }
    }

    return out;
}

/**
 * Converts given <object> embed url to a new <iframe> url
 * There's probably a better way to do this but I don't really care
 * 
 * @param  {String}  url   URL
 * @return {String}        ID
 */
function convertEmbedURL(url) {
    // gmf doesn't show protocol so assume http when extracting
    // "new URL()" method is pretty much the safest way to handle urls
    var path = new URL("http:" + url)["pathname"]; // Get the pathname

    // Use super magical regex matching for this 
    var id = reg.exec(path);

    if(id === null)
        return fallback; // *Click* Nice

    // Now that we have your video id, let's build the new url
    // Note: if you run into problems with https, try changing "https" -> "http"
    return "https://www.youtube.com/embed/" + id[1];
}


/**
 * Builds an Youtube Embed iframe according to this:
 * http://apiblog.youtube.com/2010/07/new-way-to-embed-youtube-videos.html
 * 
 * @param  {Object}  settings   Get this from ripAttributes()
 * @return {Element}            iframe element, ready for embedding
 */
function buildiframe(settings) {
    var el = document.createElement("iframe");
        el.classList.add("youtube-player");
        el.setAttribute("type", "text/html"); // Required
        el.setAttribute("allowfullscreen", "true");
        el.setAttribute("frameborder", "0");  // Disables that annoying border thing

        el.setAttribute("width", settings["embed"]["width"]);   // These come from the settings
        el.setAttribute("height", settings["embed"]["height"]); // ^^

        el.setAttribute("src", convertEmbedURL(settings["embed"]["src"]));

    return el;
}


/**
 * "Master" conversion function
 * This takes a <object> youtube player and returns an iframe version of it
 * 
 * @param  {Element} player <object> youtube player
 * @return {Element}        iframe version of player
 */
function convertEmbedFrame(player) {
    // Make sure that the player is a valid element
    if(!(player instanceof Element))
        return false; // Conversion failed

    // Rip attributes from player
    var attr = ripAttributes(player);

    // Return the newly built iframe player
    return buildiframe(attr);
}


/**
 * Find all youtube players on current page
 * Loop through them and replace them with iframes
 */
var ply = document.getElementsByTagName("object");

for (var i = ply.length - 1; i >= 0; i--) {
    var frame = convertEmbedFrame(ply[i]); // Convert

    if(!(!!frame))
        continue; // Conversion failed, skip this video

    // "Lazy" loading, convert player when ply[i] is hovered
    // Doing this should prevent massive lag when there's many players on one page
    // 
    // Also loops and eventlisteners don't fit together very well, so use some closure magic
    (function(_frame, _ply) {

        _ply.addEventListener("mouseenter", function(e) {
            _ply.parentNode.replaceChild(_frame, _ply);
        }, false);

        _ply.addEventListener("touchstart", function(e) { // Also handle touch events, since we mobile now
            e.preventDefault(); // Prevent mouse events from rising 
            _ply.parentNode.replaceChild(_frame, _ply);
        }, false);

    })(frame, ply[i]);

};


// Expose ripAttributes to the window for testing purposes
// window.rip = ripAttributes;