function Logger(dir, name){
    this.name = name;
    this.path = "/storage/emulated/0/" + dir + "/global_modules/log/logs/" + name + ".json";

    if(!new java.io.File(this.path).exists()) FileStream.write(this.path, JSON.stringify({
        dir: dir,
        name: name,
        log: []
    }, null, 4));
}

Logger.build = function(dir, name){
    return new Logger(dir, name);
}

Logger.SUCCESS = "[SUCCESS !]";
Logger.ERROR = "[ERROR !]";
Logger.TESTACTION = "[TEST ACTION]";
Logger.DESCRIPTION = "[DESCRIPTION]";

Logger.prototype.write = function(status, text, implements){
    let f = JSON.parse(FileStream.read(this.path));
    f.log.push({
        date: Date.now(),
        status: status,
        text: text,
        implements: implements === undefined ? null : implements
    })
    FileStream.write(this.path, JSON.stringify(f, null, 4));
}

Logger.prototype.lookUp = function(filter){
    let l = JSON.parse(FileStream.read(this.path)).log;
    return !filter ? l : l.filter(filter);
}

exports.Logger = Logger;