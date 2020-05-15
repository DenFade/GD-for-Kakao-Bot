//connect
var Connect = require("../../../request/Request").Connection();

//entities
var GDPrivateScope = require("../../entities/GDPrivateScope");
var GDRole = require("../../entities/GDRole");
var GDUser = require("../../entities/GDUser").GDUser();
var Indexes = require("../../entities/Index");

//error
var GDError = require("../../error/GDError").GDError;

//logger
var Logger = require("../../../log/Logger").Logger;
var dir = require("../../../log/logs/setting").dir;

//utils
var GDUtils = require("../../utils/GDUtils");

function getuser(r, id){

    if(id === undefined) throw new GDError("Empty user id");

    var body = {
        targetAccountID: id
    };

    return Connect.POST(GDUtils.URL(Indexes.URL_GET_USER_INFO), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDGetUser.js'", err);
                } else if(res == "-1"){
                    logger.write(Logger.ERROR, "Received Code -1");
                    return -1;
                } else {
                    if(r.rawData) logger.write(Logger.DESCRIPTION, res, null);

                    let u = GDUtils.convertTable(res, ":");

                    return new GDUser(
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
                        GDPrivateScope[Number(GDUtils.emptyTo(u[Indexes.PROFILE_PRIVATE_MESSAGE_POLICY], "0"))],
                        Number(GDUtils.emptyTo(u[Indexes.PROFILE_FRIEND_REQUEST_POLICY], "0")) == "0",
                        GDUtils.emptyTo(u[Indexes.PROFILE_YOUTUBE], ""),
                        GDUtils.emptyTo(u[Indexes.PROFILE_ICON_CUBE], ""),
                        GDUtils.emptyTo(u[Indexes.PROFILE_ICON_SHIP], ""),
                        GDUtils.emptyTo(u[Indexes.PROFILE_ICON_BALL], ""),
                        GDUtils.emptyTo(u[Indexes.PROFILE_ICON_UFO], ""),
                        GDUtils.emptyTo(u[Indexes.PROFILE_ICON_WAVE], ""),
                        GDUtils.emptyTo(u[Indexes.PROFILE_ICON_ROBOT], ""),
                        GDUtils.emptyTo(u[Indexes.PROFILE_GLOW_OUTLINE_2], "0") == "1",
                        GDUtils.emptyTo(u[Indexes.PROFILE_GLOBAL_RANK], "0"),
                        GDUtils.emptyTo(u[Indexes.PROFILE_ICON_SPIDER], ""),
                        GDUtils.emptyTo(u[Indexes.PROFILE_TWITTER], ""),
                        GDUtils.emptyTo(u[Indexes.PROFILE_TWITCH], ""),
                        GDUtils.emptyTo(u[Indexes.PROFILE_DIAMONDS], "0"),
                        GDUtils.emptyTo(u[Indexes.PROFILE_DEATH_EFFECT], ""),
                        GDRole[Number(GDUtils.emptyTo(u[Indexes.PROFILE_ROLE], "0"))],
                        GDPrivateScope[Number(GDUtils.emptyTo(u[Indexes.PROFILE_COMMENT_HISTORY_POLICY], "0"))],
                        () => getuser(r, id)
                    );
                }
            }
    );
}

exports.getuser = getuser;