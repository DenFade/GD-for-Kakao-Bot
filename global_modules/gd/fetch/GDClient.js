//error
const GDError = require("../error/gderror").GDError;

//fetch
const searchLevel = require("./level/GDSearchLevel").searchlevel;

function GDClient(){
    this.body.gdw = 4;
    this.body.gameVersion = 21;
    this.body.binaryVersion = 35;
    this.timeout = 8000;
}

GDClient.build = function(){
    return new GDClient();
}

GDClient.prototype.timeout = function(t){
    if(!t && typeof t !== "number") throw new GDError("Timeout must be integer");

    this.timeout = t;
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
    this.pass = new GDCrypto(pass).encodeAccPass();
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
}

exports.GDClient = GDClient;