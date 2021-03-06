//connect
var Connect = require("../../../request/Request").Connection();

//entities
var Indexes = require("../../entities/Index");

//error
var GDError = require("../../error/GDError").GDError;

//logger
var Logger = require("../../../log/Logger").Logger;
var dir = require("../../../log/logs/setting").dir;

//utils
var GDUtils = require("../../utils/GDUtils");
var GDCrypto = require("../../utils/GDCrypto");

function reportlevel(r, id){

    if(id === undefined) throw new GDError("Empty Level ID");

    return Connect.POST(GDUtils.URL(Indexes.URL_REPORT_LEVEL), {}, ("levelID=" + id +"&secret=" + GDCrypto.secrets.DEFAULT), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDLikeLevel.js'", err);
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

reportlevel.toString = function(){
    return "[GDClient.reportLevel <String>]";
}

exports.reportlevel = reportlevel;