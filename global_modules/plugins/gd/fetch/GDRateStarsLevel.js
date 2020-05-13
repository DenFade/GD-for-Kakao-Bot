//connect
var Connect = require("../../request/Request").Connection();

//entities
var Indexes = require("../entities/Index");

//error
var GDError = require("../error/GDError").GDError;

//logger
var Logger = require("../../log/Logger").Logger;
var dir = require("../../log/logs/setting").dir;

//utils
var GDUtils = require("../utils/GDUtils");
var GDCrypto = require("../utils/GDCrypto");

function ratestars(r, id, star, customUdid){

    if(id === undefined) throw new GDError("Empty Level ID");
    if(star < 1 || star > 10) throw new GDError("Star value must be 1~10 integer");
    if(!r.authenticated) throw new GDError("Need Login");

    var fakeUdid = GDUtils.emptyTo(customUdid, GDCrypto.makeUuid());
    var fakeUuid = r.udata.id;
    var rs = GDCrypto.makeRs();
    var chunkData = [id, star, rs, r.accountID, fakeUdid, fakeUuid, GDCrypto.salts.rate];
                    //levelId, like, rs, accountId, udid, uuid, salt

    var body = {
        accountID: r.accountID,
        gjp: r.pass,
        udid: fakeUdid,
        uuid: fakeUuid,
        levelID: id,
        stars: star,
        rs: rs,
        chk: GDCrypto.makeChk(chunkData, GDCrypto.rate)
    };

    return Connect.POST(GDUtils.URL(Indexes.URL_RATE_LEVEL_STARS), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDRateStarsLevel.js'", err);
                    return null;
                } else if(res == "-1"){
                    logger.write(Logger.ERROR, "Received Code -1");
                    return -1;
                } else {
                    if(r.rawData) logger.write(Logger.DESCRIPTION, res, null);

                    return res == "1" ? "SUCCESS" : "FAILED";
                }
            }
    );
}

exports.ratestars = ratestars;