exports.GDUser = function GDUser() {
    function GDUser(name, playerID, stars, demons, creatorPoints, icon, color1, color2, secretCoins, iconType, glowOutline, accountID, userCoins, privateMessage, friendRequest, youtube, iconCube, iconShip, iconBall, iconUfo, iconWave, iconRobot, glowOutline2, globalRank, iconSpider, twitter, twitch, diamonds, deathEffect, role, commentHistory, refresher) {
        
        /*
        @param {String} name - 플레이어의 이름
        @param {String} playerID - 플레이어의 Player ID
        @param {String} stars - 플레이어의 별 갯수
        @param {String} demons - 플레이어의 데몬 갯수
        @param {String} creatorPoints - 플레이어의 크리에이터 포인트(CP) 갯수
        @param {String} icon - 플레이어의 아이콘..?
        @param {String} color1 - 플레이어의 1번째 컬러
        @param {String} color2 - 플레이어의 2번쨰 컬러
        @param {String} secretCoins - 플레이어의 시크릿 코인 갯수
        @param {String} iconType - 플레이어의 아이콘 타입..?
        @param {Boolean} glowOutline - 플레이어의 글로우 라인 여부
        @param {String} accountID - 플레이어의 Account ID
        @param {String} userCoins - 플레이어의 유저 코인 갯수
        @param {String} privateMessage - 플레이어의 개인 메시지 수신 범위
        @param {Boolean} friendRequest - 플레이어의 친구 요청 허용 여부
        @param {String} youtube - 플레이어의 유튜브 링크
        @param {String} iconCube - 플레이어의 큐브 아이콘
        @param {String} iconShip - 플레이어의 비행 아이콘
        @param {String} iconBall - 플레이어의 볼 아이콘
        @param {String} iconWave - 플레이어의 웨이브 아이콘
        @param {String} iconRobot - 플레이어의 로봇 아이콘
        @param {Boolean} glowOutline2 - 플레이어의 2nd 글로우 라인..?
        @param {String} globalRank - 플레이어의 글로벌 랭킹
        @param {String} iconSpider - 플레이어의 거미 아이콘 
        @param {String} twitter - 플레이어의 트위터 링크
        @param {String} twitch - 플레이어의 트위치 링크
        @param {String} diamonds - 플레이어의 다이아몬드 갯수
        @param {String} deathEffect - 플레이어의 데스 이팩트
        @param {String} role - 플레이어의 지위
        @param {String} commentHistory - 플레이어의 코멘트 히스토리 공개 범위
        @param {Function} refresher - refresh 호출시 실행할 함수
        */

        this.userName = name;
        this.userPlayerID = playerID;
        this.userStars = stars;
        this.userDemons = demons;
        this.userCreatorPoints = creatorPoints;
        this.userIcon = icon;
        this.userColor1 = color1;
        this.userColor2 = color2;
        this.userSecretCoins = secretCoins;
        this.userIconType = iconType;
        this.userGlowOutline = glowOutline;
        this.userAccountID = accountID;
        this.userUserCoins = userCoins;
        this.userPrivateMessage = privateMessage;
        this.userFriendRequest = friendRequest;
        this.userYoutube = youtube;
        this.userIconCube= iconCube;
        this.userIconShip = iconShip;
        this.userIconBall = iconBall;
        this.userIconUfo = iconUfo;
        this.userIconWave = iconWave;
        this.userIconRobot = iconRobot;
        this.userGlowOutline2 = glowOutline2;
        this.userGlobalRank = globalRank;
        this.userIconSpider = iconSpider;
        this.userTwitter = twitter;
        this.userTwitch = twitch;
        this.userDiamonds = diamonds;
        this.userDeathEffect = deathEffect;
        this.userRole = role;
        this.userCommentHistory = commentHistory;
    }

    GDUser.prototype.refresh = function () {
        return this.refresher();
    }

    GDUser.prototype.toString = function () {
        let p = Object.keys(this);
        return "    ---User Data---" + "\n\n" + p.map(v => v + " : " + this[v]).join("\n");
    }

    return GDUser;
}