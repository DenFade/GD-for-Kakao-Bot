exports.GDMessage = function GDMessage(){
    function GDMessage(id, senderId, subject, loader, ts, isRead){
        
        /*
        @param {String} id - 메시지의 id입니다
        @param {String} senderId - 수신자의 id입니다
        @param {String} subject - 메시지의 제목입니다
        @param {Function} loader - 메시지의 내용을 불러올 함수입니다.
        @param {String} ts - 메시지의 TimeStamp입니다.
        @param {Boolean} isRead - 메시지의 확인 여부입니다.
        */
        
        this.messageId = id;
        this.messageSenderId = senderId;
        this.messageSubject = subject;
        this.messageBody = null;
        this.messageTimeStamp = ts;
        this.messageIsRead = isRead;
        this.messageBodyLoader = loader;
    }

    GDMessage.prototype.getBody = function(){
        var b = this.messageBodyLoader(this.messageId).block();
        if(this.messageBody === null) this.messageBody = b;
        return b;
    }

    GDMessage.prototype.toString = function(){
        let m = Object.keys(this);
        return "    ---Message Data---" + "\n\n" + m.map(v => v + " : " + this[v]).join("\n");
    }

    return GDMessage;
}