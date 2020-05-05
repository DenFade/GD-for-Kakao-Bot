function GDLevel(id, name, desc, data, version, creatorid, creatoraccid, creatorname, difficulty, downloads, audio, gameVer, likes, length, isDemon, star, featuredScore, isAuto, pass, uploadedTS, lastUpdatedTS, original, coinCount, coinVerified, requestedStars, ldm, isEpic, objectCount, secret1, secret2, secret3){

    /*
    @param id : the level of id
    @param name : the level of name
    @param desc : the level of description
    @param data : the level of ziped string form
    @param version : the level of version
    @param creatorid : the level of creator's player id
    @param creatoraccid : the level of creator's account id
    @param creatorname : the level of creator's name
    @param difficulty : the level of difficulty
    @param downloads : the level of download count
    @param audio : the level of gd song(0 ~ 20)
    @param gameVer : the level of Geometry Dash Version
    @param likes : the level of like count
    @param length : the level of length
    @param isDemon : demon or not
    @param star : the level of rated star
    @param featuredScore : the level of featured score
    @param isAuto : auto or not
    @param pass : the level of copy pass
    @param uploadedTS : the level of uploaded timestamp
    @param lastUpdatedTS : the level of last updated timestamp
    @param original : the level of original ver level id
    @param coinCount : the level of coin count
    @param coinVerified : coin verified or not
    @param requestedStars : the level of requested star
    @param ldm : ldm exist of not
    @param isEpic : epic level or not
    @param objectCount : the level of object count
    @param secret1 : idk ???
    @param secret2 : idk ???
    @param secret3 : idk ???
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

}

exports.GDLevel = GDLevel;