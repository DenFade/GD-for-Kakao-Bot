GDClient = require("plugins/gd/GDClient.js").GDClient;
Logger = require("plugins/log/Logger.js").Logger;

const scriptName = "example_gd";

const Account = FileStream.read("storage/emulated/0/scripts/credential/botGDAccount.txt").split(":");

let client = GDClient.build()
        .setTimeout(30000) //timeout 30초로 설정
        .toggleLoggingRawData(true) //rawData 로깅 활성화
        .login(Account[0], Account[1], Account[2]); //AccountID, 닉네임, 비밀번호
        
let logger = Logger.build("scripts", "gdlogs");
    
function response(room, msg, sender, isGroupChat, bot, imageDB, packageName){
    
    if(bot.isDebugChat){

        if(msg.startsWith("~level ")){
            let result, level = msg.substring(7);
            if(!level){
                bot.reply("레벨 이름 혹은 ID를 입력하세요.");
                return;
            } else {
                if(1 < level && level < 100000000){
                    result = client.getLevel(level).block();
                    bot.reply(result.toString());
                } else {
                    result = client.searchLevel(level).block();
                    for(var l in result.items){
                        bot.reply(result.items[l].toString());
                    }
                }
            }
        } else if(msg.startsWith("~user ")){
            let result, user = msg.substring(6);
            if(!user){
                bot.reply("유저명 혹은 AccountID를 입력하세요");
                return;
            } else {
                if(/\d{1,8}a/){
                    result = client.getUser(user).block();
                    bot.reply(result.toString());
                }
            }
        } else if(msg.startsWith("~message inbox ")){
            let result, page = msg.substring(15);
            if(Number(page) == NaN || page < 0){
                bot.reply("Page 는 0이상 정수입니다.");
                return;
            } else {
                page = !page ? 0 : page;
                result = client.loadMessages(page).block();

                for(var m in result.items){
                    result.items[m].getBody();
                    bot.reply(result.items[m].toString());
                }
            }
        }

    }

}