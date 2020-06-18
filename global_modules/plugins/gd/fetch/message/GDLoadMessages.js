//connect
var Connect = require("../../../request/Request").Connection();

//entities
var GDMessage = require("../../entities/GDMessage").GDMessage();
var Indexes = require("../../entities/Index");

//error
var GDError = require("../../error/gderror").GDError;

//fetch
var getMessage = require("./GDGetMessage").getmessage;

//logger
var Logger = require("../../../log/Logger").Logger;
var dir = require("../../../log/logs/setting").dir;

//utils
var Base64 = require("../../utils/Base64");
var GDUtils = require("../../utils/GDUtils");
var Paginator = require("../../utils/Paginator").Paginator();

function loadmessages(r, page){
    
    if(!r.authenticated) throw new GDError("Need Login");

    var body = {
        total: 0,
        page: GDUtils.emptyTo(page, 0),
        accountID: r.accountID,
        gjp: r.pass,
    };

    return Connect.POST(GDUtils.URL(Indexes.URL_GET_PRIVATE_MESSAGES), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
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
                    
                    res = res.split("#");

                    var messages = res[0].split("|").map(v => GDUtils.convertTable(v, ":"));
                    var pages = (function (){
                        let ps = res[1].split(":");
                        return GDUtils.Tuple3(ps[0], ps[1], ps[2]);
                    }).bind(this)();

                    for(i in messages){
                        let m = messages[i];
                        messages[i] = new GDMessage(
                            m[Indexes.MESSAGE_ID],
                            GDUtils.emptyTo(m[Indexes.MESSAGE_SENDER_ID], "0"),
                            GDUtils.emptyTo(m[Indexes.MESSAGE_SENDER_NAME], "-"),
                            (function (){
                                let s = GDUtils.emptyTo(m[Indexes.MESSAGE_SUBJECT], "");
                                return !s ? "" : Base64.decode(s);
                            }).bind(this)(),
                            (id) => getMessage(r, id).block(),
                            GDUtils.emptyTo(m[Indexes.MESSAGE_TIMESTAMP], "0"),
                            GDUtils.emptyTo(m[Indexes.MESSAGE_IS_READ], "0") == "1"
                        );
                    }

                    return new Paginator(messages, !page ? 0 : page, Number(pages[2]), Number(pages[0]),
                        newPage => loadmessages(r, newPage)
                    );
                }
            }
    )
}

loadmessages.toString = function(){
    return "[GDClient.loadMessages <Paginator <GDMessage>>]";
}

exports.loadmessages = loadmessages;