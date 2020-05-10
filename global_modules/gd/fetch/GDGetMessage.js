//connect
var Connect = require("./Request").Connection();

//entities
var Indexes = require("../entities/Index");

//error
var GDError = require("../error/gderror").GDError;

//logger
var Logger = require("../../log/Logger").Logger;
var dir = require("../../log/logs/setting").dir;

//utils
var GDUtils = require("../utils/GDUtils");
var GDCrypto = require("../utils/GDCrypto");

function getmessage(r, id){

    if(id == undefined) throw new GDError("Empty message id");

    if(!r.authicated) throw new GDError("Need Login")

    var body = {
        messageID: id,
        accountID: r.accountID,
        gjp: r.pass
    };

    return Connect.POST(GDUtils.URL(Indexes.URL_READ_PRIVATE_MESSAGE), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true, 
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDGetMessage.js'", err);
                    return null;
                } else if(res == "-1"){
                    logger.write(Logger.ERROR, "Received Code -1");
                    return -1;
                } else {
                    var m = GDUtils.convertTable(res, ":");
                    return GDCrypto.decodeMsgBody(m[Indexes.MESSAGE_BODY]);
                }
            }
    );
}

exports.getmessage = getmessage;