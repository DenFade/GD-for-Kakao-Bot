//error
var GDError = require("../error/GDError").GDError;

exports.GDLevelPackage = function GDLevelPackage(){
    function GDLevelPackage(title, items, itemGetAction) {

        /*
        @param {String} title - 패키지 타이틀
        @param {Array} items - 레벨, 유저 등등..
        @param {Function} itemGetAction - 아이템 데이터 요청시 호출되는 함수
        */

        this.title = title;
        this.items = items;
        this.itemGetAction = itemGetAction;
    }

    GDLevelPackage.prototype.get = function(idx){
        if(idx < 0 || idx >= this.items.length) throw new GDError("Index must be 0~"+(this.items.length-1)+" integer");
        return this.itemGetAction(this.items[idx]);
    }

    GDLevelPackage.prototype.getAll = function(){
        let newItems = [];
        for(i in this.items){
            newItems[i] = this.itemGetAction(this.items[i]);
        }
        return new GDLevelPackage(this.title, newItems, null);
    }

    GDLevelPackage.prototype.toString = function(){
        return "    --- LevelPackage Data ---\n"+
                "Title: " + this.title +"\n"+
                "Items: " + this.items.join() +"\n"+
                "ItemGetAction: " + this.itemGetAction
    }

    return GDLevelPackage;
}