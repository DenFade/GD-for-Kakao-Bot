exports.GDLevel = function GDLevel(){
    function GDLevel(id, name, desc, data, version, creatorid, creatoraccid, creatorname, difficulty, downloads, audio, gameVer, likes, length, isDemon, star, featuredScore, isAuto, pass, uploadedTS, lastUpdatedTS, original, coinCount, coinVerified, requestedStars, ldm, isEpic, objectCount, secret1, secret2, secret3, refresher){

        /*
        @param {String} id - the level of id
        @param {String} name - the level of name
        @param {String} desc - the level of description
        @param {String} data - the level of ziped string form
        @param {String} version - the level of version
        @param {String} creatorid - the level of creator's player id
        @param {String} creatoraccid - the level of creator's account id
        @param {String} creatorname - the level of creator's name
        @param {Number} difficulty - the level of difficulty
        @param {String} downloads - the level of download count
        @param {String} audio - the level of gd song(0 ~ 20)
        @param {String} gameVer - the level of Geometry Dash Version
        @param {String} likes - the level of like count
        @param {String} length - the level of length
        @param {Boolean} isDemon - demon or not
        @param {String} star - the level of rated star
        @param {String} featuredScore - the level of featured score
        @param {Boolean} isAuto - auto or not
        @param {String} pass - the level of copy pass
        @param {String} uploadedTS - the level of uploaded timestamp
        @param {String} lastUpdatedTS - the level of last updated timestamp
        @param {String} original - the level of original ver level id
        @param {String} coinCount - the level of coin count
        @param {String} coinVerified - coin verified or not
        @param {String} requestedStars - the level of requested star
        @param {String} ldm - ldm exist of not
        @param {String} isEpic - epic level or not
        @param {String} objectCount - the level of object count
        @param {String} secret1 - idk ???
        @param {String} secret2 - idk ???
        @param {String} secret3 - idk ???
        @param {Function} refresher - the refresher
        */

        this.levelID = id;
        this.levelName = name;
        this.levelDescription = desc;
        this.levelData = data;
        this.levelVersion = version;
        this.levelCreatorID = creatorid;
        this.levelCreatorAccountID = creatoraccid;
        this.levelCreatorName = creatorname;
        this.levelDifficulty = difficulty;
        this.levelDownloads = downloads;
        this.levelAudioTrack = audio;
        this.levelGDVersion = gameVer;
        this.levelLikes = likes;
        this.levelLength = length;
        this.levelIsDemon = isDemon;
        this.levelStars = star;
        this.levelFeaturedScore = featuredScore;
        this.levelIsAuto = isAuto;
        this.levelPass = pass;
        this.levelUploaded = uploadedTS;
        this.levelLastUpdated = lastUpdatedTS;
        this.levelOriginal = original;
        this.levelCoinCount = coinCount;
        this.levelCoinVerified = coinVerified;
        this.levelRequstedStars = requestedStars;
        this.levelHasLdm = ldm;
        this.levelIsEpic = isEpic;
        this.levelObjectCount = objectCount;
        this.levelSecret1 = secret1;
        this.levelSecret2 = secret2;
        this.levelSecret3 = secret3;
        this.refresher = refresher;
    }

    GDLevel.prototype.refresh = function(){
        return this.refresher();
    }

    return GDLevel;
}