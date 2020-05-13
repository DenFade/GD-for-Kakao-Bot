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
        body.gdw = GDUtils.emptyTo(body.gdw, r.gdw);
        body.binaryVersion = GDUtils.emptyTo(body.binaryVersion, r.binaryVersion);
        body.gameVersion = GDUtils.emptyTo(body.gameVersion, r.gameVersion);
        body.secret = GDUtils.emptyTo(body.secret, r.secret);
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
    }, //fuck you bitch (by 승기(병신))
    emptyTo: function(d, r){
        return d === null || d === undefined ? r : d;
    }
};

module.exports = GDUtils;