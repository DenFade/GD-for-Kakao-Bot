//connect
var Connect = require("../../../request/Request").Connection();

//error
var GDError = require("../../error/GDError").GDError;

//entities
var Indexes = require("../../entities/Index");

//logger
var Logger = require("../../../log/Logger").Logger;
var dir = require("../../../log/logs/setting").dir;

//utils
var GDUtils = require("../../utils/GDUtils");
var Base64 = require("../../utils/Base64");
var GDCrypto = require("../../utils/GDCrypto");

function sendmessage(r, accountID, title, content) {
    
    if(accountID == undefined) throw new GDError("Account ID is not vaild.");
    if(!r.authenticated) throw new GDError("Need Login")

    var body = {
        accountID : r.accountID,
        gjp : r.pass,
        toAccountID : accountID,
        subject : Base64.encode(title),
        body : GDCrypto.encodeMsgBody(content)
    };

    return Connect.POST(GDUtils.URL(Indexes.URL_SEND_PRIVATE_MESSAGE), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDSendMessage.js'", err);
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

sendmessage.toString = function(){
    return "[GDClient.sendMessage <String>]";
}

exports.sendMessage = sendmessage;