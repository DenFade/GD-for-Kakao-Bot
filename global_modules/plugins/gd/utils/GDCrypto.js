var Base64 = require("./Base64");
var SHA1 = require("../webtoolkit/webtoolkit.sha1").SHA1;

var GDCrypto = {

    message: '14251',
    levelpass: '26364',
    accountpass: '37526',
    levelscore: '39673',
    level: '41274',
    comment: '29481',
    challenges: '19847',
    rewards: '59182',
    like_rate: '58281',
    userscore: '85271',

    xorcipher: function(str, key){
        var keyBytes = new java.lang.String(key).getBytes();
        var strBytes = new java.lang.String(str).getBytes();
        var arr = new Array(strBytes.length);
    
        for (i = 0; i < strBytes.length; i++){
            arr[i] = String.fromCharCode(strBytes[i] ^ keyBytes[i % keyBytes.length]);
        }
        /*var result = "";
        for(k = 0; k < arr.length; k++){
            result += String.fromCharCode(result[i]);
        }*/
        return arr.join("");
    },

    encode : function(str, key){
        return Base64.encode(GDCrypto.xorcipher(str, key));
    },

    decode: function(str, key){
        return GDCrypto.xorcipher(Base64.decode(str), key);
    },

    encodeAccPass: function(str){
        return GDCrypto.encode(str, GDCrypto.accountpass);
    },

    decodeAccPass: function(str){
        return GDCrypto.decode(str, GDCrypto.accountpass);
    },

    encodeMsgBody: function(str){
        return GDCrypto.encode(str, GDCrypto.message);
    },

    decodeMsgBody: function(str){
        return GDCrypto.decode(str, GDCrypto.message);
    },

    encodeLevelPass: function(str){
        return GDCrypto.encode(str, GDCrypto.levelpass);
    },

    decodeLevelPass: function(str){
        return GDCrypto.decode(str, GDCrypto.levelpass);
    },

    makeRs: function(len){
        if(len === undefined) len = 10;
        var charTable = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return "_".repeat(len).replace(/_/g, (a,b) => charTable[Math.random()*charTable.length|0]);
    },

    makeChk: function(args, key){
        args = SHA1(args.join(''))
        return GDCrypto.encode(args, key);
    },

    makeUuid: function(){
        return ("fffffff-" + GDCrypto.makeRs(4) + "-" + GDCrypto.makeRs(4) + "-ffff-ffff" + GDCrypto.makeRs(8)).toLowerCase();
    }
}

module.exports = GDCrypto;