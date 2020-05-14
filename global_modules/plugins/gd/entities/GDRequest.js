exports.GDRequest = function GDRequest(){
    function GDRequest(senderName, senderId, senderAccid, id, body, ts, status, indicator){

        /*
        @param senderName - 수신자 이름
        @param senderId - 수신자 플레이어 ID
        @param senderAccid - 수신자 Account ID
        @param id - 요청 ID
        @param body - 요청 내용
        @param ts - TimeStamp
        @param status - 요청? 수신자? 상태
        @param indicator - idk ???
        */

        this.requestSenderName = senderName;
        this.requestSenderId = senderId;
        this.requestSenderAccid = senderAccid;
        this.requsetId = id;
        this.requestBody = body;
        this.requestTS = ts;
        this.requestStatus = status;
        this.requestIndicator = indicator;
    }

    GDRequest.prototype.toString = function(){
        let r = Object.keys(this);
        return "    ---Request Data---" + "\n\n" + r.map(v => v + " : " + this[v]).join("\n");
    }

    return GDRequest;
}