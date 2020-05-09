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
        var arr = new Int8Array(strBytes.length);
    
        for (i = 0; i < strBytes.length; i++){
            arr[i] = strBytes[i] ^ keyBytes[i % keyBytes.length];
        }
        /*var result = "";
        for(k = 0; k < arr.length; k++){
            result += String.fromCharCode(result[i]);
        }*/
        return new java.lang.String(arr);
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
        var charTable = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return "_".repeat(len).replace(/_/g, (a,b) => charTable[Math.random()*charTable.length|0]);
    },

    makeChk: function(args, key){
        args = args.concat(key);
        args = SHA1(args.join(''))
        return GDCrypto.prototype.encode(args, key);
    },

    makeUdid: function(){
        return "dflab" + GDUtils.randomInt(100000, 100000000000);
    },

    makeUuid: function(){
        return "dflab" + GDUtils.randomInt(100000, 100000000);
    }
}

module.exports = GDCrypto;