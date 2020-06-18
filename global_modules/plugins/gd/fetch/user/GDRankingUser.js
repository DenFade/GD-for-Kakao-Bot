var Connect = require("../../../request/Request").Connection();

//entities
var GDRanking = require("../../entities/GDRanking");
var GDUser = require("../../entities/GDUser").GDUser();
var Indexes = require("../../entities/Index");

//error
var GDError = require("../../error/GDError").GDError;

//logger
var Logger = require("../../../log/Logger").Logger;
var dir = require("../../../log/logs/setting").dir;

//utils
var GDUtils = require("../../utils/GDUtils");

function rankinguser(r, type, count){
    
    if(!type) throw new GDError("Empty Ranking Type");
    if(!r.authenticated) throw new GDError("Need Login");

    var body = {
        accountID: r.accountID,
        gjp: r.pass,
        type: type,
        count: count === undefined ? 100 : count
    };

    return Connect.POST(GDUtils.URL(Indexes.URL_GET_USER_TOP), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDBlockUser.js'", err);
                    return null;
                } else if(res == "-1"){
                    logger.write(Logger.ERROR, "Received Code -1");
                    return -1;
                } else {
                    if(r.rawData) logger.write(Logger.DESCRIPTION, res, null);

                    var users = res.split("|").map(v => GDUtils.convertTable(v, ":"));
                    users = users.sort((a, b) => b[Indexes.PROFILE_STARS] - a[Indexes.PROFILE_STARS]); //소트 안하면 본인 프로필 젤밑에 있음

                    for(i in users){
                        let u = users[i];
                        users[i] = new GDUser(
                            u[Indexes.PROFILE_NAME],
                            GDUtils.emptyTo(u[Indexes.PROFILE_PLAYER_ID], "0"),
                            GDUtils.emptyTo(u[Indexes.PROFILE_STARS], "0"),
                            GDUtils.emptyTo(u[Indexes.PROFILE_DEMONS], "0"),
                            GDUtils.emptyTo(u[Indexes.PROFILE_CREATOR_POINTS], "0"),
                            GDUtils.emptyTo(u[Indexes.PROFILE_ICON], ""),
                            GDUtils.emptyTo(u[Indexes.PROFILE_COLOR_1], ""),
                            GDUtils.emptyTo(u[Indexes.PROFILE_COLOR_2], ""),
                            GDUtils.emptyTo(u[Indexes.PROFILE_SECRET_COINS], "0"),
                            GDUtils.emptyTo(u[Indexes.PROFILE_ICON_TYPE], ""),
                            GDUtils.emptyTo(u[Indexes.PROFILE_GLOW_OUTLINE], "0") == "1",
                            GDUtils.emptyTo(u[Indexes.PROFILE_ACCOUNT_ID], "0"),
                            GDUtils.emptyTo(u[Indexes.PROFILE_USER_COINS], "0"),
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            GDUtils.emptyTo(u[Indexes.PROFILE_DIAMONDS], "0"),
                            "",
                            "",
                            "",
                            null
                        );
                    }

                    return users;
                }
            }
    );
}

rankinguser.toString = function(){
    return "[GDClient.rankingUser <Array <GDUser>>]";
}

exports.rankinguser = rankinguser;