var name = "about";
help[name] = function(){
    var info = ["About","Infomation about the bot.","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    msg.author.send("3rd_bot is being developed by 3rd#1703 more soon™");
}