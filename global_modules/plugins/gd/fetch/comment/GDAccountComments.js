//connect
var Connect = require("../../../request/Request").Connection();

//entities
var GDComment = require("../../entities/GDComment").GDComment();
var Indexes = require("../../entities/Index");

//error
var GDError = require("../../error/GDError").GDError;

//logger
var Logger = require("../../../log/Logger").Logger;
var dir = require("../../../log/logs/setting").dir;

//utils
var Base64 = require("../../utils/Base64");
var GDUtils = require("../../utils/GDUtils");
var Paginator = require("../../utils/Paginator").Paginator();

function accountcomments(r, accountID, page){

    if(!accountID) throw new GDError("Empty Account ID Name");

    var body = {
        accountID: accountID,
        page: !page ? 0 : page,
        total: 0
    };

    return Connect.POST(GDUtils.URL(Indexes.URL_GET_ACC_COMMENTS), {}, GDUtils.bodyParser(r, body), r.timeout, {}, true, true,
            (res, err) => {
                let logger = Logger.build(dir, "gdlogs");
                if(err !== null){
                    logger.write(Logger.ERROR, "An error has occured -> from 'GDAccountComments.js'", err);
                } else if(res == "-1"){
                    logger.write(Logger.ERROR, "Received Code -1");
                    return -1;
                } else {
                    if(r.rawData) logger.write(Logger.DESCRIPTION, res, null);

                    res = res.split("#");
                    var comments = res[0].split("|").map(v => GDUtils.convertTable(v, "~"));
                    var pages = (function (){
                        let ps = res[1].split(":");
                        return GDUtils.Tuple3(ps[0], ps[1], ps[2]);
                    }).bind(this)();

                    for(c in comments){
                        let cc = comments[c];
                        comments[c] = new GDComment(
                            "",
                            Base64.decode(cc[Indexes.COMMENT_BODY]),
                            "",
                            GDUtils.emptyTo(cc[Indexes.COMMENT_LIKES], "0"),
                            GDUtils.emptyTo(cc[Indexes.COMMENT_ID], "0"),
                            "",
                            GDUtils.emptyTo(cc[Indexes.COMMENT_TIMESTAMP], "0"),
                            "",
                            "",
                            "",
                            ""
                        );
                    }

                    return new Paginator(comments, !page ? 0 : page, Number(pages[2]), Number(pages[0]),
                        newPage => new accountcomments(r, accountID, newPage)
                    );
                }
            }
    );
}

accountcomments.toString = function(){
    return "[GDClient.accountComments <Paginator <GDComment>>]";
}

exports.accountcomments = accountcomments;