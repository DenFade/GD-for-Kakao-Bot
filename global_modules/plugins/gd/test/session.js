//comment
let accountcomments = require("../fetch/comment/GDAccountComments").accountcomments;

//level
let searchLevel = require("../fetch/level/GDSearchLevel").searchlevel;
let getLevel = require("../fetch/level/GDGetLevel").getlevel;
let likeLevel = require("../fetch/level/GDLikeLevel").likelevel;

//message
let getMessage = require("../fetch/message/GDGetMessage").getmessage;
let loadMessages = require("../fetch/message/GDLoadMessages").loadmessages;
let removeMessage = require("../fetch/message/GDRemoveMessage").removemessage;

//package
let getGauntlet = require("../fetch/package/GDGetGauntlet").getgauntlet;

//rate
let rateDemonLevel = require("../fetch/rate/GDRateDemonLevel").ratedemon;
let rateStarLevel = require("../fetch/rate/GDRateStarsLevel").ratestars;

//user
let getUser = require("../fetch/user/GDGetUser").getUser;

//let session = new session(cleint)

const session = function(client) {
    session.prototype.account = {

    }

    session.prototype.comment = {
        account_comments: function(account_id, page) {
            return accountcomments(client, account_id, page)
        },

        level_comments: function() {
            return "Method not implemented."
        },

        remove_account_comment: function() {
            return "Method not implemented."
        },

        remove_level_comment: function() {
            return "Method not implemented."
        }
    }

    session.prototype.level = {
        get_information: function(level_id) {
            return getLevel(client, level_id);
        },

        request_like: function(level_id, like, device_udid) {
            return likeLevel(client, level_id, like, device_udid);
        },

        report_level: function() {
            return "Method not implemented."
        },
        serach_level: function(name, page, filter, field) {
            return searchLevel(client, narguments, page, filter, field);
        }
    }

    session.prototype.message = {
        get_message: function(message_id) {
            return getMessage(client, message_id);
        },

        load_messages: function(page) {
            return loadMessages(client, page);
        },

        remove_message: function(message_id) {
            return removeMessage(client, message_id);
        },
        
        send_message: function() {
            return "Method not implemented."
        }
    }

    session.prototype.package = {
        get_gauntlet: function() {
            return getGauntlet(client);
        }
    }

    session.prototype.rate = {
        rate_demon: function(level_id, demon) {
            return rateDemonLevel(client, level_id, demon);
        },

        rate_star: function(level_id, star, device_udid) {
            return rateStarLevel(client, level_id, star, device_udid);
        }
    }

    session.prototype.request = {
        accpet_friend: function() {
            return "Method not implemented."
        },

        block_friend: function() {
            return "Method not implemented."
        },

        load_friend_requests: function() {
            return "Method not implemented."
        }
    }

    session.prototype.user = {
        block_user: function() {
            return "Method not implemented."
        },

        get_information: function(user_id) {
            return getUser(client, user_id);
        },

        search_user: function() {
            return "Method not implemented."
        },

        top_ranking: function() {
            return "Method not implemented."
        },

        unblock_user: function() {
            return "Method not implemented."
        }
    }
}

module.exports = session