//connect
var Connect = require("../Fetch").Connection();

//entities
var GDDifficulty = require("../../entities/Difficulty");
var GDLength = require("../../entities/Length");
var GDLevel = require("../../entities/Level").GDLevel();
var GDSong = require("../../entities/Song").GDSong();
var Indexes = require("../../entities/Index");

//error
var GDError = require("../../error/gderror").GDError;

//logger
var Logger = require("../../../log/Logger").Logger;
var dir = require("../../../log/logs/setting").dir;

//utils
var Base64 = require("../../webtoolkit/webtoolkit.base64").Base64;
var GDUtils = require("../../utils/gdutils");
var GDCrypto = GDUtils.GDCrypto();


exports.getlevel = function(r, id){

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
                        GDUtils.emptyTo(lv[Indexes.LEVEL_DATA]),
                        GDUtils.emptyTo(lv[Indexes.LEVEL_VERSION], "0"),
                        cid,
                        "",
                        "",
                        diff,
                        GDUtils.emptyTo(lv[Indexes.LEVEL_DOWNLOADS], "0"),
                        lv[Indexes.LEVEL_SONG_ID] == "0" ? GDSong.basicSongs[lv[Indexes.LEVEL_AUDIO_TRACK]]
                            : (function(){
                                let s = songs.find(v => v[1] == lv[Indexes.SONG_ID]);
                                return !s ? null : new GDSong(
                                    GDUtils.emptyTo(s[Indexes.SONG_AUTHOR], ""),
                                    GDUtils.emptyTo(s[Indexes.SONG_ID], ""),
                                    GDUtils.emptyTo(s[Indexes.SONG_TITLE], "-"),
                                    true,
                                    GDUtils.emptyTo(s[Indexes.SONG_SIZE], "??MB"),
                                    GDUtils.emptyTo(s[Indexes.SONG_URL], ""),
                                    GDUtils.emptyTo(s[Indexes.SONG_SECRET_URL], "")
                                );
                            }).bind(this)(),
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
                            else return new GDCrypto(p).decodeLevelPass().substring(1) || "Not Copyable";
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
                        GDUtils.emptyTo(lv[Indexes.LEVEL_SECRET_STUFF_3], "")
                    );
                }

            });
    
}