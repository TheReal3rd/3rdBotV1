var name = "upload";
help[name] = function(){
    var info = ["Upload","Used to upload command modules to the bot.","Created by 3rd"];
    return info;
}

//Not my code :(
function download(url, dest) {
  return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest);

      const request = http.get(url, response => {
          if (response.statusCode === 200) {
              response.pipe(file);
          } else {
              file.close();
              fs.unlink(dest, () => {});
              reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
          }
      });

      request.on("error", err => {
          file.close();
          fs.unlink(dest, () => {});
          reject(err.message);
      });

      file.on("finish", () => {resolve();});

      file.on("error", err => {
          file.close();
          if (err.code === "EEXIST") {
              reject("File already exists");
          } else {
              fs.unlink(dest, () => {});
              reject(err.message);
          }
      });
  });
}

commands[name] = function(msg){
    if(msg.author.id == OWNER_ID || checkPerms(msg.author.id) >= 3){
        var message = msg.content.split(" ");
        var Attachment = (msg.attachments).array();
        writeLogs(Attachment[0].url,false);
        download(Attachment[0].url,"Commands/"+message[2]+".js");
    }
}