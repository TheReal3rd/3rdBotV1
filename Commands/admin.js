var name = "admin";
help[name] = function(){
    var info = ["Admin","Give a user permissions by using 'add' to remove permissions by 'remove' such as '3rd admin add or remove <user id / @>'","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    //var userRemoved = false;
    var message = msg.content.toLowerCase().split(" ");
    if (msg.author.id == OWNER_ID || checkPerms(msg.author.id) >= 3){
        if(message[2] == "add"){
            if(message[4] == null){message[4] = 1}
            var member = msg.mentions.members.first();
            bot.fetchUser(member.id).then((user) => {
                var userInfo = [user.username,user.discriminator];
                let admin = {Username: userInfo[0],Discriminator: userInfo[1],ID: member.id,Level: message[4],By: msg.author.username}
                let data = JSON.stringify(admin);
                fs.writeFileSync("Permissions/"+member.id+".json",data)
            });
            var output = "Admin access granted to: "+member.id+" | by: "+msg.author.username+" | "+msg.author.id;
            msg.reply(output);
        }
        else if(message[2] == "remove"){
            try{
                for(var admins of fs.readdirSync("Permissions/")){
                    var admin = admins.replace(".json","");
                    var member = msg.mentions.members.first();
                    //userRemoved = false;
                    if(member.id == admin){
                        try{
                            fs.unlinkSync("Permissions/"+member.id+".json");
                            var output = "Admin access removed from: "+member.id+" | by: "+msg.author.username+" | "+msg.author.id;
                            msg.reply(output);
                            userRemoved = true;
                        }
                        catch(err){
                            sendErrors("Admin Error: "+err);
                            msg.reply("Failed to delete the user");
                        }
                    }
                }
                //if(!userRemoved){
                //    msg.reply("User doesn't have perms or Input is incorrect.");
                //}
            }
            catch(err){
                sendErrors(err);
            }
        }
        else if(message[2] == "list"){
            var adminList = [];
            for(var admins of fs.readdirSync("Permissions/")){
                var data = fs.readFileSync("Permissions/"+admins);
                var readData = JSON.parse(data);
                var info = "Username: "+readData.Username+" | Discriminator: "+readData.Discriminator+" | ID: "+readData.ID+" | Level: "+readData.Level;
                console.log(info);
                adminList.push(info);
            }
            const embed = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setTitle("Admins list")
            .setDescription(adminList)
            .setFooter("Created By 3rd");
            msg.channel.sendEmbed(embed);
        }
    }
}