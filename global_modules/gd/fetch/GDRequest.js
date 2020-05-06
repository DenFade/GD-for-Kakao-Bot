function GDRequest(){
    this.body.gdw = 4;
    this.body.gameVersion = 21;
    this.body.binaryVersion = 35;
}

GDRequest.prototype.authicate = function(accid, nick, pass){

    /*
    @params

    (Number) accid : the AccountId
    (String) nick : the Nickname
    (String) pass : the Password
    */

    if(!accid || !pass) throw new TypeError("AccountID and password must not be empty");

    this.accountID = accid;
    this.nick = nick;
    this.pass = new GDCrypto(pass).encodeAccPass();
    this.authicated = true;
}

exports.GDRequest = GDRequest;