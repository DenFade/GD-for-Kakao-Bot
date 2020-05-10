exports.Paginator = function Paginator(){
    function Paginator(items, currentPage, maxItemsPerPage, totalItems, pageMoveAction) {

        /*
        @param items : levels, users, comments, etc..
        @param currentPage : currentPage number(count to 0, 1, 2..)
        @param maxItemsPerPage : max items count per page
        @param totlaItems : total items count
        @param pageMoveAction : function called when moving the page
        */

        this.items = items;
        this.currentPage = currentPage;
        this.maxItemsPerPage = maxItemsPerPage;
        this.totalItems = totalItems;
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
        this.currentPage++;
        return this.pageMoveAction(this.currentPage);
    }

    Paginator.prototype.movePre = function(){
        this.currentPage++;
        return this.pageMoveAction(this.currentPage);
    }

    Paginator.prototype.moveSpecificPage = function(p){
        if(typeof p != "number" || p < 0) throw new GDError("Page must 0 or higher");
        return this.pageMoveAction(this.currentPage = p);
    }

    Paginator.prototype.toString = function(){
        let ls = this.items.map(v => v.toString()).join("\n\n\n");
        return "    --- Paginator Data ---\n\n"+
                "       --- Items ---\n\n"+
                ls+
                "\n\n       --- Paginator Info ---\n\n"+
                "currentPage : " + this.currentPage +"\n"+
                "maxItemPerPage : " + this.maxItemsPerPage +"\n"+
                "totalItems : " + this.totalItems +"\n"+
                "totalPages : " + this.totalPages +"\n"+
                "pageMoveAction : " + this.pageMoveAction;
    }

    return Paginator;
}