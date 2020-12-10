var name = "help";
help[name] = function(){
    var info = ["Help","Used to show help. Wait a minute...","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    if (msg.content.toLowerCase().startsWith(PREFIX+" help")){
        var search = msg.content.replace(PREFIX+" help ", "");
        var args1 = search.split(" ");
        if(msg.content == "3rd help"){
          const embed = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setTitle("Help")
          .setDescription(twoRowString(commandNames))
          .setFooter("Credit is given were it's due <3");
          if(commandNames.length > 20){
            msg.author.sendEmbed(embed);
            msg.channel.send("Look in your dms");
          }
          else{
            msg.channel.sendEmbed(embed);
          }
        }
        else if(args1 != null){
          var info = help[args1[0].toLowerCase()](msg);
          const embed = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setTitle(info[0])
          .setDescription(info[1])
          .setFooter(info[2]);
          msg.channel.sendEmbed(embed);
        }
    }
}