module.exports = {
    save: function(path, data, former){
        FileStream.write(path, !former ? data : former(data));
    },
    load: function(path, getter){
        var res = FileStream.read(path);
        return !getter ? res : getter(res);
    },
    edit: function(path, getter, editor, former){
        var res = this.load(path, getter);
        if(res == null) throw new Error("No such file");
        res = editor(res);
        this.save(path, res, former)
    },
    concatJSON: function(path, data){
        this.edit(path+".json", _ => JSON.parse(_), __ => {
            var arr = __;
            arr.push(data);
            return arr;
        }, ___ => JSON.stringify(___, null, 4));
    }
}