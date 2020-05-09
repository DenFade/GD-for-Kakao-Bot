var Base64 = require("../webtoolkit/webtoolkit.base64").Base64;
var SHA1 = require("../webtoolkit/webtoolkit.sha1").SHA1;

GDUtils = {
    convertTable: function(arr, regex){
        newMap = {};
        arr = arr.split(regex);
        for(i=0; i<arr.length-1; i+=2){
            newMap[""+arr[i]] = arr[i+1];
        }
        return newMap;
    },
    bodyParser: function(r, body){
        body.gdw = r.gdw;
        body.binaryVersion = r.binaryVersion;
        body.gameVersion = r.gameVersion;
        body.secret = r.secret;
        var result = [];
        for(i in body){
            result.push(i+"="+body[i]);
        }
        return result.join("&");
    },
    Tuple2: function(){
        return Object.freeze(Array.from(arguments).splice(0, 2));
    },
    Tuple3: function(){
        return Object.freeze(Array.from(arguments).splice(0, 3));
    },
    URL: function(path){
        return "http://www.boomlings.com/database/" + path + ".php";
    },
    randomInt: function(n, m){
        return Math.floor(Math.random()*(m-n+1))+n;
    }, //fuck you bitch (by 승기 & Refox)
    emptyTo: function(d, r){
        return d === null || d === undefined ? r : d;
    },
    getBytes: function(str){
        var bytes = [];
        for(var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            bytes.push(char & 0xFF);
        }   
        return bytes;
    }
};

module.exports = GDUtils;