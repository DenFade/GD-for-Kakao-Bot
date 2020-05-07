const GDLength = {
    "0": "TINY",
    "1": "SHORT",
    "2": "MEDIUM",
    "3": "LONG",
    "4": "XL",
    getAbsoluteLength: function (l){
        return this[l];
    }
}

exports.GDLength = GDLength;