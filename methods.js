Object.prototype.entries = function(obj) {
    var ownProps = Object.keys(obj),
        i = ownProps.length,
    resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
    return resArray;
};

/*

{
    get name(params) {
        statements...
    },

    set name(params) {
        statements...
    }
}

*/

/*
how to use Generator

function name([param[, param[, ... param]]]) {
    statements...
    (use yield) ex) yeild params;
}

how to get Iterator

for (variable of iterable) {
    statements...
}

*/

//hmm
//added GDRequest.prototype.editParams
//added GDRequest.prototype.addParams