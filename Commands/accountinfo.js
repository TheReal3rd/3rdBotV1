var name = "info";
help[name] = function(){
    var info = ["Info","Returns users infomation using mentions or your info without any mentions.","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    var message = msg.content.split(" ");
    if(message[2] == null){
        msg.reply("ID: "+msg.author.id+" Username: "+msg.author.username+" Discriminator: "+msg.author.discriminator);
    }
    else if (message[2] != null){
        try{
            var id = filter(message[2]);
            bot.fetchUser(id).then((user) => {msg.reply("ID: "+user.id+" Username: "+user.username+" Discriminator: "+user.discriminator);});
        }
        catch(err){
            msg.reply("Account not found.");
        }
    }
}