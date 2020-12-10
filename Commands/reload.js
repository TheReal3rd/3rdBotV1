var name = "reload";
help[name] = function(){
    var info = ["Reload","Reloads the commands folder.","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    if (msg.author.id == OWNER_ID || checkPerms(msg.author.id) >= 3){
        var message = msg.content.toLowerCase().split(" ");
        if(message[2] == "commands"){
            loadCommands();
            msg.reply("Commands reloaded");
        }
        else if(message[2] == "all"){
            loadCommands();
            loadPermissions();
            msg.reply("All commands and permissions have been reloaded.");
        }
    }
}