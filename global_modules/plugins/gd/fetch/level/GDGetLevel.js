//connect
var Connect = require("../../../request/Request").Connection();

//entities
var GDDifficulty = require("../../entities/GDDifficulty");
var GDLength = require("../../entities/GDLength");
var GDLevel = require("../../entities/GDLevel").GDLevel();
var GDSong = require("../../entities/GDSong").GDSong();
var Indexes = require("../../entities/Index");

//error
var GDError = require("../../error/GDError").GDError;

//logger
var Logger = require("../../../log/Logger").Logger;
var dir = require("../../../log/logs/setting").dir;

//utils
var Base64 = require("../../utils/Base64");
var GDUtils = require("../../utils/GDUtils");
var GDCrypto = require("../../utils/GDCrypto");


function getlevel(r, id){

    if(id == undefined) throw new GDError("Empty level id");

    var body = {
        levelID: id
    };

    return Connect.POST(GDUtils.URL(Indexes.URL_DOWNLOAD_LEVEL), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDGetLevel.js'", err);
                    return null;
                } else if(res == "-1"){
                    logger.write(Logger.ERROR, "Received Code -1");
                    return -1;
                } else {
                    if(r.rawData) logger.write(Logger.DESCRIPTION, res, null);

                    let lv = GDUtils.convertTable(res, ":");
                    let cid = GDUtils.emptyTo(lv[Indexes.LEVEL_CREATOR_ID], "0");
                    let diff = GDDifficulty.getAbsoluteDifficulty(
                        GDUtils.emptyTo(lv[Indexes.LEVEL_DIFFICULTY], "0"),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_DEMON_DIFFICULTY], "0"),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_IS_AUTO], "0"),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_IS_DEMON], "0")
                    );

                    return new GDLevel(
                        lv[Indexes.LEVEL_ID],
                        GDUtils.emptyTo(lv[Indexes.LEVEL_NAME], "-"),
                        Base64.decode(GDUtils.emptyTo(lv[Indexes.LEVEL_DESCRIPTION], "")),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_DATA], ""),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_VERSION], "0"),
                        cid,
                        "",
                        "",
                        diff,
                        GDUtils.emptyTo(lv[Indexes.LEVEL_DOWNLOADS], "0"),
                        lv[Indexes.LEVEL_SONG_ID] == "0" ? GDSong.basicSongs[lv[Indexes.LEVEL_AUDIO_TRACK]] : GDSong.empty(),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_GAME_VERSION], ""),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_LIKES], ""),
                        GDLength.getAbsoluteLength(Number(lv[Indexes.LEVEL_LENGTH])),
                        !!GDUtils.emptyTo(lv[Indexes.LEVEL_IS_DEMON], false),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_STARS], ""),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_FEATURED_SCORE], ""),
                        !!GDUtils.emptyTo(lv[Indexes.LEVEL_IS_AUTO], false),
                        (function checkLevelPassStatus(){
                            let p = lv[Indexes.LEVEL_PASS];
                            if(!p) return "";
                            else if(p.startsWith("Aw==")) return "Free to Copy";
                            else return GDCrypto.decodeLevelPass(p).substring(1) || "Not Copyable";
                        }).bind(this)(),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_UPLOADED_TIMESTAMP], "NA"),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_LAST_UPDATED_TIMESTAMP], "NA"),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_ORIGINAL], ""),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_COIN_COUNT], "0"),
                        !!GDUtils.emptyTo(lv[Indexes.LEVEL_COIN_VERIFIED], false),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_REQUESTED_STARS], ""),
                        !!GDUtils.emptyTo(lv[Indexes.LEVEL_LDM], false),
                        !!GDUtils.emptyTo(lv[Indexes.LEVEL_IS_EPIC], false),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_OBJECT_COUNT], "???"),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_SECRET_STUFF_1], ""),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_SECRET_STUFF_2], ""),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_SECRET_STUFF_3], ""),
                        () => getlevel(r, id)
                    );
                }

            });
}

exports.getlevel = getlevel;