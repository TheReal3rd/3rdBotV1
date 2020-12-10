var name = "message";
help[name] = function(){
    var info = ["Message","Message a user by id.","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    var message = msg.content.split(" ");
    var id = message[2];
    var message2Send = msg.content.replace(PREFIX+" message "+id,"");
    if(msg.author.id == OWNER_ID || checkPerms(msg.author.id) >= 1){
        bot.fetchUser(filter(id)).then((user) => {
            user.send(message2Send);
        });
    }
}