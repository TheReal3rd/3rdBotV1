const ytdl = require('ytdl-core');
var name = "yt";
help[name] = function(){
    var info = ["YouTube2mp3","Converts YouTube videos into mp3 and posts them to you.","Created by 3rd"];
    return info;
}
commands[name] = function(msg){
    var message = msg.content.split(" ");
    if(message[2].includes("https://youtu.be/") || message[2].includes("https://www.youtube.com/")){
        var video = ytdl(message[2],{ quality: 'highestaudio', filter: 'audioonly'})
        msg.reply("Check yo dms babby! :point_right: :point_right: pow! pow! ");
        video.pipe(fs.createWriteStream("YouTubeMP3/mp3/"+msg.author.id+".mp3"))
        video.on('end', function() {
            msg.author.sendFile("./YouTubeMP3/mp3/"+msg.author.id+".mp3");
        });
    }
    else{
        msg.reply("Invalid link given.");
    }
}