//connect
var Connect = require("../../../request/Request").Connection();

//error
var GDError = require("../../error/GDError").GDError;

//entities
var GDRequest = require("../../entities/GDRequest").GDRequest();
var Indexes = require("../../entities/Index");

//logger
var Logger = require("../../../log/Logger").Logger;
var dir = require("../../../log/logs/setting").dir;

//utils
var Base64 = require("../../utils/Base64");
var GDUtils = require("../../utils/GDUtils");
var Paginator = require("../../utils/Paginator").Paginator();

function loadfriends(r, page, isSent){

    if(!r.authenticated) throw new GDError("Need Login");

    var body = {
        accountID: r.accountID,
        gjp: r.pass,
        total: 0,
        page: GDUtils.emptyTo(page, 0),
    };

    if(isSent) body.getSent = 1;

    return Connect.POST(GDUtils.URL(Indexes.URL_GET_FRIEND_REQUESTS), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDLoadFriendRequests.js'", err);
                } else if(res == "-1"){
                    logger.write(Logger.ERROR, "Received Code -1");
                    return -1;
                } else {
                    if(r.rawData) logger.write(Logger.DESCRIPTION, res, null);

                    res = res.split("#");
                    var requests = res[0].split("|").map(v => GDUtils.convertTable(v, ":"));
                    
                    for(i in requests){
                        let req = requests[i];
                        requests[i] = new GDRequest(
                            GDUtils.emptyTo(req[Indexes.REQUEST_SENDER_NAME], "-"),
                            GDUtils.emptyTo(req[Indexes.REQUEST_SENDER_ID], "0"),
                            GDUtils.emptyTo(req[Indexes.REQUEST_SENDER_ACCOUNT_ID], "0"),
                            GDUtils.emptyTo(req[Indexes.REQUEST_ID], "0"),
                            Base64.decode(GDUtile.emptyTo(req[Indexes.REQUEST_BODY], "")),
                            GDUtils.emptyTo(req[Indexes.REQUEST_TIMESTAMP], "0"),
                            GDUtils.emptyTo(req[Indexes.REQUEST_STATUS], ""),
                            GDUtils.emptyTo(req[Indexes.REQUEST_INDICATOR], "")
                        );
                    }

                    return new Paginator(requests, !page ? 0 : page, 20, Infinity, 
                        newPage => loadfriends(r, newPage, isSent)
                    );
                }
            }
    );
}

exports.loadfriends = loadfriends;