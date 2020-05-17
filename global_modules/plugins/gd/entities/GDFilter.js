exports.GDFilter = function GDFilter(){
    function GDFilter(){
        this.diff = "";
        this.len = "";
        this.demonFilter = "";

    }

    GDFilter.AUTO = "-3";
    GDFilter.DEMON = "-2";
    GDFilter.EASY_DEMON = "-2/1";
    GDFilter.MEDIUM_DEMON = "-2/2";
    GDFilter.HARD_DEMON = "-2/3";
    GDFilter.INSANE_DEMON = "-2/4";
    GDFilter.EXTREME_DEMON = "-2/5";
    GDFilter.NA = "-1";
    GDFilter.EASY = "1";
    GDFilter.NORMAL = "2";
    GDFilter.HARD = "3";
    GDFilter.HARDER = "4";
    GDFilter.INSANE = "5";

    GDFilter.TINY = "0";
    GDFilter.SHORT = "1";
    GDFilter.MEDIUM = "2";
    GDFilter.LONG = "3";
    GDFilter.XL = "4";

    GDFilter.prototype.setDifficulty = function(diff){
        var diffs = Array.from(arguments);
        if(diffs.length > 1){
            if(diffs.some(v => v.startsWith("-"))) throw new TypeError("Multi-difficulty is only available with EASY ~ INSANE");
            else this.diff = diffs.join();
        } else {
            if(diffs[0] == GDFilter.AUTO) this.diff = GDFilter.AUTO;
            else if(diffs[0] == GDFilter.NA) this.diff = GDFilter.NA;
            else {
                var splitted = diffs[0].split("/");
                this.diff = splitted[0];
                this.demonFilter = splitted[1];
            }
        }

        return this;
    }

    GDFilter.prototype.setLength = function(len){
        this.len = Array.from(arguments).join();
        return this;
    }
}