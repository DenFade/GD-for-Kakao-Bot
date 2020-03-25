const Indexes = require("./gdindex");
const GDUtils = require("./gdutils");
const GDCrypto = GDUtils.GDCrypto();
const GDError = require("./gderror").GDError;
const Connect = require("./dfconnection");
const FileManager = require("./filemanager");
const Base64 = require("./webtoolkit.base64");

exports.GDRequest = function(){
    function GDRequest(body, secret, timeout){
        this.body = body;
        this.timeout = !timeout ? 60000 : timeout;

        this.body.gdw = 4;
        this.body.gameVersion = 21;
        this.body.binaryVersion = 35;
        this.body.secret = !secret ? "Wmfd2893gb7" : secret;
    }

    GDRequest.prototype.searchGDLevel = function(solo){
        if(!this.body.str) this.body.str = "";
        if(!this.body.page) this.body.page = 0;
        if(!this.body.type) this.body.type = Indexes.STRATEGY_REGULAR;
        if(!this.body.uncompleted) this.body.uncompleted = 0;
        if(!this.body.onlyCompleted) this.body.onlyCompleted = 0;
        if(!this.body.featured) this.body.featured = 0;
        if(!this.body.original) this.body.original = 0;
        if(!this.body.twoPlayer) this.body.twoPlayer = 0;
        if(!this.body.coins) this.body.coins = 0;
        if(!this.body.epic) this.body.epic = 0;
        if(!this.body.star) this.body.star = 0;

        this.body.str = encodeURI(this.body.str);
        if(this.body.gjp !== undefined){
            this.body.gjp = new GDCrypto(this.body.gjp).encodeAccPass();
        }
        var data;
        
        Connect.POST(GDUtils.URL(Indexes.URL_LEVEL_SEARCH), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else if(res == "-1"){
                    data = -1;
                } else {
                    res = res.split("#");
                    data = {
                        levels: res[0].split("|").map(v => GDUtils.convertTable(v, ":")),
                        creators: res[1].split("|").map(v => GDUtils.Tuple3.apply(null, v.split(":"))),
                        songs: res[2].split(":").map(v => v == "" ? null : GDUtils.convertTable(v, "~|~")),
                        page: GDUtils.Tuple3.apply(res[3].split(":"))
                    }
                }
            });    
        return solo ? (function(){
            data.levels = data.levels[0];
            data.creators = data.creators[0];
            data.songs = data.songs[0];
            return data;
        }).bind(this)() : data;
    }

    GDRequest.prototype.findGDLevel = function(){
        if(!this.body.levelID) throw new GDError("LevelID must not be empty");
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_DOWNLOAD_LEVEL), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else if(res == "-1"){
                    data = -1;
                } else {
                    data = GDUtils.convertTable(res, ":");
                }
            });
        return data;
    }

    GDRequest.prototype.searchGDUser = function(){
        if(!this.body.str) throw new GDError("str must not be empty");
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_USER_SEARCH), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else if(res == "-1"){
                    data = -1;
                } else {
                    res = res.split("#");
                    data = {
                        users: res[0].split("|").map(v => GDUtils.convertTable(v, ":")),
                        page: GDUtils.Tuple3.apply(null, res[1].split(":"))
                    };
                }
            });
        return data;
    }

    GDRequest.prototype.findGDUser = function(){
        if(!this.body.targetAccountID) throw new GDError("targetAccountID must not be empty");
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_GET_USER_INFO), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else if(res == "-1"){
                    data = -1;
                } else {
                    data = GDUtils.convertTable(res, ":");
                }
            });
        return data;
    }

    GDRequest.prototype.getTimelyLevel = function(){
        if(!this.body.type) throw new GDError("Type must be (string) \"DAILY\" or \"WEEKLY\"");
        this.body.levelID = this.body.type == "DAILY" ? -1 : -2;
        delete this.body.type; //이거 필요없음
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_DOWNLOAD_LEVEL), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else if(res == "-1"){
                    data = -1;
                } else {
                    data = GDUtils.convertTable(res, ":");
                }
            });
        return data;
    }

    GDRequest.prototype.getlevelComments = function(){
        if(!this.body.levelID) throw new GDError("LevelID must not be empty");
        if(!this.body.page) this.body.page = 0;
        if(!this.body.top) this.body.top = 0;
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_LEVEL_COMMENT), {}, this.body, this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else if(res == "-1"){
                    data = -1;
                } else {
                    res = res.split("|").map(v => v.split(":"));
                    data = res.map(v => {
                        return {
                            record: GDUtils.convertTable(v[0], "~"),
                            user: GDUtils.convertTable(v[1], "~")
                        }
                    });
                }
            });
        return data;
    }

    GDRequest.prototype.levelRanking = function(){
        if(!this.body.levelID) throw new GDError("LevelID must not be empty");
        if(!this.body.type) this.body.type = 1; //TOP(1), WEEK(2) 
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_LEVEL_SCORE), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else if(res == "-1"){
                    data = -1;
                } else {
                    res = res.split("|");
                    data = res.map(v => GDUtils.convertTable(v, ":"));
                }
            });
        return data;
    }

    GDRequest.prototype.songInfo = function(){
        if(!this.body.songID) throw new GDError("songID must not be empty");
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_GET_SONG_INFO), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else if(res == "-1"){
                    data = -1;
                } else {
                    data = GDUtils.convertTable(res, "~|~");
                }
            });
        return data;
    }

    GDRequest.prototype.getLeaderboard = function(){
        if(!this.body.type) this.body.type = 0;
        if(!this.body.count) this.body.count = 100;
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_USER_SCORE), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else if(res == "-1"){
                    data = -1;
                } else {
                    res = res.split("|").splice(0, this.body.count);
                    data = res.map(v => GDUtils.convertTable(v, ":"));
                }
            });
        return data;
    }

    GDRequest.prototype.sendMessage = function(){
        if(!this.body.gjp) throw new GDError("gjp must not be empty");
        if(!this.body.accountID) throw new GDError("accountID must not be empty");
        if(!this.body.toAccountID) throw new GDError("toAccountID must not be empty");
        if(!this.body.subject) throw new GDError("subject must not be empty");
        if(!this.body.body) throw new GDError("body must not be empty");
        
        this.body.gjp= new GDCrypto(this.body.gjp).encodeAccPass();
        this.body.subject = Base64.encode(this.body.subject);
        this.body.body = new GDCrypto(this.body.body).encodeMsgBody();
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_SEND_PRIVATE_MESSAGE), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else {
                    data = res == "-1" ? -1 : 1;
                }
            });
        return data;
    }

    GDRequest.prototype.getMessages = function(){
        if(!this.body.gjp) throw new GDError("gjp must not be empty");
        if(!this.body.accountID) throw new GDError("accountID must not be empty");
        if(this.body.getSent == undefined) throw new GDError("getSent must not be empty");
        if(!this.body.page) this.body.page = 0;

        this.body.gjp= new GDCrypto(this.body.gjp).encodeAccPass();
        this.body.getSent = this.body.getSent == 'inbox' ? 0 : 1; //inbox(0) sent(1)
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_GET_PRIVATE_MESSAGES), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else {
                    res = res.split("|");
                    data = res.map(v => GDUtils.convertTable(v, ":"));
                }
            });
        return data;
    }

    GDRequest.prototype.openMessage = function(){
        if(!this.body.gjp) throw new GDError("gjp must not be empty");
        if(!this.body.accountID) throw new GDError("accountID must not be empty");
        if(!this.body.messageID) throw new GDError("messageID must not be empty");

        this.body.gjp= new GDCrypto(this.body.gjp).encodeAccPass();
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_GET_PRIVATE_MESSAGES), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else {
                    data = GDUtils.convertTable(res, ":");
                }
            });
        return data;
    }

    GDRequest.prototype.rateDifficulty = function(){
        //later..
    }

    return GDRequest;
}