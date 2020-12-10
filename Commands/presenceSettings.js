var name = "presence";
help[name] = function(){
    var info = ["Presence","Used to change the bots presence settings via commands. The format is layed out as name, type and status","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    var types = ["playing","streaming","listening","watching"];
    var status = ["online","idle","offline","dnd"];
    var message = msg.content.toLowerCase().split(" ");
    if(msg.author.id == OWNER_ID || checkPerms(msg.author.id) >= 1){
        if(message[2] == "set"){
            if(message[3] == "game"){
                for(var search of types){if(message[4] == search){
                            var filterString = PREFIX+" presence set game "+search;
                            var gameName = msg.content.replace(filterString,"");
                            if(message[4] == "streaming"){
                                bot.user.setPresence({game: { type: message[4],name: gameName, url: "https://www.twitch.tv/the3rd"},})
                            }
                            else{
                                bot.user.setPresence({game: { type: message[4],name: gameName},})
                            }
                            msg.reply("Done.");}}}
            }
            else if(message[3] == "status"){
                for(var search of status){if(message[4] == search){
                        bot.user.setStatus(message[5]);
                        msg.reply("Done.");}}
        }
        if(message[2] == "help")
        {
            if(message[3] == null){msg.reply("There are three values that can be changed such as name, type and status. Try "+PREFIX+" presence help <name>");}
            else if(message[3] == "game"){msg.reply("The first value must be one of: PLAYING, STREAMING, LISTENING or WATCHING Then the lastly can be anything.");}
            else if(message[3 == "status"]){msg.reply("This value must be one of: online, idle, offline or dnd.");}
            else {msg.reply("Invalid help request.");}
        }
        else if(message[2] == "reset"){presence("the screams.","LISTENING","dnd");}
    }
}