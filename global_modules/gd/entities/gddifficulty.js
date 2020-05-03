const GDDifficulty = {
    NA: 0,
    AUTO: 1,
    EASY: 2,
    NORMAL: 3,
    HARD: 4,
    HARDER: 5,
    INSANE: 6,
    EASY_DEMON: 7,
    MEDIUM_DEMON: 8,
    HARD_DEMON: 9,
    INSANE_DEMON: 10,
    EXTREME_DEMON: 11,
    getAbsoluteDifficulty: function(levelDiff, demonDiff, isAuto, isDemon){
        var d;
        if(isAuto) return GDDifficulty.AUTO;
        else if(isDemon){
            switch(demonDiff){
                case "3":
                    d = GDDifficulty.EASY_DEMON; break;
                case "4":
                    d = GDDifficulty.MEDIUM_DEMON; break;
                case "5":
                    d = GDDifficulty.INSANE_DEMON; break;
                case "6":
                    d = GDDifficulty.EXTREME_DEMON; break;
                default:
                    d = GDDifficulty.HARD_DEMON;
            }
            return d;
        } else {
            switch(levelDiff){
                case "10":
                    d = GDDifficulty.EASY; break;
                case "20":
                    d = GDDifficulty.NORMAL; break;
                case "30":
                    d = GDDifficulty.HARD; break;
                case "40":
                    d = GDDifficulty.HARDER; break;
                case "50":
                    d = GDDifficulty.INSANE; break;
                default:
                    d = GDDifficulty.NA;
            }
            return d;
        }
    }
}