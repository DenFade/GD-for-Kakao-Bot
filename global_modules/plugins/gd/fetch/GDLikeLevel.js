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

function likelevel(r, id, like, customUdid){

    if(id === undefined) throw new GDError("Empty Level ID");
    if(!r.authenticated) throw new GDError("Need Login");

    var type = 1;
    var special = 0;
    var like = +GDUtils.emptyTo(like, true);
    var fakeUdid = GDUtils.emptyTo(customUdid, GDCrypto.makeUuid());
    var fakeUuid = r.udata.id;
    var rs = GDCrypto.makeRs();
    var chunkData = [special, id, like, type, rs, r.accountID, fakeUdid, fakeUuid];
                    //special, levelId, like, type, rs, accountId, udid, uuid, salt

    var body = {
        gameVersion: 20,
        accountID: r.accountID,
        gjp: r.pass,
        udid: fakeUdid,
        uuid: fakeUuid,
        itemID: id,
        like: like,
        type: type,
        special: special,
        rs: rs,
        chk: GDCrypto.makeChk(chunkData, "ysg6pUrtjn0J")
    };

    return Connect.POST(GDUtils.URL(Indexes.URL_LIKE_ITEM), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDLoadMessages.js'", err);
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

exports.likelevel = likelevel;