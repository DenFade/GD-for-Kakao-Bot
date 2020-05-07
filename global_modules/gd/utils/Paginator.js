function Paginator(items, currentPage, maxItemsPerPage, totalItems, params, pageMoveAction) {

    /*
    @param items : levels, users, comments, etc..
    @param currentPage : currentPage number(count to 0, 1, 2..)
    @param maxItemsPerPage : max items count per page
    @param totlaItems : total items count
    @param params : need for pageMoveAction
    @param pageMoveAction : function called when moving the page
    */

    this.items = items;
    this.currentPage = currentPage;
    this.maxItemsPerPage = maxItemsPerPage;
    this.totalItems = totalItems;
    this.imple = params;
    this.totalPages = Math.floor(totalItems / maxItemsPerPage);
    this.pageMoveAction = pageMoveAction;
}

Paginator.prototype.hasNext = function(){
    return this.page < this.totalPages;
}

Paginator.prototype.hasPre = function(){
    return this.page > 0;
}

Paginator.prototype.moveNext = function(){
    params[2] = ++this.currentPage;
    return this.pageMoveAction.apply(null, params);
}

Paginator.prototype.movePre = function(){
    params[2] = ++this.currentPage;
    return this.pageMoveAction.apply(null, params);
}

Paginator.prototype.moveSpecificPage = function(p){
    if(typeof p != "number" || p < 0) throw new GDError("Page must 0 or higher");
    params[2] = p;
    return this.pageMoveAction.apply(null, params);
}

exports.Paginator = Paginator;