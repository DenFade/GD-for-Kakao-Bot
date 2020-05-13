//connect
var Connect = require("../../request/Request").Connection();

//entities
var GDDifficulty = require("../entities/GDDifficulty");
var GDLength = require("../entities/GDLength");
var GDLevel = require("../entities/GDLevel").GDLevel();
var GDSearchField = require("../entities/GDSearchField");
var GDSong = require("../entities/GDSong").GDSong();
var Indexes = require("../entities/Index");

//error
var GDError = require("../error/GDError").GDError;

//fetch
var getlevel = require("./GDGetLevel").getlevel;

//logger
var Logger = require("../../log/Logger").Logger;
var dir = require("../../log/logs/setting").dir;

//utils
var Base64 = require("../utils/Base64");
var GDUtils = require("../utils/GDUtils");
var Paginator = require("../utils/Paginator").Paginator();

function searchlevel(r, name, page, filter, field){

    if(name == undefined) throw new GDError("Empty level name");
    filter = GDUtils.emptyTo(filter, {});

    var body = {
        str: encodeURI(name),
        diff: GDUtils.emptyTo(filter.diff, "-"),
        len: GDUtils.emptyTo(filter.len, "-"),
        page: GDUtils.emptyTo(page, 0),
        type: GDUtils.emptyTo(field, GDSearchField.REGULAR),
        uncompleted: GDUtils.emptyTo(filter.uncompleted, 0),
        onlyCompleted: GDUtils.emptyTo(filter.onlyCompleted, 0),
        featured: GDUtils.emptyTo(filter.featured, 0),
        original: GDUtils.emptyTo(filter.original, 0),
        twoPlayer: GDUtils.emptyTo(filter.twoPlayer, 0),
        coins: GDUtils.emptyTo(filter.coins, 0),
        epic: GDUtils.emptyTo(filter.epic, 0),
        star: GDUtils.emptyTo(filter.star, 0)
    }

    if(filter.noStar) body.noStar = 1;
    if(filter.song !== undefined){
        body.song = filter.song;
        body.customSong = filter.isCustom ? "1" : "0";
    }
    if((body.onlyCompleted || body.uncompleted) && filter.completedList) body.completedLevels = "(" + filter.completedList.join() + ")";
    if(filter.followed) body.followed = filter.followed.join();
        
    return Connect.POST(GDUtils.URL(Indexes.URL_LEVEL_SEARCH), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDSearchLevel.js'", err);
                } else if(res == "-1"){
                    logger.write(Logger.ERROR, "Received Code -1");
                    return -1;
                } else {
                    if(r.rawData) logger.write(Logger.DESCRIPTION, res, null);
                    
                    res = res.split("#");
                    var levels = res[0].split("|").map(v => GDUtils.convertTable(v, ":"));
                    var creators = res[1].split("|").map(v => GDUtils.Tuple3.apply(null, v.split(":")));
                    var songs = res[2].split(":").map(v => v == "" ? null : GDUtils.convertTable(v, "~|~"));
                    var pages = (function (){
                        let ps = res[3].split(":");
                        return GDUtils.Tuple3(ps[0], ps[1], ps[2]);
                    }).bind(this)();
                    
                    for(i in levels){
                        let lv = levels[i];
                        let level_id = lv[Indexes.LEVEL_ID];
                        let cid = GDUtils.emptyTo(lv[Indexes.LEVEL_CREATOR_ID], "0");
                        let diff = GDDifficulty.getAbsoluteDifficulty(
                                    GDUtils.emptyTo(lv[Indexes.LEVEL_DIFFICULTY], "0"),
                                    GDUtils.emptyTo(lv[Indexes.LEVEL_DEMON_DIFFICULTY], "0"),
                                    GDUtils.emptyTo(lv[Indexes.LEVEL_IS_AUTO], "0"),
                                    GDUtils.emptyTo(lv[Indexes.LEVEL_IS_DEMON], "0")
                                );
                        levels[i] = new GDLevel(
                                level_id,
                                GDUtils.emptyTo(lv[Indexes.LEVEL_NAME], "-"),
                                Base64.decode(GDUtils.emptyTo(lv[Indexes.LEVEL_DESCRIPTION], "")),
                                GDUtils.emptyTo(lv[Indexes.LEVEL_DATA]),
                                GDUtils.emptyTo(lv[Indexes.LEVEL_VERSION], "0"),
                                cid,
                                GDUtils.emptyTo(creators.find(v => v[0] == cid)[2], ""),
                                GDUtils.emptyTo(creators.find(v => v[0] == cid)[1], "-"),
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
                                "",                                                             //levelpass didn't show at search
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
                                () => getlevel(r, name, page, filter, field)
                            );
                    }

                    return new Paginator(levels, !page ? 0 : page, Number(pages[2]), Number(pages[0]),
                        newPage => new searchlevel(r, name, newPage, filter, field)
                    );
                }
            });
}

exports.searchlevel = searchlevel;