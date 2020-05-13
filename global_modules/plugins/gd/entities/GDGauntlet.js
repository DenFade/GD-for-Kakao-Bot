exports.GDGauntlet = function GDGauntlet(){
    function GDGauntlet(gauntlets){
        for(g in gauntlets){
            this[gauntlets[g].title.replace("_GAUNTLET", "")] = gauntlets[g];
        }
    }

    GDGauntlet.list = {
        "1": "FIRE",
        "2": "ICE",
        "3": "POSION",
        "4": "SHADOW",
        "5": "LAVA", 
        "6": "BOUNS",
        "7": "CHAOS",
        "8": "DEMON",
        "9": "TIME",
        "10": "CRYSTAL",
        "11": "MAGIC",
        "12": "SPIKE",
        "13": "MONSTER",
        "14": "DOOM",
        "15": "DEATH"
    };

    GDGauntlet.prototype.toString = function(){
        let glist = Object.keys(this);
        return "    --- Gauntlet Data ---\n\n"+
                glist.map(v => "Name: " + this[v].title + "\nLevels: " + 
                    (!this[v].itemGetAction ? this[v].items : this[v].items.map(v => v[1])).join()
                ).join("\n\n");
    }

    return GDGauntlet;
}