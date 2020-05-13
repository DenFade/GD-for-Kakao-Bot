exports.GDComment = function GDComment(){
    function GDComment(levelid, body, authorid, likes, id, isspam, ts, percentage, user_status, color, type){

        /*
        @param {String} levelid - 레벨ID (Only Level comment)
        @param {String} body - 코멘트 내용
        @param {String} author - 작성자 ID
        @param {String} likes - 코멘트 좋아요 갯수
        @param {String} id - 코멘트 ID
        @param {String} isspam - 스팸처리여부
        @param {String} ts - TimeStamp
        @param {String} percentage - 레벨 퍼센테이지 (Only Level comment)
        @param {String} user_status - 작성자 상태
        @param {String} color - 코멘트 글자 색 (모더 식별용, 존나쓸데없 ㅇㅇ)
        @param {String} type - 코멘트 타입
        */

        this.commentLevelID = levelid;
        this.commentBody = body;
        this.commentAuthorID = authorid;
        this.commentLikes = likes;
        this.commentID = id;
        this.commentIsSpam = isspam;
        this.commentTS = ts;
        this.commentPercentage = percentage;
        this.commentUserStatus = user_status;
        this.commentTextColor = color;
        this.commentType = type;
    }

    GDComment.prototype.toString = function(){
        let p = Object.keys(this);
        return "    ---Comment Data---" + "\n\n" + p.map(v => v + " : " + this[v]).join("\n");
    }

    return GDComment;
}