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

function ratedemon(r, id, demon){

    if(id === undefined) throw new GDError("Empty Level ID");
    if(demon < 1 || demon > 5) throw new GDError("Demon Value must be 1~5 integer");
    if(!r.authenticated) throw new GDError("Need Login");

    var body = {
        secret: GDCrypto.secrets.RATE_DEMON,
        accountID: r.accountID,
        gjp: r.pass,
        levelID: id,
        rating: demon
    };

    return Connect.POST(GDUtils.URL(Indexes.URL_RATE_LEVEL_DEMON), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDRateDemonLevel.js'", err);
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

exports.ratedemon = ratedemon;