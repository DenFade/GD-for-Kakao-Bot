const Base64 = require("./webtoolkit/webtoolkit.base64");

module.exports = {
    convertTable: function(arr, regex){
       	newMap = {};
	       arr = arr.split(regex);
	       for(i=0; i<arr.length-1; i+=2){
	          	newMap[""+arr[i]] = arr[i+1];
       	}
       	return newMap;
    },
    bodyParser: function(body){
        var result = [];
        for(i in body){
            result.push(i+"="+body[i]);
        }
        return result.join("&");
    },
    Tuple3: function(){
        return Object.freeze(Array.from(arguments).splice(0, 3));
    },
    URL: function(path){
        return "http://www.boomlings.com/database" + path;
    },
    GDCrypto: function(){
        function GDCrypto(str){
            this.str = str;
        }

        GDCrypto.message = '14251';
        GDCrypto.levelpass = '26364';
        GDCrypto.accountpass = '37526';
        GDCrypto.levelscore = '39673';
        GDCrypto.level = '41274';
        GDCrypto.comment = '29481';
        GDCrypto.challenges = '19847';
        GDCrypto.rewards = '59182';
        GDCrypto.like_rate = '58281';
        GDCrypto.userscore = '85271';

        GDCrypto.prototype.xorcipher = function(str, key){
            var key = new java.lang.String(key).getBytes();
	        var strBytes = new java.lang.String(str).getBytes();
	        var result = new Int8Array(strBytes.length);
	
	        for (i = 0; i < strBytes.length; i++){
		        result[i] = strBytes[i] ^ key[i % key.length];
            }
            var string = "";
	        for(i=0; i<result.length; i++){
		        string += String.fromCharCode(result[i]);
	        }
	        return string;
        }

        GDCrypto.prototype.encode = function(str, key){
            str = this.xorcipher(str, key);
            return Base64.encode(str);
        }

        GDCrypto.prototype.decode = function(str, key){
            str = Base64.decode(str);
            return this.xorcipher(str, key);
        }

        GDCrypto.prototype.encodeAccPass = function(){
            return this.encode(this.str, GDCrypto.accountpass);
        }

        GDCrypto.prototype.decodeAccPass = function(){
            return this.decode(this.str, GDCrypto.accountpass);
        }

        GDCrypto.prototype.encodeMsgBody = function(){
            return this.encode(this.str, GDCrypto.message);
        }

        GDCrypto.prototype.decodeMsgBody = function(){
            return this.decode(this.str, GDCrypto.message);
        }

        GDCrypto.prototype.encodeLevelPass = function(){
            return this.encode(this.str, GDCrypto.levelpass);
        }

        GDCrypto.prototype.decodeLevelPass = function(){
            return this.decode(this.str, GDCrypto.levelpass);
        }

        return GDCrypto;
    }
};