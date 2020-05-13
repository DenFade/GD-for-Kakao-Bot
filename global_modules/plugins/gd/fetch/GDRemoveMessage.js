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

function removemessage(r, id){

    if(id === undefined) throw new GDError("Empty Message ID");
    
    var body = {
        accountID: r.accountID,
        gjp: r.pass,
        messageID: id,
    };

    return Connect.POST(GDUtils.URL(Indexes.URL_DELETE_PRIVATE_MESSAGE), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDRemoveMessage.js'", err);
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

exports.removemessage = removemessage;