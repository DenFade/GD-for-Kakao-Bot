module.exports = {
    GET: function(url, header, timeout, cookie, ignoreType, toText, callback){
        var result;
        try{
            result = org.jsoup.Jsoup.connect(url).timeout(timeout);
            for(i in header){
                result = result.header(i, header[i]);
            }
            if(ignoreType){
               result = result.ignoreContentType(true);
            }
            result = result.get();
            callback(toText ? result.text() : result, null);
        } catch(e) {
            callback(null, {
                error: e,
                url: url,
                header: header,
                timeout: timeout,
                cookie: cookie,
                ignoreType: ignoreType,
                toText: toText
            });
        }
    },
    POST: function(url, header, body, timeout, cookie, ignoreType, toText, callback){
        var result;
        try{
            result = org.jsoup.Jsoup.connect(url).timeout(timeout);
            for(i in header){
                result = result.header(i, header[i]);
            }
            result = result.requestBody(body);
            if(ignoreType){
               result = result.ignoreContentType(true);
            }
            result = result.post();
            callback(toText ? result.text() : result, null);
        } catch(e) {
            callback(null, {
                error: e,
                url: url,
                header: header,
                body: body,
                timeout: timeout,
                cookie: cookie,
                ignoreType: ignoreType,
                toText: toText
            });
        }
    }
}
