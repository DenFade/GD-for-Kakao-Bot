GDError = function(message){
    try{__}catch(e){
        this.name = "GDError";
        this.message = message;
        this.lineNumber = e.lineNumber;
        this.stack = e.stack;
    }
}
    
GDError.prototype = Object.create(Error.prototype);
GDError.prototype.constructor = GDError;

exports.GDError = GDError;