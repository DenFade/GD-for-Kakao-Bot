//logger
var Logger = require("../log/Logger").Logger;
var dir = require("../../log/logs/setting").dir;

var logger = Logger.build(dir, "requestException");

exports.Connection = function (){
    function Connection(url, header, body, timeout, cookie, method, ignoreType, toText, callback){
        this.url = url;
        this.header = header;
        this.body = body;
        this.timeout = timeout;
        this.cookie = cookie;
        this.ignoreType = ignoreType;
        this.toText = toText;
        this.callback = callback;
        this.result = org.jsoup.Jsoup.connect(url).timeout(timeout);
        for(i in header){
            this.result = this.result.header(i, header[i]);
        }
        for(c in cookie){
            this.result = this.result.cookie(c, cookie[c]);
        }
        if(ignoreType){
            this.result = this.result.ignoreContentType(true);
        }
        if(body){
            this.result = this.result.requestBody(body);
        }
        this.result = this.result.method(method);
    }

    Connection.GET = function(url, header, timeout, cookie, ignoreType, toText, callback){
        let con = new Connection(url, header, null, timeout, cookie, org.jsoup.Connection.Method.GET, ignoreType, toText, callback);
        return con;
    }

    Connection.POST = function(url, header, body, timeout, cookie, ignoreType, toText, callback){
        let con = new Connection(url, header, body, timeout, cookie, org.jsoup.Connection.Method.POST, ignoreType, toText, callback);
        return con;
    }

    Connection.prototype.block = function(){
        var res;
        try{
            res = this.result.execute().body();
            return this.callback(this.toText ? res.toString() : res, null);
        } catch(e){
            logger.write(Logger.ERROR, e.message, this);
            this.callback(null, e);
            return;
        }
    }

    return Connection;
}