//comment
let accountcomments = require("../fetch/comment/GDAccountComments").accountcomments;

//friend
let acceptFriend = require("../fetch/friend/GDAcceptFriendRequest").acceptfriend;
let denyFriend = require("../fetch/friend/GDDenyFriendRequest").denyfriend;
let loadFriendRequests = require("../fetch/friend/GDLoadFriendRequest").loadfriends;

//level
let searchLevel = require("../fetch/level/GDSearchLevel").searchlevel;
let getLevel = require("../fetch/level/GDGetLevel").getlevel;
let likeLevel = require("../fetch/level/GDLikeLevel").likelevel;
let reportLevel = require("../fetch/level/GDReportLevel").reportlevel;

//message
let getMessage = require("../fetch/message/GDGetMessage").getmessage;
let loadMessages = require("../fetch/message/GDLoadMessages").loadmessages;
let removeMessage = require("../fetch/message/GDRemoveMessage").removemessage;
let sendMessage = require("../fetch/message/GDSendMessage").sendMessage;

//package
let getGauntlet = require("../fetch/package/GDGetGauntlet").getgauntlet;

//rate
let rateDemonLevel = require("../fetch/rate/GDRateDemonLevel").ratedemon;
let rateStarLevel = require("../fetch/rate/GDRateStarsLevel").ratestars;

//user
let getUser = require("../fetch/user/GDGetUser").getUser;
let getRanking = require("../fetch/user/GDRankingUser").rankinguser;
let blockUser = require("../fetch/user/GDBlockUser").block_user;
let unblockUser = require("../fetch/user/GDUnblockUser").unblock_user;


const SessionModule = function(client) {
    SessionModule.prototype.account = {

    }

    SessionModule.prototype.comment = {
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

    SessionModule.prototype.level = {
        get_information: function(level_id) {
            return getLevel(client, level_id);
        },

        request_like: function(level_id, like, device_udid) {
            return likeLevel(client, level_id, like, device_udid);
        },

        report_level: function(level_id) {
            return reportLevel(client, level_id)
        },
        serach_level: function(name, page, filter, field) {
            return searchLevel(client, narguments, page, filter, field);
        }
    }

    SessionModule.prototype.message = {
        get_message: function(message_id) {
            return getMessage(client, message_id);
        },

        load_messages: function(page) {
            return loadMessages(client, page);
        },

        remove_message: function(message_id) {
            return removeMessage(client, message_id);
        },
        
        send_message: function(target_id, title, content) {
            return sendMessage(client, target_id, title, content);
        }
    }

    SessionModule.prototype.package = {
        get_gauntlet: function() {
            return getGauntlet(client);
        }
    }

    SessionModule.prototype.rate = {
        rate_demon: function(level_id, demon) {
            return rateDemonLevel(client, level_id, demon);
        },

        rate_stars: function(level_id, star, device_udid) {
            return rateStarLevel(client, level_id, star, device_udid);
        }
    }

    SessionModule.prototype.friend = {
        accpet_friend: function(target_id, request_id) {
            return acceptFriend(client, target_id, request_id);
        },

        deny_friend: function(target_id, request_id) {
            return denyFriend(client, target_id, request_id);
        },

        load_friend_requests: function(page, isSent) {
            return loadFriendRequests(client, page, isSent);
        }
    }

    SessionModule.prototype.user = {
        block_user: function(target_id) {
            return blockUser(client, target_id);
        },

        get_information: function(user_id) {
            return getUser(client, user_id);
        },

        search_user: function() {
            return "Method not implemented."
        },

        ranking: function(type, count) {
            return getRanking(client, type, count);
        },

        unblock_user: function(target_id) {
            return unblockUser(client, target_id);
        }
    }
}

module.exports = SessionModule;