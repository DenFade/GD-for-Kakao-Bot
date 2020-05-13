//entities
var Indexes = require("./entities/Index");

//error
var GDError = require("./error/GDError").GDError;

//fetch - level
var searchLevel = require("./fetch/GDSearchLevel").searchlevel;
var getLevel = require("./fetch/GDGetLevel").getlevel;


//fetch - user
var getUser = require("./fetch/GDGetUser").getuser;

//fetch - account message
var loadMessages = require("./fetch/GDLoadMessages").loadmessages;
var getMessage = require("./fetch/GDGetMessage").getmessage;

//fetch - rate
var likeLevel = require("./fetch/GDLikeLevel").likelevel;
var rateStars = require("./fetch/GDRateStarsLevel").ratestars;
var rateDemon = require("./fetch/GDRateDemonLevel").ratedemon;

//fetch - gauntlet
var getGauntlet = require("./fetch/GDGetGauntlet").getgauntlet;

//utils
var GDUtils = require("./utils/GDUtils");
var GDCrypto = require("./utils/GDCrypto");

function GDClient(){
    this.gdw = 0;
    this.gameVersion = 21;
    this.binaryVersion = 35;
    this.secret = "Wmfd2893gb7";
    this.timeout = 8000;
}

GDClient.build = function(){
    return new GDClient();
}

//var client = GDClient.build()
//                     .setTimeout(10000)
//                     .toggleLoggingRawData(true)
//                     .login(id, passw0rd)

GDClient.prototype.setTimeout = function(t){
    if(!t && typeof t !== "number") throw new GDError("Timeout must be integer");

    this.timeout = t;
    return this;
}

GDClient.prototype.toggleLoggingRawData = function(b) {
    this.rawData = b;
    return this;
}

GDClient.prototype.login = function(accid, pass){

    /*
    @param {Number} accid - the account of id
    @param {String} pass - the account of password 
    */

    if(!accid || !pass) throw new GDError("AccountID and password must not be empty");

    var udata = getUser(this, accid).block();

    this.accountID = accid;
    this.pass = GDCrypto.encodeAccPass(pass);
    this.udata = {
        name: udata[Indexes.PROFILE_NAME],
        id: udata[Indexes.PROFILE_PLAYER_ID]
    };
    this.authenticated = true;

    return this;
}

GDClient.prototype.searchLevel = function(name, page, filter, field){

    /*
    @param {String} name - 레벨 이름
    @param {Number} page - 페이지
    @param {GDFilter} filter - 검색 필터
    @param {Number} field - REGULAR, MOST LIKED, 등등..
    
    @return {Connection (Paginator)} - Paginator 객체
    */

    return searchLevel(this, name, page, filter, field);

}

GDClient.prototype.getLevel = function(id){

    /*
    @param {Number} id - 레벨 ID

    @return {Connection (GDLevel)} - GDLevel객체
    */

    return getLevel(this, id);
}

GDClient.prototype.getUser = function(id){
    
    /*
    @param {Number} id - 플레이어의 Account ID

    @return {Connection (GDUser)} - GDUser객체
    */

    return getUser(this, id);
}

GDClient.prototype.loadMessages = function(page){

    /*
    @param {Number} page - 페이지

    @return {Connection (Paginator)} - Paginator객체
    */

    return loadMessages(this, page);
}

GDClient.prototype.getMessage = function(id){

    /*
    @param {Number} id - 메시지 ID

    @return {Connection (String)} - 메시지 내용
    */

    return getMessage(this, id);
}

GDClient.prototype.likeLevel = function(id, like, udid){

    /*
    @param {Number} id - 레벨의 ID
    @param {Boolean} like - 좋아요: true, 싫어요: false
    @param {String} udid - 디바이스 식별자

    @return {Connection (String)} - SUCCESS 또는 ERROR
    */

    return likeLevel(this, id, like, udid);
}

GDClient.prototype.rateStars = function(id, star, udid){

    /*
    @param {Number} id - 레벨의 ID
    @param {Number} star - 추천할 난이도(1~10)
    @param {String} udid - 디바이스 식별자

    @return {Connection (String)} - SUCCESS 또는 ERROR
    */

    return rateStars(this, id, star, udid);
}

GDClient.prototype.rateDemon = function(id, demon){

    /*
    @param {Number} id - 레벨의 ID
    @param {Number} star - 추천할 데몬난이도(1~5)

    @return {Connection (String)} - SUCCESS 또는 ERROR
    */

    return rateDemon(this, id, demon);
}

GDClient.prototype.getGauntlet = function(){

    /*
    @return {Connection (GDGauntlet)} - 건틀렛 정보
    */

    return getGauntlet(this);
}

exports.GDClient = GDClient;