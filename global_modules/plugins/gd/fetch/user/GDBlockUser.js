//connect
var Connect = require("../../../request/Request").Connection();

//error
var GDError = require("../../error/GDError").GDError;

//entities
var Indexes = require("../../entities/Index");

//logger
var Logger = require("../../../log/Logger").Logger;

//utils
var GDUtils = require("../../utils/GDUtils");

function block_user(r, id) {
    if(id === undefined) throw new GDError("Target id is not vaild.");

    let body = {
        accountID : r.accountID,
        gjp : r.pass,
        targetAccountID : id
    }
    return Connect.POST(GDUtils.URL(Indexs.URL_BLOCK_USER), {}, GDUtils.bodyParser(r, body), r.timeout, true, true, 
    (res, err) => {
        let logger = Logger.build(dir, "gdlogs");
        if(err !== null){
            logger.write(Logger.ERROR, "An error has occured -> from 'GDBlockUser.js'", err);
            return null;
        } else if(res == "-1"){
            logger.write(Logger.ERROR, "Received Code -1");
            return -1;
        } else {
            if(r.rawData) logger.write(Logger.DESCRIPTION, res, null);

            return res == "1" ? "SUCCESS" : "FAILED";
        }
    });
}

exports.block_user = block_user;