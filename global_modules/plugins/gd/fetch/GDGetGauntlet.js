//connect
var Connect = require("../../request/Request").Connection();

//entities
var GDGauntlet = require("../entities/GDGauntlet").GDGauntlet();
var GDLevelPackage = require("../entities/GDLevelPackage").GDLevelPackage();
var Indexes = require("../entities/Index");

//error
var GDError = require("../error/GDError").GDError;

//fetch
var getLevel = require("../fetch/GDGetLevel").getlevel;

//logger
var Logger = require("../../log/Logger").Logger;
var dir = require("../../log/logs/setting").dir;

//utils
var Base64 = require("../utils/Base64");
var GDUtils = require("../utils/GDUtils");
var GDCrypto = require("../utils/GDCrypto");

function getgauntlet(r){

    var body = {}; //no more need zz

    return Connect.POST(GDUtils.URL(Indexes.URL_GET_GAUNTLETS), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDGetGauntlet.js'", err);
                    return null;
                } else if(res == "-1"){
                    logger.write(Logger.ERROR, "Received Code -1");
                    return -1;
                } else {
                    if(r.rawData) logger.write(Logger.DESCRIPTION, res, null);

                    res = res.split("#");
                    let gs = res[0].split("|").map(v => GDUtils.convertTable(v, ":"));
                    logger.write(Logger.TESTACTION, "Secret Value: " + res[1], null); //res[1] 은 본인도 뭐하는앤지 ㅁㄹ
                    
                    for(g in gs){
                        let gData = gs[g];
                        logger.write(Logger.TESTACTION, JSON.stringify(gData), null);
                        let gLevels = gData[Indexes.GAUNTLET_LEVELS].split(",");
                        gs[g] = new GDLevelPackage(GDGauntlet.list[gData[Indexes.GAUNTLET_ID]] + "_GAUNTLET",
                        gLevels,
                            id => getLevel(r, id).block()
                        );
                    }

                    return new GDGauntlet(gs);
                }
            }
    );
}

exports.getgauntlet = getgauntlet;