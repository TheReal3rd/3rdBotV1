const { exec } = require("child_process");
var name = "execute";
help[name] = function(){
    var info = ["Linux Command.","Linux Command execution for the computer system thats running the bot. (Requires linux.)","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    var message = msg.content.replace("3rd execute ","");
    if (msg.author.id == OWNER_ID){
        exec(message, (error, stdout, stderr) => {
            if (error) {
                msg.reply(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                msg.reply(`stderr: ${stderr}`);
                return;
            }
             msg.reply(`stdout: ${stdout}`);
        });
    }
}