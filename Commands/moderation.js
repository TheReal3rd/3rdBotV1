var name = "moderation";
help[name] = function(){
    var info = ["Moderation","This is used to kick and ban users.","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    var message = msg.content.toLowerCase().split(" ");
    if(message[2] == "kick" && msg.member.guild.me.hasPermission(['KICK_MEMBERS'])){
        var member = msg.mentions.members.first();
        member.kick().then((member) => {
            msg.channel.send(member.displayName + " has been kicked from the server.");
        }).catch(() => {
            msg.channel.send("This bot is lacking server permissions to use this command.");
        });
    }
    else if(message[2] == "ban" && msg.member.guild.me.hasPermission(['BAN_MEMBERS'])){
        var member = msg.mentions.members.first();
        member.ban().then((member) => {
            msg.channel.send(member.displayName + " has been banned from the server.");
        }).catch(() => {
            msg.channel.send("This bot is lacking server permissions to use this command.");
        });
    }
    else{
        msg.reply("Invalid args given must be kick or ban.");
    }
}