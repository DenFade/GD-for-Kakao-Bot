//connect
const Connect = require("../Fetch").Connection();

//entities
const GDDifficulty = require("../../entities/Difficulty").GDDifficulty;
const GDLength = require("../../entities/Length").GDLength;
const GDLevel = require("../../entities/Level").GDLevel;
const GDSong = require("../../entities/Song").GDSong;

//error
const GDError = require("../../error/gderror").GDError;

//logger
const Logger = require("../../../log/Logger").Logger;
const dir = require("../../../log/logs/setting").dir;

//utils
const Base64 = require("../../webtoolkit/webtoolkit.base64").Base64;
const GDUtils = require("../../utils/gdutils");
const GDCrypto = GDUtils.GDCrypto();
const Indexes = require("../../entities/Index");

function searchlevel(r, name, page, filter, field){

    if(name == undefined) throw new GDError("Empty level name");
    filter = GDUtils.emptyTo(filter, {});

    var body = {
        str: encodeURI(name),
        page: GDUtils.emptyTo(page, 0),
        type: GDUtils.emptyTo(field, Indexes.STRATEGY_REGULAR),
        uncompleted: GDUtils.emptyTo(filter.uncompleted, 0),
        onlyCompleted: GDUtils.emptyTo(filter.onlyCompleted, 0),
        featured: GDUtils.emptyTo(filter.featured, 0),
        original: GDUtils.emptyTo(filter.original, 0),
        twoPlayer: GDUtils.emptyTo(filter.twoPlayer, 0),
        coins: GDUtils.emptyTo(filter.coins, 0),
        epic: GDUtils.emptyTo(filter.epic, 0),
        star: GDUtils.emptyTo(filter.star, 0)
    }

    if(r.pass){
        body.accountID = r.accountID;
        body.gjp = r.pass;
        body.extra = 1;
    }

    if(filter.noStar) body.noStar = 1;
    if(filter.song !== undefined){
        body.song = filter.song;
        body.customSong = filter.isCustom ? "1" : "0";
    }
    if((body.onlyCompleted || body.uncompleted) && filter.completedList) body.completedLevels = "(" + filter.completedList.join() + ")";
    if(filter.followed) body.followed = filter.followed.join();
        
    return Connect.POST(GDUtils.URL(Indexes.URL_LEVEL_SEARCH), {}, GDUtils.bodyParser(body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDSearchLevel.js'", e);
                } else if(res == "-1"){
                    logger.write(Logger.ERROR, "Received Code -1");
                    return -1;
                } else {
                    
                    res = res.split("#");
                    var levels = res[0].split("|").map(v => GDUtils.convertTable(v, ":"));
                    var creators = res[1].split("|").map(v => GDUtils.Tuple3.apply(null, v.split(":")));
                    var songs = res[2].split(":").map(v => v == "" ? null : GDUtils.convertTable(v, "~|~"));
                    var pages = GDUtils.Tuple3.apply(res[3].split(":"));
                    for(i in levels){
                        let lv = levels[i];
                        let cid = GDUtils.emptyTo(lv[Indexes.LEVEL_CREATOR_ID], "0");
                        let diff = GDDifficulty.getAbsoluteDifficulty(
                                    GDUtils.emptyTo(lv[Indexes.LEVEL_DIFFICULTY], "0"),
                                    GDUtils.emptyTo(lv[Indexes.LEVEL_DEMON_DIFFICULTY], "0"),
                                    GDUtils.emptyTo(lv[Indexes.LEVEL_IS_AUTO], "0"),
                                    GDUtils.emptyTo(lv[Indexes.LEVEL_IS_DEMON], "0")
                                );
                        levels[i] = new GDLevel(
                                lv[Indexes.LEVEL_ID],
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
                                GDUtils.emptyTo(lv[Indexes.LEVEL_SECRET_STUFF_3], "")
                            );
                    }

                    return new Paginator(levels, !page ? 0 : page, Number(pages[3]), Number(page[1]), Array.from(arguments), 
                        (_r, _name, _page, _filter, _field) => searchlevel(_r, _name, _page, _filter, _field)
                    );
                }
            });
}

exports.searchlevel = searchlevel;