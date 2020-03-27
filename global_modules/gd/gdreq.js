const Indexes = require("./gdindex");
const GDUtils = require("./gdutils");
const GDCrypto = GDUtils.GDCrypto();
const GDError = require("./gderror").GDError;
const Connect = require("./dfconnection");
const FileManager = require("./filemanager");
const Base64 = require("./webtoolkit/webtoolkit.base64").Base64;

exports.GDRequest = function(){
    function GDRequest(body, secret, timeout){
        this.body = body;
        this.timeout = !timeout ? 60000 : timeout;

        this.body.gdw = 4;
        this.body.gameVersion = 21;
        this.body.binaryVersion = 35;
        this.body.secret = !secret ? "Wmfd2893gb7" : secret;
    }

    GDRequest.param = function(t){

        const dict = {
            name: "str",
            levelid: "levelID",
            player: "targetAccountID",
            accid: "accountID",
            accpass: "gjp",
            username: "userName"
        };

        return dict[t];
    }

    GDRequest.prototype.editParams = function(){
        for(var args of Array.from(arguments)){
            this.body[args[1]] = args[2] === null ? this.body[args[0]] : args[2](this.body[args[0]]);
            if(args[0] != args[1]) delete this.body[args[0]];
        }
    }

    GDRequest.prototype.addParams = function(){
        for(var args of Array.from(arguments)){
            this.body[args[0]] = args[1];
        }
    }

    GDRequest.prototype.searchGDLevel = function(solo){

        this.editParams(
            GDUtils.Tuple3("name", GDRequest.param("name"), v => encodeURI(GDUtils.emptyTo(v, ""))),
            GDUtils.Tuple3("page", "page", v => GDUtils.emptyTo(v, 0)),
            GDUtils.Tuple3("type", "type", v => GDUtils.emptyTo(v, Indexes.STRATEGY_REGULAR)),
            GDUtils.Tuple3("uncompleted", "uncompleted", v => GDUtils.emptyTo(v, 0)),
            GDUtils.Tuple3("onlycompleted", "onlyCompleted", v => GDUtils.emptyTo(v, 0)),
            GDUtils.Tuple3("featured", "featured", v => GDUtils.emptyTo(v, 0)),
            GDUtils.Tuple3("original", "original", v => GDUtils.emptyTo(v, 0)),
            GDUtils.Tuple3("twoplayer", "twoPlayer", v => GDUtils.emptyTo(v, 0)),
            GDUtils.Tuple3("coin", "coins", v => GDUtils.emptyTo(v, 0)),
            GDUtils.Tuple3("epic", "epic", v => GDUtils.emptyTo(v, 0)),
            GDUtils.Tuple3("star", "star", v => GDUtils.emptyTo(v, 0)),
        );

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
        if(!this.body.levelid) throw new GDError("levelid must not be empty");
        
        this.editParams(
            GDUtils.Tuple3("levelid", GDRequest.param("levelid"), null)
        );
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

        this.editParams(
            GDUtils.Tuple3("name", GDRequest.param("name"), v => encodeURI(GDUtils.emptyTo(v, "")))
        );
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
        if(!this.body.player) throw new GDError("player must not be empty");

        this.editParams(
            GDUtils.Tuple3("player", GDRequest.param("player"), null)
        );
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
        this.editParams(
            GDUtils.Tuple3("type", GDRequest.param("levelid"), v => v == "DAILY" ? -1 : -2)
        );
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
        if(!this.body.levelid) throw new GDError("levelid must not be empty");
        this.editParams(
            GDUtils.Tuple3("levelid", GDRequest.param("levelid"), null),
            GDUtils.Tuple3("page", "page", v => GDUtils.emptyTo(v, 0)),
            GDUtils.Tuple3("top", "top", v => GDUtils.emptyTo(v, 0))
        );
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

    GDRequest.prototype.postLevelComment = function(){
        if(!this.body.accpass) throw new GDError("accpass must not be empty");
        if(!this.body.accid) throw new GDError("accid must not be empty");
        if(!this.body.levelid) throw new GDError("levelid must not be empty");
        if(!this.body.comment) throw new GDError("comment must not be empty");
        if(!this.body.username) throw new GDError("username must not be empty");
        
        this.editParams(
            GDUtils.Tuple3("accpass", GDRequest.param("accpass"), v => new GDCrypto(v).encodeAccPass()),
            GDUtils.Tuple3("accid", GDRequest.param("accid"), null),
            GDUtils.Tuple3("levelid", GDRequest.param("levelid"), null),
            GDUtils.Tuple3("comment", "comment", v => Base64.encode(v)),
            GDUtils.Tuple3("username", GDRequest.param("username"), null),
            GDUtils.Tuple3("percent", "percent", v => GDUtils.emptyTo(v, 0))
        )
        
        var args = [this.body.userName, this.body.comment, this.body.levelID, this.body.percent, 0];
        var chk = GDCrypto.makeChk(args, GDCrypto.comment);
        this.addParams("chk", chk);
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_LIKE_ITEM), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else {
                    data = res;
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

        this.body.gjp = new GDCrypto(this.body.gjp).encodeAccPass();
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_READ_PRIVATE_MESSAGES), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else {
                    data = GDUtils.convertTable(res, ":");
                }
            });
        return data;
    }

    GDRequest.prototype.getProfileComment = function(){
        //later...
    }

    GDRequest.prototype.postProfileComment = function(){
        //later...
    }

    GDRequest.prototype.likeLevel = function(){
        if(!this.body.gjp) throw new GDError("gjp must not be empty");
        if(!this.body.accountID) throw new GDError("accountID must not be empty");
        if(!this.body.levelID) throw new GDError("levelID must not be empty");
        if(this.body.like === undefined) this.body.like = 1;

        var rs = GDCrypto.makeRs();
        var args = [0, this.body.levelID, this.body.like, 1, rs, this.body.accountID, 0, 0];
        var chk = GDCrypto.makeChk(args, GDCrypto.like_rate);

        this.body.gjp = new GDCrypto(this.body.gjp).encodeAccPass();
        this.body.uuid = GDCrypto.makeUuid();
        this.body.udid = GDCrypto.makeUdid();
        this.body.rs = rs;
        this.body.chk = chk;
        this.body.itemID = this.body.levelID;
        this.body.type = 1;
        this.body.special = 0;
        delete this.body.levelID;
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_LIKE_ITEM), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else {
                    data = res;
                }
            });
        return data;
    }

    GDRequest.prototype.rateDifficulty = function(){
        if(!this.body.gjp) throw new GDError("gjp must not be empty");
        if(!this.body.accountID) throw new GDError("accountID must not be empty");
        if(!this.body.levelID) throw new GDError("levelID must not be empty");
        if(!this.body.stars || (this.body.stars < 1 || this.body.stars > 10 || !Number.isSafeInteger(this.body.stars))) throw new GDError("stars must be 1 to 10 int");

        var rs = GDCrypto.makeRs();
        var args = [this.body.levelID, this.body.stars, rs, this.body.accountID, 0, 0];
        var chk = GDCrypto.makeChk(args, GDCrypto.like_rate);

        this.body.gjp = new GDCrypto(this.body.gjp).encodeAccPass();
        this.body.uuid = GDCrypto.makeUuid();
        this.body.udid = GDCrypto.makeUdid();
        this.body.rs = rs;
        this.body.chk = chk;
        var data;

        Connect.POST(GDUtils.URL(Indexes.URL_RATE_LEVEL_STARS), {}, GDUtils.bodyParser(this.body), this.timeout, {}, true, true,
            (res, err) => {
                if(err !== null){
                    FileManager.concatJSON("/sdcard/GDBot/errors/LOGS", err);
                } else {
                    data = res;
                }
            });
        return data;
    }

    return GDRequest;
}
