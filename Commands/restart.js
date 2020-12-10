var name = "restart";
help[name] = function(){
    var info = ["Restart","Restarts all the thread used by the bot (reboots it.)","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    if(msg.author.id == OWNER_ID){
        msg.reply("Restarting the bot...");
        if(process.send){
            process.send("restart");
        }
    }
}