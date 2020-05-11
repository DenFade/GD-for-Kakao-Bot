//error
var GDError = require("./plugins/gd/error/GDError").GDError;

//fetch

//fetch - level
var searchLevel = require("./plugins/gd/fetch/GDSearchLevel").searchlevel;
var getLevel = require("./plugins/gd/fetch/GDGetLevel").getlevel;

//fetch - user
var getUser = require("./plugins/gd/fetch/GDGetUser").getuser;

//fetch - account message
var loadMessages = require("./plugins/gd/fetch/GDLoadMessages").loadmessages;
var getMessage = require("./plugins/gd/fetch/GDGetMessage").getmessage;

//utils
var GDUtils = require("./plugins/gd/utils/GDUtils");
var GDCrypto = require("./plugins/gd/utils/GDCrypto");

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
    return this;
}

GDClient.prototype.toggleLoggingRawData = function(b) {
    this.rawData = b;
    return this;
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
    @param {String} name - 레벨 이름
    @param {Number} page - 페이지
    @param {GDFilter} filter - 검색 필터
    @param {Number} field - REGULAR, MOST LIKED, 등등..
    
    @return {Connect (Paginator)} - GDPaginator 객체
    */

    return searchLevel(this, name, page, filter, field);

}

GDClient.prototype.getLevel = function(id){

    /*
    @param {Number} id - 레벨 ID

    @return {Connect (GDLevel)} - GDLevel객체
    */

    return getLevel(this, id);
}

GDClient.prototype.getUser = function(id){
    
    /*
    @param {Number} id - 플레이어의 Account ID

    @return {Connect (GDUser)} - GDUser객체
    */

    return getUser(this, id);
}

GDClient.prototype.loadMessages = function(page){

    /*
    @param {Number} page - 페이지

    @return {Connect (Paginator)} - GDPaginator객체
    */

    return loadMessages(this, page);
}

GDClient.prototype.getMessage = function(id){

    /*
    @param {Number} id - 메시지 ID

    @return {Connect (String)} - 메시지 내용
    */

    return getMessage(this, id);
}

exports.GDClient = GDClient;