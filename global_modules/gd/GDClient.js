//error
var GDError = require("./error/gderror").GDError;

//fetch
var searchLevel = require("./fetch/GDSearchLevel").searchlevel;
var getLevel = require("./fetch/GDGetLevel").getlevel;

//utils
var GDUtils = require("./utils/GDUtils");
var GDCrypto = require("./utils/GDCrypto");

function GDClient(){
    this.gdw = 4;
    this.gameVersion = 21;
    this.binaryVersion = 35;
    this.secret = "Wmfd2893gb7";
    this.timeout = 8000;
}

GDClient.build = function(){
    return new GDClient();
}

GDClient.prototype.setTimeout = function(t){
    if(!t && typeof t !== "number") throw new GDError("Timeout must be integer");

    this.timeout = t;
    return this;
}

GDClient.prototype.setSecret = function(secret){
    if(!secret) throw new GDError("Secret must not be empty");

    this.secret = secret;
}

GDClient.prototype.login = function(accid, nick, pass){

    /*
    @param accid : the account of id
    @param nick : the profile of nickname
    @param pass : the account of password 
    */

    if(!accid || !pass) throw new GDError("AccountID and password must not be empty");

    this.accountID = accid;
    this.nick = nick;
    this.pass = GDCrypto.encodeAccPass(pass);
    this.authicated = true;

    return this;
}

GDClient.prototype.searchLevel = function(name, page, filter, field){

    /*
    @param {String} name - level name
    @param {Number} page - search page
    @param {GDFilter} filter - search filter
    @param {Number} field - REGULAR, MOST LIKED, etc..
    
    @returns {Connect (Paginator)} - list of levels
    */

    return searchLevel(this, name, page, filter, field);

}

GDClient.prototype.getLevel = function(id){

    /*
    @param {String||Number} id - level id

    @returns {Connect (GDLevel)} - the level
    */

    return getLevel(this, id);
}

exports.GDClient = GDClient;