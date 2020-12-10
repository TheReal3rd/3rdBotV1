var name = "shutdown";
help[name] = function(){
    var info = ["Shutdown","Shutsdown the bot.","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    if (msg.author.id == OWNER_ID){
        msg.reply("Shutting down.");
        if (process.send) {
            process.send("shutdown");
        }
        process.exit(0);
    }
}