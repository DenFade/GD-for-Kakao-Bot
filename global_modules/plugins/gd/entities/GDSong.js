exports.GDSong = function GDSong(){
    function GDSong(author, id, title, isNGSong, size, downloadLink, secretLink){

        /*
        @param author : the song of author
        @param title : the song of title
        @param id : the song of id(or 0 ~ 20)
        @param isNGSong : newgrounds bgm or not
        @param size : the song of size
        @param downloadLink : the song of download link
        @param secretLink : idk ???
        */

        this.author = author;
        this.id = id;
        this.title = title;
        this.size = size;
        this.listenLink = !isNGSong ? "" : "https://www.newgrounds.com/audio/listen/" + id;
        this.downloadLink = !isNGSong ? "" : decodeURI(downloadLink);
        this.secretLink = !secretLink ? "" : secretLink;
    }

    GDSong.empty = function(){
        return new GDSong("", "", "", true, "", "", "");
    }

    GDSong.basicSongs = {
        "0": new GDSong("ForeverBound", 0, "Stereo Madness", false),
        "1": new GDSong("DJVI", 1, "Back On Track", false),
        "2": new GDSong("Step", 2, "Polargeist", false),
        "3": new GDSong("DJVI", 3, "Dry Out", false),
        "4": new GDSong("DJVI", 4, "Base After Base", false),
        "5": new GDSong("DJVI", 5, "Cant Let Go", false),
        "6": new GDSong("Waterflame", 6, "Jumper", false),
        "7": new GDSong("Waterflame", 7, "Time Machine", false),
        "8": new GDSong("DJVI", 8, "Cycles", false),
        "9": new GDSong("DJVI", 9, "xStep", false),
        "10": new GDSong("Waterflame", 10, "Clutterfunk", false),
        "11": new GDSong("DJ-Nate", 11, "Theory of Everything", false),
        "12": new GDSong("Waterflame", 12, "Electroman Adventures", false),
        "13": new GDSong("DJ-Nate", 13, "Clubstep", false),
        "14": new GDSong("DJ-Nate", 14, "Electrodynamix", false),
        "15": new GDSong("Waterflame", 15, "Hexagon Force", false),
        "16": new GDSong("Waterflame", 16, "Blast Processing", false),
        "17": new GDSong("DJ-Nate", 17, "Theory of Everything 2", false),
        "18": new GDSong("Waterflame", 18, "Geometrical Dominator", false),
        "19": new GDSong("F-777", 19, "Deadlocked", false),
        "20": new GDSong("MDK", 20, "Fingerdash")
    };

    GDSong.prototype.toString = function(){
        let p = Object.keys(this);
        return "    ---Song Data---" + "\n\n" + p.map(v => v + " : " + this[v]).join("\n");
    }

    return GDSong;
}